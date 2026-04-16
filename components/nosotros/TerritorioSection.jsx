"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const DATOS = [
  { valor: "[[X]]", unidad: "colmenas", detalle: "activas en producción" },
  { valor: "[[X]] ha", unidad: "de apiario", detalle: "en el monte nativo" },
  { valor: "[[X]]", unidad: "años", detalle: "de trayectoria apícola" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: d },
  }),
};

export default function TerritorioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28"
      style={{ background: "#1A1510" }}
      aria-labelledby="territorio-heading"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "rgba(200,121,58,0.1)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="text-amber text-xs tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          El Territorio
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Texto ── */}
          <div>
            <motion.h2
              id="territorio-heading"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.1}
              className="text-white-soft mb-6 leading-[1.15]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              }}
            >
              Monte cordobés,<br />norte de Córdoba
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.2}
              className="text-cream/65 leading-relaxed mb-4"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              {/* [[DESCRIPCIÓN DEL TERRITORIO: especies melíferas presentes, altitud, temperatura media, épocas de floración]] */}
              Obispo Trejo se ubica en el norte de la provincia de Córdoba,
              a [[ALTITUD]] metros sobre el nivel del mar, con temperaturas
              que oscilan entre [[T MIN]]°C y [[T MAX]]°C. La flora melífera
              nativa incluye [[ESPECIES]] entre otras, lo que determina el
              perfil aromático y el color de nuestra miel.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.3}
              className="text-cream/65 leading-relaxed"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              {/* [[ESTACIONALIDAD: meses de mayor floración, cosecha, descanso de las colmenas]] */}
              La temporada de mayor producción se extiende de [[MES]] a [[MES]].
              Las colmenas tienen períodos de descanso que garantizan la
              sostenibilidad del apiario sin sobreexplotación.
            </motion.p>
          </div>

          {/* ── Datos destacados ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {DATOS.map((dato, i) => (
              <motion.div
                key={dato.unidad}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={0.2 + i * 0.1}
                className="flex items-center gap-5 p-5 rounded-[4px]"
                style={{
                  background: "#201A13",
                  border: "1px solid rgba(200,121,58,0.15)",
                }}
              >
                <div
                  className="shrink-0 w-[3px] self-stretch rounded-full"
                  style={{ background: "rgba(200,121,58,0.5)" }}
                />
                <div>
                  <p
                    className="text-amber leading-none mb-0.5"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 400,
                      fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                    }}
                  >
                    {dato.valor}
                  </p>
                  <p
                    className="text-cream/80 text-sm font-medium"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
                  >
                    {dato.unidad}
                  </p>
                  <p
                    className="text-cream/40 text-xs"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                  >
                    {dato.detalle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "rgba(200,121,58,0.1)" }}
      />
    </section>
  );
}
