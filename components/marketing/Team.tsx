'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Section } from './Section';
import { MobileCarousel } from './MobileCarousel';

const LINKEDIN_URLS: (string | undefined)[] = [
  'https://www.linkedin.com/in/santiago-senega/',
  undefined,
  undefined,
  undefined,
  undefined,
  'https://www.linkedin.com/in/santiago-senega/',
  undefined,
  undefined,
  undefined,
  undefined,
];

interface TeamMember {
  description: string;
  id: number;
  linkedinUrl?: string;
  name: string;
  role: string;
}

interface TeamDict {
  members: Array<{ description: string; name: string; role: string }>;
  title: string;
}

interface TeamProps {
  className?: string;
  dict: TeamDict;
}

function buildTeamMembers(dict: TeamDict): TeamMember[] {
  return dict.members.slice(0, 10).map((m, i) => ({
    ...m,
    id: i + 1,
    linkedinUrl: LINKEDIN_URLS[i],
  }));
}

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

export function Team({ className, dict }: TeamProps) {
  const members = buildTeamMembers(dict);
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
    <Section className={className} title={dict.title}>
      <div className="container mx-auto">
        {/* Desktop: Carousel with 5 visible slides */}
        <div className="hidden md:block">
          <MobileCarousel
            itemClassName="h-[400px]"
            items={members}
            showDots
            slideWidth="18.5%"
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
                      duration: 0.6,
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
            items={members}
            showDots
            slideWidth="80%"
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
                      duration: 0.6,
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
