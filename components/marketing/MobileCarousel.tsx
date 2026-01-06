'use client';

import { useMemo, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MobileCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  itemClassName?: string;
}

export function MobileCarousel<T>({
  items,
  renderItem,
  className = '',
  itemClassName = '',
}: MobileCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      handlePrev();
    } else if (info.offset.x < -threshold) {
      handleNext();
    }
  };

  const translateX = useMemo(() => {
    if (currentIndex === 0) return '0%';
    // Calculate: 90% per slide + 1rem gap per slide (except first)
    return `calc(-${currentIndex * 90}% - ${currentIndex * 1}rem)`;
  }, [currentIndex]);

  return (
    <div className={cn('relative w-full overflow-hidden pl-4', className)}>
      <motion.div
        animate={{
          x: translateX,
        }}
        className="flex gap-4"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        initial={false}
        onDragEnd={handleDragEnd}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        {items.map((item, index) => (
          <div
            className={cn('w-[90%] shrink-0', itemClassName)}
            key={index}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
