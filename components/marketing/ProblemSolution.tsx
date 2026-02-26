'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';

interface ProblemSolutionDict {
  problem: {
    title: string;
    description: string;
    highlight: string;
    highlightSuffix: string;
  };
  solution: {
    title: string;
    description: string;
    highlight: string;
    highlightSuffix: string;
  };
  whyNow: {
    title: string;
    lines: string[];
  };
}

interface ProblemSolutionProps {
  dict: ProblemSolutionDict;
}

export function ProblemSolution({ dict }: ProblemSolutionProps) {
  return (
    <Section className="bg-white !pt-20">
      <div className="grid gap-20 md:gap-8 md:grid-cols-3 max-w-[1200px] mx-auto">
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="relative mb-2">
            <h3 className="font-barlow-condensed text-[28px] font-semibold leading-[100%] tracking-normal uppercase text-[#0F2D37] relative z-10">
              {dict.problem.title}
            </h3>
            <div
              className="absolute z-0 md:hidden"
              style={{
                left: 'calc(var(--spacing) * 28)',
                top: '-33px'
              }}
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <img
                  src="/assets/svg/problems_icon.svg"
                  alt="Problem icon"
                  className="w-full h-full"
                />
              </div>
            </div>
            <div
              className="absolute z-0 hidden md:block"
              style={{
                left: 'calc(var(--spacing) * 23)',
                top: '-57px'
              }}
            >
              <div className="relative w-20 h-20 flex items-center justify-center">
                <img
                  src="/assets/svg/problems_icon.svg"
                  alt="Problem icon"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-barlow text-[18px] mb-6 font-normal leading-[24px] tracking-normal text-[#0F2D37]">
              {dict.problem.description}
            </p>

            <p className="font-barlow text-[18px] font-normal leading-[24px] tracking-normal text-[#0F2D37]">
              <span className="font-barlow text-[18px]  font-extrabold leading-[24px] tracking-normal text-[#0F2D37]">{dict.problem.highlight}</span> {dict.problem.highlightSuffix}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
        >
          <div className="relative mb-2">
            <h3 className="font-barlow-condensed text-[28px] font-semibold leading-[100%] tracking-normal uppercase text-[#0F2D37] relative z-10">
              {dict.solution.title}
            </h3>
            <div
              className="absolute z-0 md:hidden"
              style={{
                left: 'calc(var(--spacing) * 28)',
                top: '-35px'
              }}
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <img
                  src="/assets/svg/solution-icon.svg"
                  alt="Solution icon"
                  className="w-full h-full"
                />
              </div>
            </div>
            <div
              className="absolute z-0 hidden md:block"
              style={{
                left: 'calc(var(--spacing) * 23)',
                top: '-57px'
              }}
            >
              <div className="relative w-20 h-20 flex items-center justify-center">
                <img
                  src="/assets/svg/solution-icon.svg"
                  alt="Solution icon"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-barlow text-[18px] mb-6  font-normal leading-[24px] tracking-normal text-[#0F2D37]">
              {dict.solution.description}
            </p>
            <p className="font-barlow text-[18px] font-normal leading-[24px] tracking-normal text-[#0F2D37]">
              <span className="font-barlow text-[18px] font-extrabold leading-[24px] tracking-normal text-[#0F2D37]">{dict.solution.highlight}</span> {dict.solution.highlightSuffix}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative mb-2">
            <h3 className="font-barlow-condensed text-[28px] font-semibold leading-[100%] tracking-normal uppercase text-[#0F2D37] relative z-10">
              {dict.whyNow.title}
            </h3>
            <div
              className="absolute z-0 md:hidden"
              style={{
                left: 'calc(var(--spacing) * 27)',
                top: '-33px'
              }}
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <img
                  src="/assets/svg/why_now_icon.svg"
                  alt="Why now icon"
                  className="w-full h-full"
                />
              </div>
            </div>
            <div
              className="absolute z-0 hidden md:block"
              style={{
                left: 'calc(var(--spacing) * 18)',
                top: '-57px'
              }}
            >
              <div className="relative w-20 h-20 flex items-center justify-center">
                <img
                  src="/assets/svg/why_now_icon.svg"
                  alt="Why now icon"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="space-y-0">
            {dict.whyNow.lines.map((line, i) => (
              <p key={i} className="font-barlow text-[18px] font-normal leading-[24px] tracking-normal text-[#0F2D37]">
                {line}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
