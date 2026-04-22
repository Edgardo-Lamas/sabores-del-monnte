"use client";

import { useState, useCallback, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useTracking } from "@/lib/use-tracking";
import { motion } from "framer-motion";
import { ShoppingBag, LogOut, Tag, CheckCircle } from "lucide-react";
import Image from "next/image";
import { tiendaProducts, ESCALAS, getEscalaIndex } from "@/lib/tienda-products";
import CartDrawer from "@/components/CartDrawer";
import OrderConfirmModal from "@/components/OrderConfirmModal";

/* ─── Animation ─── */
const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: d },
  }),
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/* ─── Category filter tabs ─── */
const CATS = [
  { value: "todos",  label: "Todos"  },
  { value: "miel",   label: "Miel"   },
  { value: "aceite", label: "Aceite" },
  { value: "sal",    label: "Sal"    },
];

/* ─── Component ─── */

export default function TiendaView({ empresa, userName, userEmail }) {
  /* ── Tracking ── */
  const track = useTracking(userEmail, userName);

  useEffect(() => {
    track("visita");
  }, [track]);

  /* ── State ── */
  const [activeFilter,   setActiveFilter]   = useState("todos");
  const [cartItems,      setCartItems]       = useState([]);
  const [cartOpen,       setCartOpen]        = useState(false);
  const [confirmOpen,    setConfirmOpen]     = useState(false);
  const [orderLoading,   setOrderLoading]    = useState(false);
  const [orderSuccess,   setOrderSuccess]    = useState(false);

  /* ── Cart helpers ── */
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalKg   = cartItems.reduce((s, i) => s + i.kgUnit * i.qty, 0);
  const escalaIdx = getEscalaIndex(totalKg);

  const addToCart = useCallback((product, presentacion) => {
    const cartKey = `${product.id}__${presentacion.label}`;
    track("carrito_agregado", { product_id: product.id, nombre: product.nombre, presentacion: presentacion.label });
    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartKey === cartKey);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === cartKey ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          cartKey,
          nombre:       product.nombre,
          presentacion: presentacion.label,
          kgUnit:       presentacion.kgUnit,
          precios:      presentacion.precios,
          qty:          1,
        },
      ];
    });
  }, [track]);

  const updateQty = useCallback((cartKey, newQty) => {
    if (newQty < 1) {
      setCartItems((prev) => prev.filter((i) => i.cartKey !== cartKey));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.cartKey === cartKey ? { ...i, qty: newQty } : i))
      );
    }
  }, []);

  /* ── Order submission ── */
  async function submitOrder() {
    setOrderLoading(true);
    try {
      const res = await fetch("/api/pedidos", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((i) => ({
            cartKey:       i.cartKey,
            nombre:        i.nombre,
            presentacion:  i.presentacion,
            qty:           i.qty,
            precioUnitario: i.precios[escalaIdx],
            subtotal:      i.precios[escalaIdx] * i.qty,
          })),
          escala: ESCALAS[escalaIdx].label,
          total:  cartItems.reduce(
            (s, i) => s + i.precios[escalaIdx] * i.qty,
            0
          ),
        }),
      });
      if (!res.ok) throw new Error("Error al guardar el pedido");
      setOrderSuccess(true);
      setCartItems([]);
    } catch (err) {
      console.error(err);
    } finally {
      setOrderLoading(false);
      setConfirmOpen(false);
    }
  }

  /* ── Products filtered ── */
  const filtered =
    activeFilter === "todos"
      ? tiendaProducts
      : tiendaProducts.filter((p) => p.categoria === activeFilter);

  /* ── Render ── */
  return (
    <>
      {/* ─────────────── HEADER ─────────────── */}
      <header
        className="sticky top-0 z-30 px-6 lg:px-8"
        style={{
          background: "rgba(26, 21, 16, 0.97)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(200, 121, 58, 0.15)",
        }}
      >
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          {/* Left — branding + welcome */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span
                className="text-white-soft text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
              >
                Tienda Mayorista
              </span>
              <span
                className="text-amber text-xs truncate max-w-[200px]"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                {empresa || userName}
              </span>
            </div>
          </div>

          {/* Right — cart + logout */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-[4px] transition-all duration-200"
              style={{
                background: "rgba(200, 121, 58, 0.1)",
                border: "1px solid rgba(200, 121, 58, 0.3)",
                color: "#C8793A",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200, 121, 58, 0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(200, 121, 58, 0.1)"; }}
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              <span
                className="text-sm hidden sm:inline"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                Carrito
              </span>
              {cartCount > 0 && (
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[11px]"
                  style={{
                    background: "#C8793A",
                    color: "#0D0A06",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] text-cream/40 hover:text-cream/70 transition-colors duration-200"
              title="Cerrar sesión"
            >
              <LogOut size={15} />
              <span
                className="text-xs hidden sm:inline"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Salir
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────── ORDER SUCCESS BANNER ──────────────�� */}
      {orderSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 px-5 py-4 rounded-[4px] flex items-center gap-3 max-w-7xl mx-auto"
          style={{
            background: "rgba(200, 121, 58, 0.08)",
            border: "1px solid rgba(200, 121, 58, 0.35)",
          }}
        >
          <CheckCircle size={18} className="text-amber shrink-0" strokeWidth={1.5} />
          <div>
            <p
              className="text-cream text-sm"
              style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
            >
              ¡Pedido recibido!
            </p>
            <p
              className="text-cream/50 text-xs"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Nos comunicamos por WhatsApp en las próximas horas para coordinar la entrega.
            </p>
          </div>
          <button
            onClick={() => setOrderSuccess(false)}
            className="ml-auto text-cream/30 hover:text-cream/60 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* ───────��─────── MAIN CONTENT ─────────────── */}
      <main
        className="max-w-7xl mx-auto px-6 lg:px-8 py-8"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        {/* Page title + filters */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0}
              className="text-amber text-xs tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              Catálogo mayorista
            </motion.p>
            <motion.h1
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="text-white-soft"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              }}
            >
              Bienvenido, {empresa || userName}
            </motion.h1>
          </div>

          {/* Category filters */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="flex flex-wrap gap-2"
          >
            {CATS.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className="px-4 py-1.5 text-xs rounded-[4px] transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  background:
                    activeFilter === cat.value
                      ? "rgba(200, 121, 58, 0.9)"
                      : "rgba(200, 121, 58, 0.08)",
                  color:
                    activeFilter === cat.value
                      ? "#0D0A06"
                      : "rgba(226, 208, 168, 0.65)",
                  border:
                    activeFilter === cat.value
                      ? "1px solid transparent"
                      : "1px solid rgba(200, 121, 58, 0.15)",
                }}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Escala info strip */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="mb-8 px-5 py-3 rounded-[4px] flex flex-wrap gap-4 items-center"
          style={{
            background: "#1A1510",
            border: "1px solid rgba(200, 121, 58, 0.15)",
          }}
        >
          <div className="flex items-center gap-2">
            <Tag size={13} className="text-amber" strokeWidth={1.5} />
            <span
              className="text-cream/50 text-xs"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              Escala de precios:
            </span>
          </div>
          {ESCALAS.map((e, i) => (
            <span
              key={e.label}
              className="text-xs px-2.5 py-0.5 rounded-[3px]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: i === escalaIdx && cartCount > 0 ? 600 : 400,
                background:
                  i === escalaIdx && cartCount > 0
                    ? "rgba(200, 121, 58, 0.2)"
                    : "rgba(200, 121, 58, 0.06)",
                border:
                  i === escalaIdx && cartCount > 0
                    ? "1px solid rgba(200, 121, 58, 0.5)"
                    : "1px solid rgba(200, 121, 58, 0.1)",
                color:
                  i === escalaIdx && cartCount > 0
                    ? "#C8793A"
                    : "rgba(226, 208, 168, 0.5)",
              }}
            >
              {e.label}
            </span>
          ))}
        </motion.div>

        {/* Products grid */}
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              escalaIdx={escalaIdx}
              onAdd={addToCart}
            />
          ))}
        </motion.div>
      </main>

      {/* ─────────────── CART DRAWER ───────��─────── */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={updateQty}
        onConfirm={() => {
          setCartOpen(false);
          setConfirmOpen(true);
        }}
      />

      {/* ─────────────── ORDER CONFIRM MODAL ───────────���─── */}
      <OrderConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        items={cartItems}
        onSubmit={submitOrder}
        loading={orderLoading}
      />
    </>
  );
}

