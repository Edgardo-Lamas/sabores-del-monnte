"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { products, categories, categoryLabels } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
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

/* Group products by category preserving declaration order */
function groupByCategory(productList) {
  const groups = {};
  for (const p of productList) {
    if (!groups[p.categoria]) groups[p.categoria] = [];
    groups[p.categoria].push(p);
  }
  return groups;
}

export default function ProductosClient() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });

  const filteredProducts =
    activeFilter === "todos"
      ? products
      : products.filter((p) => p.categoria === activeFilter);

  const grouped = activeFilter === "todos" ? groupByCategory(filteredProducts) : null;

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
                    activeFilter === cat.value
                      ? "#0D0A06"
                      : "rgba(226, 208, 168, 0.7)",
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

      {/* ─── Products ─── */}
      <section
        className="relative pb-24"
        style={{ background: "var(--color-base)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* ── Grouped view (Todos) ── */}
          {grouped ? (
            Object.entries(grouped).map(([categoria, items], groupIndex) => (
              <div key={categoria} className={groupIndex > 0 ? "mt-16" : ""}>
                {/* Category heading */}
                <div className="flex items-center gap-4 mb-8">
                  <h2
                    className="text-white-soft"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 300,
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    }}
                  >
                    {categoryLabels[categoria] ?? categoria}
                  </h2>
                  <div
                    className="flex-1 h-px"
                    style={{ background: "rgba(200, 121, 58, 0.15)" }}
                  />
                  <span
                    className="text-amber/50 text-xs tracking-[0.2em] uppercase shrink-0"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                  >
                    {items.length} {items.length === 1 ? "producto" : "productos"}
                  </span>
                </div>

                {/* Grid */}
                <motion.div
                  key={categoria}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              </div>
            ))
          ) : (
            /* ── Filtered view (single category) ── */
            <>
              <motion.div
                key={activeFilter}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-cream/40 text-sm">
                    No hay productos en esta categoría.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
