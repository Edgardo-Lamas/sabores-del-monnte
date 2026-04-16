"use client";

import { useScrollReveal } from "./useScrollReveal";

const METRICAS = [
  { valor: "[[X]]+", etiqueta: "colmenas activas" },
  { valor: "[[X]]",  etiqueta: "años en el rubro" },
  { valor: "[[X]] kg", etiqueta: "producción anual" },
  { valor: "[[X]]",  etiqueta: "clientes B2B activos" },
];

export default function RespaldoSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-20"
      style={{ background: "#201A13" }}
      aria-label="Métricas de producción"
    >
      <div className="h-px absolute top-0 left-0 right-0" style={{ background: "rgba(200,121,58,0.1)" }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {METRICAS.map((m, i) => (
            <div
              key={m.etiqueta}
              className="reveal-up text-center"
              style={{ "--reveal-delay": `${i * 80}ms` }}
            >
              <p
                className="text-amber leading-none mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                }}
              >
                {m.valor}
              </p>
              <p
                className="text-cream/50 text-sm tracking-wide"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                {m.etiqueta}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px absolute bottom-0 left-0 right-0" style={{ background: "rgba(200,121,58,0.1)" }} aria-hidden="true" />
    </section>
  );
}
