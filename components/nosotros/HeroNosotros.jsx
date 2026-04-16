"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PRODUCT_BLUR_URL } from "@/lib/blur-placeholder";

/* IMAGE: colocar en /public/nosotros/hero-apiario.webp */
const HERO_IMAGE = "/nosotros/hero-apiario.webp";
const HAS_IMAGE = false; // → cambiar a true cuando la imagen esté en /public/nosotros/

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay: d },
  }),
};

export default function HeroNosotros() {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: "75vh" }}
      aria-label="Sobre nosotros"
    >
      {/* Gradient fallback */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 90% at 50% 40%, #2A1F12 0%, #1A1510 45%, #0D0A06 100%)",
        }}
      />

      {/* Background image — se activa cuando HAS_IMAGE = true */}
      {HAS_IMAGE && (
        <Image
          src={HERO_IMAGE}
          alt="Apiario Sabores de Monte en las sierras de Córdoba"
          fill
          priority
          sizes="100vw"
          className="object-cover z-0"
          placeholder="blur"
          blurDataURL={PRODUCT_BLUR_URL}
          style={{ filter: "brightness(0.45)" }}
        />
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,10,6,0.5) 0%, rgba(13,10,6,0.55) 50%, rgba(13,10,6,0.9) 100%)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute z-[2] w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #C8793A, transparent 70%)",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-32 pb-24">
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-amber text-xs tracking-[0.3em] uppercase mb-6"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          Sobre Nosotros · Obispo Trejo, Córdoba
        </motion.p>

        <motion.h1
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="text-white-soft mb-6 leading-[1.1]"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 300,
            fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
          }}
        >
          {/* [[TITULAR HERO: conexión productor-cliente B2B, máximo 10 palabras]] */}
          Producción apícola directa,
          <br />
          <span style={{ color: "var(--color-amber, #C8793A)" }}>
            sin eslabones de por medio
          </span>
        </motion.h1>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-cream/70 text-lg leading-relaxed max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
        >
          {/* [[BAJADA: qué somos en lenguaje B2B, sin poesía]] */}
          Productores apícolas en Obispo Trejo con más de{" "}
          <strong className="text-cream/90 font-medium">
            [[X]] años de trayectoria
          </strong>
          . Proveemos miel y productos gourmet al canal mayorista con precio
          de origen y trato directo.
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 z-[3] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-base))",
        }}
      />
    </section>
  );
}
