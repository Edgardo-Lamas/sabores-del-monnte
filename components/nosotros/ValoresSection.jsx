"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScanLine, BarChart3, MessageSquare } from "lucide-react";

const PILARES = [
  {
    Icon: ScanLine,
    titulo: "Trazabilidad verificable",
    descripcion:
      /* [[DESCRIPCIÓN TRAZABILIDAD: qué documentación o sistema de trazabilidad ofrecen. Máx 180 caracteres]] */
      "[[Describir: número de lote en envase, análisis bromatológico disponible, acceso a historial de colmena, etc.]]",
  },
  {
    Icon: BarChart3,
    titulo: "Volumen sostenido",
    descripcion:
      /* [[DESCRIPCIÓN VOLUMEN: capacidad de producción regular, cómo manejan picos de demanda]] */
      "[[Describir: kg disponibles por temporada, política ante escasez, formas de reservar stock, pedido mínimo.]]",
  },
  {
    Icon: MessageSquare,
    titulo: "Atención directa",
    descripcion:
      /* [[DESCRIPCIÓN ATENCIÓN: cómo contactar, tiempos de respuesta, persona de contacto]] */
      "[[Describir: canal de contacto preferido (WhatsApp / email), horario de atención, tiempo de respuesta garantizado.]]",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: d },
  }),
};

export default function ValoresSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28"
      style={{ background: "#1A1510" }}
      aria-labelledby="valores-heading"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "rgba(200,121,58,0.1)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
            className="text-amber text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Cómo Trabajamos
          </motion.p>
          <motion.h2
            id="valores-heading"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
            className="text-white-soft"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            }}
          >
            Compromisos con el canal B2B
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILARES.map((pilar, i) => (
            <motion.div
              key={pilar.titulo}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.15 + i * 0.1}
              className="group p-7 rounded-[4px] transition-all duration-300"
              style={{
                background: "#201A13",
                border: "1px solid rgba(200,121,58,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,121,58,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,121,58,0.15)";
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
                style={{ background: "rgba(200,121,58,0.1)" }}
              >
                <pilar.Icon
                  size={18}
                  strokeWidth={1.5}
                  className="text-amber group-hover:text-gold transition-colors duration-300"
                  aria-hidden="true"
                />
              </div>

              <h3
                className="text-cream text-lg mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 600, lineHeight: 1.3 }}
              >
                {pilar.titulo}
              </h3>

              <p
                className="text-cream/60 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                {pilar.descripcion}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "rgba(200,121,58,0.1)" }}
      />
    </section>
  );
}
