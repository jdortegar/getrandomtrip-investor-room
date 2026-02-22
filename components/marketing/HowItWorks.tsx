'use client';

import { motion } from 'framer-motion';

import { ExpandAnimatedItems } from './ExpandAnimatedItems';
import { MobileCarousel } from './MobileCarousel';
import { Section } from './Section';

interface StepContent {
  number: number;
  title: string;
  description: string;
  imageUrl?: string;
  defaultState: 'image' | 'number';
  animationDelay: number;
}

interface HowItWorksDict {
  sectionDescription: string;
  steps: Array<{ description: string; title: string }>;
  title: string;
}

interface HowItWorksProps {
  className?: string;
  dict: HowItWorksDict;
}

const STEP_CONFIG = [
  { defaultState: 'image' as const, animationDelay: 0.1 },
  { defaultState: 'number' as const, animationDelay: 0.2 },
  { defaultState: 'number' as const, animationDelay: 0.3 },
];

function buildSteps(dict: HowItWorksDict): StepContent[] {
  return dict.steps.slice(0, 3).map((step, i) => ({
    ...step,
    ...STEP_CONFIG[i],
    imageUrl: '/images/how-it-works-1.png',
    number: i + 1,
  }));
}

function renderStepContent(
  step: StepContent,
  showImage: boolean,
  showNumber: boolean,
  showText: boolean,
) {
  return (
    <motion.div className="absolute inset-0" transition={{ duration: 0.4 }}>
      {/* Image Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: showImage ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${step.imageUrl})`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0F2D37]/70 to-transparent" />
      </motion.div>

      {/* Dark Block with Number */}
      <motion.div
        className="absolute inset-0 flex items-end justify-end px-5 bg-[#0F2D37] rounded-3xl"
        animate={{
          opacity: showNumber ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <motion.span className="font-barlow-condensed font-extrabold text-[#154554] leading-none text-[300px]">
          {step.number}
        </motion.span>
      </motion.div>

      {/* Text Overlay */}
      <motion.div
        className="absolute top-1/2 left-[10%] -translate-y-1/2 text-white"
        animate={{
          opacity: showText ? 1 : 0,
          y: showText ? 0 : 20,
        }}
        transition={{ duration: 0.4 }}
      >
        <h4 className="mb-2 font-nothing-you-could-do text-2xl text-yellow-400 md:text-5xl">
          {step.title}
        </h4>
        <p className="text-sm leading-relaxed md:text-base">
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function HowItWorks({ className, dict }: HowItWorksProps) {
  const steps = buildSteps(dict);

  return (
    <Section
      className="bg-background py-2"
      description={dict.sectionDescription}
      noContainerPadding
      title={dict.title}
    >
      {/* Desktop: ExpandAnimatedItems */}
      <div className="hidden px-8 xl:px-12 2xl:px-16 md:block">
        <ExpandAnimatedItems
          getItemId={(step) => step.number}
          itemClassName="group relative overflow-hidden rounded-3xl h-[400px] cursor-pointer"
          items={steps}
          defaultHoveredId={1}
          renderItem={(step, isHovered) => {
            const isStep1 = step.number === 1;

            // Step 1 has inverse behavior: shows number when not hovered, image when hovered
            const showImage = isStep1
              ? isHovered
              : step.defaultState === 'image'
              ? !isHovered
              : isHovered;
            const showNumber = isStep1
              ? !isHovered
              : step.defaultState === 'number'
              ? !isHovered
              : isHovered;
            const showText = showImage;

            return renderStepContent(step, showImage, showNumber, showText);
          }}
        />
      </div>

      {/* Mobile: Carousel */}
      <div className="block md:hidden">
        <MobileCarousel
          itemClassName="h-[200px]"
          items={steps}
          renderItem={(step) => {
            // On mobile, always show image layout with text overlay
            const showImage = true;
            const showNumber = false;
            const showText = true;

            return (
              <div className="relative h-full w-full overflow-hidden rounded-3xl">
                {renderStepContent(step, showImage, showNumber, showText)}
              </div>
            );
          }}
        />
      </div>
    </Section>
  );
}
