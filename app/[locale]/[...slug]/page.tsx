import { redirect } from 'next/navigation';

import { DEFAULT_LOCALE } from '@/lib/i18n/config';
import { hasLocale } from '@/lib/i18n/dictionaries';
import { pathForLocale } from '@/lib/i18n/pathForLocale';

/**
 * Catch-all for unknown paths under [locale] (e.g. /en/otp-2, /es/create-skill).
 * Redirects to the locale home.
 */
export default async function LocaleCatchAllPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) redirect(pathForLocale(DEFAULT_LOCALE, '/'));
  redirect(pathForLocale(locale, '/'));
}
