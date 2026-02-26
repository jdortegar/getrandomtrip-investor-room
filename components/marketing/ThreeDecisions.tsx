'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';
import { MobileCarousel } from './MobileCarousel';

interface ThreeDecisionsDict {
  sectionTitle: string;
  headline: string;
  headlineBold: string;
  subtitle: string;
  subtitleBold: string;
  decisions: Array<{ label: string; title: string }>;
}

interface ThreeDecisionsProps {
  dict: ThreeDecisionsDict;
}

const DECISION_ICONS = [
  { icon: '/assets/svg/icon-calendar.svg', iconSize: 116 },
  { icon: '/assets/svg/icon-mood.svg', iconSize: 116 },
  { icon: '/assets/svg/icon-confort.svg', iconSize: 116 },
];

function DecisionCard({ decision }: { decision: { label: string; title: string; icon: string; iconSize: number } }) {
  return (
    <div className="bg-[#1C2B35] rounded-2xl flex flex-col w-full h-full px-4 pt-3 pb-3 overflow-hidden">
      <div className="flex justify-end w-full">
        <img
          src={decision.icon}
          alt={decision.label}
          className="w-[105px] h-[105px] md:w-auto md:h-auto"
          style={{ maxWidth: `${decision.iconSize}px`, maxHeight: `${decision.iconSize}px` }}
        />
      </div>
      <div className="-mt-2">
        <p className="font-barlow-condensed font-semibold text-[#FED700] text-[17px] leading-[20px] md:text-[20px] md:leading-[24px]">
          {decision.label}
        </p>
        <h3
          className="font-barlow-condensed font-black uppercase text-white text-[43px] leading-[43px] md:text-[49px] md:leading-[50px]"
          style={{ letterSpacing: '0.5px' }}
        >
          {decision.title}
        </h3>
      </div>
    </div>
  );
}

export function ThreeDecisions({ dict }: ThreeDecisionsProps) {
  const decisions = dict.decisions.map((d, i) => ({
    ...d,
    ...DECISION_ICONS[i],
  }));

  return (
    <Section className="bg-white">
      <div className="block md:hidden">
        <motion.div
          className="text-center mb-4 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h4
            className="font-semibold uppercase text-[#0F2D37] mb-3"
            style={{ fontSize: '15px', lineHeight: '18px', letterSpacing: '10px' }}
          >
            {dict.sectionTitle}
          </h4>
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
            {dict.subtitle} <strong>{dict.subtitleBold}</strong>
          </p>
        </motion.div>

        <MobileCarousel
          itemClassName="h-[240px]"
          items={decisions}
          slideWidth="70%"
          renderItem={(decision) => (
            <DecisionCard decision={decision} />
          )}
        />
      </div>

      <div className="hidden md:flex md:flex-row md:items-start md:gap-12 mx-auto">
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h4
            className="font-semibold uppercase text-[#0F2D37] mb-4"
            style={{ fontSize: '15px', lineHeight: '18px', letterSpacing: '12px' }}
          >
            {dict.sectionTitle}
          </h4>
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
            {dict.subtitle} <strong>{dict.subtitleBold}</strong>
          </p>
        </motion.div>

        <div className="flex gap-6 flex-1 justify-end">
          {decisions.map((decision, i) => (
            <motion.div
              key={decision.label}
              className="w-[273px] h-[266px] shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <DecisionCard decision={decision} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
