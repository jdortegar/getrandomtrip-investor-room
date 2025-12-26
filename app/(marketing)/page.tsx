import { Navbar } from '@/components/marketing/Navbar';
import { Hero } from '@/components/marketing/Hero';
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
      <h2 className="mb-12 font-barlow-condensed uppercase tracking-wide text-foreground text-5xl max-w-4xl mx-auto text-center">
        Somos la plataforma que conecta viajeros auténticos con aventuras únicas
      </h2>
      <HowItWorks />
      <BusinessVerticals />
      <Metrics />
      <BusinessModels />
      <Community />
      <Roadmap />
      <Safe />
      <Team />
      <Inspiration />
      <Footer />
    </main>
  );
}
