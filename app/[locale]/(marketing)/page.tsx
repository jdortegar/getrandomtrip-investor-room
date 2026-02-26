import { Navbar } from '@/components/marketing/Navbar';
import { Hero } from '@/components/marketing/Hero';
import { ValueProposition } from '@/components/marketing/ValueProposition';
import { ProblemSolution } from '@/components/marketing/ProblemSolution';
import { Paragraph } from '@/components/marketing/Paragraph';
import { ThreeDecisions } from '@/components/marketing/ThreeDecisions';
import { SystemFeatures } from '@/components/marketing/SystemFeatures';
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
      <Hero />
      <ValueProposition dict={dict.valueProposition} />
      <ProblemSolution dict={dict.problemSolution} />
      <Paragraph>
        <span className="md:hidden">
          {dict.paragraphMobile.line1}
          <br />
          {dict.paragraphMobile.line2}
          <br />
          {dict.paragraphMobile.line3}
          <br />
          <span className="font-bold">{dict.paragraphMobile.bold}</span>
        </span>
        <span className="hidden md:inline">
          {dict.paragraphDesktop.line1}
          <br />
          <span className="font-bold">{dict.paragraphDesktop.bold}</span>
        </span>
      </Paragraph>
      <ThreeDecisions dict={dict.threeDecisions} />
      {/* <HowItWorks dict={dict.howItWorks} /> */}
      <BusinessVerticals dict={dict.businessVerticals} />
      <SystemFeatures dict={dict.systemFeatures} />
      <Community dict={dict.community} />
      <BusinessModels dict={dict.businessModels} />
      <Metrics dict={dict.metrics} />
      <Roadmap dict={dict.roadmap} />
      <Safe dict={dict.safe} />
      <Team dict={dict.team} />
      <Inspiration dict={dict.inspiration} />
      <Footer dict={dict.footer} locale={locale} />
    </main>
  );
}
