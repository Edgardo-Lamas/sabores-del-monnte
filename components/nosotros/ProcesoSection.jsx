"use client";

import { Flower2, Droplets, Package, Truck } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

const PASOS = [
  {
    num: "01",
    Icon: Flower2,
    titulo: "Manejo de colmenas",
    descripcion:
      "Revisiones periódicas sin uso de antibióticos. Cada colmena está identificada y registrada con historial de producción accesible para auditorías.",
  },
  {
    num: "02",
    Icon: Droplets,
    titulo: "Extracción en frío",
    descripcion:
      "Extracción sin calor para preservar enzimas, polifenoles y propiedades antibacterianas. Temperatura máxima de proceso: [[X]]°C. Sin filtros de presión.",
  },
  {
    num: "03",
    Icon: Package,
    titulo: "Envasado artesanal",
    descripcion:
      "Envasado en instalaciones propias con habilitación bromatológica [[NÚMERO]]. Trazabilidad de lote en cada envase.",
  },
  {
    num: "04",
    Icon: Truck,
    titulo: "Distribución directa",
    descripcion:
      "Despacho directo desde Obispo Trejo. Sin acopiadores. El precio de origen llega intacto al canal mayorista con tiempos de entrega acordados por zona.",
  },
];

export default function ProcesoSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28"
      style={{ background: "var(--color-base)" }}
      aria-labelledby="proceso-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="max-w-2xl mb-16">
          <p
            className="reveal-up text-amber uppercase mb-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "12px", letterSpacing: "0.18em" }}
          >
            El Proceso
          </p>
          <h2
            id="proceso-heading"
            className="reveal-up text-white-soft"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
              lineHeight: "1.05",
              "--reveal-delay": "80ms",
            }}
          >
            De la colmena al envase,<br />sin intermediarios
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PASOS.map((paso, i) => (
            <div
              key={paso.num}
              className="reveal-up card-lift group relative p-6 rounded-[4px] flex flex-col"
              style={{
                background: "#1A1510",
                border: "1px solid rgba(200,121,58,0.15)",
                "--reveal-delay": `${i * 80}ms`,
              }}
            >
              <span
                className="text-amber/20 font-mono text-xs tracking-widest mb-4 block"
                style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
                aria-hidden="true"
              >
                {paso.num}
              </span>

              <paso.Icon
                size={26}
                strokeWidth={1.5}
                className="text-amber mb-4 group-hover:text-gold transition-colors duration-300"
                aria-hidden="true"
              />

              <h3
                className="text-cream text-base mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 600, lineHeight: 1.3 }}
              >
                {paso.titulo}
              </h3>

              <p
                className="text-cream/60 text-sm leading-relaxed flex-1"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                {paso.descripcion}
              </p>

              {i < PASOS.length - 1 && (
                <div
                  className="hidden lg:block absolute top-[52px] -right-[11px] w-5 h-px z-10"
                  style={{ background: "rgba(200,121,58,0.25)" }}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
