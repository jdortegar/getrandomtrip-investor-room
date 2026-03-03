'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Section } from './Section';
import { MobileCarousel } from './MobileCarousel';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  linkedinUrl?: string;
}

interface TeamProps {
  className?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'SANTIAGO<br/>SENEGA',
    role: 'Hospitality Operator & Founder',
    description:
      'Leads operations and hospitality strategy. Background in high-end travel and experience design.',
    linkedinUrl: 'https://www.linkedin.com/in/santiago-senega/',
  },
  {
    id: 2,
    name: 'DAVID<br/>ORTEGA',
    role: 'Platform Systems & Co-Founder',
    description:
      'Drives product and technology. Focus on scalable systems and seamless user experiences.',
    linkedinUrl: 'https://www.linkedin.com/in/david-ortega/',
  },
  {
    id: 3,
    name: 'RODRIGO<br/>BENITEZ',
    role: 'Partnerships & Commercial & Co-Founder',
    description:
      'Heads partnerships and go-to-market. Connects Randomtrip with key players in travel and lifestyle.',
    linkedinUrl: 'https://www.linkedin.com/in/rodrigo-benitez/',
  },
  {
    id: 4,
    name: 'NICOLÁS<br/>ASMAR',
    role: 'Creative Director',
    description:
      'Owns brand and creative direction. Ensures every touchpoint reflects our vision and quality.',
    linkedinUrl: 'https://www.linkedin.com/in/nicolas-asmar/',
  },
  {
    id: 5,
    name: 'CARLA<br/>VAZQUEZ',
    role: 'UX/UI Director',
    description:
      'Shapes product design and user research. Makes the platform intuitive and delightful to use.',
    linkedinUrl: 'https://www.linkedin.com/in/carla-vazquez/',
  },
];

function renderNameWithBreaks(name: string) {
  const parts = name.split('<br/>');
  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

function renderCardFront(member: TeamMember) {
  return (
    <div className="relative h-full w-full">
      <Image
        alt={member.name}
        className="h-full w-full object-cover"
        fill
        src="/images/team-1.png"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      {/* Name Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 xl:p-8 2xl:p-10">
        <h3 className="font-barlow-condensed font-bold text-4xl text-white tracking-wide uppercase whitespace-normal wrap-break-word">
          {renderNameWithBreaks(member.name)}
        </h3>
      </div>
    </div>
  );
}

function renderCardBack(member: TeamMember) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="font-barlow-condensed font-bold leading-none mb-2 text-4xl text-foreground tracking-wide uppercase whitespace-normal wrap-break-word">
            {renderNameWithBreaks(member.name)}
          </h3>
          {member.role && (
            <p className="font-barlow-condensed text-sm text-foreground mb-4">
              {member.role}
            </p>
          )}
        </div>
        {member.linkedinUrl && (
          <a
            className="ml-4 shrink-0"
            href={member.linkedinUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="LinkedIn"
              className="h-6 w-6 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10"
              height={24}
              src="/images/linkedin.png"
              width={24}
            />
          </a>
        )}
      </div>

      {member.description && (
        <p className="font-barlow text-sm leading-relaxed text-foreground">
          {member.description}
        </p>
      )}
    </div>
  );
}

export function Team({ className }: TeamProps) {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [mobileFlippedCard, setMobileFlippedCard] = useState<number | null>(
    null,
  );

  const handleMobileCardFlip = (memberId: number) => {
    setMobileFlippedCard((prev) => (prev === memberId ? null : memberId));
  };

  const handleDesktopCardHover = (memberId: number | null) => {
    setFlippedCard(memberId);
  };

  return (
    <Section className={className} title="EQUIPO">
      <div>
        {/* Desktop: Carousel with 5 visible slides */}
        <div className="hidden md:block md:-mr-8 md:w-[calc(100%+2rem)] xl:-mr-12 xl:w-[calc(100%+3rem)] 2xl:-mr-16 2xl:w-[calc(100%+4rem)]">
          <MobileCarousel
            itemClassName="h-[400px]"
            items={TEAM_MEMBERS}
            slideWidth="22%"
            showDots
            renderItem={(member) => {
              const isFlipped = flippedCard === member.id;

              return (
                <div
                  className="relative h-full w-full"
                  onMouseEnter={() => handleDesktopCardHover(member.id)}
                  onMouseLeave={() => handleDesktopCardHover(null)}
                  style={{ perspective: '1000px' }}
                >
                  <motion.div
                    animate={{
                      rotateY: isFlipped ? 180 : 0,
                    }}
                    className="relative h-full w-full"
                    style={{ transformStyle: 'preserve-3d' }}
                    transition={{
                      duration: 1,
                      ease: 'easeInOut',
                    }}
                  >
                    {/* Front of Card - Image and Name */}
                    <motion.div
                      className="absolute inset-0 overflow-hidden rounded-2xl"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    >
                      {renderCardFront(member)}
                    </motion.div>

                    {/* Back of Card - Name, Role, Description, LinkedIn */}
                    <motion.div
                      className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-gray-100 p-6 justify-between"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      {renderCardBack(member)}
                    </motion.div>
                  </motion.div>
                </div>
              );
            }}
          />
        </div>

        {/* Mobile: Carousel with Flippable Cards */}
        <div className="block md:hidden">
          <MobileCarousel
            itemClassName="h-[400px]"
            items={TEAM_MEMBERS}
            className="md:hidden block -mr-4 w-[calc(100%+1rem)] md:mr-0 md:w-full"
            slideWidth="80%"
            showDots
            renderItem={(member) => {
              const isFlipped = mobileFlippedCard === member.id;

              return (
                <div
                  className="relative h-full w-full cursor-pointer"
                  onClick={() => handleMobileCardFlip(member.id)}
                  style={{ perspective: '1000px' }}
                >
                  <motion.div
                    animate={{
                      rotateY: isFlipped ? 180 : 0,
                    }}
                    className="relative h-full w-full"
                    style={{ transformStyle: 'preserve-3d' }}
                    transition={{
                      duration: 1,
                      ease: 'easeInOut',
                    }}
                  >
                    {/* Front of Card - Image and Name */}
                    <motion.div
                      className="absolute inset-0 overflow-hidden rounded-2xl"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    >
                      {renderCardFront(member)}
                    </motion.div>

                    {/* Back of Card - Name, Role, Description, LinkedIn */}
                    <motion.div
                      className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-gray-100 p-6 justify-between"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      {renderCardBack(member)}
                    </motion.div>
                  </motion.div>
                </div>
              );
            }}
          />
        </div>
      </div>
    </Section>
  );
}
