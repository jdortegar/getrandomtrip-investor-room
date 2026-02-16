'use client';

import { Hourglass } from 'lucide-react';
import { BookMeetingButton } from './BookMeetingButton';
import { Section } from './Section';

export function ValueProposition() {
  return (
    <Section className="bg-white">
      <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 max-w-[1200px] mx-auto">
        <div className="flex flex-col justify-center">
          <div className="mb-3 md:mb-6 relative">
            <h2 className="font-barlow-condensed pl-[8px] md:pl-0 text-[28px] md:text-[40px] font-normal leading-[48px] md:leading-[100%] uppercase text-foreground tracking-normal relative z-[11] md:z-auto">
              DEVOLVERLE TIEMPO AL VIAJERO
            </h2>
            <div className="relative inline-block -mt-2 md:mt-0 z-10 md:z-auto">
              <span className="relative z-10  md:z-auto ml-[5px] md:ml-0 font-barlow-condensed text-[48px] md:text-[68px] font-black leading-[48px] md:leading-[59px] uppercase text-foreground tracking-normal md:tracking-[-0.01em]">
                ES EL NUEVO LUJO
              </span>
              <Hourglass className="absolute -right-8 md:-right-15 -top-[55px] md:-top-6 h-[94px] w-[94px] shrink-0 text-[#FFD700] z-[-999] md:z-auto" />
            </div>
          </div>

          <div className="font-barlow text-[16px] md:text-[18px] leading-[24px] md:leading-[24px] tracking-normal text-foreground ml-[5px] pr-8">
            <p className="font-normal">
              La industria resolvió cómo reservar.
              <br className="md:hidden" />
              <span className="font-extrabold">
                Nadie resolvió cómo decidir.
              </span>
              <span className="hidden md:inline">{' '}</span>
              <br className="md:hidden" />
              {' '}
              <span className="md:hidden">
                Randomtrip diseña escapadas sorpresa con precisión operativa: tú defines lo esencial,
                <br />
                nosotros diseñamos el resto.
              </span>
              <span className="hidden md:inline">
                Randomtrip diseña escapadas sorpresa con precisión operativa:
                <br />
                tú defines lo esencial, nosotros diseñamos el resto.
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <ul className="mb-3 ml-[12px] md:mb-0 md:pt-3 md:mt-[35px] md:ml-[10px] md:pl-2">
            <li className="flex items-start md:items-center gap-2 md:gap-3">
              <span className="text-foreground">•</span>
              <p className="font-barlow text-[16px] md:text-[17px] font-normal leading-[24px] tracking-normal text-foreground">
                Menos tiempo eligiendo, más tiempo viviendo.
              </p>
            </li>
            <li className="flex items-start md:items-center gap-2 md:gap-3">
              <span className="text-foreground">•</span>
              <p className="font-barlow text-[16px] md:text-[17px] font-normal leading-[24px] tracking-normal text-foreground">
                Tecnología + curación humana para acertar en gustos, ritmo y
                energía.
              </p>
            </li>
            <li className="flex items-start md:items-center gap-2 md:gap-3">
              <span className="text-foreground">•</span>
              <p className="font-barlow text-[16px] md:text-[17px] font-normal leading-[24px] tracking-normal text-foreground">
                Comunidad Tripper creando "rutas con alma"{' '}
                <span className="md:hidden">
                  <br />
                </span>
                (IP de experiencias).
              </p>
            </li>
          </ul>

          <div className="md:ml-[5px] mt-[21px] text-center md:text-left">
            <p className="font-barlow text-[16px] md:text-[18px] font-normal leading-[24px] tracking-normal text-foreground">
              Founding Round abierto para early believers.
            </p>
          </div>

          <div className="mt-[15px] md:ml-[12px] flex justify-center md:justify-start">
            <BookMeetingButton
              variant="default"
              className="bg-[#FED700] text-black hover:bg-[#FED700]/90 w-[258px] h-[38px] rounded-[10px] flex items-center justify-center"
            >
              <span className="font-barlow-condensed text-[22px] font-semibold leading-[24px] tracking-normal text-center text-[#000000]">
                Agenda 30 min con founders
              </span>
            </BookMeetingButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

