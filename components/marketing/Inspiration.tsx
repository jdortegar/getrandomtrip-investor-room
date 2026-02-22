'use client';

import { motion } from 'framer-motion';
import { BookMeetingButton } from './BookMeetingButton';
import { cn } from '@/lib/utils';
import { Section } from './Section';

interface InspirationDict {
  ctaButton: string;
  headline: string;
}

interface InspirationProps {
  className?: string;
  dict: InspirationDict;
}

export function Inspiration({ className, dict }: InspirationProps) {
  return (
    <Section className={cn('relative w-full overflow-hidden', className)}>
      <motion.div
        className="relative min-h-[500px] overflow-hidden rounded-3xl md:min-h-[700px]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 hover:scale-105"
          style={{
            backgroundImage: 'url("/images/inspiration.png")',
          }}
        />

        <div className="absolute inset-0 bg-black/40 md:bg-black/30" />

        <div className="relative flex h-full min-h-[500px] flex-col items-center justify-center px-4 py-12 text-center md:min-h-[650px] md:justify-start md:p-40 xl:p-52 2xl:p-64">
          <motion.div
            className="max-w-4xl space-y-6 xl:max-w-5xl xl:space-y-10 2xl:max-w-6xl 2xl:space-y-12 md:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="mb-8 whitespace-pre-line font-barlow-condensed text-xl font-semibold uppercase leading-tight tracking-wide text-[#FED700] md:mb-20 md:text-4xl">
              {dict.headline}
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <BookMeetingButton
                className="rounded-md border border-[#FED700] bg-transparent px-6 py-3 font-barlow-condensed text-sm font-semibold uppercase tracking-wide text-white transition-all hover:scale-105 hover:bg-black/60 md:px-8 md:py-4 md:text-lg"
                size="lg"
                variant="secondary"
              >
                {dict.ctaButton}
              </BookMeetingButton>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
