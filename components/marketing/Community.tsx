'use client';

import { motion } from 'framer-motion';
import { MobileCarousel } from './MobileCarousel';
import { Section } from './Section';

const FEATURE_ICONS = [
  '/assets/svg/rutas.svg',
  '/assets/svg/content.svg',
  '/assets/svg/community.svg',
];

interface CommunityProfile {
  description: string;
  name: string;
  role: string;
}

interface CommunityDict {
  features: Array<{ description: string; title: string }>;
  profiles: CommunityProfile[];
  subtitle: string;
  title: string;
}

interface CommunityProps {
  className?: string;
  dict: CommunityDict;
}

interface ProfileCardProps {
  delay?: number;
  profile: CommunityProfile;
}

function ProfileCard({ profile, delay = 0 }: ProfileCardProps) {
  return (
    <motion.div
      className="h-full space-y-2 rounded-2xl bg-[#D9D9D9] p-4 md:p-6"
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 1, delay }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start gap-3 md:items-center md:gap-4">
        <div className="h-12 w-12 shrink-0 rounded-full bg-white md:h-[42px] md:w-[42px]" />
        <div className="min-w-0 flex-1 space-y-1 md:space-y-2">
          <h4 className="font-barlow-condensed text-lg font-bold uppercase leading-none tracking-wide text-foreground md:text-[22px]">
            {profile.name}
          </h4>
          <p className="font-barlow-condensed text-[10px] uppercase tracking-[0.25em] text-foreground md:text-[11px]">
            {profile.role}
          </p>
        </div>
      </div>
      <p className="font-barlow-condensed font-light leading-relaxed text-foreground text-[13px] md:text-[15px]">
        {profile.description}
      </p>
    </motion.div>
  );
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
          transition={{ duration: 1 }}
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
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent md:from-black/40 md:via-transparent" />

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
                          <p className="font-barlow text-sm sm:text-base md:text-lg text-white leading-tight md:leading-relaxed max-w-sm">
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

        <MobileCarousel
          className="md:hidden block -mr-4 w-[calc(100%+1rem)] md:mr-0 md:w-full"
          itemClassName="h-full"
          items={dict.profiles}
          renderItem={(profile, index) => (
            <ProfileCard delay={index * 0.1} profile={profile} />
          )}
        />

        {/* Desktop Grid */}
        <div className="hidden gap-4 px-10 md:grid md:grid-cols-3 xl:gap-6 xl:px-12 2xl:gap-8 2xl:px-16">
          {dict.profiles.map((profile, index) => (
            <ProfileCard
              key={profile.name}
              delay={index * 0.1}
              profile={profile}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
