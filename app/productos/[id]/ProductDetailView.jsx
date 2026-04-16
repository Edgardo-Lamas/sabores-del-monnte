"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Leaf, Shield, Zap, Heart, Droplets, Award,
  ChefHat, Flame, Star, ShieldCheck, Package,
  Lock,
} from "lucide-react";
import { PRODUCT_BLUR_URL } from "@/lib/blur-placeholder";
import { categoryLabels } from "@/lib/products";

/* ─── Icon map — keys match icono strings in lib/products.js ─── */
const ICONS = {
  Leaf, Shield, Zap, Heart, Droplets, Award,
  ChefHat, Flame, Star, ShieldCheck, Package,
};

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: d },
  }),
};

export default function ProductDetailView({ product }) {
  const catLabel = categoryLabels[product.categoria] ?? product.categoria;

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-base)" }}
    >
      {/* ─── Ambient glow ─── */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-[0.04] blur-[120px] pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, #C8793A, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-24">

        {/* ─── Back link ─── */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0}>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 text-cream/50 hover:text-amber text-sm transition-colors duration-300 mb-10"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            <ArrowLeft size={15} strokeWidth={1.5} />
            Volver al catálogo
          </Link>
        </motion.div>

        {/* ─── Main grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Left — Image ── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            <div
              className="relative w-full overflow-hidden rounded-[4px]"
              style={{
                aspectRatio: "3/4",
                background: "#1A1510",
                border: "1px solid rgba(200, 121, 58, 0.15)",
              }}
            >
              <Image
                src={product.imagen}
                alt={product.imageAlt ?? product.nombre}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={PRODUCT_BLUR_URL}
                priority
              />

              {/* Badge */}
              {product.badge && (
                <div
                  className="absolute top-4 left-4 z-10 px-3 py-1 rounded-[3px] text-[11px] tracking-wide uppercase"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    background: "rgba(200, 121, 58, 0.9)",
                    color: "#0D0A06",
                  }}
                >
                  {product.badge}
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Right — Info ── */}
          <div>
            {/* Category + name */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0.2}>
              <p
                className="text-amber/70 text-xs tracking-[0.25em] uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                {catLabel}
              </p>
              <h1
                className="text-white-soft mb-5 leading-[1.1]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                }}
              >
                {product.nombre}
              </h1>
            </motion.div>

            {/* Long description */}
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="text-cream/70 leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              {product.descripcionLarga}
            </motion.p>

            {/* Origen */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.35}
              className="flex items-center gap-2 mb-8"
            >
              <span
                className="text-amber/50 text-[11px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                Origen
              </span>
              <div
                className="h-px flex-1 max-w-[40px]"
                style={{ background: "rgba(200,121,58,0.2)" }}
              />
              <span
                className="text-cream/55 text-sm"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                {product.origen}
              </span>
            </motion.div>

            {/* Presentaciones */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="mb-10"
            >
              <p
                className="text-amber/50 text-[11px] tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                Presentaciones disponibles
              </p>
              <div className="flex flex-wrap gap-2">
                {product.presentaciones.map((p) => (
                  <span
                    key={p}
                    className="px-4 py-1.5 text-sm text-cream/70 rounded-[3px]"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      background: "rgba(200, 121, 58, 0.08)",
                      border: "1px solid rgba(200, 121, 58, 0.18)",
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Price lock notice */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.45}
              className="flex items-center gap-3 py-3 px-4 rounded-[4px] mb-8"
              style={{ background: "rgba(200, 121, 58, 0.06)", border: "1px solid rgba(200,121,58,0.1)" }}
            >
              <Lock size={14} className="text-amber/50 shrink-0" aria-hidden="true" />
              <p
                className="text-cream/45 text-sm"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                Precios mayoristas disponibles para cuentas aprobadas.{" "}
                <Link
                  href="/acceso-mayorista"
                  className="text-amber/70 hover:text-amber transition-colors duration-200 underline underline-offset-2"
                >
                  Solicitá tu acceso.
                </Link>
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/acceso-mayorista"
                className="inline-flex items-center justify-center px-7 py-3 text-sm rounded-[4px] transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  background: "rgba(200, 121, 58, 0.9)",
                  color: "#0D0A06",
                }}
              >
                Solicitá tu cuenta mayorista
              </Link>
              <Link
                href="/productos"
                className="inline-flex items-center justify-center px-7 py-3 text-sm text-cream/70 hover:text-white-soft rounded-[4px] transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  border: "1px solid rgba(200,121,58,0.2)",
                }}
              >
                Ver todo el catálogo
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ─── Benefits section ─── */}
        {product.beneficios?.length > 0 && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0}
            className="mt-20"
          >
            {/* Section header */}
            <div className="flex items-center gap-4 mb-10">
              <h2
                className="text-white-soft shrink-0"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                }}
              >
                Beneficios y características
              </h2>
              <div
                className="flex-1 h-px"
                style={{ background: "rgba(200, 121, 58, 0.15)" }}
              />
            </div>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.beneficios.map((b, i) => {
                const Icon = ICONS[b.icono];
                return (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    custom={i * 0.07}
                    className="flex items-start gap-3 p-4 rounded-[4px]"
                    style={{
                      background: "#1A1510",
                      border: "1px solid rgba(200, 121, 58, 0.1)",
                    }}
                  >
                    {Icon && (
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                        style={{ background: "rgba(200, 121, 58, 0.1)" }}
                      >
                        <Icon
                          size={15}
                          strokeWidth={1.5}
                          className="text-amber"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <p
                      className="text-cream/65 text-sm leading-relaxed pt-1"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                    >
                      {b.texto}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── Bottom CTA strip ─── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          custom={0}
          className="mt-20 text-center"
        >
          <div
            className="inline-block w-full max-w-2xl py-10 px-8 rounded-[4px]"
            style={{
              background: "#1A1510",
              border: "1px solid rgba(200, 121, 58, 0.15)",
            }}
          >
            <p
              className="text-amber text-xs tracking-[0.25em] uppercase mb-3"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              ¿Te interesa este producto?
            </p>
            <h3
              className="text-white-soft mb-3"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
              }}
            >
              Accedé a precios mayoristas
            </h3>
            <p
              className="text-cream/55 text-sm mb-7 max-w-sm mx-auto"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              Distribuidores, restaurantes y tiendas gourmet tienen precios
              diferenciados por volumen.
            </p>
            <Link
              href="/acceso-mayorista"
              className="inline-flex items-center px-8 py-3 text-sm rounded-[4px] transition-colors duration-300"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                background: "rgba(200, 121, 58, 0.9)",
                color: "#0D0A06",
              }}
            >
              Solicitá tu cuenta mayorista
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
