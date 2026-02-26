import { cookies } from 'next/headers';

import { COOKIE_LOCALE, DEFAULT_LOCALE, type Locale } from './config';
import { hasLocale } from './dictionaries';

export async function getLocaleFromCookies(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_LOCALE)?.value;
  if (value && hasLocale(value)) return value as Locale;
  return DEFAULT_LOCALE;
}
