'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';
import { ExpandAnimatedItems } from './ExpandAnimatedItems';

interface StepContent {
  number: number;
  title: string;
  description: string;
  imageUrl?: string;
  defaultState: 'image' | 'number';
  animationDelay: number;
}

interface HowItWorksProps {
  className?: string;
}

const STEPS: StepContent[] = [
  {
    number: 1,
    title: 'Planifica',
    description:
      'Elegi fechas, ciudad de origen, duración y presupuesto. Sumá filtros y mood si querés.',
    imageUrl: '/images/how-it-works-1.png', // TODO: Replace with actual step 1 image
    defaultState: 'image',
    animationDelay: 0.1,
  },
  {
    number: 2,
    title: 'Recibi la sorpresa',
    description:
      'Elegí fechas, ciudad de origen, duración y presupuesto. Sumá filtros y mood si querés.',
    imageUrl: '/images/how-it-works-1.png', // TODO: Replace with actual step 2 image
    defaultState: 'number',
    animationDelay: 0.2,
  },
  {
    number: 3,
    title: 'Viaja sin estres',
    description:
      'Hacé la valija. Pasajes y alojamiento listos: soporte humano cuando lo necesites.',
    imageUrl: '/images/how-it-works-1.png', // TODO: Replace with actual step 3 image
    defaultState: 'number',
    animationDelay: 0.3,
  },
];

export function HowItWorks({ className }: HowItWorksProps) {
  return (
    <Section
      className="bg-background py-2"
      title="¿Cómo funciona?"
      description="Tres pasos. Cero estrés. Más descubrimiento."
    >
      <ExpandAnimatedItems
        items={STEPS}
        defaultHoveredId={1}
        getItemId={(step) => step.number}
        itemClassName="group relative overflow-hidden rounded-3xl h-[400px] cursor-pointer"
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

          return (
            <motion.div
              className="absolute inset-0"
              transition={{ duration: 0.4 }}
            >
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
                <h4 className="mb-2 font-nothing-you-could-do text-4xl text-yellow-400 md:text-5xl">
                  {step.title}
                </h4>
                <p className="text-sm leading-relaxed md:text-base">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          );
        }}
      />
    </Section>
  );
}
