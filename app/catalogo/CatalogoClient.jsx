"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Plus, Check, ArrowRight, ExternalLink } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { PRODUCT_BLUR_URL } from "@/lib/blur-placeholder";

const FEATURED_IDS = [
  "miel-multifloral",
  "miel-cremada",
  "aceite-oliva-unico",
  "aceite-ajo-negro",
  "sal-provenzal",
  "pimienta-mix",
  "dulce-leche-artesanal",
  "polen-apicola",
];

const featured = FEATURED_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean);

const WA_NUMBER = "541122499832";

function ProductCatalogCard({ product }) {
  const { addItem, setDrawerOpen } = useCart();
  const [addedIdx, setAddedIdx] = useState(null);
  const pres = product.presentaciones[0];

  function handleAdd(presIdx) {
    addItem(product, product.presentaciones[presIdx]);
    setAddedIdx(presIdx);
    setTimeout(() => setAddedIdx(null), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col rounded-[4px] overflow-hidden"
      style={{ background: "#1A1510", border: "1px solid rgba(200,121,58,0.18)" }}
    >
      {/* Imagen */}
      <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
        <Image
          src={product.imagen}
          alt={product.imageAlt ?? product.nombre}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={PRODUCT_BLUR_URL}
        />
        {product.badge && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 rounded-[3px] text-[10px] tracking-wide uppercase z-10"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              background: "rgba(200,121,58,0.92)",
              color: "#0D0A06",
            }}
          >
            {product.badge}
          </div>
        )}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #1A1510)" }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3">
        <p
          className="text-amber/60 text-[10px] tracking-[0.15em] uppercase mb-1"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          {product.categoria}
        </p>
        <p
          className="text-white-soft text-sm leading-tight mb-2"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 400, lineHeight: 1.2 }}
        >
          {product.nombre}
        </p>

        {/* Precio */}
        <div
          className="flex items-center justify-between px-2 py-1.5 rounded-[3px] mb-3"
          style={{ background: "rgba(200,121,58,0.06)", border: "1px solid rgba(200,121,58,0.1)" }}
        >
          <div>
            <p className="text-cream/40 text-[9px] uppercase tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
              Desde
            </p>
            <p className="text-cream/70 text-xs font-semibold" style={{ fontFamily: "var(--font-body)" }}>
              ${pres.precioBase.toLocaleString("es-AR")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-amber/70 text-[9px] uppercase tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
              Comunidad
            </p>
            <p className="text-amber text-xs font-bold" style={{ fontFamily: "var(--font-body)" }}>
              ${pres.precioMayorista.toLocaleString("es-AR")}
            </p>
          </div>
        </div>

        {/* Presentaciones */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.presentaciones.map((p, i) => (
            <button
              key={p.label}
              onClick={() => handleAdd(i)}
              className="flex items-center gap-1 px-2 py-1 rounded-[3px] text-[11px] transition-all duration-200"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                background: addedIdx === i ? "rgba(200,121,58,0.25)" : "rgba(200,121,58,0.08)",
                border: addedIdx === i ? "1px solid rgba(200,121,58,0.6)" : "1px solid rgba(200,121,58,0.15)",
                color: addedIdx === i ? "#F0A835" : "rgba(226,208,168,0.55)",
              }}
            >
              {addedIdx === i ? <Check size={10} /> : <Plus size={10} />}
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <Link
            href={`/productos/${product.id}`}
            className="block text-center text-[11px] py-1.5 rounded-[3px] transition-colors duration-200"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              color: "rgba(200,121,58,0.6)",
              border: "1px solid rgba(200,121,58,0.15)",
            }}
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function CatalogoClient() {
  const { items, setDrawerOpen } = useCart();
  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-base)" }}>

      {/* Ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] opacity-[0.05] blur-[100px] pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, #C8793A, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-12 pb-32">

        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          {/* Logo mark */}
          <div className="flex justify-center mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ border: "1px solid rgba(200,121,58,0.4)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-amber">
                <path
                  d="M12 2L17.196 5.5V12.5L12 16L6.804 12.5V5.5L12 2Z"
                  stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
                />
                <path
                  d="M12 16L17.196 19.5V22L12 22L6.804 22V19.5L12 16Z"
                  stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5"
                />
              </svg>
            </div>
          </div>

          <h1
            className="text-white-soft mb-1"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 6vw, 2.4rem)",
            }}
          >
            Origen Natural
          </h1>
          <p
            className="text-cream/40 text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Distribuidora artesanal
          </p>

          <div
            className="inline-block px-4 py-2 rounded-[4px] text-sm"
            style={{
              background: "rgba(200,121,58,0.08)",
              border: "1px solid rgba(200,121,58,0.2)",
              fontFamily: "var(--font-body)",
              color: "rgba(226,208,168,0.7)",
            }}
          >
            Selección de <span style={{ color: "#F0A835", fontWeight: 600 }}>8 productos destacados</span>
          </div>
        </motion.div>

        {/* ─── CTA al sitio completo ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Link
            href="/productos"
            className="flex items-center justify-between w-full px-5 py-4 rounded-[4px] group transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(200,121,58,0.15), rgba(200,121,58,0.05))",
              border: "1px solid rgba(200,121,58,0.35)",
            }}
          >
            <div>
              <p
                className="text-white-soft text-sm font-semibold mb-0.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Ver catálogo completo
              </p>
              <p
                className="text-cream/45 text-xs"
                style={{ fontFamily: "var(--font-body)" }}
              >
                +26 productos · todos los precios · pedidos online
              </p>
            </div>
            <div
              className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 group-hover:scale-110 shrink-0"
              style={{ background: "rgba(200,121,58,0.2)" }}
            >
              <ArrowRight size={16} className="text-amber" />
            </div>
          </Link>
        </motion.div>

        {/* ─── Grid de productos ─── */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {featured.map((product) => (
            <ProductCatalogCard key={product.id} product={product} />
          ))}
        </div>

        {/* ─── Footer CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div
            className="p-5 rounded-[4px]"
            style={{ background: "#1A1510", border: "1px solid rgba(200,121,58,0.18)" }}
          >
            <p
              className="text-white-soft text-base mb-1"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
            >
              ¿Querés ver todo el catálogo?
            </p>
            <p
              className="text-cream/50 text-sm mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Miel, aceites, sales, pimientas, dulce de leche, frutos secos y más.
            </p>
            <Link
              href="/productos"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-[4px] text-sm font-semibold transition-all duration-300 hover:opacity-90"
              style={{
                background: "#C8793A",
                color: "#0D0A06",
                fontFamily: "var(--font-body)",
              }}
            >
              <ExternalLink size={15} />
              Ir al catálogo completo
            </Link>
          </div>

          <p
            className="text-cream/25 text-[11px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Precios mayoristas · Entrega CABA y zona norte · Mínimo $80.000
          </p>
        </motion.div>

      </div>

      {/* ─── Carrito flotante ─── */}
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-6 right-5 z-50 flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
          style={{
            background: "#C8793A",
            color: "#0D0A06",
          }}
        >
          <ShoppingBag size={18} strokeWidth={2} />
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem" }}>
            {totalItems} {totalItems === 1 ? "producto" : "productos"}
          </span>
        </motion.button>
      )}

    </div>
  );
}
