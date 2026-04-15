"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Package, Truck, ShieldCheck } from "lucide-react";

/* ─── Card Data ─── */

const VALUE_CARDS = [
  {
    Icon: Leaf,
    title: "Origen certificable",
    description:
      "Miel 100% natural de Obispo Trejo, Córdoba. Trazabilidad desde la colmena hasta el envase.",
  },
  {
    Icon: Package,
    title: "Pedidos por volumen",
    description:
      "Precios escalonados según cantidad. Accedé a la tabla de precios mayoristas con tu cuenta verificada.",
  },
  {
    Icon: Truck,
    title: "Logística a todo el país",
    description:
      "Enviamos a toda Argentina. Consultá tiempos y condiciones según tu zona.",
  },
  {
    Icon: ShieldCheck,
    title: "Sin conservantes ni aditivos",
    description:
      "Miel cruda, sin pasteurizar ni filtrar. Análisis bromatológico disponible para descarga.",
  },
];

/* ─── Animation variants ─── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

export default function ValueProposition() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        background: "var(--color-surface)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      {/* Top subtle divider line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px]"
        style={{ background: "rgba(200, 121, 58, 0.2)" }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <div className="text-center mb-16">
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="text-amber text-xs tracking-[0.3em] uppercase mb-5"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Por qué elegirnos
          </motion.p>

          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.15}
            className="text-white-soft mb-5"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Calidad apícola que tu negocio necesita
          </motion.h2>

          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.3}
            className="text-cream/60 max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            Más de 200 colmenas activas en las sierras de Córdoba.
            Extracción propia, sin intermediarios.
          </motion.p>
        </div>

        {/* ─── Cards Grid ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {VALUE_CARDS.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className="group relative p-7 rounded-[4px] transition-all duration-400"
              style={{
                background: "#201A13",
                border: "1px solid rgba(200, 121, 58, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200, 121, 58, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(200, 121, 58, 0.2)";
              }}
            >
              {/* Icon */}
              <div className="mb-5">
                <card.Icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-amber group-hover:text-gold transition-colors duration-300"
                />
              </div>

              {/* Title */}
              <div
                className="text-cream text-lg mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 600, lineHeight: 1.3 }}
              >
                {card.title}
              </div>

              {/* Description */}
              <p
                className="text-cream/70 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                {card.description}
              </p>

              {/* Subtle corner accent on hover */}
              <div
                className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(200,121,58,0.1), transparent 70%)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
