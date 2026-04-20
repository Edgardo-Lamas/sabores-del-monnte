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
                  className="w-full py-3 text-sm rounded-[4px] transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    background: "#25D366",
                    color: "#fff",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#1ebe5d"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#25D366"; }}
                >
                  {/* WhatsApp icon */}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Confirmar por WhatsApp
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
