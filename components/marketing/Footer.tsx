'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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
      <div className="container flex flex-col gap-6 items-center mx-auto px-4 py-8 md:gap-8 md:py-12 xl:gap-10 xl:py-16 2xl:gap-12 2xl:py-20">
        {/* Main Text */}
        <motion.p
          className="font-barlow font-semibold text-base text-foreground leading-none md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {dict.tagline}
        </motion.p>

        {/* Visit Button */}
        <motion.button
          className={cn(
            'bg-[#FED700] font-barlow-condensed font-semibold px-6 py-3 rounded-lg text-black text-lg tracking-wide transition-all uppercase',
            'hover:bg-[#FED700]/90 hover:scale-105',
            'md:px-8 md:py-4 md:text-2xl',
          )}
          onClick={handleVisitClick}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {dict.visitButton}
        </motion.button>

        {/* Logo and Branding */}
        <motion.div
          className="flex flex-col items-center gap-3 mt-2 md:gap-4 md:mt-4 xl:gap-6 xl:mt-6 2xl:gap-8 2xl:mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Logo */}
          <div className="relative h-20 w-auto md:h-32">
            <Image
              alt="RandomTrip Logo"
              className="object-contain"
              height={128}
              src="/assets/logos/logo-getrandomtrip-black.png"
              width={256}
            />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
