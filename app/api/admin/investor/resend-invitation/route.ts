import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/api/prisma';
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

    // Send access email with link to /otp?callbackUrl=/room
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
    const accessUrl = `${baseUrl}/otp?callbackUrl=/room`;

    const subject = investor.approved
      ? 'Reenvío: Acceso a Sala de inversores'
      : 'Acceso a Sala de inversores';
    const title = investor.approved ? 'Reenvío de acceso' : 'Has sido aprobado';
    const message = investor.approved
      ? 'Se te ha reenviado el enlace de acceso a la Sala de inversores. Haz clic en el botón de abajo para iniciar sesión.'
      : 'Felicidades — has sido aprobado para acceder a la Sala de inversores. Haz clic en el botón de abajo para iniciar sesión y acceder al data room.';

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width:600px; margin:24px auto; padding:20px; background:#fff; border-radius:8px;">
        <div style="text-align:center; margin-bottom:16px;">
          <img src="${baseUrl}/assets/svg/logo.svg" alt="Investor Room" style="height:40px;" />
        </div>
        <h2 style="color:#0A2240">${title}</h2>
        <p>${message}</p>
        <div style="text-align:center; margin:20px 0;">
          <a href="${accessUrl}" style="background:#0A2240;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;">Acceder a la Sala de inversores</a>
        </div>
        <p style="color:#6b7280;font-size:13px;">Si no solicitaste este acceso, ignora este correo.</p>
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
