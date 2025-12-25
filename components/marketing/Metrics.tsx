'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section } from './Section';

interface MarketCircle {
  id: string;
  label: string;
  value: number; // Value that determines growth scale and duration
  x: number; // Percentage from left
  y: number; // Percentage from top
  size: number; // Circle size in pixels
}

interface MetricsProps {
  className?: string;
}

const MARKET_CIRCLES: MarketCircle[] = [
  { id: 'us-hisp', label: 'US-HISP', value: 100, x: 3, y: 25, size: 120 },
  { id: 'mx', label: 'MX', value: 85, x: 13, y: 47, size: 80 },
  { id: 'co', label: 'CO', value: 70, x: 42, y: 40, size: 65 },
  { id: 'pe', label: 'PE', value: 60, x: 28, y: 60, size: 60 },
  { id: 'cl', label: 'CL', value: 50, x: 35, y: 82, size: 55 },
  { id: 'ar', label: 'AR', value: 55, x: 60, y: 84, size: 60 },
  { id: 'es', label: 'ES', value: 75, x: 80, y: 18, size: 65 },
];

// Calculate max value for normalization
const MAX_VALUE = Math.max(...MARKET_CIRCLES.map((circle) => circle.value));

export function Metrics({ className }: MetricsProps) {
  return (
    <Section className={className}>
      <div className="relative mx-auto container">
        <div
          className="relative overflow-hidden rounded-2xl bg-[#0F2D37]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        >
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-between p-8 lg:p-12">
              <motion.h2
                className="mb-8 text-3xl font-bold leading-tight text-[#FFD700] lg:text-6xl font-barlow-condensed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                CAPTAR EL <span className="text-[#ffffff]">0.001%</span>
                <br /> DEL MERCADO YA
                <br /> SIGNIFICA TRACCIÓN REAL.
              </motion.h2>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="space-y-2">
                  <p className="font-barlow-condensed text-3xl font-extrabold text-[#FFD700] tracking-wide">
                    TAM:{' '}
                    <span className="text-[#ffffff] font-normal">
                      ≈ USD 500 mil millones
                    </span>
                  </p>
                  <p className="font-barlow-condensed text-3xl font-extrabold text-[#FFD700] tracking-wide">
                    SAM:{' '}
                    <span className="text-[#ffffff] font-normal">
                      ≈ USD 400-450 mil millones
                    </span>
                  </p>
                  <p className="font-barlow-condensed text-3xl font-extrabold text-[#FFD700] tracking-wide">
                    SOM (Año 1):{' '}
                    <span className="text-[#ffffff] font-normal">
                      USD 2.55 millones (≈ 0.0005 % del SAM)
                    </span>
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="mt-8 text-xs text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="leading-relaxed">
                  Fuentes: World Travel & Tourism Council (WTTC, 2024)/ Airbnb -
                  US Hispanic Traveler Report (2024)/ INE España (2023), DATATUR
                  México (2024), Observatorio Turistico Argentina (2024),
                  Mincetur Perú (2024)./ Randomtrip Internal Estimates (2025).
                </p>
              </motion.div>
            </div>

            {/* Right Side - Map with Animated Circles */}
            <div className="relative aspect-square w-full lg:aspect-auto lg:h-full">
              <Image
                alt="World map showing market coverage"
                className="h-full w-full object-cover"
                height={800}
                src="/images/metrics.png"
                width={800}
              />

              {/* Animated Circles */}
              {MARKET_CIRCLES.map((circle) => {
                // Normalize value (0 to 1, where max value = 1)
                const normalizedValue = circle.value / MAX_VALUE;
                // Duration is relative to value (larger values take longer to grow)
                // Base duration of 0.5s, scaled by normalized value (max 2s)
                const duration = 0.5 + normalizedValue * 1.5;

                return (
                  <motion.div
                    key={circle.id}
                    className="absolute flex items-center justify-center"
                    style={{
                      left: `${circle.x}%`,
                      top: `${circle.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <motion.div
                      className="relative flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration,
                        delay: 0,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        width: `${circle.size}px`,
                        height: `${circle.size}px`,
                      }}
                    >
                      <div className="absolute h-full w-full rounded-full bg-[#FFD700]" />
                      <span
                        className="relative z-10 font-barlow-condensed font-bold text-[#0a1a2e]"
                        style={{ fontSize: `${circle.size * 0.25}px` }}
                      >
                        {circle.label}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
