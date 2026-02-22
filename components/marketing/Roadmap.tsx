'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section } from './Section';

const ROADMAP_IMAGES = [
  '/images/roadmap-1.png',
  '/images/roadmap-2.png',
  '/images/roadmap-3.png',
];

interface RoadmapDict {
  panels: Array<{ items: string[]; year: string }>;
  title: string;
}

interface RoadmapProps {
  className?: string;
  dict: RoadmapDict;
}

export function Roadmap({ className, dict }: RoadmapProps) {
  return (
    <Section className={className} title={dict.title}>
      <div className="container mx-auto">
        <div className="grid gap-6 md:grid-cols-3 xl:gap-8 2xl:gap-10">
          {dict.panels.map((panel, index) => (
            <motion.div
              key={panel.year}
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
                  src={ROADMAP_IMAGES[index]}
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
