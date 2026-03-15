import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/api/prisma';
import { DEFAULT_LOCALE } from '@/lib/i18n/config';
import { getDictionary, hasLocale } from '@/lib/i18n/dictionaries';
import { pathForLocale } from '@/lib/i18n/pathForLocale';
import type { EmailsDictionary } from '@/lib/types/dictionary';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const founders = (process.env.FOUNDER_EMAIL || '')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    if (
      !session ||
      !session.user?.email ||
      !founders.includes(session.user.email.toLowerCase())
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const emailParam: string | undefined = body?.email;
    if (!emailParam || !emailParam.trim()) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }
    const email = emailParam.trim().toLowerCase();
    const localeParam = body?.locale;
    const locale =
      typeof localeParam === 'string' && hasLocale(localeParam)
        ? localeParam
        : DEFAULT_LOCALE;

    // Find or create investor so "send invitation" works for new emails
    let investor = await prisma.investor.findUnique({
      where: { email },
    });
    if (!investor) {
      investor = await prisma.investor.create({
        data: {
          email,
          approved: false,
        },
      });
    }

    // Send access email with locale-aware link (default locale when no preference)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Resend API key not configured' },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);
    const fromAddress = process.env.EMAIL_FROM || 'onboarding@resend.dev';
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3011';
    const otpPath = pathForLocale(locale, '/otp');
    const roomPath = pathForLocale(locale, '/room');
    const accessUrl = `${baseUrl}${otpPath}?callbackUrl=${encodeURIComponent(roomPath)}`;

    const dict = await getDictionary(locale);
    const strings = (dict as { emails: EmailsDictionary }).emails.resend;
    const subject = investor.approved
      ? strings.subjectResend
      : strings.subjectApproved;
    const title = investor.approved ? strings.titleResend : strings.titleApproved;
    const message = investor.approved
      ? strings.messageResend
      : strings.messageApproved;

    // Self-contained full document; html/head/body are not from any other part (same layout as magic-link/approve)
    const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <style>
            body { font-family: 'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin:0; background:#f6f7fb; -webkit-font-smoothing:antialiased; }
            .container { max-width:600px; margin:24px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 8px 24px rgba(10,34,64,0.06); }
            .header { background: #ffffff; padding:20px; text-align:center; border-bottom:1px solid #eef2f7; }
            .logo { display:block; height:48px; width:192px; max-width:100%; object-fit:contain; margin-left:auto; margin-right:auto; }
            .main { padding:28px; color:#0A2240; font-family: 'Barlow', sans-serif; }
            .title { font-family: 'Barlow Condensed', Arial Narrow, sans-serif; font-size:20px; font-weight:600; margin:0 0 8px; }
            .copy { font-family: 'Barlow', sans-serif; color:#475569; margin-bottom:18px; font-size:15px; line-height:1.5; }
            .button { background:#FED700; color:#000; padding:12px 24px; text-decoration:none; border-radius:8px; display:block; font-weight:600; font-size:1rem; font-family: 'Barlow Condensed', Arial Narrow, sans-serif; text-transform:uppercase; letter-spacing:0.025em; width:100%; }
            @media (min-width:768px){ .button { font-size:1.125rem; } }
            .footer { font-family: 'Barlow', sans-serif; padding:18px; border-top:1px solid #eef2f7; color:#6b7280; font-size:13px; text-align:center; }
            @media (max-width:480px){ .container{margin:12px} .main{padding:20px} .logo{height:40px;width:160px} }
          </style>
        </head>
        <body>
          <div class="container" role="article" aria-label="${strings.logoAlt}">
            <div class="header" role="banner">
              <img src="${baseUrl}/assets/svg/randomtrip.svg" alt="${strings.logoAlt}" class="logo" width="280" height="120" style="display:block;height:120px;width:280px;max-width:100%;object-fit:contain;margin-left:auto;margin-right:auto;" />
            </div>
            <div class="main">
              <h2 class="title">${title}</h2>
              <p class="copy">${message}</p>
              <div style="text-align:center; margin:22px 0;">
                <a href="${accessUrl}" class="button" target="_blank" rel="noopener noreferrer" style="background:#FED700;color:#000;padding:12px 24px;text-decoration:none;border-radius:8px;display:block;font-weight:600;font-size:1rem;font-family:'Barlow Condensed',Arial Narrow,sans-serif;text-transform:uppercase;letter-spacing:0.025em;width:100%;">${strings.button}</a>
              </div>
              <p class="copy">${strings.safeIgnore}</p>
            </div>
            <div class="footer">&copy; ${new Date().getFullYear()} getrandomtrip</div>
          </div>
        </body>
      </html>
    `;

    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: investor.email,
      subject,
      html,
    });

    if (sendError) {
      console.error('Resend send error:', sendError);
      return NextResponse.json(
        { error: sendError.message || 'Failed to send email' },
        { status: 500 },
      );
    }

    // mark magicLinkSent
    await prisma.investor.update({
      where: { email },
      data: { magicLinkSent: true, magicLinkSentAt: new Date() },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Resend invitation error:', err);
    return NextResponse.json(
      { error: err?.message || 'Unknown' },
      { status: 500 },
    );
  }
}
