'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Section } from './Section';
import { ExpandAnimatedItems } from './ExpandAnimatedItems';

interface BusinessModelCard {
  id: number;
  channel: string;
  name: string;
  description?: string;
  descriptionLabel?: string;
  margin?: string;
  marginLabel?: string;
  imageUrl: string;
  backgroundColor?: string | null;
}

interface BusinessModelsDict {
  title: string;
  headlineHtml: string;
  cards: Array<{
    channel: string;
    name: string;
    description?: string;
    descriptionLabel?: string;
    margin?: string;
    marginLabel?: string;
    imageUrl: string;
    backgroundColor?: string | null;
  }>;
}

interface BusinessModelsProps {
  className?: string;
  dict: BusinessModelsDict;
}

function renderCardContent(
  card: BusinessModelCard,
  isHovered: boolean,
  isMobile: boolean = false,
) {
  const shouldShowDetails = isMobile ? true : isHovered;
  const shouldShowImage = isMobile ? true : isHovered;

  return (
    <motion.div className="absolute inset-0" transition={{ duration: 0.4 }}>
      {/* Plain Color Background - shown when image is not visible */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: card.backgroundColor || '#626B2F',
        }}
        animate={{
          opacity: shouldShowImage ? 0 : 1,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Image Background - shown on desktop when hovered, on mobile when tapped/expanded */}
      <motion.div
        className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${card.imageUrl})`,
        }}
        animate={{
          opacity: shouldShowImage ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"
        animate={{
          opacity: shouldShowImage ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Content Overlay */}
      <div
        className={`absolute inset-0 text-white flex flex-col justify-between ${isMobile ? 'p-3' : 'p-6'}`}
      >
        {/* Top: Channel label + Title */}
        <div>
          <span
            className={`font-barlow-condensed font-semibold tracking-wide opacity-80 block ${
              isMobile ? 'text-sm' : 'text-base mb-1'
            }`}
          >
            {card.channel}
          </span>
          <motion.h3
            className="font-barlow-condensed font-bold whitespace-pre-line text-[#FED700] mb-5"
            animate={
              isMobile
                ? { fontSize: '32.58px', lineHeight: '29.7px' }
                : {
                    fontSize: shouldShowDetails ? '68px' : '39px',
                    lineHeight: shouldShowDetails ? '62px' : '40px',
                  }
            }
            transition={{ duration: 0.4 }}
          >
            {card.name}
          </motion.h3>
        </div>

        {/* Bottom: Description (left) + Margin (right) */}
        {shouldShowDetails && (card.description || card.margin) && (
          <motion.div
            className="flex justify-between items-end gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            {/* Description - bottom left */}
            {card.description && (
              <p
                className={`font-barlow text-white/80 text-left max-w-[55%] font-normal whitespace-pre-line ${
                  isMobile ? '' : ''
                }`}
                style={
                  isMobile
                    ? { fontSize: '12px', lineHeight: '14px' }
                    : { fontSize: '18px', lineHeight: '25px' }
                }
              >
                {card.description}
              </p>
            )}

            {/* Margin - bottom right */}
            {card.margin && (
              <div className="flex flex-col items-start text-right">
                <motion.span
                  className={`font-barlow-condensed font-semibold uppercase tracking-wide opacity-80 ${
                    isMobile ? 'text-[10px] mb-0' : 'text-sm mb-1'
                  }`}
                  initial={isMobile ? undefined : { opacity: 0, y: 10 }}
                  animate={isMobile ? undefined : { opacity: 0.8, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.55 }}
                >
                  {card.marginLabel}
                </motion.span>
                <motion.p
                  className={`font-barlow-condensed font-extrabold uppercase ${
                    isMobile ? '' : 'tracking-wide text-6xl'
                  }`}
                  style={
                    isMobile
                      ? { fontSize: '38.32px', lineHeight: '100%' }
                      : undefined
                  }
                  initial={isMobile ? undefined : { opacity: 0, y: 8 }}
                  animate={isMobile ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
                >
                  {card.margin}
                </motion.p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function BusinessModels({ className, dict }: BusinessModelsProps) {
  const cards: BusinessModelCard[] = dict.cards.map((card, i) => ({
    ...card,
    id: i + 1,
  }));

  return (
    <Section className={className}>
      {/* Section Header */}
      <motion.div
        className="mb-6 text-center xl:mb-8 2xl:mb-10"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h4 className="mb-2 font-semibold uppercase tracking-[10px] text-foreground text-base leading-tight">
          {dict.title}
        </h4>
        <h2
          className="font-barlow-condensed font-bold text-foreground text-center md:text-5xl text-3xl leading-tight"
          dangerouslySetInnerHTML={{
            __html: dict.headlineHtml,
          }}
        />
      </motion.div>

      {/* Desktop: Horizontal Expanding Cards */}
      <div className="hidden md:block">
        <ExpandAnimatedItems
          defaultHoveredId={1}
          getItemId={(item) => item.id}
          itemClassName="group relative overflow-hidden rounded-2xl h-[400px] cursor-pointer"
          items={cards}
          renderItem={(card, isHovered) => (
            <div className="relative h-full w-full">
              {renderCardContent(card, isHovered, false)}
            </div>
          )}
        />
      </div>

      {/* Mobile: Vertical Stack - Always show all content */}
      <div className="block space-y-6 md:hidden">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="relative overflow-hidden rounded-2xl h-[182px]"
            initial={{ opacity: 0, y: 20 }}
            transition={{
              delay: index * 0.1,
              duration: 0.4,
            }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {renderCardContent(card, true, true)}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
