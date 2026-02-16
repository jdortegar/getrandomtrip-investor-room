'use client';

import { Section } from './Section';

export function ProblemSolution() {
  return (
    <Section className="bg-white">
      <div className="grid gap-20 md:gap-8 md:grid-cols-3 max-w-[1200px] mx-auto">
        <div className="flex flex-col">
          <div className="relative mb-2">
            <h3 className="font-barlow-condensed text-[28px] font-semibold leading-[100%] tracking-normal uppercase text-[#0F2D37] relative z-10">
              EL PROBLEMA
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
              Hoy viajar implica comparar cientos de opciones, pestañas abiertas, reseñas contradictorias y decisiones agotadoras.
            </p>
            
            <p className="font-barlow text-[18px] font-normal leading-[24px] tracking-normal text-[#0F2D37]">
              <span className="font-barlow text-[18px]  font-extrabold leading-[24px] tracking-normal text-[#0F2D37]">Más opciones no significaron mejores experiencias.</span> Significaron más fricción.
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="relative mb-2">
            <h3 className="font-barlow-condensed text-[28px] font-semibold leading-[100%] tracking-normal uppercase text-[#0F2D37] relative z-10">
              LA SOLUCIÓN
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
              Randomtrip diseña escapadas sorpresa combinando tecnología, criterio humano y curaduría local.
            </p>
            <p className="font-barlow text-[18px] font-normal leading-[24px] tracking-normal text-[#0F2D37]">
              <span className="font-barlow text-[18px] font-extrabold leading-[24px] tracking-normal text-[#0F2D37]">El viajero decide sólo lo esencial.</span> El sistema diseña el resto.
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="relative mb-2">
            <h3 className="font-barlow-condensed text-[28px] font-semibold leading-[100%] tracking-normal uppercase text-[#0F2D37] relative z-10">
              WHY NOW
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
            <p className="font-barlow text-[18px] font-normal leading-[24px] tracking-normal text-[#0F2D37]">
              La inspiración ya es creator-led.
            </p>
            <p className="font-barlow text-[18px] font-normal leading-[24px] tracking-normal text-[#0F2D37]">
              La reserva ya está comoditizada.
            </p>
            <p className="font-barlow text-[18px] font-normal leading-[24px] tracking-normal text-[#0F2D37]">
              La decisión sigue rota.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

