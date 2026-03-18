import { MarketingHomeWrapper } from '@/components/marketing/MarketingHomeWrapper';
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

  const dict = await getDictionary(locale).then(
    (d) => d.marketing as MarketingDictionary
  );

  return <MarketingHomeWrapper dict={dict} locale={locale} />;
}
