'use client';

import { motion } from 'framer-motion';
import { MobileCarousel } from './MobileCarousel';
import { Section } from './Section';

const FEATURE_ICONS = [
  '/assets/svg/rutas.svg',
  '/assets/svg/content.svg',
  '/assets/svg/community.svg',
];

interface CommunityDict {
  features: Array<{ description: string; title: string }>;
  profiles: Array<{ description: string; name: string; role: string }>;
  subtitle: string;
  title: string;
}

interface CommunityProps {
  className?: string;
  dict: CommunityDict;
}

export function Community({ className, dict }: CommunityProps) {
  return (
    <Section className={className}>
      <div className="space-y-6">
        {/* Main Banner Section */}
        <motion.div
          className="relative min-h-[700px] md:h-[600px] overflow-hidden rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Image - Mobile */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
            style={{
              backgroundImage: 'url(/images/community-mobile.png)',
              backgroundPosition: 'center center',
            }}
          />

          {/* Background Image - Desktop */}
          <div
            className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
            style={{
              backgroundImage: 'url(/images/community.png)',
              backgroundPosition: 'center center',
            }}
          />

          {/* Overlay Gradient - Stronger on mobile for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent md:from-black/40 md:via-transparent" />

          {/* Content Overlay */}
          <div className="relative h-full flex items-center py-8 md:py-0">
            <div className="container mx-auto px-4 sm:px-6 md:px-24 xl:px-32 2xl:px-40">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 xl:gap-10 2xl:gap-12 items-center">
                {/* Left Side - Text Content */}
                <div>
                  <h2 className="mb-2 font-barlow-condensed text-3xl font-bold uppercase tracking-wide text-[#FED700] sm:text-4xl md:text-5xl lg:text-6xl">
                    {dict.title}
                  </h2>
                  <h3
                    className="mb-4 font-barlow-condensed text-lg uppercase text-white md:mb-6 sm:text-xl md:text-2xl"
                    style={{ letterSpacing: '0.5em' }}
                  >
                    {dict.subtitle}
                  </h3>

                  {/* Features List */}
                  <div className="space-y-3 md:space-y-4 xl:space-y-5 2xl:space-y-6">
                    {dict.features.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        className="flex items-start gap-4 md:gap-8 xl:gap-10 2xl:gap-12"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + 0.3,
                        }}
                      >
                        <div className="mt-1 shrink-0">
                          <img
                            alt=""
                            className="h-10 w-10 md:h-12 md:w-12 xl:h-14 xl:w-14 2xl:h-16 2xl:w-16"
                            src={FEATURE_ICONS[index]}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-barlow-condensed text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-white mb-1">
                            {feature.title}
                          </h4>
                          <p className="font-barlow text-sm sm:text-base md:text-lg text-white leading-relaxed max-w-sm">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Image is part of background */}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Cards Section - Mobile Carousel on mobile, grid on desktop */}
        <div className="md:hidden">
          <MobileCarousel
            className="pr-4"
            itemClassName="h-full"
            items={dict.profiles}
            renderItem={(profile, index) => (
              <motion.div
                className="bg-[#D9D9D9] rounded-2xl p-4 space-y-2 h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Profile Picture Placeholder */}
                  <div className="shrink-0 w-12 h-12 rounded-full bg-white" />

                  {/* Profile Info */}
                  <div className="flex-1 space-y-2">
                    <h4 className="font-barlow-condensed text-lg font-bold uppercase tracking-wide text-foreground leading-none">
                      {profile.name}
                    </h4>
                    <p
                      className="font-barlow-condensed text-[10px] uppercase tracking-wide text-foreground"
                      style={{ letterSpacing: '0.25em' }}
                    >
                      {profile.role}
                    </p>
                  </div>
                </div>
                <p className="font-barlow-condensed text-sm leading-relaxed text-foreground font-light">
                  {profile.description}
                </p>
              </motion.div>
            )}
          />
        </div>

        {/* Desktop Grid */}
        <div className="hidden gap-4 px-10 md:grid md:grid-cols-3 xl:gap-6 xl:px-12 2xl:gap-8 2xl:px-16">
          {dict.profiles.map((profile, index) => (
            <motion.div
              key={profile.name}
              className="bg-[#D9D9D9] rounded-2xl p-6 space-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
            >
              <div className="flex items-start gap-4">
                {/* Profile Picture Placeholder */}
                <div className="shrink-0 w-16 h-16 rounded-full bg-white" />

                {/* Profile Info */}
                <div className="flex-1 space-y-2">
                  <h4 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide text-foreground leading-none">
                    {profile.name}
                  </h4>
                  <p
                    className="font-barlow-condensed text-[12px] uppercase tracking-wide text-foreground"
                    style={{ letterSpacing: '0.25em' }}
                  >
                    {profile.role}
                  </p>
                </div>
              </div>
              <p className="font-barlow-condensed text-base leading-relaxed text-foreground font-light">
                {profile.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
