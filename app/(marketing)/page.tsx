import { Navbar } from '@/components/marketing/Navbar';
import { Hero } from '@/components/marketing/Hero';
import { ValueProposition } from '@/components/marketing/ValueProposition';
import { ProblemSolution } from '@/components/marketing/ProblemSolution';
import { Paragraph } from '@/components/marketing/Paragraph';
import { ThreeDecisions } from '@/components/marketing/ThreeDecisions';
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

export default function MarketingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <ValueProposition />
      <ProblemSolution />
      <Paragraph>
        Construimos el sistema para diseñar viajes cómo se diseñan productos:
        <br className="md:hidden" />{' '}
        <span className="font-bold">CON INTENCIÓN, DATA Y CRITERIO.</span>
      </Paragraph>
      <ThreeDecisions />
      {/* <HowItWorks /> */}
      <BusinessVerticals />
      <BusinessModels />
      <Metrics />
      <Community />
      <Roadmap />
      <Safe />
      <Team />
      <Inspiration />
      <Footer />
    </main>
  );
}
