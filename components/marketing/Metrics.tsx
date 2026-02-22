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

interface MetricsDict {
  headline: string;
  tamLabel: string;
  tam: string;
  samLabel: string;
  sam: string;
  somLabel: string;
  som: string;
  sources: string;
}

interface MetricsProps {
  className?: string;
  dict: MetricsDict;
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

export function Metrics({ className, dict }: MetricsProps) {
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
          {/* Mobile Layout: Stacked vertically */}
          <div className="flex flex-col gap-6 lg:hidden">
            {/* Title at top */}
            <motion.h2
              className="whitespace-pre-line px-6 pt-6 text-2xl font-bold leading-tight text-[#FFD700] font-barlow-condensed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {dict.headline.split('0.001%')[0]}
              <span className="text-[#ffffff]">0.001%</span>
              {dict.headline.split('0.001%')[1]}
            </motion.h2>

            {/* Map in middle */}
            <div className="relative aspect-square w-full pl-[10%]">
              <Image
                alt="World map showing market coverage"
                className="h-full w-full object-cover"
                height={800}
                src="/images/metrics.png"
                width={800}
              />

              {/* Animated Circles */}
              {MARKET_CIRCLES.map((circle) => {
                const normalizedValue = circle.value / MAX_VALUE;
                const duration = 0.5 + normalizedValue * 1.5;
                // 60% smaller on mobile = 40% of original size
                const mobileSize = circle.size * 0.7;
                // Adjust position for 10% left padding + 5% more: 15% + (circle.x * 0.9)%
                const adjustedLeft = 15 + circle.x * 0.9;

                return (
                  <motion.div
                    key={circle.id}
                    className="absolute flex items-center justify-center"
                    style={{
                      left: `${adjustedLeft}%`,
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
                        width: `${mobileSize}px`,
                        height: `${mobileSize}px`,
                      }}
                    >
                      <div className="absolute h-full w-full rounded-full bg-[#FFD700]" />
                      <span
                        className="relative z-10 font-barlow-condensed font-bold text-[#0a1a2e]"
                        style={{ fontSize: `${mobileSize * 0.25}px` }}
                      >
                        {circle.label}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Market sizes at bottom */}
            <motion.div
              className="px-6 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-2">
                <p className="font-barlow-condensed text-xl font-extrabold text-[#FFD700] tracking-wide">
                  {dict.tamLabel}{' '}
                  <span className="font-normal text-[#ffffff]">{dict.tam}</span>
                </p>
                <p className="font-barlow-condensed text-xl font-extrabold text-[#FFD700] tracking-wide">
                  {dict.samLabel}{' '}
                  <span className="font-normal text-[#ffffff]">{dict.sam}</span>
                </p>
                <p className="font-barlow-condensed text-xl font-extrabold text-[#FFD700] tracking-wide">
                  {dict.somLabel}{' '}
                  <span className="font-normal text-[#ffffff]">{dict.som}</span>
                </p>
              </div>
            </motion.div>

            {/* Sources at very bottom */}
            <motion.div
              className="px-6 pb-6 text-xs text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="leading-relaxed">{dict.sources}</p>
            </motion.div>
          </div>

          {/* Desktop Layout: Side by side */}
          <div className="hidden gap-8 xl:gap-12 2xl:gap-16 lg:grid lg:grid-cols-2">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-between p-8 lg:p-12 xl:p-16 2xl:p-20">
              <motion.h2
                className="mb-8 whitespace-pre-line text-3xl font-bold leading-tight text-[#FFD700] font-barlow-condensed lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {dict.headline.split('0.001%')[0]}
                <span className="text-[#ffffff]">0.001%</span>
                {dict.headline.split('0.001%')[1]}
              </motion.h2>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="space-y-2 xl:space-y-3 2xl:space-y-4">
                  <p className="font-barlow-condensed text-3xl font-extrabold text-[#FFD700] tracking-wide">
                    {dict.tamLabel}{' '}
                    <span className="font-normal text-[#ffffff]">{dict.tam}</span>
                  </p>
                  <p className="font-barlow-condensed text-3xl font-extrabold text-[#FFD700] tracking-wide">
                    {dict.samLabel}{' '}
                    <span className="font-normal text-[#ffffff]">{dict.sam}</span>
                  </p>
                  <p className="font-barlow-condensed text-3xl font-extrabold text-[#FFD700] tracking-wide">
                    {dict.somLabel}{' '}
                    <span className="font-normal text-[#ffffff]">{dict.som}</span>
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="mt-8 xl:mt-10 2xl:mt-12 text-xs text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="leading-relaxed">{dict.sources}</p>
              </motion.div>
            </div>

            {/* Right Side - Map with Animated Circles */}
            <div className="relative aspect-square w-full pl-[10%] lg:aspect-auto lg:h-full">
              <Image
                alt="World map showing market coverage"
                className="h-full w-full object-cover"
                height={800}
                src="/images/metrics.png"
                width={800}
              />

              {/* Animated Circles */}
              {MARKET_CIRCLES.map((circle) => {
                const normalizedValue = circle.value / MAX_VALUE;
                const duration = 0.5 + normalizedValue * 1.5;
                // Adjust position for 10% left padding + 5% more: 15% + (circle.x * 0.9)%
                const adjustedLeft = 15 + circle.x * 0.9;

                return (
                  <motion.div
                    key={circle.id}
                    className="absolute flex items-center justify-center"
                    style={{
                      left: `${adjustedLeft}%`,
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
