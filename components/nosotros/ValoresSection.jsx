"use client";

import { ScanLine, BarChart3, MessageSquare } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

const PILARES = [
  {
    Icon: ScanLine,
    titulo: "Trazabilidad verificable",
    descripcion:
      "[[Describir: número de lote en envase, análisis bromatológico disponible, acceso a historial de colmena, etc.]]",
  },
  {
    Icon: BarChart3,
    titulo: "Volumen sostenido",
    descripcion:
      "[[Describir: kg disponibles por temporada, política ante escasez, formas de reservar stock, pedido mínimo.]]",
  },
  {
    Icon: MessageSquare,
    titulo: "Atención directa",
    descripcion:
      "[[Describir: canal de contacto preferido (WhatsApp / email), horario de atención, tiempo de respuesta garantizado.]]",
  },
];

export default function ValoresSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28"
      style={{ background: "#1A1510" }}
      aria-labelledby="valores-heading"
    >
      <div className="h-px absolute top-0 left-0 right-0" style={{ background: "rgba(200,121,58,0.1)" }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="reveal-up text-amber uppercase mb-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "12px", letterSpacing: "0.18em" }}
          >
            Cómo Trabajamos
          </p>
          <h2
            id="valores-heading"
            className="reveal-up text-white-soft"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
              lineHeight: "1.05",
              "--reveal-delay": "80ms",
            }}
          >
            Compromisos con el canal B2B
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILARES.map((pilar, i) => (
            <div
              key={pilar.titulo}
              className="reveal-up card-lift group p-7 rounded-[4px]"
              style={{
                background: "#201A13",
                border: "1px solid rgba(200,121,58,0.15)",
                "--reveal-delay": `${i * 80}ms`,
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
                style={{ background: "rgba(200,121,58,0.1)" }}
                aria-hidden="true"
              >
                <pilar.Icon
                  size={18}
                  strokeWidth={1.5}
                  className="text-amber group-hover:text-gold transition-colors duration-300"
                  aria-hidden="true"
                />
              </div>

              <h3
                className="text-cream text-lg mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 600, lineHeight: 1.3 }}
              >
                {pilar.titulo}
              </h3>

              <p
                className="text-cream/60 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                {pilar.descripcion}
              </p>
            </div>
          ))}
        </div>

      </div>

      <div className="h-px absolute bottom-0 left-0 right-0" style={{ background: "rgba(200,121,58,0.1)" }} aria-hidden="true" />
    </section>
  );
}
