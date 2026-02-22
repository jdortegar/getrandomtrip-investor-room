import { Navbar } from '@/components/marketing/Navbar';
import { Hero } from '@/components/marketing/Hero';
import { Paragraph } from '@/components/marketing/Paragraph';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { BusinessModels } from '@/components/marketing/BusinessModels';
import { BusinessVerticals } from '@/components/marketing/BusinessVerticals';
import { Metrics } from '@/components/marketing/Metrics';
import { Community } from '@/components/marketing/Community';
import { Roadmap } from '@/components/marketing/Roadmap';
import { Inspiration } from '@/components/marketing/Inspiration';
import { Team } from '@/components/marketing/Team';
import { Footer } from '@/components/marketing/Footer';
import { Safe } from '@/components/app/Safe';
import { LocaleSwitcher } from '@/components/navigation/LocaleSwitcher';
import { getDictionary, hasLocale } from '@/lib/i18n/dictionaries';
import type { MarketingDictionary } from '@/lib/types/dictionary';

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) return null;

  const dict = (await getDictionary(locale)).marketing as MarketingDictionary;

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar dict={dict.nav} locale={locale} />
      <div className="absolute right-4 top-4 z-50 md:right-8 md:top-8">
        <LocaleSwitcher locale={locale} />
      </div>
      <Hero />
      <Paragraph>{dict.paragraph}</Paragraph>
      <HowItWorks dict={dict.howItWorks} />
      <BusinessVerticals dict={dict.businessVerticals} />
      <BusinessModels dict={dict.businessModels} />
      <Metrics dict={dict.metrics} />
      <Community dict={dict.community} />
      <Roadmap dict={dict.roadmap} />
      <Safe dict={dict.safe} />
      <Team dict={dict.team} />
      <Inspiration dict={dict.inspiration} />
      <Footer dict={dict.footer} locale={locale} />
    </main>
  );
}
