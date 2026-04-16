"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const METRICAS = [
  { valor: "[[X]]+", etiqueta: "colmenas activas" },
  { valor: "[[X]]",  etiqueta: "años en el rubro" },
  { valor: "[[X]] kg", etiqueta: "producción anual" },
  { valor: "[[X]]",  etiqueta: "clientes B2B activos" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: d },
  }),
};

export default function RespaldoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20"
      style={{ background: "#201A13" }}
      aria-label="Métricas de producción"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "rgba(200,121,58,0.1)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {METRICAS.map((m, i) => (
            <motion.div
              key={m.etiqueta}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i * 0.08}
              className="text-center"
            >
              <p
                className="text-amber leading-none mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                }}
                aria-label={`${m.valor} ${m.etiqueta}`}
              >
                {m.valor}
              </p>
              <p
                className="text-cream/50 text-sm tracking-wide"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                aria-hidden="true"
              >
                {m.etiqueta}
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
