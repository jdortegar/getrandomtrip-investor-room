import { redirect } from 'next/navigation';

import { getLocaleFromCookies } from '@/lib/i18n/server';
import { pathForLocale } from '@/lib/i18n/pathForLocale';

export default async function LegalPage() {
  const locale = await getLocaleFromCookies();
  redirect(pathForLocale(locale, '/room/files'));
}
