"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { PRODUCT_BLUR_URL } from "@/lib/blur-placeholder";

/* IMAGE: colocar en /public/nosotros/productor.webp */
const PRODUCTOR_IMAGE = "/nosotros/productor.webp";
const HAS_IMAGE = false; // → cambiar a true cuando la imagen esté lista

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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: d },
  }),
};

export default function HistoriaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.1}
              className="text-amber text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              Nuestra Historia
            </motion.p>

            <motion.h2
              id="historia-heading"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.2}
              className="text-white-soft mb-7 leading-[1.15]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              }}
            >
              {/* [[H2 HISTORIA: ej. "De un apiario familiar a proveedor mayorista"]] */}
              De un apiario familiar a proveedor mayorista
            </motion.h2>

            {/* Párrafo 1: inicio de la producción */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.3}
              className="text-cream/65 leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              {/* [[P1: cómo y cuándo empezó la producción. Ej: año de inicio, cantidad inicial de colmenas, motivación]] */}
              En [[AÑO]] empezamos con [[X]] colmenas en el campo familiar
              de Obispo Trejo. La idea era producir miel para consumo propio
              y venta local, aprovechando la flora melífera del norte cordobés.
            </motion.p>

            {/* Párrafo 2: motivo del paso al canal mayorista */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.4}
              className="text-cream/65 leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              {/* [[P2: por qué pasaron al canal B2B. Ej: demanda, escala, decisión estratégica]] */}
              Con el tiempo la producción creció y encontramos que el canal
              mayorista —restaurantes, distribuidores, tiendas gourmet— valoraba
              un producto sin pasteurizar con trazabilidad directa. Fue una
              decisión de enfoque: menos intermediarios, mejor precio para el
              comprador y mejor rentabilidad para el productor.
            </motion.p>

            {/* Párrafo 3: situación actual */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.5}
              className="text-cream/65 leading-relaxed"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              {/* [[P3: estado actual. Ej: colmenas activas, líneas de productos, alcance geográfico]] */}
              Hoy operamos con [[X]] colmenas activas, producimos [[X]] kg
              anuales de miel y completamos la línea con sales artesanales
              y aceite de oliva virgen extra con Ajo Negro. Atendemos clientes
              en [[PROVINCIAS O REGIONES]] con despacho desde Obispo Trejo.
            </motion.p>
          </motion.div>

          {/* ── Imagen ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.15}
          >
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
                /* Placeholder visual hasta tener la foto */
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                  style={{ background: "#1A1510" }}
                >
                  <div
                    className="w-16 h-16 rounded-full border flex items-center justify-center"
                    style={{ borderColor: "rgba(200,121,58,0.2)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-amber/40">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p
                    className="text-cream/25 text-xs text-center px-4"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Colocar imagen en<br />/public/nosotros/productor.webp
                  </p>
                </div>
              )}

              {/* Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 60%, rgba(13,10,6,0.4) 100%)",
                }}
              />
            </div>

            {/* Caption */}
            <p
              className="mt-3 text-cream/30 text-xs text-center"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              {/* [[NOMBRE DEL PRODUCTOR]], productor apícola desde [[AÑO DE INICIO]] */}
              [[NOMBRE DEL PRODUCTOR]] · Obispo Trejo, Córdoba
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
