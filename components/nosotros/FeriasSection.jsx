"use client";

import Image from "next/image";
import { useScrollReveal } from "./useScrollReveal";

const FOTOS = [
  {
    src: "/img/ferias-negocios/feria-3.jpg",
    alt: "Ariel atendiendo clientes en feria artesanal con productos Sabores de Monte",
    wide: true,
  },
  {
    src: "/img/ferias-negocios/feria-2.jpg",
    alt: "Exhibición de frascos de miel Sabores de Monte iluminados en feria",
    wide: false,
  },
  {
    src: "/img/ferias-negocios/feria-1.jpg",
    alt: "Productos Sabores de Monte listos para venta en feria gourmet",
    wide: false,
  },
  {
    src: "/img/ferias-negocios/feria-4.jpg",
    alt: "Stand de Sabores de Monte con línea completa de miel en feria",
    wide: false,
  },
];

export default function FeriasSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28"
      style={{ background: "var(--color-base)" }}
      aria-labelledby="ferias-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-14">
          <div>
            <p
              className="reveal-up text-amber uppercase mb-4"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "12px", letterSpacing: "0.18em" }}
            >
              Presencia directa
            </p>
            <h2
              id="ferias-heading"
              className="reveal-up text-white-soft"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                lineHeight: "1.05",
                "--reveal-delay": "80ms",
              }}
            >
              En ferias, mercados<br />
              <span style={{ color: "#C8793A" }}>y negocios gourmet</span>
            </h2>
          </div>
          <p
            className="reveal-up text-cream/60 text-base leading-relaxed"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400, "--reveal-delay": "160ms" }}
          >
            Participamos en ferias artesanales y mercados gourmet de la región para acercar
            nuestros productos directo al consumidor. Cada feria es también una instancia de
            feedback real: entendemos qué busca el cliente final y lo trasladamos al canal
            mayorista. El productor con el que trabajás conoce su producto de primera mano.
          </p>
        </div>

        {/* Grid de fotos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FOTOS.map((foto, i) => (
            <div
              key={i}
              className={`reveal-up relative overflow-hidden rounded-[4px] ${foto.wide ? "col-span-2" : "col-span-1"}`}
              style={{ height: foto.wide ? "320px" : "220px", "--reveal-delay": `${i * 80}ms` }}
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                style={{ filter: "brightness(0.9)" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(13,10,6,0.4) 0%, transparent 60%)" }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
