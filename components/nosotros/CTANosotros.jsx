"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: d },
  }),
};

export default function CTANosotros() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-24"
      style={{ background: "#C8793A" }}
      aria-labelledby="cta-nosotros-heading"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="text-[#0D0A06]/60 text-xs tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          ¿Trabajamos juntos?
        </motion.p>

        <motion.h2
          id="cta-nosotros-heading"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.1}
          className="mb-5 leading-[1.15]"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            color: "#0D0A06",
          }}
        >
          ¿Querés conocer nuestro apiario?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.2}
          className="text-[#0D0A06]/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
        >
          Abrimos el acceso mayorista a distribuidores, restaurantes y
          tiendas gourmet que buscan un proveedor directo con calidad
          certificada.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/acceso-mayorista"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-[4px] text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0D0A06]"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              background: "#0D0A06",
              color: "#C8793A",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1A1510";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#0D0A06";
            }}
          >
            Solicitar cuenta mayorista
          </Link>

          <Link
            href="/productos"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-[4px] text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0D0A06]"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              color: "#0D0A06",
              border: "1.5px solid rgba(13,10,6,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(13,10,6,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Ver catálogo completo
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
