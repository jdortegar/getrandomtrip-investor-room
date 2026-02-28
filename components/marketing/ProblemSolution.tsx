'use client';

import { motion } from 'framer-motion';

import { ProblemsIcon, SolutionIcon, WhyNowIcon } from '@/components/Icons';
import type { MarketingDictionary } from '@/lib/types/dictionary';
import { cn } from '@/lib/utils';
import { Section } from './Section';

/** Same shape as MarketingDictionary.problemSolution */
type ProblemSolutionDict = MarketingDictionary['problemSolution'];

interface ProblemSolutionProps {
  dict: ProblemSolutionDict;
}

interface CardConfig {
  icon: React.ElementType;
  contentHtml: string;
  delay: number;
  id: 'problem' | 'solution' | 'whyNow';
  title: string;
}

function buildCards(dict: ProblemSolutionDict): CardConfig[] {
  return [
    {
      contentHtml: dict.problem.descriptionHtml,
      delay: 0,
      id: 'problem',
      title: dict.problem.title,
      icon: ProblemsIcon,
    },
    {
      contentHtml: dict.solution.descriptionHtml,
      delay: 0.15,
      id: 'solution',
      title: dict.solution.title,
      icon: SolutionIcon,
    },
    {
      contentHtml: dict.whyNow.contentHtml,
      delay: 0.3,
      id: 'whyNow',
      title: dict.whyNow.title,
      icon: WhyNowIcon,
    },
  ];
}

export function ProblemSolution({ dict }: ProblemSolutionProps) {
  const cards = buildCards(dict);

  return (
    <Section>
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-3 md:gap-8 mb-10">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="flex flex-col w-11/12 mr-auto md:w-full mb-10 md:mb-0"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: card.delay }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="relative mb-2 w-fit">
              <h3 className="relative z-10 font-barlow-condensed text-2xl font-semibold uppercase leading-none tracking-normal text-foreground md:text-3xl">
                {card.title}
              </h3>

              <div
                aria-hidden
                className="absolute -right-1/3 -top-full z-0 shrink-0 -translate-y-1/3 size-16 md:size-20"
              >
                <card.icon className="size-full text-[#FED700]" />
              </div>
            </div>
            <p
              className="font-barlow text-base md:text-lg font-normal leading-6 tracking-normal text-foreground [&_strong]:font-extrabold"
              dangerouslySetInnerHTML={{ __html: card.contentHtml }}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
