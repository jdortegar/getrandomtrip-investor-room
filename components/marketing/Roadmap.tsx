'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';
import { MobileCarousel } from './MobileCarousel';

interface RoadmapPhase {
  id: number;
  period: string;
  subtitle?: string;
  items: string[];
}

interface RoadmapProps {
  className?: string;
}

const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 1,
    period: 'Q1-Q2 2026',
    subtitle: 'El milestone del Founding Round',
    items: [
      'Producto base + curación inicial.',
      'Activación Trippers + primeras rutas.',
      'Pilotos pagos + aprendizaje del sistema.',
      'Optimización de experiencia y operación.',
    ],
  },
  {
    id: 2,
    period: 'H2 2026',
    items: [
      'Narrativa + métricas para siguiente ronda.',
      'Expansión LATAM',
    ],
  },
  {
    id: 3,
    period: '2026/2027',
    items: [
      'IA Predictiva',
      'Crecimiento B2B',
      'Lanzamiento nuevos productos',
    ],
  },
];

function TimelineLine() {
  return (
    <div className="flex items-center flex-1 mx-1">
      <div className="w-[6px] h-[6px] rounded-full bg-[#FED700] shrink-0" />
      <div className="flex-1 h-[1.5px] bg-[#FED700]" />
      <div className="w-[6px] h-[6px] rounded-full bg-[#FED700] shrink-0" />
    </div>
  );
}

function TimelineLineNoEnd() {
  return (
    <div className="flex items-center ml-1 flex-1">
      <div className="w-[6px] h-[6px] rounded-full bg-[#FED700] shrink-0" />
      <div className="flex-1 h-[1.5px] bg-[#FED700]" />
    </div>
  );
}

export function Roadmap({ className }: RoadmapProps) {
  return (
    <Section className={`${className || ''} overflow-hidden`} noContainerPadding>
      <div className="mx-auto w-full">
        {/* Title */}
        <motion.div
          className="mb-6 text-center px-4 md:px-8 xl:mb-8 2xl:mb-10"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3
            className="font-barlow-condensed font-semibold uppercase tracking-wide text-foreground"
            style={{ fontSize: '28px', lineHeight: '100%' }}
          >
            TRACCIÓN & ROADMAP
          </h3>
        </motion.div>

        {/* Desktop */}
        <div className="hidden md:block">
          {/* Titles + lines row */}
          <div className="flex items-end mb-6 pl-8 xl:pl-12 2xl:pl-16" style={{ marginLeft: '130px' }}>
            {ROADMAP_PHASES.map((phase, index) => (
              <div key={phase.id} className="flex items-end flex-1 pb-1">
                <h3
                  className="font-barlow-condensed font-bold text-[#0F2D37] uppercase whitespace-nowrap shrink-0"
                  style={{ fontSize: '45px', lineHeight: '100%', marginRight: index === 0 ? '5px' : undefined }}
                >
                  {phase.period}
                </h3>
                {index === 0 ? (
                  <div className="relative flex items-center flex-1 ml-1">
                    <img
                      src="/assets/svg/icon_map.svg"
                      alt="Map"
                      className="w-[30px] h-[30px] absolute"
                      style={{ bottom: '8px', left: '-7px' }}
                    />
                    <TimelineLine />
                  </div>
                ) : index < ROADMAP_PHASES.length - 1 ? (
                  <TimelineLine />
                ) : (
                  <TimelineLineNoEnd />
                )}
              </div>
            ))}
          </div>

          {/* Content row */}
          <div className="grid grid-cols-3 gap-6 px-8 xl:px-12 2xl:px-16" style={{ marginLeft: '130px' }}>
            {ROADMAP_PHASES.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {phase.subtitle && (
                  <p
                    className="font-barlow-condensed font-semibold text-[#0F2D37] mb-3"
                    style={{ fontSize: '28px', lineHeight: '122%' }}
                  >
                    {phase.subtitle}
                  </p>
                )}

                <ul className="space-y-1">
                  {phase.items.map((item, i) => (
                    <li
                      key={i}
                      className="font-barlow text-[#0F2D37] font-normal flex items-start gap-2"
                      style={{ fontSize: '16px', lineHeight: '22px' }}
                    >
                      <span className="mt-[8px] w-[5px] h-[5px] rounded-full bg-[#0F2D37] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile - Slider */}
        <div className="block md:hidden">
          <MobileCarousel
            itemClassName="h-auto"
            slideWidth="100%"
            items={ROADMAP_PHASES}
            renderItem={(phase) => (
              <div className="px-4">
                {/* Period + icon + line */}
                <div className="flex items-end mb-3 pb-1">
                  <h3
                    className="font-barlow-condensed font-bold text-[#0F2D37] uppercase whitespace-nowrap shrink-0"
                    style={{ fontSize: '43.52px', lineHeight: '100%', marginRight: phase.id === 1 ? '10px' : undefined }}
                  >
                    {phase.period}
                  </h3>
                  {phase.id === 1 ? (
                    <div className="relative flex items-center flex-1 ml-1">
                      <img
                        src="/assets/svg/icon_map.svg"
                        alt="Map"
                        className="w-[29px] h-[29px] absolute"
                        style={{ bottom: '8px', left: '-13px' }}
                      />
                      <div className="w-[5px] h-[5px] rounded-full bg-[#FED700] shrink-0" />
                      <div className="flex-1 h-[1.5px] bg-[#FED700]" />
                      <div className="w-[5px] h-[5px] rounded-full bg-[#FED700] shrink-0" />
                    </div>
                  ) : (
                    <div className="flex items-center flex-1 mx-1">
                      <div className="w-[5px] h-[5px] rounded-full bg-[#FED700] shrink-0" />
                      <div className="flex-1 h-[1.5px] bg-[#FED700]" />
                      <div className="w-[5px] h-[5px] rounded-full bg-[#FED700] shrink-0" />
                    </div>
                  )}
                </div>

                {phase.subtitle && (
                  <p
                    className="font-barlow-condensed font-bold text-[#0F2D37] mb-3"
                    style={{ fontSize: '28px', lineHeight: '122%' }}
                  >
                    {phase.subtitle}
                  </p>
                )}

                <ul className="space-y-1">
                  {phase.items.map((item, i) => (
                    <li
                      key={i}
                      className="font-barlow text-[#0F2D37] font-normal flex items-start gap-2"
                      style={{ fontSize: '18px', lineHeight: '23.21px' }}
                    >
                      <span className="mt-[9px] w-[5px] h-[5px] rounded-full bg-[#0F2D37] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          />
        </div>
      </div>
    </Section>
  );
}
