"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
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
              Nuestros productos
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

        {/* ─── Products Grid ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