/* ─── ProductCard (tienda) ─── */

function ProductCard({ product, escalaIdx, onAdd }) {
  const [selectedPres, setSelectedPres] = useState(0);
  const pres = product.presentaciones[selectedPres];

  return (
    <motion.div
      variants={cardVariants}
      className="group flex flex-col rounded-[4px] overflow-hidden"
      style={{
        background: "#1A1510",
        border: "1px solid rgba(200, 121, 58, 0.15)",
        transition: "border-color 0.3s ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200, 121, 58, 0.5)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(200, 121, 58, 0.15)"; }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <Image
          src={product.imagen}
          alt={product.nombre}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.badge && (
          <div
            className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-[3px] text-[10px] tracking-wide uppercase"
            style={{
              background: "rgba(200, 121, 58, 0.9)",
              color: "#0D0A06",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
            }}
          >
            {product.badge}
          </div>
        )}
        <div
          className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #1A1510)" }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category */}
        <span
          className="text-amber/60 text-[10px] tracking-[0.15em] uppercase mb-1"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          {product.categoria}
        </span>

        {/* Name */}
        <p
          className="text-white-soft text-base mb-1 group-hover:text-gold transition-colors duration-300"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 500, lineHeight: 1.25 }}
        >
          {product.nombre}
        </p>

        {/* Desc */}
        <p
          className="text-cream/50 text-xs mb-3 leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.descripcion}
        </p>

        {/* Presentation selector */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.presentaciones.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setSelectedPres(i)}
              className="text-[10px] px-2 py-0.5 rounded-[3px] transition-all duration-200"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: selectedPres === i ? 600 : 400,
                background:
                  selectedPres === i
                    ? "rgba(200, 121, 58, 0.25)"
                    : "rgba(200, 121, 58, 0.06)",
                border:
                  selectedPres === i
                    ? "1px solid rgba(200, 121, 58, 0.6)"
                    : "1px solid rgba(200, 121, 58, 0.12)",
                color:
                  selectedPres === i
                    ? "#C8793A"
                    : "rgba(226, 208, 168, 0.5)",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Price tiers table */}
        <div
          className="mb-4 rounded-[3px] overflow-hidden"
          style={{ border: "1px solid rgba(200, 121, 58, 0.1)" }}
        >
          {ESCALAS.map((escala, i) => (
            <div
              key={escala.label}
              className="flex items-center justify-between px-3 py-1.5"
              style={{
                background:
                  i === escalaIdx
                    ? "rgba(200, 121, 58, 0.1)"
                    : i % 2 === 0
                    ? "rgba(200, 121, 58, 0.03)"
                    : "transparent",
                borderBottom:
                  i < ESCALAS.length - 1
                    ? "1px solid rgba(200, 121, 58, 0.07)"
                    : "none",
              }}
            >
              <span
                className="text-[10px]"
                style={{
                  fontFamily: "var(--font-body)",
                  color: i === escalaIdx ? "#C8793A" : "rgba(226, 208, 168, 0.4)",
                  fontWeight: i === escalaIdx ? 600 : 400,
                }}
              >
                {escala.label}
              </span>
              <span
                className="text-[11px]"
                style={{
                  fontFamily: "var(--font-body)",
                  color:
                    i === escalaIdx
                      ? "#F0A835"
                      : "rgba(226, 208, 168, 0.5)",
                  fontWeight: i === escalaIdx ? 700 : 400,
                }}
              >
                ${pres.precios[i].toLocaleString("es-AR")}
              </span>
            </div>
          ))}
        </div>

        <div className="flex-1" />

        {/* Add to cart */}
        <button
          onClick={() => onAdd(product, pres)}
          className="w-full py-2.5 text-sm rounded-[4px] transition-all duration-200"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            background: "#C8793A",
            color: "#0D0A06",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#F0A835"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#C8793A"; }}
        >
          Agregar al pedido
        </button>
      </div>
    </motion.div>
  );
}
