"use client";

import { useState, useEffect } from "react";
import { useTracking } from "@/lib/use-tracking";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Leaf, Shield, Zap, Heart, Droplets, Award,
  ChefHat, Flame, Star, ShieldCheck, Package,
  Plus, Minus, ShoppingBag,
} from "lucide-react";
import { PRODUCT_BLUR_URL } from "@/lib/blur-placeholder";
import { categoryLabels } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

const ICONS = {
  Leaf, Shield, Zap, Heart, Droplets, Award,
  ChefHat, Flame, Star, ShieldCheck, Package,
};

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: d },
  }),
};

export default function ProductDetailView({ product, userEmail, userName }) {
  const catLabel = categoryLabels[product.categoria] ?? product.categoria;
  const { addItem } = useCart();
  const track = useTracking(userEmail, userName);
  const { data: session } = useSession() ?? {};
  const isMayorista = session?.user?.rol === "mayorista";
  const [descuento, setDescuento] = useState(15);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((d) => { if (d.descuento_mayorista) setDescuento(d.descuento_mayorista); })
      .catch(() => {});
  }, []);

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [qty, setQty]                 = useState(1);
  const [added, setAdded]             = useState(false);

  useEffect(() => {
    track("producto_visto", { product_id: product.id, nombre: product.nombre });
  }, [track, product.id, product.nombre]);

  const pres = product.presentaciones[selectedIdx];
  const precioClub = Math.round(pres.precioBase * (1 - descuento / 100));
  const precioMostrar = isMayorista ? precioClub : pres.precioBase;

  function handleAdd() {
    const precioFinal = isMayorista ? precioClub : pres.precioBase;
    for (let i = 0; i < qty; i++) addItem(product, pres, precioFinal);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--color-base)" }}>

      {/* Ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-[0.04] blur-[120px] pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, #C8793A, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-24">

        {/* Back */}
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

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Image */}
          <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0.1}>
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

          {/* Info + compra */}
          <div>
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

            <motion.p
              variants={fadeIn} initial="hidden" animate="visible" custom={0.3}
              className="text-cream/70 leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              {product.descripcionLarga}
            </motion.p>

            {/* Origen */}
            <motion.div
              variants={fadeIn} initial="hidden" animate="visible" custom={0.35}
              className="flex items-center gap-2 mb-8"
            >
              <span className="text-amber/50 text-[11px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                Origen
              </span>
              <div className="h-px flex-1 max-w-[40px]" style={{ background: "rgba(200,121,58,0.2)" }} />
              <span className="text-cream/55 text-sm"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}>
                {product.origen}
              </span>
            </motion.div>

            {/* ─── Bloque de compra ─── */}
            <motion.div
              variants={fadeIn} initial="hidden" animate="visible" custom={0.4}
              className="p-5 rounded-[4px] mb-6"
              style={{ background: "#1A1510", border: "1px solid rgba(200,121,58,0.18)" }}
            >
              {/* Selector de presentación */}
              <p className="text-amber/50 text-[11px] tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                Presentación
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {product.presentaciones.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => { setSelectedIdx(i); setQty(1); }}
                    className="px-4 py-1.5 text-sm rounded-[3px] transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      background: selectedIdx === i ? "rgba(200,121,58,0.18)" : "transparent",
                      border: selectedIdx === i
                        ? "1px solid rgba(200,121,58,0.6)"
                        : "1px solid rgba(200,121,58,0.18)",
                      color: selectedIdx === i ? "#F0A835" : "rgba(226,208,168,0.6)",
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Precios */}
              <div className="flex gap-4 mb-5">
                {isMayorista ? (
                  <>
                    <div>
                      <p className="text-cream/40 text-[10px] uppercase tracking-[0.12em] mb-0.5"
                        style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                        Precio regular
                      </p>
                      <p className="text-cream/40 text-xl line-through"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                        ${pres.precioBase.toLocaleString("es-AR")}
                      </p>
                    </div>
                    <div className="w-px self-stretch" style={{ background: "rgba(200,121,58,0.15)" }} />
                    <div>
                      <p className="text-amber/70 text-[10px] uppercase tracking-[0.12em] mb-0.5"
                        style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                        Tu precio Club Origen (-{descuento}%)
                      </p>
                      <p className="text-amber text-xl"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                        ${precioMostrar.toLocaleString("es-AR")}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-cream/40 text-[10px] uppercase tracking-[0.12em] mb-0.5"
                        style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                        Precio
                      </p>
                      <p className="text-cream/80 text-xl"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                        ${pres.precioBase.toLocaleString("es-AR")}
                      </p>
                    </div>
                    <div className="w-px self-stretch" style={{ background: "rgba(200,121,58,0.15)" }} />
                    <div>
                      <p className="text-amber/70 text-[10px] uppercase tracking-[0.12em] mb-0.5"
                        style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                        Precio Comunidad
                      </p>
                      <p className="text-amber text-xl"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                        ${precioClub.toLocaleString("es-AR")}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Cantidad + agregar */}
              <div className="flex items-center gap-3">
                {/* Qty */}
                <div
                  className="flex items-center gap-0 rounded-[4px] overflow-hidden shrink-0"
                  style={{ border: "1px solid rgba(200,121,58,0.3)" }}
                >
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-9 h-10 flex items-center justify-center transition-colors duration-200"
                    style={{ color: "#C8793A" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,121,58,0.12)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    aria-label="Reducir cantidad"
                  >
                    <Minus size={13} />
                  </button>
                  <span
                    className="w-9 h-10 flex items-center justify-center text-cream text-sm"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 600, borderLeft: "1px solid rgba(200,121,58,0.2)", borderRight: "1px solid rgba(200,121,58,0.2)" }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-9 h-10 flex items-center justify-center transition-colors duration-200"
                    style={{ color: "#C8793A" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,121,58,0.12)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    aria-label="Aumentar cantidad"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm rounded-[4px] transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    background: added ? "rgba(200,121,58,0.3)" : "#C8793A",
                    color: "#0D0A06",
                  }}
                  onMouseEnter={(e) => { if (!added) e.currentTarget.style.background = "#F0A835"; }}
                  onMouseLeave={(e) => { if (!added) e.currentTarget.style.background = "#C8793A"; }}
                >
                  <ShoppingBag size={15} strokeWidth={2} />
                  {added ? "¡Agregado!" : "Sumar al pedido"}
                </button>
              </div>

              {/* Nota comunidad */}
              <p className="text-cream/30 text-[11px] mt-3 leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}>
                Precio comunidad aplicado automáticamente para cuentas aprobadas.{" "}
                <Link href="/acceso-mayorista" className="text-amber/60 hover:text-amber underline underline-offset-2 transition-colors duration-200">
                  Solicitá tu acceso.
                </Link>
              </p>
            </motion.div>

            {/* Ver catálogo */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0.45}>
              <Link
                href="/productos"
                className="inline-flex items-center justify-center w-full py-2.5 text-sm text-cream/60 hover:text-white-soft rounded-[4px] transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  border: "1px solid rgba(200,121,58,0.15)",
                }}
              >
                Ver todo el catálogo
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Benefits */}
        {product.beneficios?.length > 0 && (
          <motion.div
            variants={fadeIn} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            custom={0}
            className="mt-20"
          >
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
              <div className="flex-1 h-px" style={{ background: "rgba(200, 121, 58, 0.15)" }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.beneficios.map((b, i) => {
                const Icon = ICONS[b.icono];
                return (
                  <motion.div
                    key={i}
                    variants={fadeIn} initial="hidden"
                    whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                    custom={i * 0.07}
                    className="flex items-start gap-3 p-4 rounded-[4px]"
                    style={{ background: "#1A1510", border: "1px solid rgba(200, 121, 58, 0.1)" }}
                  >
                    {Icon && (
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                        style={{ background: "rgba(200, 121, 58, 0.1)" }}
                      >
                        <Icon size={15} strokeWidth={1.5} className="text-amber" aria-hidden="true" />
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

      </div>
    </div>
  );
}
