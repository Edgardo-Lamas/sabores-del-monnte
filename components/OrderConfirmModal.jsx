"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, MessageCircle, Loader2 } from "lucide-react";
import { ESCALAS, getEscalaIndex } from "@/lib/tienda-products";

export default function OrderConfirmModal({ open, onClose, items, onSubmit, loading }) {
  const totalKg   = items.reduce((sum, it) => sum + it.kgUnit * it.qty, 0);
  const escalaIdx = getEscalaIndex(totalKg);
  const total     = items.reduce(
    (sum, it) => sum + it.precios[escalaIdx] * it.qty,
    0
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(13, 10, 6, 0.85)", backdropFilter: "blur(6px)" }}
            onClick={!loading ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="w-full max-w-md rounded-[4px] overflow-hidden"
              style={{
                background: "#1A1510",
                border: "1px solid rgba(200, 121, 58, 0.35)",
                pointerEvents: "auto",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: "1px solid rgba(200, 121, 58, 0.12)" }}
              >
                <span
                  className="text-white-soft text-base"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
                >
                  Resumen del pedido
                </span>
                {!loading && (
                  <button
                    onClick={onClose}
                    className="text-cream/40 hover:text-cream/70 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Items */}
              <div className="px-6 py-4 space-y-2 max-h-52 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.cartKey}
                    className="flex items-center justify-between text-sm"
                  >
                    <span
                      className="text-cream/70"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item.nombre} — {item.presentacion} × {item.qty}
                    </span>
                    <span
                      className="text-gold shrink-0 ml-4"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
                    >
                      ${(item.precios[escalaIdx] * item.qty).toLocaleString("es-AR")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider + total */}
              <div
                className="px-6 py-3 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(200, 121, 58, 0.1)" }}
              >
                <div>
                  <span
                    className="text-cream/50 text-xs block mb-0.5"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Escala aplicada: {ESCALAS[escalaIdx].label}
                  </span>
                  <span
                    className="text-cream/50 text-xs"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Total estimado
                  </span>
                </div>
                <span
                  className="text-white-soft text-xl"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                >
                  ${total.toLocaleString("es-AR")}
                </span>
              </div>

              {/* WhatsApp notice */}
              <div
                className="mx-6 mb-4 px-4 py-3 rounded-[4px] flex items-start gap-3"
                style={{
                  background: "rgba(200, 121, 58, 0.07)",
                  border: "1px solid rgba(200, 121, 58, 0.18)",
                }}
              >
                <MessageCircle
                  size={16}
                  className="text-amber shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <p
                  className="text-cream/60 text-xs leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Nos comunicamos por WhatsApp para coordinar entrega, confirmar
                  disponibilidad y acordar condiciones de pago.
                </p>
              </div>

              {/* Actions */}
              <div
                className="px-6 pb-6 flex gap-3"
              >
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 py-2.5 text-sm rounded-[4px] transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    background: "rgba(200, 121, 58, 0.08)",
                    border: "1px solid rgba(200, 121, 58, 0.2)",
                    color: "rgba(226, 208, 168, 0.7)",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={onSubmit}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm rounded-[4px] transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    background: loading ? "rgba(200, 121, 58, 0.5)" : "#C8793A",
                    color: "#0D0A06",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.background = "#F0A835";
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) e.currentTarget.style.background = "#C8793A";
                  }}
                >
                  {loading && <Loader2 size={14} className="animate-spin" />}
                  {loading ? "Enviando..." : "Confirmar pedido"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
