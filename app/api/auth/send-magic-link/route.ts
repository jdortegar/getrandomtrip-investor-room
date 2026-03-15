import { randomBytes } from 'crypto';

import { NextResponse } from 'next/server';

import { prisma } from '@/lib/api/prisma';
import { sendMagicLinkEmail } from '@/lib/auth/sendMagicLinkEmail';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { hasLocale } from '@/lib/i18n/dictionaries';
import { pathForLocale } from '@/lib/i18n/pathForLocale';

const TOKEN_EXPIRY_MINUTES = 10;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 },
      );
    }

    const localeParam = typeof body?.locale === 'string' ? body.locale : '';
    const locale: Locale =
      localeParam && hasLocale(localeParam) ? localeParam : DEFAULT_LOCALE;

    const baseUrl = process.env.NEXTAUTH_URL || 'https://investors.getrandomtrip.com';
    const callbackPath = body?.callbackUrl && typeof body.callbackUrl === 'string'
      ? body.callbackUrl
      : pathForLocale(locale, '/room');
    const callbackUrl = callbackPath.startsWith('http')
      ? callbackPath
      : `${baseUrl}${callbackPath.startsWith('/') ? '' : '/'}${callbackPath}`;

    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + TOKEN_EXPIRY_MINUTES * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        identifier: email.toLowerCase(),
        token,
        expires,
      },
    });

    const magicLinkUrl = `${baseUrl}/api/auth/callback/email?token=${token}&callbackUrl=${encodeURIComponent(callbackUrl)}`;

    await sendMagicLinkEmail(email, magicLinkUrl);

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to send the sign-in link';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
