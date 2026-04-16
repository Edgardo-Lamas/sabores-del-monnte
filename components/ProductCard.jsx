"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { PRODUCT_BLUR_URL } from "@/lib/blur-placeholder";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ProductCard({ product }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group flex flex-col rounded-[4px] overflow-hidden transition-all duration-400"
      style={{
        background: "#1A1510",
        border: "1px solid rgba(200, 121, 58, 0.15)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200, 121, 58, 0.5)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(200, 121, 58, 0.15)"; }}
    >
      {/* ─── Image ─── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <Image
          src={product.imagen}
          alt={product.imageAlt ?? product.nombre}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          placeholder="blur"
          blurDataURL={PRODUCT_BLUR_URL}
        />

        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-3 left-3 z-10 px-3 py-1 rounded-[3px] text-[11px] tracking-wide uppercase"
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

        {/* Bottom gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #1A1510)" }}
        />
      </div>

      {/* ─── Content ─── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category tag */}
        <span
          className="text-amber/60 text-[11px] tracking-[0.15em] uppercase mb-2"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          {product.categoria}
        </span>

        {/* Name */}
        <div
          className="text-white-soft text-lg mb-2 group-hover:text-gold transition-colors duration-300"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 500, lineHeight: 1.25 }}
        >
          {product.nombre}
        </div>

        {/* Description */}
        <p
          className="text-cream/60 text-sm mb-4 leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.descripcion}
        </p>

        {/* Presentaciones */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.presentaciones.map((p) => (
            <span
              key={p}
              className="text-[11px] px-2 py-0.5 rounded-[3px] text-cream/50"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                background: "rgba(200, 121, 58, 0.08)",
                border: "1px solid rgba(200, 121, 58, 0.12)",
              }}
            >
              {p}
            </span>
          ))}
        </div>

        <div className="flex-1" />

        {/* Price lock notice */}
        <div
          className="flex items-center gap-2 mb-4 py-2.5 px-3 rounded-[3px]"
          style={{ background: "rgba(200, 121, 58, 0.06)" }}
        >
          <Lock size={13} className="text-amber/50 shrink-0" aria-hidden="true" />
          <span
            className="text-cream/40 text-[11px] leading-tight"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            Precios disponibles para cuentas mayoristas
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/productos/${product.id}`}
          className="inline-flex items-center justify-center w-full py-2.5 text-sm text-amber border rounded-[4px] hover:bg-amber hover:text-base transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            borderColor: "rgba(200, 121, 58, 0.4)",
          }}
        >
          Ver más
        </Link>
      </div>
    </motion.div>
  );
}
