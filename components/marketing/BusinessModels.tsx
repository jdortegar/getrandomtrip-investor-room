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
    channel: 'Motor 1 – (B2C)',
    name: 'Escapadas\nsorpresa',
    description: 'Viajes sorpresa diseñados y vendidos directamente al viajero.\nMotor de volumen, adquisición y aprendizaje del sistema.',
    margin: '22-30%',
    marginLabel: 'MARGEN ESTIMADO',
    imageUrl: '/images/business-model-1.png',
  },
  {
    id: 2,
    channel: 'Motor 2 – B2B (Cashflow & escala)',
    name: 'Corporate & Gift\nExperiences',
    description: 'Experiencias diseñadas para empresas, regalos y equipos.\nVenta anticipada, menor CAC y tickets más altos.',
    margin: '22-30%',
    marginLabel: 'MARGEN ESTIMADO',
    backgroundColor: '#3B4A3F',
    imageUrl: '/corporate_img.png',
  },
  {
    id: 3,
    channel: 'Motor 3 – COMUNIDAD TRIPPER',
    name: 'Signature Routes\n(IP)',
    description: 'Rutas diseñadas junto a trippers y creadores. Experiencias únicas,\nrepetibles y difíciles de copiar.',
    margin: '22-30%',
    marginLabel: 'MARGEN ESTIMADO',
    backgroundColor: '#3B4A3F',
    imageUrl: '/signature_img.png',
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
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
        animate={{
          opacity: shouldShowImage ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Content Overlay */}
      <div className={`absolute inset-0 text-white flex flex-col justify-between ${isMobile ? 'p-4' : 'p-6'}`}>
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
            className="font-barlow-condensed font-bold whitespace-pre-line text-[#FED700] mb-3"
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
            transition={{ duration: 0.4, delay: 0.2 }}
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
                <span
                  className={`font-barlow-condensed font-semibold uppercase tracking-wide opacity-80 ${
                    isMobile ? 'text-[10px] mb-0' : 'text-sm mb-1'
                  }`}
                >
                  {card.marginLabel}
                </span>
                <p
                  className={`font-barlow-condensed font-extrabold uppercase ${
                    isMobile ? '' : 'tracking-wide text-6xl'
                  }`}
                  style={isMobile ? { fontSize: '38.32px', lineHeight: '100%' } : undefined}
                >
                  {card.margin}
                </p>
              </div>
            )}
          </motion.div>
        )}
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
    <Section className={className}>
      {/* Section Header */}
      <motion.div
        className="mb-6 text-center xl:mb-8 2xl:mb-10"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h4
          className="font-semibold uppercase text-foreground mb-2"
          style={{ fontSize: '15px', lineHeight: '18px', letterSpacing: '10px' }}
        >
          Modelo de negocio
        </h4>
        <h2
          className="font-barlow-condensed font-bold text-foreground text-center"
          style={{ fontSize: '28px', lineHeight: '102%' }}
        >
          Tres motores de ingresos.
          <br />
          Un solo sistema.
        </h2>
      </motion.div>

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

      {/* Mobile: Vertical Stack - Always show all content */}
      <div className="block space-y-6 md:hidden">
        {BUSINESS_MODELS.map((card, index) => (
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
            {renderCardContent(card, true, true, true)}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
