'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from './Section';
import { MobileCarousel } from './MobileCarousel';

interface RoadmapPhase {
  id: number;
  period: string;
  subtitle?: string;
  items: string[];
}

interface RoadmapDict {
  title: string;
  phases: Array<{
    period: string;
    subtitle?: string;
    items: string[];
  }>;
}

interface RoadmapProps {
  className?: string;
  dict: RoadmapDict;
}

function TimelineLine({ isLast = false }: { isLast?: boolean }) {
  return (
    <div className={cn('flex flex-1 items-center', isLast ? 'ml-1' : 'mx-1')}>
      <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#FED700]" />
      <div className="h-[1.5px] flex-1 bg-[#FED700]" />
      {!isLast && (
        <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#FED700]" />
      )}
    </div>
  );
}

interface PhaseHeaderProps {
  isFirst: boolean;
  isLast: boolean;
  period: string;
}

function PhaseHeader({ period, isFirst, isLast }: PhaseHeaderProps) {
  return (
    <div className="flex flex-1 items-end pb-1">
      <h3 className="font-barlow-condensed font-bold uppercase whitespace-nowrap shrink-0 text-[#0F2D37] text-5xl">
        {period}
      </h3>
      {isFirst ? (
        <div className="relative ml-1 flex flex-1 items-center">
          <MapPin
            aria-hidden
            className={cn(
              'absolute bottom-2 text-[#FED700] left-[-13px] size-[29px] md:left-[-7px] md:size-[30px]',
            )}
          />
          <TimelineLine />
        </div>
      ) : (
        <TimelineLine isLast={isLast} />
      )}
    </div>
  );
}

interface PhaseBodyProps {
  phase: RoadmapPhase;
}

function PhaseBody({ phase }: PhaseBodyProps) {
  return (
    <>
      {phase.subtitle && (
        <p
          className={cn(
            'font-barlow-condensed font-bold text-[#0F2D37] mb-3 text-3xl',
          )}
        >
          {phase.subtitle}
        </p>
      )}
      <ul className="space-y-1">
        {phase.items.map((item, i) => (
          <li
            key={i}
            className="font-barlow flex items-start gap-2 font-normal text-[#0F2D37] text-base md:text-lg"
          >
            <span className="size-[5px] shrink-0 rounded-full bg-[#0F2D37] mt-2 md:mt-2.5" />
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export function Roadmap({ className, dict }: RoadmapProps) {
  const phases: RoadmapPhase[] = dict.phases.map((p, i) => ({
    id: i + 1,
    period: p.period,
    subtitle: p.subtitle,
    items: p.items,
  }));

  return (
    <Section className={cn(className, 'overflow-hidden')} noContainerPadding>
      <div className="mx-auto w-full">
        {/* Title */}
        <motion.div
          className="mb-6 text-center px-4 md:px-8 xl:mb-8 2xl:mb-10"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-barlow-condensed font-semibold uppercase tracking-wide text-foreground text-3xl">
            {dict?.title}
          </h3>
        </motion.div>

        {/* Desktop */}
        <div className="hidden md:block">
          {/* Titles + lines row */}
          <div
            className="flex items-end mb-6 pl-8 xl:pl-12 2xl:pl-16"
            style={{ marginLeft: '130px' }}
          >
            {phases.map((phase, index) => (
              <PhaseHeader
                key={phase.id}
                isFirst={index === 0}
                isLast={index === phases.length - 1}
                period={phase.period}
              />
            ))}
          </div>

          {/* Content row */}
          <div
            className="grid grid-cols-3 gap-6 px-8 xl:px-12 2xl:px-16"
            style={{ marginLeft: '130px' }}
          >
            {phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <PhaseBody phase={phase} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile - Slider */}
        <div className="block md:hidden">
          <MobileCarousel
            dotColor="#FED700"
            itemClassName="h-auto"
            className="md:hidden block -mr-4 w-[calc(100%+1rem)] md:mr-0 md:w-full"
            items={phases}
            renderItem={(phase, index) => (
              <div className="px-4">
                <div className="mb-3">
                  <PhaseHeader
                    isLast={true}
                    isFirst={false}
                    period={phase.period}
                  />
                </div>
                <PhaseBody phase={phase} />
              </div>
            )}
            showDots
            slideWidth="100%"
          />
        </div>
      </div>
    </Section>
  );
}
