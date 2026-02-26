import { Hero } from '@/components/marketing/Hero';
import { ValueProposition } from '@/components/marketing/ValueProposition';
import { ProblemSolution } from '@/components/marketing/ProblemSolution';
import { Paragraph } from '@/components/marketing/Paragraph';
import { ThreeDecisions } from '@/components/marketing/ThreeDecisions';
import { BusinessVerticals } from '@/components/marketing/BusinessVerticals';
import { SystemFeatures } from '@/components/marketing/SystemFeatures';
import { Community } from '@/components/marketing/Community';
import { BusinessModels } from '@/components/marketing/BusinessModels';
import { Metrics } from '@/components/marketing/Metrics';
import { Roadmap } from '@/components/marketing/Roadmap';
import { Safe } from '@/components/app/Safe';
import { Team } from '@/components/marketing/Team';
import { Inspiration } from '@/components/marketing/Inspiration';
import { Footer } from '@/components/marketing/Footer';
import type { MarketingDictionary } from '@/lib/types/dictionary';

interface FullMarketingContentProps {
  dict: MarketingDictionary;
}

export function FullMarketingContent({ dict }: FullMarketingContentProps) {
  return (
    <>
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
      <BusinessVerticals dict={dict.businessVerticals} />
      <SystemFeatures dict={dict.systemFeatures} />
      <Community dict={dict.community} />
      <BusinessModels dict={dict.businessModels} />
      <Metrics dict={dict.metrics} />
      <Roadmap dict={dict.roadmap} />
      <Safe dict={dict.safe} />
      <Team />
      <Inspiration dict={dict.inspiration} />
      <Footer dict={dict.footer} />
    </>
  );
}
