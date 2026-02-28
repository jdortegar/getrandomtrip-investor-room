'use client';

import { CalendarSearch } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { BookMeetingButton } from './BookMeetingButton';

const SCROLL_THRESHOLD_PX = 80;

interface FixedBookMeetingButtonProps {
  className?: string;
  /** Button label (e.g. "Agenda 30 min" or "Agenda 30 min con founders") */
  label: string;
}

/**
 * BookMeetingButton fixed to the right side, vertically centered.
 * Stays visible while scrolling (follows the user).
 * Animates in with a short delay after the user scrolls past the threshold.
 */
export function FixedBookMeetingButton({
  className,
  label,
}: FixedBookMeetingButtonProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= SCROLL_THRESHOLD_PX) setShouldAnimate(true);
    };
    if (window.scrollY >= SCROLL_THRESHOLD_PX) setShouldAnimate(true);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
      className={cn(
        'fixed top-1/2 z-50 -translate-y-1/2 right-0 cursor-pointer',
        className,
      )}
      initial={false}
      transition={{
        delay: shouldAnimate ? 0.25 : 0,
        duration: 0.35,
        ease: 'easeOut',
      }}
    >
      <BookMeetingButton
        className="shadow-lg w-[80px] cursor-pointer p-1 h-auto!"
        label={label}
        size="lg"
        variant="feature"
      >
        <span className="flex flex-col items-center gap-1">
          <CalendarSearch aria-hidden className="size-10 shrink-0 text-black" />
          <span className="font-barlow-condensed text-center text-[12px] font-semibold leading-tight text-black text-wrap">
            {label}
          </span>
        </span>
      </BookMeetingButton>
    </motion.div>
  );
}
