import { getDictionary } from '@/lib/i18n/dictionaries';
import { getLocaleFromCookies } from '@/lib/i18n/server';
import type { RoomDictionary } from '@/lib/types/dictionary';

import { NotFoundView } from '@/components/app/NotFoundView';

export default async function NotFoundPage() {
  const locale = await getLocaleFromCookies();
  const dict = await getDictionary(locale);
  const room = dict.room as RoomDictionary;

  return <NotFoundView locale={locale} room={room} />;
}
