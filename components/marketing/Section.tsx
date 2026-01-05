'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionProps {
  className?: string;
  children: React.ReactNode;
  description?: string;
  noContainerPadding?: boolean;
  title?: string;
}

export function Section({
  className,
  children,
  description,
  noContainerPadding = false,
  title,
}: SectionProps) {
  return (
    <section className={cn('bg-background py-10', className)}>
      <div
        className={cn(
          'mx-auto max-w-7xl',
          noContainerPadding ? 'px-0' : 'px-4 md:px-8',
        )}
      >
        <div className="mx-auto">
          {/* Header Section */}
          {title && (
            <motion.div
              className={cn(
                'mb-6 text-center',
                noContainerPadding && 'px-4 md:px-8',
              )}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h3 className="md:mb-2 font-barlow-condensed text-xl md:text-3xl font-semibold uppercase tracking-wide text-foreground ">
                {title}
              </h3>
              {description && (
                <p className="text-sm md:text-base text-foreground">
                  {description}
                </p>
              )}
            </motion.div>
          )}

          {/* Steps Section */}
          {children}
        </div>
      </div>
    </section>
  );
}
