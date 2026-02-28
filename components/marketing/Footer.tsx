'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FooterDict {
  tagline: string;
  visitButton: string;
}

interface FooterProps {
  className?: string;
  dict: FooterDict;
  locale?: string;
}

export function Footer({ className, dict }: FooterProps) {
  const handleVisitClick = () => {
    window.open('https://getrandomtrip.com', '_blank');
  };

  return (
    <footer
      className={cn(
        'bg-background flex flex-col items-center justify-center text-center',
        className,
      )}
    >
      <div className="flex flex-col gap-4 items-center mx-auto px-4 py-1 md:gap-5 md:py-1">
        {/* Main Text */}
        <motion.p
          className="font-barlow font-semibold text-foreground leading-none text-base md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {dict.tagline}
        </motion.p>

        {/* Visit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Button
            className="rounded-lg px-6 py-3 text-base uppercase tracking-wide md:text-lg"
            onClick={handleVisitClick}
            size="lg"
            variant="feature"
          >
            {dict.visitButton}
          </Button>
        </motion.div>

        {/* Logo and Branding */}
        <motion.div
          className="flex flex-col items-center mt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Image
            alt="RandomTrip Logo"
            className="object-contain"
            height={60}
            src="/assets/logos/logo-getrandomtrip-black.png"
            width={200}
          />
        </motion.div>
      </div>
    </footer>
  );
}
