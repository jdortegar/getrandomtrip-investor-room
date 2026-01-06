'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/marketing/Section';
import { cn } from '@/lib/utils';

interface SafeProps {
  className?: string;
}

interface FundAllocation {
  label: string;
  percentage: number;
  color: string;
  textColor: string;
  icon: string;
}

const FUND_ALLOCATIONS: FundAllocation[] = [
  {
    label: 'MARKETING & GROWTH',
    percentage: 45,
    color: '#FED700', // Yellow
    textColor: '#1C2B35', // Blue text
    icon: '/assets/svg/marketing.svg',
  },
  {
    label: 'OPERACIONES',
    percentage: 35,
    color: '#6B7E3F', // Olive green
    textColor: '#FED700', // Yellow text
    icon: '/assets/svg/operations.svg',
  },
  {
    label: 'TECH<br/> & PRODUCTO',
    percentage: 20,
    color: '#1C2B35', // Dark blue/teal
    textColor: '#FFFFFF', // White text
    icon: '/assets/svg/tech.svg',
  },
];

function getConicGradient(): string {
  let currentAngle = 0;
  const gradients: string[] = [];

  FUND_ALLOCATIONS.forEach((allocation) => {
    const startAngle = currentAngle;
    const endAngle = currentAngle + (allocation.percentage / 100) * 360;
    gradients.push(`${allocation.color} ${startAngle}deg ${endAngle}deg`);
    currentAngle = endAngle;
  });

  return `conic-gradient(${gradients.join(', ')})`;
}

function calculatePosition(
  startAngle: number,
  percentage: number,
  radius: number,
): { x: number; y: number } {
  const midAngle = startAngle + (percentage / 100) * 180;
  const rad = ((midAngle - 90) * Math.PI) / 180;
  const size = 600;
  const centerX = size / 2;
  const centerY = size / 2;
  const pieRadius = size / 2 - 20;
  const radiusPx = pieRadius * radius;

  return {
    x: centerX + radiusPx * Math.cos(rad),
    y: centerY + radiusPx * Math.sin(rad),
  };
}

function renderLabel(label: string) {
  const parts = label.split('<br/>');
  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

export function Safe({ className }: SafeProps) {
  const conicGradient = getConicGradient();

  return (
    <Section
      className={className}
      description="Ronda Pre-Seed (Friends & Family): USD 100 K bajo SAFE (20 % discount)."
      title="USO DE FONDOS & SAFE"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] aspect-square">
          {/* Pie Chart */}
          <motion.div
            className="relative h-full w-full rounded-full border border-white md:border-2"
            style={{
              background: conicGradient,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          >
            {/* Marketing & Growth - 45% */}
            {(() => {
              const allocation = FUND_ALLOCATIONS[0];
              const startAngle = 0;
              const radius = 0.685; // Larger radius for larger slice
              const { x, y } = calculatePosition(
                startAngle,
                allocation.percentage,
                radius,
              );
              const adjustedX = x - 80; // Move 20px to the left
              const adjustedY = y - 80; // Move 20px to the top
              return (
                <motion.div
                  className="absolute flex flex-col items-start"
                  style={{
                    left: `${(adjustedX / 600) * 100}%`,
                    top: `${(adjustedY / 600) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: 'easeOut',
                  }}
                >
                  <div className="mb-1 md:mb-2">
                    <Image
                      alt={allocation.label}
                      className="h-8 w-8 md:h-14 md:w-14"
                      height={60}
                      src={allocation.icon}
                      width={60}
                    />
                  </div>
                  <div
                    className="font-barlow-condensed font-semibold leading-none text-[40px] md:text-[70px]"
                    style={{
                      color: allocation.textColor,
                      letterSpacing: '-2px',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                      WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {allocation.percentage}%
                  </div>
                  <div
                    className="font-barlow-condensed font-semibold leading-none text-base md:text-[28px]"
                    style={{
                      color: allocation.textColor,
                      letterSpacing: '0.5px',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                      WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {renderLabel(allocation.label)}
                  </div>
                </motion.div>
              );
            })()}

            {/* Operaciones - 35% */}
            {(() => {
              const allocation = FUND_ALLOCATIONS[1];
              const startAngle = (FUND_ALLOCATIONS[0].percentage / 100) * 360;
              const radius = 0.655; // Medium radius
              const { x, y } = calculatePosition(
                startAngle,
                allocation.percentage,
                radius,
              );
              const adjustedX = x - 60; // Move 20px to the left
              const adjustedY = y - 50; // Move 20px to the top
              return (
                <motion.div
                  className="absolute flex flex-col items-start"
                  style={{
                    left: `${(adjustedX / 600) * 100}%`,
                    top: `${(adjustedY / 600) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: 'easeOut',
                  }}
                >
                  <div className="flex items-center gap-1 md:gap-2">
                    <div
                      className="font-barlow-condensed font-semibold leading-none text-[40px] md:text-[70px]"
                      style={{
                        color: allocation.textColor,
                        letterSpacing: '-2px',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                        WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {allocation.percentage}%
                    </div>
                    <div>
                      <Image
                        alt={allocation.label}
                        className="h-8 w-8 md:h-14 md:w-14"
                        height={56}
                        src={allocation.icon}
                        width={56}
                      />
                    </div>
                  </div>
                  <div
                    className="font-barlow-condensed font-semibold leading-none text-base md:text-[28px]"
                    style={{
                      color: allocation.textColor,
                      letterSpacing: '0.5px',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                      WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {renderLabel(allocation.label)}
                  </div>
                </motion.div>
              );
            })()}

            {/* Tech & Producto - 20% */}
            {(() => {
              const allocation = FUND_ALLOCATIONS[2];
              const startAngle =
                (FUND_ALLOCATIONS[0].percentage / 100) * 360 +
                (FUND_ALLOCATIONS[1].percentage / 100) * 360;
              const radius = 0.61; // Smaller radius for smaller slice
              const { x, y } = calculatePosition(
                startAngle,
                allocation.percentage,
                radius,
              );

              const adjustedX = x - 110; // Move 5% more to the left
              const adjustedY = y - 50; // Move 20px to the top
              return (
                <motion.div
                  className="absolute flex gap-1 md:gap-2"
                  style={{
                    left: `${(adjustedX / 600) * 100}%`,
                    top: `${(adjustedY / 600) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: 'easeOut',
                  }}
                >
                  <div className="mt-1 md:mt-3">
                    <Image
                      alt={allocation.label}
                      className="h-10 w-10 md:h-16 md:w-16"
                      height={64}
                      src={allocation.icon}
                      width={64}
                    />
                  </div>
                  <div>
                    <div
                      className="font-barlow-condensed font-semibold leading-none text-[28px] md:text-[50px]"
                      style={{
                        color: allocation.textColor,
                        letterSpacing: '-2px',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                        WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {allocation.percentage}%
                    </div>
                    <div
                      className="font-barlow-condensed font-semibold leading-none text-sm md:text-[20px]"
                      style={{
                        color: allocation.textColor,
                        letterSpacing: '0.5px',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                        WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {renderLabel(allocation.label)}
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Center Logo */}
            <motion.div
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 md:w-20 md:h-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: 'easeOut',
              }}
            >
              <Image
                alt="Logo"
                className="h-full w-full"
                height={80}
                src="/assets/svg/logo.svg"
                width={80}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
