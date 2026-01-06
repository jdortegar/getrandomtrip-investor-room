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
  backgroundColor?: string;
}

interface BusinessModelsProps {
  className?: string;
}

const BUSINESS_MODELS: BusinessModelCard[] = [
  {
    id: 1,
    channel: 'CANAL',
    name: 'B2C',
    description: 'VIAJES SORPRESA',
    descriptionLabel: 'DESCRIPCIÓN',
    margin: '22-30%',
    marginLabel: 'MARGEN ESTIMADO',
    imageUrl: '/images/business-model-1.png', // TODO: Replace with actual image
  },
  {
    id: 2,
    channel: 'CANAL',
    name: 'B2B',
    backgroundColor: '#626B2F', // Dark olive green
    imageUrl: '/images/business-model-1.png', // TODO: Replace with actual image
  },
  {
    id: 3,
    channel: 'CANAL',
    name: 'COMUNIDAD TRIPPER',
    backgroundColor: '#626B2F', // Dark olive green
    imageUrl: '/images/business-model-1.png', // TODO: Replace with actual image
  },
];

function calculateFontSize(name: string, isMobile: boolean = false): number {
  const minSize = isMobile ? 24 : 40;
  const maxSize = isMobile ? 48 : 80;
  const minLength = 2; // Shortest expected name
  const maxLength = 20; // Longest expected name

  // Clamp the length to our expected range
  const clampedLength = Math.max(minLength, Math.min(maxLength, name.length));

  // Calculate size: longer names = smaller font, shorter names = larger font
  // Linear interpolation: size = maxSize - ((length - minLength) / (maxLength - minLength)) * (maxSize - minSize)
  const size =
    maxSize -
    ((clampedLength - minLength) / (maxLength - minLength)) *
      (maxSize - minSize);

  return Math.round(size);
}

function renderCardContent(
  card: BusinessModelCard,
  isHovered: boolean,
  isMobile: boolean = false,
  showDetails: boolean = false,
) {
  const nameFontSize = calculateFontSize(card.name, isMobile);
  const shouldShowDetails = isMobile ? showDetails : isHovered;

  const shouldShowImage = isMobile ? showDetails : isHovered;

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
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
        animate={{
          opacity: shouldShowImage ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Content Overlay */}
      <div className={`absolute inset-0 text-white grid grid-cols-2 p-6`}>
        {/* Left Half - Top Section (Desktop) / Top Section (Mobile) */}
        <div
          className={`flex flex-col ${
            isMobile ? 'justify-start' : 'justify-start'
          }`}
        >
          <span
            className={`font-barlow-condensed font-semibold uppercase tracking-wide opacity-80 mb-1 ${
              isMobile ? 'text-sm' : 'text-base'
            }`}
          >
            {card.channel}
          </span>
          <h3
            className="font-barlow-condensed leading-none font-bold uppercase tracking-wide"
            style={{ fontSize: `${nameFontSize}px` }}
          >
            {card.name}
          </h3>
        </div>

        {/* Right Half - Description and Margin (Desktop) / Bottom Section (Mobile) */}
        <div
          className={`flex flex-col ${
            isMobile ? 'justify-end space-y-3' : 'justify-end space-y-4'
          }`}
        >
          {/* Middle Section - Description */}
          {shouldShowDetails && card.description && (
            <motion.div
              className="flex flex-col items-start justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span
                className={`font-barlow-condensed font-semibold uppercase tracking-wide opacity-80 mb-1 ${
                  isMobile ? 'text-sm' : 'text-base'
                }`}
              >
                {card.descriptionLabel}
              </span>
              <p
                className={`font-barlow-condensed uppercase tracking-wide text-left ${
                  isMobile ? 'text-xl' : 'text-4xl'
                }`}
              >
                {card.description}
              </p>
            </motion.div>
          )}

          {/* Bottom Section - Margin */}
          {shouldShowDetails && card.margin && (
            <motion.div
              className="flex flex-col items-start w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="w-full h-px bg-white/30 mb-4" />
              <span
                className={`font-barlow-condensed font-semibold uppercase tracking-wide opacity-80 mb-1 ${
                  isMobile ? 'text-sm' : 'text-base'
                }`}
              >
                {card.marginLabel}
              </span>
              <p
                className={`font-barlow-condensed uppercase tracking-wide ${
                  isMobile ? 'text-4xl' : 'text-7xl'
                }`}
              >
                {card.margin}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function BusinessModels({ className }: BusinessModelsProps) {
  const [mobileExpandedId, setMobileExpandedId] = useState<number | null>(null);

  const handleMobileCardClick = (cardId: number) => {
    setMobileExpandedId((prev) => (prev === cardId ? null : cardId));
  };

  return (
    <Section
      className={className}
      title="Modelo de negocio"
      description="Nuestros canales de ingresos"
    >
      {/* Desktop: Horizontal Expanding Cards */}
      <div className="hidden md:block">
        <ExpandAnimatedItems
          defaultHoveredId={1}
          expandedWidth="50%"
          collapsedWidth="25%"
          getItemId={(item) => item.id}
          itemClassName="group relative overflow-hidden rounded-2xl h-[400px] cursor-pointer"
          items={BUSINESS_MODELS}
          renderItem={(card, isHovered) => (
            <div className="relative h-full w-full">
              {renderCardContent(card, isHovered, false, false)}
            </div>
          )}
        />
      </div>

      {/* Mobile: Vertical Stack - Green Background, Reveal Content on Tap */}
      <div className="block space-y-4 md:hidden">
        {BUSINESS_MODELS.map((card, index) => {
          const isExpanded = mobileExpandedId === card.id;

          return (
            <motion.div
              key={card.id}
              className="relative overflow-hidden rounded-2xl cursor-pointer h-[300px]"
              initial={{ opacity: 0, y: 20 }}
              transition={{
                delay: index * 0.1,
                duration: 0.4,
              }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              onClick={() => handleMobileCardClick(card.id)}
            >
              {renderCardContent(card, false, true, isExpanded)}
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
