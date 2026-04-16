"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { PRODUCT_BLUR_URL } from "@/lib/blur-placeholder";

const DATOS = [
  { valor: "137",    unidad: "msnm",          detalle: "altitud del territorio" },
  { valor: "136 km", unidad: "de Córdoba",    detalle: "capital provincial" },
  { valor: "[[X]]+", unidad: "colmenas",      detalle: "activas en producción" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: d },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: (d = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.65, ease: "easeOut", delay: d },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: (d = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.65, ease: "easeOut", delay: d },
  }),
};

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
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(13,10,6,0.35) 100%)",
        }}
      />
    </div>
  );
}

export default function TerritorioSection() {
  const headerRef  = useRef(null);
  const historiaRef = useRef(null);
  const floraRef   = useRef(null);
  const mielRef    = useRef(null);

  const headerInView   = useInView(headerRef,   { once: true, margin: "-80px" });
  const historiaInView = useInView(historiaRef, { once: true, margin: "-80px" });
  const floraInView    = useInView(floraRef,    { once: true, margin: "-80px" });
  const mielInView     = useInView(mielRef,     { once: true, margin: "-80px" });

  return (
    <section
      style={{ background: "#1A1510" }}
      aria-labelledby="territorio-heading"
    >
      <div
        className="h-px"
        style={{ background: "rgba(200,121,58,0.1)" }}
      />

      {/* ─── Header + datos destacados ─── */}
      <div
        ref={headerRef}
        className="relative py-20 lg:py-28"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            custom={0}
            className="text-amber text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            El Territorio
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <motion.h2
                id="territorio-heading"
                variants={fadeUp}
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                custom={0.1}
                className="text-white-soft mb-6 leading-[1.15]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                }}
              >
                Monte cordobés,<br />noreste de Córdoba
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                custom={0.2}
                className="text-cream/65 leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                Obispo Trejo es un pueblo cordobés ideal para la producción
                de miel premium gracias a su ubicación en el noreste de Córdoba
                y su entorno natural rico en flora nativa. Su historia y
                biodiversidad aportan un valor único para el segmento B2B
                en comercialización de miel.
              </motion.p>
            </div>

            {/* Datos destacados */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {DATOS.map((dato, i) => (
                <motion.div
                  key={dato.unidad}
                  variants={fadeUp}
                  initial="hidden"
                  animate={headerInView ? "visible" : "hidden"}
                  custom={0.2 + i * 0.1}
                  className="flex items-center gap-5 p-5 rounded-[4px]"
                  style={{
                    background: "#201A13",
                    border: "1px solid rgba(200,121,58,0.15)",
                  }}
                >
                  <div
                    className="shrink-0 w-[3px] self-stretch rounded-full"
                    style={{ background: "rgba(200,121,58,0.5)" }}
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
                    <p
                      className="text-cream/80 text-sm"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
                    >
                      {dato.unidad}
                    </p>
                    <p
                      className="text-cream/40 text-xs"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                    >
                      {dato.detalle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-px mx-6 lg:mx-8" style={{ background: "rgba(200,121,58,0.08)" }} />

      {/* ─── Historia del Lugar ─── */}
      <div ref={historiaRef} className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate={historiaInView ? "visible" : "hidden"}
            >
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={historiaInView ? "visible" : "hidden"}
                custom={0.05}
                className="text-amber/70 text-xs tracking-[0.25em] uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                Historia del Lugar
              </motion.p>
              <motion.h3
                variants={fadeUp}
                initial="hidden"
                animate={historiaInView ? "visible" : "hidden"}
                custom={0.1}
                className="text-white-soft mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                  lineHeight: 1.2,
                }}
              >
                Fundada en 1883, con historia y encanto rural
              </motion.h3>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={historiaInView ? "visible" : "hidden"}
                custom={0.2}
                className="text-cream/65 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                Obispo Trejo, en el departamento Río Primero, se fundó el
                9 de marzo de 1883 como Villa San Antonio, con terrenos
                donados por José Manuel Celayes al Obispado. En 1880
                llegaron los primeros pobladores, y en 1920 adoptó su
                nombre actual en honor al obispo Hernando de Trejo y
                Sanabria, fundador de la Universidad Nacional de Córdoba.
              </motion.p>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={historiaInView ? "visible" : "hidden"}
                custom={0.3}
                className="text-cream/65 leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                Ubicado a 136 km de la capital provincial, a 137 msnm
                junto a la Ruta Provincial 17, conserva un encanto rural
                con arquitectura colonial que sostiene una comunidad
                apícola con décadas de tradición.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate={historiaInView ? "visible" : "hidden"}
              custom={0.1}
            >
              <SectionImage
                src="/img/obispo-trejo/obispo-trejo-4.png"
                alt="Vista aérea de Obispo Trejo mostrando la iglesia y la plaza central, Córdoba, Argentina"
              />
              <p
                className="mt-2.5 text-cream/30 text-xs text-center"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Vista aérea de Obispo Trejo · Iglesia y plaza central
              </p>
            </motion.div>

          </div>
        </div>
      </div>

      <div className="h-px mx-6 lg:mx-8" style={{ background: "rgba(200,121,58,0.08)" }} />

      {/* ─── Riqueza de la Flora ─── */}
      <div ref={floraRef} className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate={floraInView ? "visible" : "hidden"}
              custom={0.1}
              className="order-2 lg:order-1"
            >
              <SectionImage
                src="/img/obispo-trejo/obispo-trejo-2.png"
                alt="Monte nativo cordobés con tonos otoñales — biodiversidad que alimenta las colmenas de Sabores de Monte"
              />
              <p
                className="mt-2.5 text-cream/30 text-xs text-center"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Flora de monte nativo · Noreste de Córdoba
              </p>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate={floraInView ? "visible" : "hidden"}
              className="order-1 lg:order-2"
            >
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={floraInView ? "visible" : "hidden"}
                custom={0.05}
                className="text-amber/70 text-xs tracking-[0.25em] uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                Riqueza de la Flora
              </motion.p>
              <motion.h3
                variants={fadeUp}
                initial="hidden"
                animate={floraInView ? "visible" : "hidden"}
                custom={0.1}
                className="text-white-soft mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                  lineHeight: 1.2,
                }}
              >
                Algarrobo, mistol y monte nativo chaqueño
              </motion.h3>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={floraInView ? "visible" : "hidden"}
                custom={0.2}
                className="text-cream/65 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                La zona noreste de Córdoba presenta relictos de monte nativo
                chaqueño con especies como algarrobo y mistol, fuentes clave
                de néctar y polen para las abejas. Esta flora regional,
                combinada con vegetación acompañante del llano, ofrece
                diversidad botánica que enriquece la producción apícola.
              </motion.p>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={floraInView ? "visible" : "hidden"}
                custom={0.3}
                className="text-cream/65 leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                El paisaje pampeano-chaqueño soporta flores nativas
                resistentes, sin agroquímicos intensivos, ideales para
                miel multifloral. Una ventaja competitiva que los compradores
                institucionales valoran cada vez más.
              </motion.p>
            </motion.div>

          </div>
        </div>
      </div>

      <div className="h-px mx-6 lg:mx-8" style={{ background: "rgba(200,121,58,0.08)" }} />

      {/* ─── Miel Producida ─── */}
      <div ref={mielRef} className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate={mielInView ? "visible" : "hidden"}
            >
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={mielInView ? "visible" : "hidden"}
                custom={0.05}
                className="text-amber/70 text-xs tracking-[0.25em] uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                Sabor y Textura
              </motion.p>
              <motion.h3
                variants={fadeUp}
                initial="hidden"
                animate={mielInView ? "visible" : "hidden"}
                custom={0.1}
                className="text-white-soft mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                  lineHeight: 1.2,
                }}
              >
                Notas florales, frutales y cálidas. Dulzor moderado.
              </motion.h3>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={mielInView ? "visible" : "hidden"}
                custom={0.2}
                className="text-cream/65 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                La miel de Obispo Trejo destaca por notas florales,
                frutales, vegetales y cálidas, con dulzor bajo a
                moderado e intensidad media. Su textura es natural y
                pura, libre de aditivos, gracias a la alimentación de
                abejas en flora autóctona sin agroquímicos intensivos.
              </motion.p>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={mielInView ? "visible" : "hidden"}
                custom={0.3}
                className="text-cream/65 leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                Estas características la posicionan como miel monofloral
                (algarrobo, mistol) o multifloral premium para el canal
                B2B, con aroma único y producción sostenible desde
                apiarios locales.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate={mielInView ? "visible" : "hidden"}
              custom={0.1}
            >
              <SectionImage
                src="/img/obispo-trejo/obispo-trejo-8.png"
                alt="Abeja recolectando néctar de flor silvestre al atardecer — flora nativa de Obispo Trejo"
                aspect="3/4"
              />
              <p
                className="mt-2.5 text-cream/30 text-xs text-center"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Flora nativa · Obispo Trejo, Córdoba
              </p>
            </motion.div>

          </div>
        </div>
      </div>

      <div
        className="h-px"
        style={{ background: "rgba(200,121,58,0.1)" }}
      />
    </section>
  );
}
