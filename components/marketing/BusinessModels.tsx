'use client';

import { motion } from 'framer-motion';
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

function calculateFontSize(name: string): number {
  const minSize = 40;
  const maxSize = 80;
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

export function BusinessModels({ className }: BusinessModelsProps) {
  return (
    <Section
      className={className}
      title="Modelo de negocio"
      description="Nuestros canales de ingresos"
    >
      <ExpandAnimatedItems
        items={BUSINESS_MODELS}
        defaultHoveredId={1}
        getItemId={(item) => item.id}
        expandedWidth="50%"
        collapsedWidth="25%"
        itemClassName="group relative overflow-hidden rounded-2xl h-[400px] cursor-pointer"
        renderItem={(card, isHovered) => {
          const showDetails = isHovered;
          const nameFontSize = calculateFontSize(card.name);

          return (
            <motion.div
              className="absolute inset-0"
              transition={{ duration: 0.4 }}
            >
              {/* Plain Color Background - shown when not hovered */}
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundColor: card.backgroundColor || '#626B2F',
                }}
                animate={{
                  opacity: isHovered ? 0 : 1,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Image Background - shown when hovered */}
              <motion.div
                className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${card.imageUrl})`,
                }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Content Overlay */}
              <div className="absolute inset-0 grid grid-cols-2 p-6 text-white">
                {/* Left Half - Top Section */}
                <div className="flex flex-col justify-start">
                  <span className="font-barlow-condensed text-base font-semibold uppercase tracking-wide opacity-80 mb-1">
                    {card.channel}
                  </span>
                  <h3
                    className="font-barlow-condensed leading-none font-bold uppercase tracking-wide"
                    style={{ fontSize: `${nameFontSize}px` }}
                  >
                    {card.name}
                  </h3>
                </div>

                {/* Right Half - Description and Margin */}
                <div className="flex flex-col justify-end space-y-4">
                  {/* Middle Section - Description */}
                  {showDetails && card.description && (
                    <motion.div
                      className="flex flex-col items-start justify-end"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <span className="font-barlow-condensed text-base font-semibold uppercase tracking-wide opacity-80 mb-1">
                        {card.descriptionLabel}
                      </span>
                      <p className="font-barlow-condensed text-4xl uppercase tracking-wide text-left">
                        {card.description}
                      </p>
                    </motion.div>
                  )}

                  {/* Bottom Section - Margin */}
                  {showDetails && card.margin && (
                    <motion.div
                      className="flex flex-col items-start w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <div className="w-full h-px bg-white/30 mb-4" />
                      <span className="font-barlow-condensed text-base font-semibold uppercase tracking-wide opacity-80 mb-1">
                        {card.marginLabel}
                      </span>
                      <p className="font-barlow-condensed text-7xl uppercase tracking-wide">
                        {card.margin}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        }}
      />
    </Section>
  );
}
