import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookMeetingButton } from '@/components/marketing/BookMeetingButton';
import { Navbar } from '@/components/marketing/Navbar';
import { Hero } from '@/components/marketing/Hero';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { BusinessModels } from '@/components/marketing/BusinessModels';
import { BusinessVerticals } from '@/components/marketing/BusinessVerticals';
import { Metrics } from '@/components/marketing/Metrics';

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

      {/* Teaser Deck Section */}
      <section className="border-t bg-background py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 font-serif text-4xl font-bold text-foreground sm:text-5xl">
              The Opportunity
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-8">
                  <h3 className="mb-4 font-serif text-2xl font-semibold">
                    Market
                  </h3>
                  <p className="text-muted-foreground">
                    The travel planning market is ripe for disruption.
                    We&apos;re building the future of personalized travel
                    experiences.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <h3 className="mb-4 font-serif text-2xl font-semibold">
                    Traction
                  </h3>
                  <p className="text-muted-foreground">
                    Strong early metrics showing product-market fit. Growing
                    community of engaged travelers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <h3 className="mb-4 font-serif text-2xl font-semibold">
                    Team
                  </h3>
                  <p className="text-muted-foreground">
                    Experienced founders with deep domain expertise and a clear
                    vision for the future.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <h3 className="mb-4 font-serif text-2xl font-semibold">
                    Vision
                  </h3>
                  <p className="text-muted-foreground">
                    Creating a platform that transforms how people discover,
                    plan, and experience travel.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Now / Why Us Section */}
      <section id="why-now" className="border-t bg-muted/30 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 font-serif text-4xl font-bold text-foreground sm:text-5xl">
              Why Now, Why Us
            </h2>
            <div className="space-y-12">
              <div>
                <h3 className="mb-4 font-serif text-2xl font-semibold text-primary">
                  The Timing is Right
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Post-pandemic travel behavior has fundamentally shifted.
                  Travelers want personalized, authentic experiences, and
                  they&apos;re willing to invest in quality planning. The market
                  is ready for a solution that combines technology with human
                  expertise.
                </p>
              </div>
              <div>
                <h3 className="mb-4 font-serif text-2xl font-semibold text-primary">
                  Our Unique Advantage
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We&apos;ve built a product that resonates with our early
                  users. Our metrics tell a story of engagement, retention, and
                  growth. We&apos;re not just building software—we&apos;re
                  creating a movement that connects travelers with experiences
                  that matter.
                </p>
              </div>
              <div>
                <h3 className="mb-4 font-serif text-2xl font-semibold text-primary">
                  Join the Journey
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  This is more than an investment opportunity. It&apos;s a
                  chance to be part of transforming how millions of people
                  experience travel. We&apos;re looking for partners who share
                  our vision and want to build something meaningful together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-linear-to-b from-primary/10 to-background py-24">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-6 font-serif text-4xl font-bold text-foreground sm:text-5xl">
              Ready to Learn More?
            </h2>
            <p className="mb-8 text-xl text-muted-foreground">
              Schedule a call with our founders to discuss the opportunity and
              see the full investor room.
            </p>
            <BookMeetingButton
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              size="lg"
            >
              Book Your Founder Call
            </BookMeetingButton>
          </div>
        </div>
      </section>
    </main>
  );
}
