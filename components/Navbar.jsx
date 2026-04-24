"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, LogOut } from "lucide-react";
import { useScrollPosition } from "@/app/hooks/useScrollPosition";
import { useCart } from "@/lib/cart-context";
import CartDrawer from "@/components/CartDrawer";
import { useSession, signOut } from "next-auth/react";

// WhatsApp Business — 54 (Argentina) + 11 (área) + número
const WA_NUMBER = "541122499832";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/productos", label: "Productos" },
  { href: "/distribuidores", label: "Quiero distribuir" },
];

export default function Navbar() {
  const scrollY = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items, drawerOpen, setDrawerOpen, updateQty, clearCart } = useCart();
  const { data: session } = useSession() ?? {};

  const isScrolled = scrollY > 50;
  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const rol = session?.user?.rol;
  const empresa = session?.user?.empresa || session?.user?.name;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled ? "navbar-solid" : "navbar-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* ─── Logo ─── */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-amber/40 group-hover:border-gold transition-colors duration-300">
                <Image
                  src="/img/logo/logo-2.svg"
                  alt="Sabores de Monte"
                  fill
                  sizes="40px"
                  className="object-cover object-[50%_35%]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white-soft text-lg tracking-wide group-hover:text-gold transition-colors duration-300"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                  Sabores del Monte
                </span>
                <span className="text-cream/50 text-[10px] tracking-[0.25em] uppercase">
                  Distribuidora artesanal
                </span>
              </div>
            </Link>

            {/* ─── Navigation Links (Desktop) ─── */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}
                  className="relative px-4 py-2 text-sm text-cream/70 hover:text-white-soft transition-colors duration-300 group"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}>
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-amber group-hover:w-4/5 transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* ─── Right side ─── */}
            <div className="flex items-center gap-3">
              {/* Cart button */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="relative flex items-center justify-center w-9 h-9 rounded-[4px] transition-colors duration-300"
                style={{ color: "rgba(226, 208, 168, 0.7)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#C8793A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(226, 208, 168, 0.7)"; }}
                aria-label="Ver pedido"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                    style={{ background: "#C8793A", color: "#0D0A06", fontFamily: "var(--font-body)", fontWeight: 700 }}>
                    {totalItems}
                  </span>
                )}
              </button>

              {/* CTA según rol */}
              {rol === "admin" && (
                <Link href="/admin"
                  className="hidden md:inline-flex items-center px-5 py-2.5 text-sm border border-amber/60 text-amber hover:bg-amber hover:text-base rounded-[4px] transition-all duration-300"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                  Panel
                </Link>
              )}

              {rol === "mayorista" && (
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-cream/50 text-xs truncate max-w-[140px]"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                    {empresa}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] text-cream/40 hover:text-amber transition-colors duration-200"
                    title="Cerrar sesión"
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}
                  >
                    <LogOut size={14} />
                    Salir
                  </button>
                </div>
              )}

              {!rol && (
                <Link href="/acceso-mayorista"
                  className="hidden md:inline-flex items-center px-5 py-2.5 text-sm border border-amber/60 text-amber hover:bg-amber hover:text-base rounded-[4px] transition-all duration-300"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                  Club Origen
                </Link>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 group"
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-[1.5px] bg-cream transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[4.5px]" : "group-hover:w-5"}`} />
                <span className={`block w-6 h-[1.5px] bg-cream transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "group-hover:w-4"}`} />
                <span className={`block w-6 h-[1.5px] bg-cream transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[4.5px]" : "group-hover:w-5"}`} />
              </button>
            </div>
          </div>
        </nav>

        {/* ─── Mobile Menu ─── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="md:hidden overflow-hidden"
              style={{ background: "rgba(13, 10, 6, 0.98)", backdropFilter: "blur(16px)" }}
            >
              <div className="px-6 py-6 space-y-1 border-t border-amber/10">
                {NAV_LINKS.map((link, index) => (
                  <motion.div key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}>
                    <Link href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-3 text-lg text-cream/70 hover:text-white-soft hover:pl-2 transition-all duration-300 border-b border-amber/5"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.3 }} className="pt-4 space-y-3">
                  {rol === "admin" && (
                    <Link href="/admin" onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center w-full px-5 py-3 text-sm border border-amber/60 text-amber hover:bg-amber hover:text-base rounded-[4px] transition-all duration-300"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                      Panel admin
                    </Link>
                  )}
                  {rol === "mayorista" && (
                    <button onClick={() => { signOut({ callbackUrl: "/" }); setMobileMenuOpen(false); }}
                      className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm border border-amber/20 text-cream/60 rounded-[4px] transition-all duration-300"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                      <LogOut size={14} /> Cerrar sesión
                    </button>
                  )}
                  {!rol && (
                    <Link href="/acceso-mayorista" onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center w-full px-5 py-3 text-sm border border-amber/60 text-amber hover:bg-amber hover:text-base rounded-[4px] transition-all duration-300"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                      Club Origen
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Cart Drawer ─── */}
      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={items}
        onUpdateQty={updateQty}
        onConfirm={() => {
          const esMayorista = rol === "mayorista";
          const total = items.reduce((s, i) => s + i.precioFinal * i.qty, 0);
          const lineas = items
            .map((i) => `• ${i.nombre} — ${i.presentacion} × ${i.qty} = $${(i.precioFinal * i.qty).toLocaleString("es-AR")}`)
            .join("\n");
          const descuento = esMayorista ? "\n🏷️ *Precio Club Origen aplicado*" : "";
          const msg = `Hola! Quiero realizar el siguiente pedido:\n\n${lineas}${descuento}\n\n💰 *Total estimado: $${total.toLocaleString("es-AR")}*\n\nPor favor confirmar disponibilidad y forma de pago. ¡Gracias!`;
          fetch("/api/actividad", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tipo: "pedido_whatsapp",
              user_email:  session?.user?.email ?? null,
              user_nombre: session?.user?.name  ?? null,
              payload: { total, items: items.length, mayorista: esMayorista },
            }),
          }).catch(() => {});
          window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
          clearCart();
          setDrawerOpen(false);
        }}
      />
    </>
  );
}
