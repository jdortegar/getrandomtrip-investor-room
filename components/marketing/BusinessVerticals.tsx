'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Section } from './Section';
import { MobileCarousel } from './MobileCarousel';

interface BusinessModelCard {
  id: number;
  title: string;
  description: string[];
  imageUrl?: string;
}

interface BusinessVerticalsProps {
  className?: string;
}

const BUSINESS_MODELS: BusinessModelCard[] = [
  {
    id: 1,
    title: 'BY TRAVELLER',
    description: [
      'Descubre experiencias',
      'auténticas creadas',
      'por viajeros reales.',
    ],
    imageUrl: '/images/business-1.png',
  },
  {
    id: 2,
    title: 'BY TRIPPER',
    description: [
      'Explora perfiles',
      'de viajeros expertos',
      'que curan experiencias',
      'auténticas y memorables',
    ],
    imageUrl: '/images/business-1.png',
  },
  {
    id: 3,
    title: 'ROADTRIPS',
    description: [
      'Planifica roadtrips épicos',
      'con rutas cuidadosamente',
      'seleccionadas.',
    ],
    imageUrl: '/images/business-3.png',
  },
  {
    id: 4,
    title: 'TRIPPERS DECODE',
    description: [
      'Decodifica los mejores',
      'destinos con insights',
      'de viajeros expertos.',
    ],
    imageUrl: '/images/business-4.png',
  },
  {
    id: 5,
    title: 'SUNDAYS\nRANDOMTRIP XSED',
    description: [
      'Experiencias exclusivas',
      'diseñadas para domingos',
      'especiales.',
    ],
    imageUrl: '/images/business-5.png',
  },
];

function renderCardContent(card: BusinessModelCard, showBack: boolean) {
  if (showBack) {
    return (
      <div className="relative h-full w-full rounded-2xl overflow-hidden flex flex-col items-start justify-between p-6 aspect-square bg-[#FFD700]">
        <div className="self-end">
          <img
            src="/assets/logos/logo_random_white.svg"
            alt="Randomtrip"
            className="w-16 h-16 opacity-80"
          />
        </div>
        <div>
          <p className="font-barlow-condensed text-lg font-semibold leading-tight text-[#0F2D37] mb-0">
            —
          </p>
          {card.description.map((line, idx) => (
            <p
              key={idx}
              className="font-barlow-condensed text-lg leading-tight text-[#0F2D37] font-semibold uppercase"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden">
      <div
        className="h-full w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${card.imageUrl})`,
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 xl:p-6 2xl:p-8 text-white">
        <h3 className="font-barlow-condensed text-3xl font-semibold uppercase tracking-wide w-full text-center whitespace-pre-line leading-tight">
          {card.title}
        </h3>
      </div>
    </div>
  );
}

export function BusinessVerticals({ className }: BusinessVerticalsProps) {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [mobileFlippedCard, setMobileFlippedCard] = useState<number | null>(
    null,
  );

  const handleMobileCardFlip = (cardId: number) => {
    setMobileFlippedCard((prev) => (prev === cardId ? null : cardId));
  };

  return (
    <Section
      className={className}
      noContainerPadding
    >
      <h3
        className="font-barlow-condensed font-semibold text-[#0F2D37] px-4 md:px-8 xl:px-12 2xl:px-16 mb-6"
        style={{ fontSize: '28px', lineHeight: '100%' }}
      >
        Puntos de partida
      </h3>
      {/* Desktop: Grid with Flip Cards */}
      <div className="hidden px-8 xl:px-12 2xl:px-16 md:grid md:grid-cols-5 md:gap-4 xl:gap-6 2xl:gap-8">
        {BUSINESS_MODELS.map((card, index) => {
          const isFlipped = flippedCard === card.id;

          return (
            <motion.div
              key={card.id}
              className="relative aspect-square"
              initial={{ opacity: 0, y: 30 }}
              style={{ perspective: '1000px' }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
              }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              onHoverEnd={() => setFlippedCard(null)}
              onHoverStart={() => setFlippedCard(card.id)}
            >
              <motion.div
                animate={{
                  rotateY: isFlipped ? 180 : 0,
                }}
                className="relative h-full w-full"
                style={{ transformStyle: 'preserve-3d' }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut',
                }}
              >
                {/* Front of Card */}
                <motion.div
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {renderCardContent(card, false)}
                </motion.div>

                {/* Back of Card */}
                <motion.div
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {renderCardContent(card, true)}
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: Carousel with Flip Cards */}
      <div className="block md:hidden">
        <MobileCarousel
          itemClassName="h-auto aspect-square"
          items={BUSINESS_MODELS}
          renderItem={(card) => {
            const isFlipped = mobileFlippedCard === card.id;

            return (
              <div
                className="relative h-full w-full"
                onClick={() => handleMobileCardFlip(card.id)}
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                  }}
                  className="relative h-full w-full"
                  style={{ transformStyle: 'preserve-3d' }}
                  transition={{
                    duration: 0.6,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Front of Card */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {renderCardContent(card, false)}
                  </motion.div>

                  {/* Back of Card */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    {renderCardContent(card, true)}
                  </motion.div>
                </motion.div>
              </div>
            );
          }}
        />
      </div>
    </Section>
  );
}
