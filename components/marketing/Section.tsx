'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function Section({
  className,
  children,
  title,
  description,
}: SectionProps) {
  return (
    <section className={cn('bg-background py-10', className)}>
      <div className="container mx-auto">
        <div className="mx-auto">
          {/* Header Section */}
          <motion.div
            className="mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-2 font-barlow-condensed text-3xl font-semibold uppercase tracking-wide text-foreground ">
              {title}
            </h3>
            <p className="text-base text-foreground">{description}</p>
          </motion.div>

          {/* Steps Section */}
          {children}
        </div>
      </div>
    </section>
  );
}
