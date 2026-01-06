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
  backgroundColor?: string;
  icon?: React.ReactNode;
}

interface BusinessVerticalsProps {
  className?: string;
}

const BUSINESS_MODELS: BusinessModelCard[] = [
  {
    id: 1,
    title: 'BY TRAVELLER',
    description: [
      'Descubre experiencias auténticas creadas por viajeros reales.',
      'Cada aventura está diseñada por personas que conocen los destinos.',
    ],
    imageUrl: '/images/business-1.png',
  },
  {
    id: 2,
    title: 'Trippers',
    description: [
      'Explora perfiles',
      'de viajeros expertos',
      'que curan experiencias',
      'auténticas y memorables.',
    ],
    imageUrl: '/images/business-2.png',
    backgroundColor: '#FFD700', // Yellow
    icon: (
      <svg
        className="h-12 w-12 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        />
        <circle cx="12" cy="12" r="3" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'ROADTRIPS',
    description: [
      'Planifica roadtrips épicos con rutas cuidadosamente seleccionadas.',
      'Descubre destinos fuera de lo común y vive aventuras inolvidables.',
    ],
    imageUrl: '/images/business-3.png',
  },
  {
    id: 4,
    title: 'TRIPPERS DECODE',
    description: [
      'Decodifica los mejores destinos con insights de viajeros expertos.',
      'Accede a información privilegiada sobre lugares y experiencias.',
    ],
    imageUrl: '/images/business-4.png',
  },
  {
    id: 5,
    title: 'SUNDAYS\nRANDOMTRIP XSED',
    description: [
      'Experiencias exclusivas diseñadas para domingos especiales.',
      'Aventuras únicas que transforman tus fines de semana.',
    ],
    imageUrl: '/images/business-5.png',
    icon: (
      <svg
        className="h-12 w-12 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        />
        <circle cx="12" cy="12" r="3" strokeWidth="2" />
      </svg>
    ),
  },
];

function renderCardContent(card: BusinessModelCard, showBack: boolean) {
  if (showBack) {
    // Back of Card (Yellow background with text)
    return (
      <div
        className="relative h-full w-full rounded-2xl overflow-hidden flex flex-col items-start justify-between p-6 aspect-square"
        style={{
          backgroundColor: card.backgroundColor || '#FFD700',
        }}
      >
        {card.icon && <div className="self-end opacity-20">{card.icon}</div>}
        <div>
          <h3 className="font-barlow-condensed text-lg font-semibold leading-tight uppercase tracking-wide text-foreground whitespace-pre-line">
            -
          </h3>
          {card.description.map((line, idx) => (
            <p
              key={idx}
              className="font-barlow-condensed text-lg leading-tight text-foreground font-semibold uppercase"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // Front of Card (Image with title)
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
      title="Puntos de partida"
      //   description="Descubre nuestras diferentes formas de viajar"
    >
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
