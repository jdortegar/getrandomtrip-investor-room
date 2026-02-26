import { Hero } from '@/components/marketing/Hero';
import { Paragraph } from '@/components/marketing/Paragraph';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { BusinessVerticals } from '@/components/marketing/BusinessVerticals';
import { BusinessModels } from '@/components/marketing/BusinessModels';
import { Metrics } from '@/components/marketing/Metrics';
import { Community } from '@/components/marketing/Community';
import { Roadmap } from '@/components/marketing/Roadmap';
import { Inspiration } from '@/components/marketing/Inspiration';
import { Team } from '@/components/marketing/Team';
import { Safe } from '@/components/app/Safe';
import { Footer } from '@/components/marketing/Footer';
import type { MarketingDictionary } from '@/lib/types/dictionary';

interface FullMarketingContentProps {
  dict: MarketingDictionary;
}

export function FullMarketingContent({ dict }: FullMarketingContentProps) {
  return (
    <>
      <Hero />
      <Paragraph>{dict.paragraph}</Paragraph>
      <HowItWorks dict={dict.howItWorks} />
      <BusinessVerticals dict={dict.businessVerticals} />
      <BusinessModels dict={dict.businessModels} />
      <Metrics dict={dict.metrics} />
      <Community dict={dict.community} />
      <Roadmap dict={dict.roadmap} />
      <Inspiration dict={dict.inspiration} />
      <Team dict={dict.team} />
      <Safe dict={dict.safe} />
      <Footer dict={dict.footer} />
    </>
  );
}
