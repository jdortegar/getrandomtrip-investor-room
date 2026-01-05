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

export default function MarketingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Paragraph>
        Somos la plataforma que conecta viajeros auténticos con aventuras únicas
      </Paragraph>
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
