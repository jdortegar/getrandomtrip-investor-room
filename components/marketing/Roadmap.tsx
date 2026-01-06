'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section } from './Section';

interface RoadmapPanel {
  id: number;
  year: string;
  items: string[];
  imageUrl: string;
}

interface RoadmapProps {
  className?: string;
}

const ROADMAP_PANELS: RoadmapPanel[] = [
  {
    id: 1,
    year: '2025',
    items: ['MVP OPERATIVO', '+100 LEADS', '3 SOCIOS FUNDADORES'],
    imageUrl: '/images/roadmap-1.png',
  },
  {
    id: 2,
    year: '2026',
    items: ['INTEGRACIÓN DE', 'PLANNERS POR TIPO DE', 'VIAJE, EXPANSIÓN LATAM'],
    imageUrl: '/images/roadmap-2.png',
  },
  {
    id: 3,
    year: '2026/27',
    items: ['IA PREDICTIVA', '+ CRECIMIENTO B2B'],
    imageUrl: '/images/roadmap-3.png',
  },
];

export function Roadmap({ className }: RoadmapProps) {
  return (
    <Section className={className} title="TRACCIÓN & ROADMAP">
      <div className="mx-auto container">
        <div className="grid gap-6 md:grid-cols-3 xl:gap-8 2xl:gap-10">
          {ROADMAP_PANELS.map((panel, index) => (
            <motion.div
              key={panel.id}
              className="group relative overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative h-[200px] w-full">
                <Image
                  alt={`Roadmap ${panel.year}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  src={panel.imageUrl}
                />

                {/* Dark Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 xl:p-6 2xl:p-8 text-white">
                  {/* Year in top left */}
                  <div>
                    <h3 className="font-barlow-condensed text-4xl font-bold uppercase tracking-wide">
                      {panel.year}
                    </h3>
                  </div>

                  {/* Items in bottom right */}
                  <div className="space-y-2 xl:space-y-3 2xl:space-y-4 self-end text-right">
                    {panel.items.map((item, itemIndex) => (
                      <motion.p
                        key={itemIndex}
                        className="font-barlow-condensed text-xl font-semibold uppercase tracking-wide leading-none"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.2 + itemIndex * 0.1,
                        }}
                      >
                        {item}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
