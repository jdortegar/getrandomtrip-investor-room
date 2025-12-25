'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Section } from './Section';

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
    role: 'CEO & Fundador (Hospitality / Ops)',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    linkedinUrl: 'https://www.linkedin.com/in/santiago-senega/',
  },
  {
    id: 2,
    name: 'RODRIGO<br/>BENITEZ',
    role: '',
    description: '',
  },
  {
    id: 3,
    name: 'DAVID<br/>ORTEGA',
    role: '',
    description: '',
  },
  {
    id: 4,
    name: 'CARLA<br/>VAZQUEZ',
    role: '',
    description: '',
  },
  {
    id: 5,
    name: 'NICOLÁS<br/>ASMAR',
    role: '',
    description: '',
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

export function Team({ className }: TeamProps) {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  return (
    <Section className={className} title="EQUIPO">
      <div className="mx-auto container">
        <div className="grid gap-6 md:grid-cols-5">
          {TEAM_MEMBERS.map((member, index) => {
            const isFlipped = flippedCard === member.id;

            return (
              <motion.div
                key={member.id}
                className="relative h-[400px]"
                style={{ perspective: '1000px' }}
                onHoverStart={() => setFlippedCard(member.id)}
                onHoverEnd={() => setFlippedCard(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="relative h-full w-full"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                  }}
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
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-barlow-condensed font-bold text-4xl text-white tracking-wide uppercase whitespace-normal wrap-break-word">
                          {renderNameWithBreaks(member.name)}
                        </h3>
                      </div>
                    </div>
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
                    {/* Content */}

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
                              className="h-6 w-6"
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
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
