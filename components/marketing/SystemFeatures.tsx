'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';

interface SystemFeaturesDict {
  headline: string;
  headlineBold: string;
  subtitle: string;
  subtitleBold: string;
  features: Array<{
    title: string;
    description: string;
    descriptionBold: string;
  }>;
}

interface SystemFeaturesProps {
  dict: SystemFeaturesDict;
}

const FEATURE_ICONS = [
  '/assets/svg/icon-engine.svg',
  '/assets/svg/icon_criterio.svg',
  '/assets/svg/icon_rutas.svg',
];

export function SystemFeatures({ dict }: SystemFeaturesProps) {
  return (
    <Section className="bg-white">
      {/* Mobile */}
      <div className="block md:hidden">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-barlow-condensed" style={{ fontSize: '30px', lineHeight: '30px' }}>
            {dict.headline}
          </h2>
          <h2
            className="font-barlow-condensed font-black"
            style={{ fontSize: '48px', lineHeight: '48px' }}
          >
            {dict.headlineBold}
          </h2>
          <p className="text-[#000000] mt-3" style={{ fontSize: '18px', lineHeight: '24px' }}>
            {dict.subtitle}
            <br />
            <strong>{dict.subtitleBold}</strong>
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {dict.features.map((feature, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
            >
              <div className="w-[60px] h-[60px] rounded-full bg-[#1C2B35] flex items-center justify-center">
                <img src={FEATURE_ICONS[i]} alt={feature.title} className="w-[44px] h-[44px]" />
              </div>
              <div>
                <h3
                  className="font-barlow-condensed font-bold text-[#0F2D37]"
                  style={{ fontSize: '20px', lineHeight: '24px' }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: '16px', lineHeight: '22px' }}>
                  {feature.description} <strong>{feature.descriptionBold}</strong>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex md:flex-row md:items-start md:gap-5">
        <motion.div
          className="shrink-0 md:w-[38%]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-barlow-condensed" style={{ fontSize: '40px', lineHeight: '40px' }}>
            {dict.headline}
          </h2>
          <h2
            className="font-barlow-condensed font-black"
            style={{ fontSize: '68px', lineHeight: '68px' }}
          >
            {dict.headlineBold}
          </h2>
          <p className="text-[#000000] mt-4" style={{ fontSize: '18px', lineHeight: '24px' }}>
            {dict.subtitle}
            <br />
            <strong>{dict.subtitleBold}</strong>
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 flex-1">
          {dict.features.map((feature, i) => (
            <motion.div
              key={i}
              className="flex gap-4 items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
            >
              <div className="shrink-0 w-[77px] h-[77px] rounded-full bg-[#1C2B35] flex items-center justify-center">
                <img src={FEATURE_ICONS[i]} alt={feature.title} className="w-[57px] h-[57px]" />
              </div>
              <div>
                <h3
                  className="font-barlow-condensed font-bold text-[#0F2D37]"
                  style={{ fontSize: '22px', lineHeight: '26px' }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: '18px', lineHeight: '25px' }}>
                  {feature.description.split('\n').map((line, j) => (
                    <span key={j}>
                      {j > 0 && <br />}
                      {line}
                    </span>
                  ))}{' '}
                  <strong>{feature.descriptionBold}</strong>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
