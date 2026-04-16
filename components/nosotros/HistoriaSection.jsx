"use client";

import Image from "next/image";
import { PRODUCT_BLUR_URL } from "@/lib/blur-placeholder";
import { useScrollReveal } from "./useScrollReveal";

/* IMAGE: colocar en /public/nosotros/productor.webp */
const PRODUCTOR_IMAGE = "/nosotros/productor.webp";
const HAS_IMAGE = false; // → true cuando la imagen esté lista

export default function HistoriaSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28"
      style={{ background: "var(--color-base)" }}
      aria-labelledby="historia-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Texto ── */}
          <div>
            <p
              className="reveal-up text-amber uppercase mb-4"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0.18em",
              }}
            >
              Nuestra Historia
            </p>

            <h2
              id="historia-heading"
              className="reveal-up text-white-soft mb-7"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                lineHeight: "1.05",
                "--reveal-delay": "80ms",
              }}
            >
              {/* [[H2 HISTORIA]] */}
              De un apiario familiar a proveedor mayorista
            </h2>

            <p
              className="reveal-up text-cream/65 leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400, "--reveal-delay": "140ms" }}
            >
              {/* [[P1: cómo y cuándo empezó la producción]] */}
              En [[AÑO]] empezamos con [[X]] colmenas en el campo familiar
              de Obispo Trejo. La idea era producir miel para consumo propio
              y venta local, aprovechando la flora melífera del norte cordobés.
            </p>

            <p
              className="reveal-up text-cream/65 leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400, "--reveal-delay": "200ms" }}
            >
              {/* [[P2: motivo del paso al canal mayorista]] */}
              Con el tiempo la producción creció y encontramos que el canal
              mayorista —restaurantes, distribuidores, tiendas gourmet— valoraba
              un producto sin pasteurizar con trazabilidad directa. Fue una
              decisión de enfoque: menos intermediarios, mejor precio para el
              comprador y mejor rentabilidad para el productor.
            </p>

            <p
              className="reveal-up text-cream/65 leading-relaxed"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400, "--reveal-delay": "260ms" }}
            >
              {/* [[P3: estado actual]] */}
              Hoy operamos con [[X]] colmenas activas, producimos [[X]] kg
              anuales de miel y completamos la línea con sales artesanales
              y aceite de oliva virgen extra con Ajo Negro. Atendemos clientes
              en [[PROVINCIAS]] con despacho desde Obispo Trejo.
            </p>
          </div>

          {/* ── Imagen ── */}
          <div className="reveal-up" style={{ "--reveal-delay": "120ms" }}>
            <div
              className="relative w-full overflow-hidden rounded-[4px]"
              style={{
                aspectRatio: "4/5",
                background: "#1A1510",
                border: "1px solid rgba(200,121,58,0.15)",
              }}
            >
              {HAS_IMAGE ? (
                <Image
                  src={PRODUCTOR_IMAGE}
                  alt="Productor apícola Sabores de Monte en el apiario de Obispo Trejo"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={PRODUCT_BLUR_URL}
                />
              ) : (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                  style={{ background: "#1A1510" }}
                >
                  <div
                    className="w-16 h-16 rounded-full border flex items-center justify-center"
                    style={{ borderColor: "rgba(200,121,58,0.2)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-amber/40" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-cream/25 text-xs text-center px-4" style={{ fontFamily: "var(--font-body)" }}>
                    Colocar imagen en<br />/public/nosotros/productor.webp
                  </p>
                </div>
              )}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 60%, rgba(13,10,6,0.4) 100%)",
                }}
                aria-hidden="true"
              />
            </div>
            <p className="mt-3 text-cream/30 text-xs text-center" style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}>
              {/* [[NOMBRE DEL PRODUCTOR]] · Obispo Trejo, Córdoba */}
              [[NOMBRE DEL PRODUCTOR]] · Obispo Trejo, Córdoba
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
