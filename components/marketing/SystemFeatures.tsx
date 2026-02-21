'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';

export function SystemFeatures() {
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
            No es una agencia.
          </h2>
          <h2
            className="font-barlow-condensed font-black"
            style={{ fontSize: '48px', lineHeight: '48px' }}
          >
            Es un sistema.
          </h2>
          <p className="text-[#000000] mt-3" style={{ fontSize: '18px', lineHeight: '24px' }}>
            Diseñado para escalar criterio,
            <br />
            no improvisación.
            <br />
            <strong>El sistema aprende con cada viaje.</strong>
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          <motion.div
            className="flex flex-col items-center text-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-[60px] h-[60px] rounded-full bg-[#1C2B35] flex items-center justify-center">
              <img src="/assets/svg/icon-engine.svg" alt="Decision Engine" className="w-[44px] h-[44px]" />
            </div>
            <div>
              <h3
                className="font-barlow-condensed font-bold text-[#0F2D37]"
                style={{ fontSize: '20px', lineHeight: '24px' }}
              >
                Decision Engine
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '22px' }}>
                Algoritmos y reglas propias que combinan
                <br />
                preferencias, timing y contexto para reducir
                <br />
                fricción y aumentar acierto.
                <br />
                <strong>No recomendamos destinos.
                <br />
                Diseñamos combinaciones.</strong>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-[60px] h-[60px] rounded-full bg-[#1C2B35] flex items-center justify-center">
              <img src="/assets/svg/icon_criterio.svg" alt="Curación con criterio" className="w-[44px] h-[44px]" />
            </div>
            <div>
              <h3
                className="font-barlow-condensed font-bold text-[#0F2D37]"
                style={{ fontSize: '20px', lineHeight: '24px' }}
              >
                Curación con criterio
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '22px' }}>
                Expertos locales y trippers diseñan rutas
                <br />
                bajo frameworks claros. No es gusto
                <br />
                personal: <strong>es criterio sistematizado.</strong>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-[60px] h-[60px] rounded-full bg-[#1C2B35] flex items-center justify-center">
              <img src="/assets/svg/icon_rutas.svg" alt="Rutas con alma" className="w-[44px] h-[44px]" />
            </div>
            <div>
              <h3
                className="font-barlow-condensed font-bold text-[#0F2D37]"
                style={{ fontSize: '20px', lineHeight: '24px' }}
              >
                Rutas con alma (IP)
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '22px' }}>
                Cada viaje diseñado alimenta una librería
                <br />
                propietaria de rutas, patrones y
                <br />
                aprendizajes. <strong>Más uso = mejor sistema.</strong>
              </p>
            </div>
          </motion.div>
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
            No es una agencia.
          </h2>
          <h2
            className="font-barlow-condensed font-black"
            style={{ fontSize: '68px', lineHeight: '68px' }}
          >
            Es un sistema.
          </h2>
          <p className="text-[#000000] mt-4" style={{ fontSize: '18px', lineHeight: '24px' }}>
            Diseñado para escalar criterio,
            <br />
            no improvisación.
            <br />
            <strong>El sistema aprende con cada viaje.</strong>
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 flex-1">
          <motion.div
            className="flex gap-4 items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="shrink-0 w-[77px] h-[77px] rounded-full bg-[#1C2B35] flex items-center justify-center">
              <img src="/assets/svg/icon-engine.svg" alt="Decision Engine" className="w-[57px] h-[57px]" />
            </div>
            <div>
              <h3
                className="font-barlow-condensed font-bold text-[#0F2D37]"
                style={{ fontSize: '22px', lineHeight: '26px' }}
              >
                Decision Engine
              </h3>
              <p style={{ fontSize: '18px', lineHeight: '25px' }}>
                Algoritmos y reglas propias que combinan preferencias, timing y contexto para reducir fricción y aumentar acierto. <strong>No recomendamos destinos. Diseñamos combinaciones.</strong>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-4 items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="shrink-0 w-[77px] h-[77px] rounded-full bg-[#1C2B35] flex items-center justify-center">
              <img src="/assets/svg/icon_criterio.svg" alt="Curación con criterio" className="w-[57px] h-[57px]" />
            </div>
            <div>
              <h3
                className="font-barlow-condensed font-bold text-[#0F2D37]"
                style={{ fontSize: '22px', lineHeight: '26px' }}
              >
                Curación con criterio
              </h3>
              <p style={{ fontSize: '18px', lineHeight: '25px' }}>
                Expertos locales y trippers diseñan rutas bajo frameworks
                <br />
                claros. No es gusto personal: <strong>es criterio sistematizado.</strong>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-4 items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="shrink-0 w-[77px] h-[77px] rounded-full bg-[#1C2B35] flex items-center justify-center">
              <img src="/assets/svg/icon_rutas.svg" alt="Rutas con alma" className="w-[57px] h-[57px]" />
            </div>
            <div>
              <h3
                className="font-barlow-condensed font-bold text-[#0F2D37]"
                style={{ fontSize: '22px', lineHeight: '26px' }}
              >
                Rutas con alma (IP)
              </h3>
              <p style={{ fontSize: '18px', lineHeight: '25px' }}>
                Cada viaje diseñado alimenta una librería propietaria de
                <br />
                rutas, patrones y aprendizajes. <strong>Más uso = mejor sistema.</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
