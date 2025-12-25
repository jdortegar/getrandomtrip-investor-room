'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
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
      <div className="container flex flex-col gap-8 items-center mx-auto px-4">
        {/* Main Text */}
        <motion.p
          className="font-barlow font-semibold text-lg text-foreground leading-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          La aventura empieza acá.
        </motion.p>

        {/* Visit Button */}
        <motion.button
          className={cn(
            'bg-[#FED700] font-barlow-condensed font-semibold px-8 py-4 rounded-lg text-black text-2xl tracking-wide transition-all uppercase',
            'hover:bg-[#FED700]/90 hover:scale-105',
          )}
          onClick={handleVisitClick}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          VISITÁ GETRANDOMTRIP.COM
        </motion.button>

        {/* Logo and Branding */}
        <motion.div
          className="flex flex-col items-center gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Logo */}
          <div className="relative h-32 w-auto">
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
