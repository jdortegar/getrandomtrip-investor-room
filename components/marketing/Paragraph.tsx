'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';

interface ParagraphProps {
  children: React.ReactNode;
  innerClassName?: string;
}

export function Paragraph({ children, innerClassName }: ParagraphProps) {
  return (
    <Section>
      <motion.h2
        className="mx-auto max-w-4xl xl:max-w-5xl 2xl:max-w-6xl text-center font-barlow-condensed text-3xl  uppercase tracking-wide text-foreground"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <span
          className={innerClassName}
          dangerouslySetInnerHTML={{ __html: children as string }}
        />
      </motion.h2>
    </Section>
  );
}
