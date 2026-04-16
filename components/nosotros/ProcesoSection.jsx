"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Flower2, Droplets, Package, Truck } from "lucide-react";

const PASOS = [
  {
    num: "01",
    Icon: Flower2,
    titulo: "Manejo de colmenas",
    descripcion:
      /* [[PASO 1: garantías del manejo de colmenas para compradores institucionales. Máx 220 caracteres]] */
      "Revisiones periódicas sin uso de antibióticos. Cada colmena está identificada y registrada con historial de producción accesible para auditorías.",
  },
  {
    num: "02",
    Icon: Droplets,
    titulo: "Extracción en frío",
    descripcion:
      /* [[PASO 2: garantías de la extracción en frío. Máx 220 caracteres]] */
      "Extracción sin calor para preservar enzimas, polifenoles y propiedades antibacterianas. Temperatura máxima de proceso: [[X]]°C. Sin filtros de presión.",
  },
  {
    num: "03",
    Icon: Package,
    titulo: "Envasado artesanal",
    descripcion:
      /* [[PASO 3: garantías del envasado. Máx 220 caracteres]] */
      "Envasado en instalaciones propias con habilitación bromatológica [[NÚMERO DE HABILITACIÓN SI DISPONIBLE]]. Trazabilidad de lote en cada envase.",
  },
  {
    num: "04",
    Icon: Truck,
    titulo: "Distribución directa",
    descripcion:
      /* [[PASO 4: garantías de la distribución. Máx 220 caracteres]] */
      "Despacho directo desde Obispo Trejo. Sin acopiadores. El precio de origen llega intacto al canal mayorista con tiempos de entrega acordados por zona.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: d },
  }),
};

export default function ProcesoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28"
      style={{ background: "var(--color-base)" }}
      aria-labelledby="proceso-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
            className="text-amber text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            El Proceso
          </motion.p>
          <motion.h2
            id="proceso-heading"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
            className="text-white-soft leading-[1.15]"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            }}
          >
            De la colmena al envase,<br />sin intermediarios
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PASOS.map((paso, i) => (
            <motion.div
              key={paso.num}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.15 + i * 0.1}
              className="group relative p-6 rounded-[4px] flex flex-col transition-all duration-300"
              style={{
                background: "#1A1510",
                border: "1px solid rgba(200,121,58,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,121,58,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,121,58,0.15)";
              }}
            >
              {/* Step number */}
              <span
                className="text-amber/20 font-mono text-xs tracking-widest mb-4 block"
                style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
                aria-hidden="true"
              >
                {paso.num}
              </span>

              {/* Icon */}
              <paso.Icon
                size={26}
                strokeWidth={1.5}
                className="text-amber mb-4 group-hover:text-gold transition-colors duration-300"
                aria-hidden="true"
              />

              {/* Title */}
              <h3
                className="text-cream text-base mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 600, lineHeight: 1.3 }}
              >
                {paso.titulo}
              </h3>

              {/* Description */}
              <p
                className="text-cream/60 text-sm leading-relaxed flex-1"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                {paso.descripcion}
              </p>

              {/* Connector line — visible solo en lg */}
              {i < PASOS.length - 1 && (
                <div
                  className="hidden lg:block absolute top-[52px] -right-[11px] w-5 h-px z-10"
                  style={{ background: "rgba(200,121,58,0.25)" }}
                  aria-hidden="true"
                />
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
