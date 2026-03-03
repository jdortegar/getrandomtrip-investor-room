'use client';

import { motion } from 'framer-motion';

import { IconCalendar, IconConfort, IconMood } from '@/public/assets/icons';
import type { MarketingDictionary } from '@/lib/types/dictionary';
import { MobileCarousel } from './MobileCarousel';
import { Section } from './Section';

/** Same shape as MarketingDictionary.threeDecisions */
type ThreeDecisionsDict = MarketingDictionary['threeDecisions'];

interface ThreeDecisionsProps {
  dict: ThreeDecisionsDict;
}

interface DecisionWithIcon {
  icon: React.ElementType;
  label: string;
  title: string;
}

const DECISION_ICONS: React.ElementType[] = [
  IconCalendar,
  IconMood,
  IconConfort,
];

function DecisionCard({ decision }: { decision: DecisionWithIcon }) {
  const Icon = decision.icon;
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#1C2B35] p-4 justify-between">
      <div className="flex w-full justify-end">
        <Icon className="size-28 text-[#FED700] md:size-28" />
      </div>
      <div>
        <p className="font-barlow-condensed text-xl font-semibold leading-5 text-[#FED700] md:text-xl md:leading-6">
          {decision.label}
        </p>
        <p className="font-barlow-condensed text-5xl font-black uppercase leading-none tracking-wide text-white">
          {decision.title}
        </p>
      </div>
    </div>
  );
}

export function ThreeDecisions({ dict }: ThreeDecisionsProps) {
  const decisions: DecisionWithIcon[] = dict.decisions.map((d, i) => ({
    label: d.label,
    title: d.title,
    icon: DECISION_ICONS[i],
  }));

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
          <h4 className=" font-semibold uppercase tracking-[10px] text-[#0F2D37] text-base">
            {dict.sectionTitle}
          </h4>

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

        <MobileCarousel
          itemClassName="h-auto aspect-square"
          items={decisions}
          renderItem={(decision) => <DecisionCard decision={decision} />}
          slideWidth="70%"
          className="md:hidden block -mr-4 w-[calc(100%+1rem)] md:mr-0 md:w-full"
          showDots
        />

        <div className="grid-cols-3 gap-6 w-2/3 hidden md:grid">
          {decisions.map((decision, i) => (
            <motion.div
              key={decision.label}
              className="shrink-0"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <DecisionCard decision={decision} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
