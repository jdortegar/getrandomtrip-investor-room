'use client';

import { motion } from 'framer-motion';
import { Hourglass } from 'lucide-react';
import { BookMeetingButton } from './BookMeetingButton';
import { Section } from './Section';

interface ValuePropositionDict {
  title: string;
  titleBold: string;
  description: string;
  descriptionBold: string;
  descriptionBody: string;
  descriptionHtml: string;
  bullets: string[];
  foundingRound: string;
  ctaButton: string;
}

interface ValuePropositionProps {
  dict: ValuePropositionDict;
}

export function ValueProposition({ dict }: ValuePropositionProps) {
  return (
    <Section>
      <div className="mx-auto grid max-w-[1200px] items-center gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 mb-10">
        <motion.div
          className="flex flex-col justify-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="relative w-fit">
            <h2 className="relative z-10 font-barlow-condensed text-3xl font-normal uppercase leading-none text-foreground md:text-4xl">
              <span className="block">{dict.title}</span>
              <span className="block text-5xl font-black md:text-6xl">
                {dict.titleBold}
              </span>
            </h2>
            <Hourglass className="absolute right-0 translate-x-1/2 top-0 ml-2 h-20 w-20 shrink-0 text-[#FFD700] md:top-6" />
          </div>

          <p
            className="font-barlow text-base font-normal tracking-normal text-foreground md:text-lg"
            dangerouslySetInnerHTML={{ __html: dict.descriptionHtml }}
          />
        </motion.div>

        <motion.div
          className="flex flex-col justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <ul className="list-disc list-outside pl-4 font-barlow">
            {dict.bullets.map((bullet, i) => (
              <li
                key={i}
                className="text-base md:text-lg font-normal tracking-normal text-foreground"
              >
                {bullet}
              </li>
            ))}
          </ul>

          <p className="font-barlow text-base md:text-lg font-normal tracking-normal text-foreground text-center md:text-left">
            {dict.foundingRound}
          </p>

          <BookMeetingButton
            variant="feature"
            className="mx-auto md:mr-auto md:ml-0"
          >
            {dict.ctaButton}
          </BookMeetingButton>
        </motion.div>
      </div>
    </Section>
  );
}
