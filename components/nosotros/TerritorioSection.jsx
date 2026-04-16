"use client";

import Image from "next/image";
import { PRODUCT_BLUR_URL } from "@/lib/blur-placeholder";
import { useScrollReveal } from "./useScrollReveal";

const DATOS = [
  { valor: "137",     unidad: "msnm",         detalle: "altitud del territorio" },
  { valor: "136 km",  unidad: "de Córdoba",    detalle: "capital provincial" },
  { valor: "[[X]]+",  unidad: "colmenas",      detalle: "activas en producción" },
];

function SectionImage({ src, alt, aspect = "4/3" }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[4px]"
      style={{
        aspectRatio: aspect,
        border: "1px solid rgba(200,121,58,0.12)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL={PRODUCT_BLUR_URL}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 60%, rgba(13,10,6,0.35) 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export default function TerritorioSection() {
  const headerRef   = useScrollReveal();
  const historiaRef = useScrollReveal();
  const floraRef    = useScrollReveal();
  const mielRef     = useScrollReveal();

  return (
    <section style={{ background: "#1A1510" }} aria-labelledby="territorio-heading">

      <div className="h-px" style={{ background: "rgba(200,121,58,0.1)" }} aria-hidden="true" />

      {/* ─── Header + datos ─── */}
      <div ref={headerRef} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p
            className="reveal-up text-amber uppercase mb-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "12px", letterSpacing: "0.18em" }}
          >
            El Territorio
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2
                id="territorio-heading"
                className="reveal-up text-white-soft mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                  lineHeight: "1.05",
                  "--reveal-delay": "80ms",
                }}
              >
                Monte cordobés,<br />noreste de Córdoba
              </h2>
              <p
                className="reveal-up text-cream/65 leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400, "--reveal-delay": "140ms" }}
              >
                Obispo Trejo es un pueblo cordobés ideal para la producción
                de miel premium gracias a su ubicación en el noreste de Córdoba
                y su entorno natural rico en flora nativa. Su historia y
                biodiversidad aportan un valor único para el segmento B2B
                en comercialización de miel.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {DATOS.map((dato, i) => (
                <div
                  key={dato.unidad}
                  className="reveal-up flex items-center gap-5 p-5 rounded-[4px]"
                  style={{
                    background: "#201A13",
                    border: "1px solid rgba(200,121,58,0.15)",
                    "--reveal-delay": `${(i + 1) * 80}ms`,
                  }}
                >
                  <div
                    className="shrink-0 w-[3px] self-stretch rounded-full"
                    style={{ background: "rgba(200,121,58,0.5)" }}
                    aria-hidden="true"
                  />
                  <div>
                    <p
                      className="text-amber leading-none mb-0.5"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 400,
                        fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                      }}
                    >
                      {dato.valor}
                    </p>
                    <p className="text-cream/80 text-sm" style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}>
                      {dato.unidad}
                    </p>
                    <p className="text-cream/40 text-xs" style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}>
                      {dato.detalle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-px mx-6 lg:mx-8" style={{ background: "rgba(200,121,58,0.08)" }} aria-hidden="true" />

      {/* ─── Historia ─── */}
      <div ref={historiaRef} className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <div>
              <p
                className="reveal-up text-amber/70 uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "12px", letterSpacing: "0.18em" }}
              >
                Historia del Lugar
              </p>
              <h3
                className="reveal-up text-white-soft mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                  lineHeight: "1.2",
                  "--reveal-delay": "80ms",
                }}
              >
                Fundada en 1883, con historia y encanto rural
              </h3>
              <p
                className="reveal-up text-cream/65 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400, "--reveal-delay": "140ms" }}
              >
                Obispo Trejo, en el departamento Río Primero, se fundó el
                9 de marzo de 1883 como Villa San Antonio, con terrenos donados
                por José Manuel Celayes al Obispado. En 1920 adoptó su nombre
                actual en honor al obispo Hernando de Trejo y Sanabria,
                fundador de la Universidad Nacional de Córdoba.
              </p>
              <p
                className="reveal-up text-cream/65 leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400, "--reveal-delay": "200ms" }}
              >
                Ubicado a 136 km de la capital provincial, a 137 msnm junto
                a la Ruta Provincial 17, conserva un encanto rural con
                arquitectura colonial que sostiene una comunidad apícola con
                décadas de tradición.
              </p>
            </div>

            <div className="reveal-up" style={{ "--reveal-delay": "100ms" }}>
              <SectionImage
                src="/img/obispo-trejo/obispo-trejo-4.png"
                alt="Vista aérea de Obispo Trejo mostrando la iglesia y la plaza central, Córdoba, Argentina"
              />
              <p className="mt-2.5 text-cream/30 text-xs text-center" style={{ fontFamily: "var(--font-body)" }}>
                Vista aérea de Obispo Trejo · Iglesia y plaza central
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="h-px mx-6 lg:mx-8" style={{ background: "rgba(200,121,58,0.08)" }} aria-hidden="true" />

      {/* ─── Flora ─── */}
      <div ref={floraRef} className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <div className="reveal-up order-2 lg:order-1" style={{ "--reveal-delay": "100ms" }}>
              <SectionImage
                src="/img/obispo-trejo/obispo-trejo-2.png"
                alt="Monte nativo cordobés con tonos otoñales — biodiversidad que alimenta las colmenas de Sabores de Monte"
              />
              <p className="mt-2.5 text-cream/30 text-xs text-center" style={{ fontFamily: "var(--font-body)" }}>
                Flora de monte nativo · Noreste de Córdoba
              </p>
            </div>

            <div className="order-1 lg:order-2">
              <p
                className="reveal-up text-amber/70 uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "12px", letterSpacing: "0.18em" }}
              >
                Riqueza de la Flora
              </p>
              <h3
                className="reveal-up text-white-soft mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                  lineHeight: "1.2",
                  "--reveal-delay": "80ms",
                }}
              >
                Algarrobo, mistol y monte nativo chaqueño
              </h3>
              <p
                className="reveal-up text-cream/65 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400, "--reveal-delay": "140ms" }}
              >
                La zona noreste de Córdoba presenta relictos de monte nativo
                chaqueño con especies como algarrobo y mistol, fuentes clave
                de néctar y polen para las abejas. Esta flora regional,
                combinada con vegetación acompañante del llano, ofrece
                diversidad botánica que enriquece la producción apícola.
              </p>
              <p
                className="reveal-up text-cream/65 leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400, "--reveal-delay": "200ms" }}
              >
                El paisaje pampeano-chaqueño soporta flores nativas resistentes,
                sin agroquímicos intensivos, ideales para miel multifloral.
                Una ventaja competitiva que los compradores institucionales
                valoran cada vez más.
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="h-px mx-6 lg:mx-8" style={{ background: "rgba(200,121,58,0.08)" }} aria-hidden="true" />

      {/* ─── Miel ─── */}
      <div ref={mielRef} className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <div>
              <p
                className="reveal-up text-amber/70 uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "12px", letterSpacing: "0.18em" }}
              >
                Sabor y Textura
              </p>
              <h3
                className="reveal-up text-white-soft mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                  lineHeight: "1.2",
                  "--reveal-delay": "80ms",
                }}
              >
                Notas florales, frutales y cálidas. Dulzor moderado.
              </h3>
              <p
                className="reveal-up text-cream/65 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400, "--reveal-delay": "140ms" }}
              >
                La miel de Obispo Trejo destaca por notas florales, frutales,
                vegetales y cálidas, con dulzor bajo a moderado e intensidad
                media. Su textura es natural y pura, libre de aditivos, gracias
                a la alimentación de abejas en flora autóctona sin agroquímicos.
              </p>
              <p
                className="reveal-up text-cream/65 leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400, "--reveal-delay": "200ms" }}
              >
                Estas características la posicionan como miel monofloral
                (algarrobo, mistol) o multifloral premium para el canal B2B,
                con aroma único y producción sostenible desde apiarios locales.
              </p>
            </div>

            <div className="reveal-up" style={{ "--reveal-delay": "100ms" }}>
              <SectionImage
                src="/img/obispo-trejo/obispo-trejo-8.png"
                alt="Abeja recolectando néctar de flor silvestre al atardecer — flora nativa de Obispo Trejo"
                aspect="3/4"
              />
              <p className="mt-2.5 text-cream/30 text-xs text-center" style={{ fontFamily: "var(--font-body)" }}>
                Flora nativa · Obispo Trejo, Córdoba
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="h-px" style={{ background: "rgba(200,121,58,0.1)" }} aria-hidden="true" />

    </section>
  );
}
