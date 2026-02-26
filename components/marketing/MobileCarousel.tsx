'use client';

import { useMemo, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MobileCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  slideWidth?: string;
  showDots?: boolean;
  dotColor?: string;
}

export function MobileCarousel<T>({
  items,
  renderItem,
  className = '',
  itemClassName = '',
  slideWidth = '90%',
  showDots = false,
  dotColor,
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
    if (currentIndex === 0) return '0px';
    const isPx = slideWidth.endsWith('px');
    if (isPx) {
      const widthPx = parseFloat(slideWidth);
      return `calc(-${currentIndex * widthPx}px - ${currentIndex * 16}px)`;
    }
    const widthPercent = parseFloat(slideWidth);
    return `calc(-${currentIndex * widthPercent}% - ${currentIndex * 16}px)`;
  }, [currentIndex, slideWidth]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative overflow-hidden">
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
              className={cn('shrink-0', itemClassName)}
              key={index}
              style={{ width: slideWidth }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots Indicator */}
      {showDots && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {items.map((_, index) => {
            const isActive = currentIndex === index;

            return (
              <button
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  !dotColor && (isActive ? 'w-8 bg-foreground' : 'w-2 bg-foreground/30'),
                  dotColor && (isActive ? 'w-8' : 'w-2'),
                )}
                key={index}
                onClick={() => handleDotClick(index)}
                style={dotColor ? { backgroundColor: isActive ? dotColor : `${dotColor}40` } : undefined}
                type="button"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
