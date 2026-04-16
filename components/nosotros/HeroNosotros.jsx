"use client";

import Image from "next/image";
import { PRODUCT_BLUR_URL } from "@/lib/blur-placeholder";

/* IMAGE: colocar en /public/nosotros/hero-apiario.webp */
const HERO_IMAGE = "/nosotros/hero-apiario.webp";
const HAS_IMAGE  = false; // → true cuando la imagen esté en /public/nosotros/

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

      {/* Background image — activo cuando HAS_IMAGE = true */}
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

      {/* Overlay: from #0D0A06 → #0D0A06/60 → transparent */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #0D0A06 0%, rgba(13,10,6,0.6) 50%, transparent 100%)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute z-[2] w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #C8793A, transparent 70%)",
          top: "15%", left: "50%", transform: "translateX(-50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-32 pb-24">

        <p
          className="hero-fade-up text-amber uppercase mb-6"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "12px",
            letterSpacing: "0.18em",
            "--hero-delay": "100ms",
          }}
        >
          Sobre Nosotros · Obispo Trejo, Córdoba
        </p>

        <h1
          className="hero-fade-up text-white-soft mb-6"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 300,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: "0.95",
            letterSpacing: "-0.02em",
            "--hero-delay": "250ms",
          }}
        >
          Producción apícola directa,
          <br />
          <span style={{ color: "#C8793A" }}>
            sin eslabones de por medio
          </span>
        </h1>

        <p
          className="hero-fade-up text-cream/70 text-lg leading-relaxed max-w-xl mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            "--hero-delay": "420ms",
          }}
        >
          {/* [[BAJADA: qué somos en lenguaje B2B, sin poesía]] */}
          Productores apícolas en Obispo Trejo con más de{" "}
          <strong className="text-cream/90 font-medium">
            [[X]] años de trayectoria
          </strong>
          . Proveemos miel y productos gourmet al canal mayorista con precio
          de origen y trato directo.
        </p>
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
