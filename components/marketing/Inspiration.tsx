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
        className="relative min-h-[600px] overflow-hidden rounded-3xl md:min-h-[700px]"
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

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content Overlay */}
        <div className="relative flex h-full min-h-[650px] flex-col items-center justify-start text-center p-40">
          <motion.div
            className="max-w-4xl space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Text */}
            <h2 className="font-barlow-condensed text-2xl uppercase tracking-wide text-[#FED700] md:text-4xl leading-none font-semibold mb-20">
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
              <button className="px-8 py-4 rounded-md border border-[#FED700] bg-transparent font-barlow-condensed text-lg font-semibold uppercase tracking-wide text-white transition-all hover:bg-black/60 hover:scale-105">
                AGENDA TU VIDEOLLAMADA
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
