'use client';

import { motion } from 'framer-motion';
import { useState, ReactNode } from 'react';

interface ExpandAnimatedItemsProps<T> {
  items: T[];
  defaultHoveredId: number | string;
  getItemId: (item: T) => number | string;
  renderItem: (item: T, isHovered: boolean) => ReactNode;
  className?: string;
  itemClassName?: string;
  expandedWidth?: string;
  collapsedWidth?: string;
  gap?: string;
}

export function ExpandAnimatedItems<T>({
  items,
  defaultHoveredId,
  getItemId,
  renderItem,
  className = '',
  itemClassName = '',
  expandedWidth = '50%',
  collapsedWidth = '25%',
  gap = 'gap-4',
}: ExpandAnimatedItemsProps<T>) {
  const [hoveredId, setHoveredId] = useState<number | string>(defaultHoveredId);

  return (
    <div className={`flex ${gap} ${className}`}>
      {items.map((item, index) => {
        const itemId = getItemId(item);
        const isHovered = hoveredId === itemId;

        return (
          <motion.div
            key={itemId}
            className={itemClassName}
            onHoverStart={() => setHoveredId(itemId)}
            onHoverEnd={() => setHoveredId(defaultHoveredId)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            layout
            animate={{
              width: isHovered ? expandedWidth : collapsedWidth,
            }}
            transition={{
              layout: { duration: 0.4, ease: 'easeInOut' },
              width: { duration: 0.4, ease: 'easeInOut' },
              opacity: { duration: 0.6, delay: index * 0.1 },
              y: { duration: 0.6, delay: index * 0.1 },
            }}
          >
            {renderItem(item, isHovered)}
          </motion.div>
        );
      })}
    </div>
  );
}
