"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { products, categoryLabels } from "@/lib/products";
import { PRODUCT_BLUR_URL } from "@/lib/blur-placeholder";

/* Featured product IDs — best representative of each category */
const FEATURED_IDS = ["miel-multifloral", "sal-original", "aceite-oliva-unico"];

function getFeatured() {
  return FEATURED_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean);
}

const featured = getFeatured();

/* Short category taglines for the home card */
const catTaglines = {
  miel:        "Sin pasteurizar · Extracción propia · Monte cordobés",
  sal:         "Blends artesanales · Sin TACC · Para gastronomía",
  "ajo-aceite":"Ajo Negro · Antioxidante · Sabor dulce y umami",
};

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: d },
  }),
};

export default function ProductsShowcase() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        background: "var(--color-base)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ─── Section Header ─── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
              className="text-amber text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              Nuestras líneas
            </motion.p>
            <motion.h2
              variants={fadeIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.15}
              className="text-white-soft"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              Lo mejor del monte cordobés
            </motion.h2>
          </div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.3}
          >
            <Link
              href="/productos"
              className="group inline-flex items-center gap-2 text-amber hover:text-gold text-sm transition-colors duration-300"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              Ver catálogo completo
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </motion.div>
        </div>

        {/* ─── Category cards ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((product, i) => {
            const label    = categoryLabels[product.categoria] ?? product.categoria;
            const tagline  = catTaglines[product.categoria] ?? "";
            const count    = products.filter((p) => p.categoria === product.categoria).length;

            return (
              <motion.div
                key={product.id}
                variants={fadeIn}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.2 + i * 0.12}
              >
                <Link
                  href="/productos"
                  className="group flex flex-col overflow-hidden rounded-[4px] h-full transition-all duration-300"
                  style={{
                    background: "#1A1510",
                    border: "1px solid rgba(200, 121, 58, 0.15)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,121,58,0.5)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(200,121,58,0.15)"; }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={product.imagen}
                      alt={product.imageAlt ?? product.nombre}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      placeholder="blur"
                      blurDataURL={PRODUCT_BLUR_URL}
                    />
                    {/* Count badge */}
                    <div
                      className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-[3px] text-[11px] tracking-wide"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        background: "rgba(13,10,6,0.75)",
                        color: "rgba(200,121,58,0.9)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {count} productos
                    </div>
                    {/* Bottom gradient */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-20 z-[1] pointer-events-none"
                      style={{ background: "linear-gradient(to bottom, transparent, #1A1510)" }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <h3
                      className="text-white-soft text-xl mb-1.5 group-hover:text-gold transition-colors duration-300"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
                    >
                      {label}
                    </h3>
                    <p
                      className="text-cream/50 text-xs mb-4 leading-relaxed"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                    >
                      {tagline}
                    </p>

                    <div className="flex-1" />

                    <span
                      className="inline-flex items-center gap-1.5 text-amber/70 group-hover:text-amber text-sm transition-colors duration-300"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                    >
                      Ver línea completa
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.6}
          className="text-center mt-12"
        >
          <Link
            href="/productos"
            className="inline-flex items-center px-8 py-3 text-sm rounded-[4px] transition-colors duration-300"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              background: "rgba(200, 121, 58, 0.9)",
              color: "#0D0A06",
            }}
          >
            Ver el catálogo completo — 18 productos
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
