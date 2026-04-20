"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartDrawer({ open, onClose, items, onUpdateQty, onConfirm }) {
  const total = items.reduce((sum, it) => sum + it.precioBase * it.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(13, 10, 6, 0.75)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 h-full z-50 flex flex-col"
            style={{
              width: "min(420px, 100vw)",
              background: "#1A1510",
              borderLeft: "1px solid rgba(200, 121, 58, 0.2)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(200, 121, 58, 0.12)" }}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} className="text-amber" strokeWidth={1.5} />
                <span
                  className="text-white-soft"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1rem" }}
                >
                  Pedido
                </span>
                {items.length > 0 && (
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[11px]"
                    style={{
                      background: "rgba(200, 121, 58, 0.9)",
                      color: "#0D0A06",
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                    }}
                  >
                    {items.reduce((s, i) => s + i.qty, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-cream/40 hover:text-cream/80 transition-colors"
                aria-label="Cerrar carrito"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <ShoppingBag size={40} strokeWidth={1} className="text-cream/20 mb-4" />
                  <p
                    className="text-cream/30 text-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    El pedido está vacío.
                    <br />Agregá productos desde el catálogo.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.cartKey}
                    className="flex items-center gap-3 p-3 rounded-[4px]"
                    style={{
                      background: "#201A13",
                      border: "1px solid rgba(200, 121, 58, 0.1)",
                    }}
                  >
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-white-soft text-sm truncate"
                        style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
                      >
                        {item.nombre}
                      </p>
                      <p
                        className="text-cream/50 text-xs mt-0.5"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {item.presentacion} · ${item.precioBase.toLocaleString("es-AR")} c/u
                      </p>
                    </div>

                    {/* Qty controls */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onUpdateQty(item.cartKey, item.qty - 1)}
                        className="w-6 h-6 rounded-[3px] flex items-center justify-center transition-colors"
                        style={{
                          background: "rgba(200, 121, 58, 0.1)",
                          border: "1px solid rgba(200, 121, 58, 0.2)",
                          color: "#C8793A",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200, 121, 58, 0.25)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(200, 121, 58, 0.1)"; }}
                      >
                        <Minus size={11} />
                      </button>
                      <span
                        className="text-cream text-sm w-6 text-center"
                        style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
                      >
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.cartKey, item.qty + 1)}
                        className="w-6 h-6 rounded-[3px] flex items-center justify-center transition-colors"
                        style={{
                          background: "rgba(200, 121, 58, 0.1)",
                          border: "1px solid rgba(200, 121, 58, 0.2)",
                          color: "#C8793A",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200, 121, 58, 0.25)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(200, 121, 58, 0.1)"; }}
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div
                      className="text-right shrink-0 w-20"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
                    >
                      <span className="text-gold text-sm">
                        ${(item.precioBase * item.qty).toLocaleString("es-AR")}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-5 py-5 space-y-4"
                style={{ borderTop: "1px solid rgba(200, 121, 58, 0.12)" }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-cream/60 text-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Total estimado
                  </span>
                  <span
                    className="text-white-soft text-lg"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
                  >
                    ${total.toLocaleString("es-AR")}
                  </span>
                </div>

                <p
                  className="text-cream/30 text-[11px] leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Precio base. Cuentas de comunidad mayorista aplican descuento adicional.
                </p>

                <button
                  onClick={onConfirm}
                  className="w-full py-3 text-sm rounded-[4px] transition-all duration-300"
                  style={{
                    background: "#C8793A",
                    color: "#0D0A06",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#F0A835"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#C8793A"; }}
                >
                  Confirmar pedido
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
