"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCT_BLUR_URL } from "@/lib/blur-placeholder";

/* ─────────────────────────────────────────────────────────────
   Imágenes: reemplazar con los exports de Canva cuando estén listos
   Rutas esperadas:
     /img/beneficios/beneficios-miel.jpg
     /img/beneficios/beneficios-sal.jpg
     /img/beneficios/beneficios-ajo-negro.jpg
   Por ahora se usan fotos de producto como placeholder.
───────────────────────────────────────────────────────────── */
const LINES = [
  {
    id:       "miel",
    imagen:   "/img/miel/miel-1.png",          // → reemplazar con beneficios-miel.jpg
    imageAlt: "Beneficios de la Miel Artesanal Sabores de Monte",
    label:    "Miel Artesanal",
    titulo:   "Miel que conserva todo lo que la naturaleza puso en ella",
    descripcion:
      "Sin pasteurizar, sin filtrar, sin conservantes. Extraída en frío en nuestro propio apiario del monte cordobés. Cada tarro llega con enzimas activos, polifenoles y propiedades antibacterianas intactas.",
    tags:   ["100% Natural", "Sin Pasteurizar", "Enzimas Activos", "Antibacteriano"],
    href:   "/productos",
    reverse: false,
  },
  {
    id:       "sal",
    imagen:   "/img/sal/sal-1.png",            // → reemplazar con beneficios-sal.jpg
    imageAlt: "Beneficios de las Sales Artesanales Sabores de Monte",
    label:    "Sales Artesanales",
    titulo:   "Blends artesanales que hacen la diferencia en la cocina",
    descripcion:
      "8 variedades únicas elaboradas con sal gruesa y hierbas naturales seleccionadas. Sin TACC, sin conservantes ni aditivos. Desde la clásica Provenzal hasta la Ahumada con maderas naturales.",
    tags:   ["8 Variedades", "Sin TACC", "Sin Conservantes", "Hierbas Naturales"],
    href:   "/productos",
    reverse: true,
  },
  {
    id:       "ajo-aceite",
    imagen:   "/img/Ajo en Polvo/beneficio-ajo-1.png", // → reemplazar con beneficios-ajo-negro.jpg
    imageAlt: "Beneficios del Ajo Negro y Aceite de Oliva Sabores de Monte",
    label:    "Ajo Negro & Aceite de Oliva",
    titulo:   "El ingrediente que los mejores chefs ya descubrieron",
    descripcion:
      "El Ajo Negro es ajo fermentado con propiedades antioxidantes únicas, sabor dulce y umami suave. En aceite de oliva virgen extra o en polvo, es el diferencial que buscan restaurantes y tiendas gourmet.",
    tags:   ["Antioxidante", "Sabor Umami", "Virgen Extra", "Sistema Inmune"],
    href:   "/productos",
    reverse: false,
  },
];

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: d },
  }),
};

function BenefitRow({ line }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const imageBlock = (
    <motion.div
      variants={line.reverse ? fadeRight : fadeLeft}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative w-full overflow-hidden rounded-[4px]"
      style={{
        aspectRatio: "1/1",
        border: "1px solid rgba(200, 121, 58, 0.12)",
      }}
    >
      <Image
        src={line.imagen}
        alt={line.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL={PRODUCT_BLUR_URL}
      />
      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(13,10,6,0.5) 100%)",
        }}
      />
    </motion.div>
  );

  const textBlock = (
    <motion.div
      variants={line.reverse ? fadeLeft : fadeRight}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col justify-center"
    >
      {/* Label */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0.1}
        className="text-amber text-xs tracking-[0.3em] uppercase mb-4"
        style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
      >
        {line.label}
      </motion.p>

      {/* Title */}
      <motion.h3
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0.2}
        className="text-white-soft mb-5 leading-[1.2]"
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 300,
          fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
        }}
      >
        {line.titulo}
      </motion.h3>

      {/* Description */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0.3}
        className="text-cream/60 leading-relaxed mb-7"
        style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
      >
        {line.descripcion}
      </motion.p>

      {/* Tags */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0.4}
        className="flex flex-wrap gap-2 mb-8"
      >
        {line.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-[3px] text-cream/60"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              background: "rgba(200, 121, 58, 0.08)",
              border: "1px solid rgba(200, 121, 58, 0.18)",
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0.5}
      >
        <Link
          href={line.href}
          className="group inline-flex items-center gap-2 text-amber hover:text-gold text-sm transition-colors duration-300"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          Ver línea completa
          <ArrowRight
            size={15}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </Link>
      </motion.div>
    </motion.div>
  );

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
      {line.reverse ? (
        <>
          {textBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
    </div>
  );
}

export default function BenefitsShowcase() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      className="relative"
      style={{
        background: "var(--color-base)",
        paddingTop: "5rem",
        paddingBottom: "6rem",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C8793A, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ─── Section header ─── */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            custom={0}
            className="text-amber text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Por qué elegirnos
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            custom={0.15}
            className="text-white-soft"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Cada línea tiene su razón de ser
          </motion.h2>
        </div>

        {/* ─── Alternating rows ─── */}
        <div className="flex flex-col gap-20 lg:gap-28">
          {LINES.map((line) => (
            <BenefitRow key={line.id} line={line} />
          ))}
        </div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          custom={0}
          className="text-center mt-20"
        >
          <Link
            href="/acceso-mayorista"
            className="inline-flex items-center px-8 py-3.5 text-sm rounded-[4px] transition-colors duration-300"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              background: "rgba(200, 121, 58, 0.9)",
              color: "#0D0A06",
            }}
          >
            Solicitá tu cuenta mayorista
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
