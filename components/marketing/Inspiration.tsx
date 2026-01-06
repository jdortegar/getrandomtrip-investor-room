'use client';

import { motion } from 'framer-motion';
import { BookMeetingButton } from './BookMeetingButton';
import { cn } from '@/lib/utils';
import { Section } from './Section';

interface InspirationProps {
  className?: string;
}

export function Inspiration({ className }: InspirationProps) {
  return (
    <Section className={cn('relative w-full overflow-hidden', className)}>
      <motion.div
        className="relative min-h-[500px] overflow-hidden rounded-3xl md:min-h-[700px]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 hover:scale-105"
          style={{
            backgroundImage: 'url("/images/inspiration.png")',
          }}
        />

        {/* Dark Overlay - Stronger on mobile for better text readability */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/30" />

        {/* Content Overlay */}
        <div className="relative flex h-full min-h-[500px] flex-col items-center justify-center text-center px-4 py-12 md:min-h-[650px] md:justify-start md:p-40">
          <motion.div
            className="max-w-4xl space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Text */}
            <h2 className="font-barlow-condensed text-xl uppercase tracking-wide text-[#FED700] md:text-4xl leading-tight font-semibold mb-8 md:mb-20">
              SI TE INSPIRA LO QUE VISTE,
              <br /> SUMATE AL TRIPPER FOUNDERS CIRCLE
            </h2>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button className="px-6 py-3 rounded-md border border-[#FED700] bg-transparent font-barlow-condensed text-sm font-semibold uppercase tracking-wide text-white transition-all hover:bg-black/60 hover:scale-105 md:px-8 md:py-4 md:text-lg">
                AGENDA TU VIDEOLLAMADA
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
