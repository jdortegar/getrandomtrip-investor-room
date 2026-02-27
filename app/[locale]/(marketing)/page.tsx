import { getServerSession } from 'next-auth';

import { MarketingHomeWrapper } from '@/components/marketing/MarketingHomeWrapper';
import { authOptions } from '@/lib/auth/config';
import { getDictionary, hasLocale } from '@/lib/i18n/dictionaries';
import type { MarketingDictionary } from '@/lib/types/dictionary';

export const dynamic = 'force-dynamic';

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) return null;

  const [dict, session] = await Promise.all([
    getDictionary(locale).then((d) => d.marketing as MarketingDictionary),
    getServerSession(authOptions),
  ]);

  return (
    <MarketingHomeWrapper
      dict={dict}
      hasSession={!!session}
      locale={locale}
    />
  );
}
