'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export function Paragraph({
  children,
  className,
  innerClassName,
}: ParagraphProps) {
  return (
    <div className={cn('px-4 md:px-8 xl:px-12 2xl:px-16', className)}>
      <motion.h2
        className="mx-auto mb-12 xl:mb-16 2xl:mb-20 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl text-center font-barlow-condensed text-[28px] md:text-[25px] uppercase tracking-wide text-foreground"
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
    </div>
  );
}
