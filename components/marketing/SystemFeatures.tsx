'use client';

import { motion } from 'framer-motion';

import { IconCriterio, IconEngine, IconRutas } from '@/public/assets/Icons';
import { Section } from './Section';

interface SystemFeaturesDict {
  headline: string;
  headlineBold: string;
  subtitleHtml: string;
  features: Array<{
    title: string;
    descriptionHtml: string;
  }>;
}

interface SystemFeaturesProps {
  dict: SystemFeaturesDict;
}

const FEATURE_ICONS: React.ElementType[] = [
  IconEngine,
  IconCriterio,
  IconRutas,
];

export function SystemFeatures({ dict }: SystemFeaturesProps) {
  return (
    <Section>
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <motion.div
          className="w-full md:w-1/3 flex flex-col gap-4 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-barlow-condensed">
            <span className="text-3xl md:text-4xl block leading-none  ">
              {dict.headline}
            </span>
            <span className="text-5xl md:text-7xl font-black block leading-none">
              {dict.headlineBold}
            </span>
          </h2>
          <p
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: dict.subtitleHtml }}
          />
        </motion.div>
        <div className="flex flex-col gap-8 w-full md:w-2/3">
          {dict.features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <motion.div
                key={i}
                className="flex flex-col md:flex-row gap-4 items-center md:items-start justify-center md:justify-start text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
              >
                <div
                  aria-hidden
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#1C2B35]"
                >
                  <Icon className="size-14 text-[#FED700]" />
                </div>
                <div>
                  <h3 className="font-barlow-condensed font-bold text-[#0F2D37] text-2xl">
                    {feature.title}
                  </h3>
                  <p
                    className="text-lg"
                    dangerouslySetInnerHTML={{
                      __html: feature.descriptionHtml,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
