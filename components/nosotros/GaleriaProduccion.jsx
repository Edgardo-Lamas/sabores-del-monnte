"use client";

import Image from "next/image";
import { useScrollReveal } from "./useScrollReveal";

const FOTOS = [
  {
    src: "/img/produccion/produccio-2.jpg",
    alt: "Apicultores revisando marco de panal en las sierras de Córdoba",
    className: "col-span-2 row-span-2",
  },
  {
    src: "/img/produccion/produccio-7.jpg",
    alt: "Colmena abierta con marcos de panal repletos de miel",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/img/produccion/produccio-10.jpg",
    alt: "Abejas sobre la colmena durante la cosecha",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/img/produccion/produccio-1.jpg",
    alt: "Tambor de extracción de miel artesanal",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/img/produccion/produccio-9.jpg",
    alt: "Detalle del proceso de extracción de miel en frío",
    className: "col-span-1 row-span-1",
  },
];

export default function GaleriaProduccion() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28"
      style={{ background: "#0A0805" }}
      aria-labelledby="galeria-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="max-w-2xl mb-14">
          <p
            className="reveal-up text-amber uppercase mb-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "12px", letterSpacing: "0.18em" }}
          >
            El Apiario
          </p>
          <h2
            id="galeria-heading"
            className="reveal-up text-white-soft"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
              lineHeight: "1.05",
              "--reveal-delay": "80ms",
            }}
          >
            Así trabajamos,<br />temporada a temporada
          </h2>
          <p
            className="reveal-up text-cream/60 text-base leading-relaxed mt-5"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400, "--reveal-delay": "160ms" }}
          >
            Cada cosecha es un trabajo de campo. Revisamos las colmenas, manejamos el humo,
            extraemos en frío y envasamos en instalaciones propias. Sin intermediarios entre
            la colmena y el envase que llega a tu negocio.
          </p>
        </div>

        {/* Grid de fotos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] md:auto-rows-[220px]">
          {FOTOS.map((foto, i) => (
            <div
              key={i}
              className={`reveal-up relative overflow-hidden rounded-[4px] ${foto.className}`}
              style={{ "--reveal-delay": `${i * 80}ms` }}
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                style={{ filter: "brightness(0.88)" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(13,10,6,0.5) 0%, transparent 50%)" }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
