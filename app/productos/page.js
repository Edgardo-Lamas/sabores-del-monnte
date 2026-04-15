"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { products, categories } from "@/lib/products";
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

export default function ProductosPage() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });

  const filteredProducts =
    activeFilter === "todos"
      ? products
      : products.filter((p) => p.categoria === activeFilter);

  return (
    <>
      {/* ─── Page Header ─── */}
      <section
        ref={headerRef}
        className="relative pt-32 pb-16"
        style={{ background: "var(--color-base)" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] opacity-[0.05] blur-[100px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, #C8793A, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            custom={0}
            className="text-amber text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Catálogo
          </motion.p>

          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            custom={0.15}
            className="text-white-soft mb-5"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
            }}
          >
            Nuestros productos
          </motion.h1>

          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            custom={0.3}
            className="text-cream/60 max-w-xl mb-10"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            Miel pura, aceites gourmet y sal artesanal. Todos nuestros productos
            se elaboran con procesos artesanales y materias primas de origen
            controlado.
          </motion.p>

          {/* ─── Category Filters ─── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            custom={0.4}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className="px-5 py-2 text-sm rounded-[4px] transition-all duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  background:
                    activeFilter === cat.value
                      ? "rgba(200, 121, 58, 0.9)"
                      : "rgba(200, 121, 58, 0.08)",
                  color:
                    activeFilter === cat.value ? "#0D0A06" : "rgba(226, 208, 168, 0.7)",
                  border:
                    activeFilter === cat.value
                      ? "1px solid transparent"
                      : "1px solid rgba(200, 121, 58, 0.15)",
                }}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Products Grid ─── */}
      <section
        className="relative pb-24"
        style={{ background: "var(--color-base)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-cream/40 text-sm">
                No hay productos en esta categoría.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
