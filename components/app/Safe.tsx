'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/marketing/Section';

interface SafeDict {
  title: string;
  description: string;
  marketingLabel: string;
  operationsLabel: string;
  techLabel: string;
  marketingItems: string[];
  operationsItems: string[];
  techItems: string[];
}

interface SafeProps {
  className?: string;
  dict: SafeDict;
}

const DEFAULT_FUND_DETAILS = {
  marketing: ['Creators', 'Growth loops', 'Pilotos de adquisición'],
  operaciones: ['Supply', 'QA', 'Operación de rutas', 'Playbooks'],
  tech: ['Producto', 'Automatizaciones,', 'Experiencia usuario.'],
};

// Pie chart config
const PIE_SIZE = 500;
const PIE_CENTER = PIE_SIZE / 2;
const MAX_RADIUS = PIE_SIZE / 2 - 10;

interface SliceData {
  percentage: number;
  color: string;
  radius: number; // Factor 0-1 of MAX_RADIUS
}

interface Slice extends SliceData {
  startAngle: number;
  endAngle: number;
}

const SLICE_DATA: SliceData[] = [
  { percentage: 45, color: '#FED700', radius: 1.0 }, // 45% - full radius
  { percentage: 35, color: '#626B2F', radius: 0.92 }, // 35% - slightly less
  { percentage: 20, color: '#172C36', radius: 0.82 }, // 20% - smallest
];

function getSlices(): Slice[] {
  let currentAngle = -90; // Start from top
  return SLICE_DATA.map((d) => {
    const startAngle = currentAngle;
    const endAngle = currentAngle + (d.percentage / 100) * 360;
    currentAngle = endAngle;
    return { ...d, startAngle, endAngle };
  });
}

function polarToCartesian(
  angle: number,
  radius: number,
): { x: number; y: number } {
  const rad = (angle * Math.PI) / 180;
  return {
    x: PIE_CENTER + radius * Math.cos(rad),
    y: PIE_CENTER + radius * Math.sin(rad),
  };
}

