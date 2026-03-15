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

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width:600px; margin:24px auto; padding:20px; background:#fff; border-radius:8px;">
        <div style="text-align:center; margin-bottom:16px;">
          <img src="${baseUrl}/assets/svg/logo.svg" alt="${strings.logoAlt}" style="height:40px;" />
        </div>
        <h2 style="color:#0A2240">${title}</h2>
        <p>${message}</p>
        <div style="text-align:center; margin:20px 0;">
          <a href="${accessUrl}" style="background:#0A2240;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;">${strings.button}</a>
        </div>
        <p style="color:#6b7280;font-size:13px;">${strings.safeIgnore}</p>
      </div>
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
