import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';

import { authOptions } from '@/lib/auth/config';
import { getLocaleFromCookies } from '@/lib/i18n/server';
import { pathForLocale } from '@/lib/i18n/pathForLocale';
import type { Locale } from '@/lib/i18n/config';

export interface RoomAuthResult {
  investor: NonNullable<Session['investor']>;
  locale: Locale;
  session: Session;
}

/**
 * Server-only: ensures session and investor profile are complete, then returns
 * them with locale. Performs locale-aware redirects to /otp or /onboarding.
 * Does not check investor.approved — layout renders "Acceso pendiente" when !approved.
 */
export async function requireRoomAuth(): Promise<RoomAuthResult> {
  const session = await getServerSession(authOptions);
  const locale = await getLocaleFromCookies();

  if (!session) {
    redirect(pathForLocale(locale, '/otp'));
  }

  const investor = session.investor;
  if (!investor || !investor.profileComplete) {
    redirect(pathForLocale(locale, '/onboarding'));
  }

  return { session, investor, locale };
}