function getSlicePath(slice: Slice): string {
  const r = MAX_RADIUS * slice.radius;
  const start = polarToCartesian(slice.startAngle, r);
  const end = polarToCartesian(slice.endAngle, r);
  const largeArc = slice.endAngle - slice.startAngle > 180 ? 1 : 0;
  return [
    `M ${PIE_CENTER} ${PIE_CENTER}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
}

export function Safe({ className, dict }: SafeProps) {
  const slices = getSlices();
  const fundDetails = {
    marketing: dict?.marketingItems || DEFAULT_FUND_DETAILS.marketing,
    operaciones: dict?.operationsItems || DEFAULT_FUND_DETAILS.operaciones,
    tech: dict?.techItems || DEFAULT_FUND_DETAILS.tech,
  };

  return (
    <Section
      className={className}
      description={dict.description}
      title={dict.title}
    >
      <div className="flex flex-col items-center overflow-visible mt-[95px] md:mt-0">
        <div className="relative w-full max-w-[500px] md:max-w-[550px] xl:max-w-[600px] 2xl:max-w-[650px] mx-auto overflow-visible">
          {/* Pie Chart SVG */}
          <div className="relative w-full" style={{ paddingTop: '100%' }}>
            <svg
              viewBox={`0 0 ${PIE_SIZE} ${PIE_SIZE}`}
              className="absolute inset-0 w-full h-full"
            >
              {/* Pie slices with animation */}
              {slices.map((slice, i) => (
                <motion.path
                  key={i}
                  d={getSlicePath(slice)}
                  fill={slice.color}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.2,
                    ease: 'easeOut',
                  }}
                  style={{ transformOrigin: `${PIE_CENTER}px ${PIE_CENTER}px` }}
                />
              ))}

              {/* Border circle */}
              <motion.circle
                cx={PIE_CENTER}
                cy={PIE_CENTER}
                r={MAX_RADIUS}
                fill="none"
                stroke="white"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
              />
            </svg>

            {/* Labels inside pie - 45% Marketing & Growth (right sector, center ~40deg) */}
            <motion.div
              className="absolute flex flex-col items-center"
              style={{ top: '29%', left: '62%' }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="mb-1 md:mb-2">
                <Image
                  alt="Marketing & Growth"
                  className="h-10 w-10 md:h-16 md:w-16"
                  height={64}
                  src="/assets/svg/marketing.svg"
                  width={64}
                />
              </div>
              <div
                className="font-barlow-condensed font-semibold leading-none text-[46px] md:text-[80px]"
                style={{ color: '#1C2B35', letterSpacing: '-2px' }}
              >
                45%
              </div>
              <div
                className="font-barlow-condensed font-semibold leading-tight text-[16px] md:text-[28px] text-center"
                style={{ color: '#1C2B35', letterSpacing: '0.5px' }}
              >
                {(dict?.marketingLabel || 'MARKETING &\nGROWTH')
                  .split('\n')
                  .map((l, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {l}
                    </span>
                  ))}
              </div>
            </motion.div>

            {/* Labels inside pie - 35% Operaciones (bottom-left sector, center ~198deg) */}
            <motion.div
              className="absolute flex flex-col items-start"
              style={{ top: '58%', left: '19%' }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="flex items-center gap-1 md:gap-2">
                <div
                  className="font-barlow-condensed font-semibold leading-none text-[46px] md:text-[80px]"
                  style={{ color: '#FED700', letterSpacing: '-2px' }}
                >
                  35%
                </div>
                <Image
                  alt="Operaciones"
                  className="h-10 w-10 md:h-16 md:w-16"
                  height={64}
                  src="/assets/svg/operations.svg"
                  width={64}
                />
              </div>
              <div
                className="font-barlow-condensed font-semibold leading-tight text-[16px] md:text-[28px]"
                style={{ color: '#FED700', letterSpacing: '0.5px' }}
              >
                {dict?.operationsLabel || 'OPERACIONES'}
              </div>
            </motion.div>

            {/* Labels inside pie - 20% Tech & Producto (top-left sector) */}
            <motion.div
              className="absolute flex gap-1 md:gap-2"
              style={{ top: '24%', left: '23%' }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="mt-0.5 md:mt-1.5">
                <Image
                  alt="Tech & Producto"
                  className="h-7 w-7 md:h-14 md:w-14"
                  height={56}
                  src="/assets/svg/tech.svg"
                  width={56}
                />
              </div>
              <div>
                <div
                  className="font-barlow-condensed font-semibold leading-none text-[30px] md:text-[55px]"
                  style={{ color: '#FFFFFF', letterSpacing: '-1.5px' }}
                >
                  20%
                </div>
                <div
                  className="font-barlow-condensed font-semibold leading-tight text-[11px] md:text-[18px]"
                  style={{ color: '#FFFFFF', letterSpacing: '0.3px' }}
                >
                  {(dict?.techLabel || 'TECH &\nPRODUCTO')
                    .split('\n')
                    .map((l, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {l}
                      </span>
                    ))}
                </div>
              </div>
            </motion.div>

            {/* Center Logo */}
            <motion.div
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 md:w-20 md:h-20"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            >
              <Image
                alt="Logo"
                className="h-full w-full"
                height={64}
                src="/assets/svg/logo.svg"
                width={64}
              />
            </motion.div>
          </div>

          {/* ===== MOBILE detail labels ===== */}
          {/* Tech & Producto - left (mobile) */}
          <motion.div
            className="md:hidden absolute"
            style={{ top: '-7%', left: '8%', transform: 'none' }}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <ul className="font-barlow text-[#0F2D37] text-[11px] leading-[16px] whitespace-nowrap">
              {fundDetails.tech.map((item, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="mt-[5px] w-[3px] h-[3px] rounded-full bg-[#0F2D37] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <motion.div
              className="ml-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.0 }}
            >
              <Image
                src="/assets/svg/vector20Mobile.svg"
                alt="Connector"
                width={60}
                height={20}
              />
            </motion.div>
          </motion.div>

          {/* Marketing & Growth - right (mobile) */}
          <motion.div
            className="md:hidden absolute mb-22"
            style={{ top: '-18%', right: '0%', transform: 'none' }}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            <ul className="font-barlow text-[#0F2D37] text-[11px] leading-[16px] whitespace-nowrap">
              {fundDetails.marketing.map((item, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="mt-[5px] w-[3px] h-[3px] rounded-full bg-[#0F2D37] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-1 ml-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.1 }}
            >
              <Image
                src="/assets/svg/vector45_mobile.svg"
                alt="Connector"
                width={6}
                height={56}
                className="w-[6px] h-[56px]"
              />
            </motion.div>
          </motion.div>

          {/* Operaciones - bottom left (mobile) */}
          <motion.div
            className="md:hidden absolute"
            style={{ bottom: '-15%', left: '7%', transform: 'none' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <motion.div
              className="ml-auto mb-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.2 }}
            >
              <Image
                src="/assets/svg/vector35_mobile.svg"
                alt="Connector"
                width={60}
                height={20}
              />
            </motion.div>
            <ul className="font-barlow text-[#0F2D37] text-[11px] leading-[16px] whitespace-nowrap">
              {fundDetails.operaciones.map((item, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="mt-[5px] w-[3px] h-[3px] rounded-full bg-[#0F2D37] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ===== DESKTOP detail labels ===== */}
          {/* Tech & Producto - top left */}
          <motion.div
            className="hidden md:block absolute"
            style={{ top: '12%', left: '-27%' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <div className="flex items-start gap-0">
              <ul className="font-barlow text-[#0F2D37] text-[14px] xl:text-[15px] leading-[20px]">
                {fundDetails.tech.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-[7px] w-[4px] h-[4px] rounded-full bg-[#0F2D37] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <motion.div
                className="shrink-0 ml-1 mt-[44px]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <Image
                  src="/assets/svg/Vector20.svg"
                  alt="Connector"
                  width={143}
                  height={54}
                  className="w-[143px] h-[54px]"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Marketing & Growth - top right: bolita en pie → diagonal arriba → horizontal → bolita → bullets */}
          <motion.div
            className="hidden md:block absolute"
            style={{ top: '25%', right: '-40%' }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <div className="flex items-center gap-0">
              <svg
                width="130"
                height="70"
                className="shrink-0 mr-1"
                viewBox="0 0 130 70"
              >
                <motion.circle
                  cx="4"
                  cy="60"
                  r="4"
                  fill="#FED700"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 1.1 }}
                />
                <motion.line
                  x1="8"
                  y1="60"
                  x2="60"
                  y2="20"
                  stroke="#FED700"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.3 }}
                />
                <motion.line
                  x1="60"
                  y1="20"
                  x2="126"
                  y2="20"
                  stroke="#FED700"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 1.6 }}
                />
                <motion.circle
                  cx="126"
                  cy="20"
                  r="4"
                  fill="#FED700"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 1.8 }}
                />
              </svg>
              <ul className="font-barlow text-[#0F2D37] text-[14px] xl:text-[15px] leading-[20px]">
                {fundDetails.marketing.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-[7px] w-[4px] h-[4px] rounded-full bg-[#0F2D37] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Operaciones - bottom left: bolita arriba → diagonal curva abajo al pie */}
          <motion.div
            className="hidden md:block absolute"
            style={{ bottom: '22%', left: '-22%' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <div className="flex flex-col gap-0">
              {/* SVG connector line */}
              <motion.div
                className="shrink-0 self-end"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <Image
                  src="/assets/svg/Vector35.svg"
                  alt="Connector"
                  width={197}
                  height={50}
                  className="w-[197px] h-[50px]"
                />
              </motion.div>
              {/* Bullets debajo del círculo (lado izquierdo) */}
              <ul className="font-barlow text-[#0F2D37] text-[14px] xl:text-[15px] leading-[20px] mt-0">
                {fundDetails.operaciones.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-[7px] w-[4px] h-[4px] rounded-full bg-[#0F2D37] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
