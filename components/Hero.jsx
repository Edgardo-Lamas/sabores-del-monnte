"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* ─── Animation Variants ─── */

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const bounce = {
  animate: {
    y: [0, 8, 0],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Fallback gradient (debajo del video) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 40%, #2A1F12 0%, #1A1510 40%, #0D0A06 100%)",
        }}
      />

      {/* ─── Video de fondo ─── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.55)" }}
      >
        <source src="/video/miel-opt.mp4" type="video/mp4" />
      </video>

      {/* Subtle texture noise */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ─── Dark overlay (60% opacity) ─── */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,10,6,0.4) 0%, rgba(13,10,6,0.6) 50%, rgba(13,10,6,0.85) 100%)",
        }}
      />

      {/* ─── Ambient light glow ─── */}
      <div
        className="absolute z-[2] w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #C8793A, transparent 70%)",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* ─── Content ─── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-amber text-xs tracking-[0.3em] uppercase mb-8"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          Obispo Trejo · Córdoba · Argentina
        </motion.p>

        {/* Titular */}
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-white-soft mb-8 leading-[1.1]"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 300,
            fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
          }}
        >
          Miel artesanal directa
          <br />
          <span className="text-gradient-amber">del productor a tu negocio</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="text-cream/80 text-lg max-w-[560px] mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
        >
          Proveemos a distribuidores, restaurantes y tiendas gourmet con miel
          100% natural certificada de origen. Pedidos mayoristas con precios
          diferenciados por volumen.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          {/* CTA Primario */}
          <Link
            href="/acceso-mayorista"
            className="inline-flex items-center px-8 py-3.5 bg-amber text-base text-sm rounded-[4px] hover:bg-gold transition-colors duration-300"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Solicitá tu cuenta mayorista
          </Link>

          {/* CTA Secundario */}
          <Link
            href="/productos"
            className="group inline-flex items-center gap-2 text-cream hover:text-white-soft text-sm transition-colors duration-300"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            Ver catálogo de productos
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={1.2}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-cream/40 text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Scroll
        </span>
        <motion.div
          variants={bounce}
          animate="animate"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-amber/60"
          >
            <path
              d="M10 4V16M10 16L5 11M10 16L15 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* ─── Bottom gradient fade into next section ─── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[3] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-base))",
        }}
      />
    </section>
  );
}
