"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, LayoutDashboard, MessageCircle } from "lucide-react";
import SolicitudForm from "@/components/SolicitudForm";

/* ─── Animation helpers ─── */

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─── Data ─── */

const BENEFITS = [
  {
    Icon: TrendingUp,
    title: "Precios por escala",
    description:
      "Descuentos progresivos según tu volumen mensual de compra. A mayor pedido, mejor precio unitario.",
  },
  {
    Icon: LayoutDashboard,
    title: "Cuenta propia",
    description:
      "Acceso al panel mayorista con historial de pedidos, facturas y seguimiento de envíos en tiempo real.",
  },
  {
    Icon: MessageCircle,
    title: "Atención directa",
    description:
      "Sin intermediarios. Hablás con el productor. Respuesta en menos de 24hs hábiles.",
  },
];

const PROFILES = [
  "Distribuidores de alimentos",
  "Restaurantes y gastronomía",
  "Tiendas gourmet y dietéticas",
  "Hoteles y catering",
  "Empresas del sector alimentario",
];

const STEPS = [
  {
    number: "01",
    title: "Completá el formulario",
    description: "Datos de tu empresa y perfil de negocio.",
  },
  {
    number: "02",
    title: "Verificamos tu perfil",
    description: "Revisamos la solicitud en 24–48 hs hábiles.",
  },
  {
    number: "03",
    title: "Accedés a precios y pedidos",
    description: "Activamos tu cuenta con tarifas diferenciadas.",
  },
];

/* ─── Page ─── */

export default function DistribuidoresPage() {
  const benefitsRef  = useRef(null);
  const profilesRef  = useRef(null);
  const stepperRef   = useRef(null);
  const formRef      = useRef(null);

  const benefitsInView  = useInView(benefitsRef,  { once: true, margin: "-60px" });
  const profilesInView  = useInView(profilesRef,  { once: true, margin: "-60px" });
  const stepperInView   = useInView(stepperRef,   { once: true, margin: "-60px" });
  const formInView      = useInView(formRef,      { once: true, margin: "-60px" });

  return (
    <>
      {/* ════════════════════════════════
          1. HERO SECUNDARIO
      ════════════════════════════════ */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          minHeight: "50vh",
          paddingTop: "8rem",
          paddingBottom: "5rem",
          background: "var(--color-base)",
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] opacity-[0.06] blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #C8793A, transparent 70%)" }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px 128px",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-amber text-xs tracking-[0.3em] uppercase mb-5"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Canal mayorista
          </motion.p>

          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.25}
            className="text-white-soft mb-6 leading-[1.1]"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
            }}
          >
            Programa de distribuidores mayoristas
          </motion.h1>

          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="text-cream/60 text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            Precios diferenciados, atención directa del productor y pedidos
            programados.
          </motion.p>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #1A1510)",
          }}
        />
      </section>

      {/* ════════════════════════════════
          2. BENEFICIOS (3 columnas)
      ════════════════════════════════ */}
      <section
        ref={benefitsRef}
        style={{
          background: "#1A1510",
          paddingTop: "5rem",
          paddingBottom: "5rem",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {BENEFITS.map((b) => (
              <motion.div
                key={b.title}
                variants={cardVariants}
                className="group p-7 rounded-[4px] relative overflow-hidden transition-all duration-300"
                style={{
                  background: "#201A13",
                  border: "1px solid rgba(200, 121, 58, 0.18)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200, 121, 58, 0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200, 121, 58, 0.18)";
                }}
              >
                <b.Icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-amber group-hover:text-gold transition-colors duration-300 mb-5"
                />
                <div
                  className="text-cream text-lg mb-2"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 600, lineHeight: 1.3 }}
                >
                  {b.title}
                </div>
                <p
                  className="text-cream/60 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                >
                  {b.description}
                </p>
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at top right, rgba(200,121,58,0.1), transparent 70%)",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
          3. PERFILES DE CLIENTE
      ════════════════════════════════ */}
      <section
        ref={profilesRef}
        style={{
          background: "var(--color-base)",
          paddingTop: "5rem",
          paddingBottom: "5rem",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <div>
              <motion.p
                variants={fadeIn}
                initial="hidden"
                animate={profilesInView ? "visible" : "hidden"}
                custom={0}
                className="text-amber text-xs tracking-[0.3em] uppercase mb-4"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                ¿Quién puede acceder?
              </motion.p>

              <motion.h2
                variants={fadeIn}
                initial="hidden"
                animate={profilesInView ? "visible" : "hidden"}
                custom={0.1}
                className="text-white-soft mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                }}
              >
                Para negocios que compran en volumen
              </motion.h2>

              <motion.p
                variants={fadeIn}
                initial="hidden"
                animate={profilesInView ? "visible" : "hidden"}
                custom={0.2}
                className="text-cream/55 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                El programa está diseñado para empresas del sector alimentario
                que buscan un proveedor estable, con precio y calidad garantizados.
              </motion.p>
            </div>

            {/* Right — profile list */}
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate={profilesInView ? "visible" : "hidden"}
              className="space-y-3"
            >
              {PROFILES.map((profile) => (
                <motion.li
                  key={profile}
                  variants={cardVariants}
                  className="flex items-center gap-4 px-5 py-3.5 rounded-[4px]"
                  style={{
                    background: "#1A1510",
                    border: "1px solid rgba(200, 121, 58, 0.15)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#C8793A" }}
                  />
                  <span
                    className="text-cream/80 text-sm"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                  >
                    {profile}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          4. STEPPER — Proceso de acceso
      ════════════════════════════════ */}
      <section
        ref={stepperRef}
        style={{
          background: "#1A1510",
          paddingTop: "5rem",
          paddingBottom: "5rem",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate={stepperInView ? "visible" : "hidden"}
            custom={0}
            className="text-amber text-xs tracking-[0.3em] uppercase mb-4 text-center"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Cómo funciona
          </motion.p>

          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate={stepperInView ? "visible" : "hidden"}
            custom={0.1}
            className="text-white-soft text-center mb-14"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            }}
          >
            Tres pasos para acceder
          </motion.h2>

          {/* Stepper */}
          <div className="relative">
            {/* Connector line (desktop only) */}
            <div
              className="hidden md:block absolute top-[2.125rem] left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-[1px]"
              style={{ background: "rgba(200, 121, 58, 0.2)" }}
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={stepperInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            >
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.number}
                  variants={cardVariants}
                  className="flex flex-col items-center text-center"
                >
                  {/* Circle */}
                  <div
                    className="w-[4.25rem] h-[4.25rem] rounded-full flex items-center justify-center mb-5 relative z-10"
                    style={{
                      background: "#0D0A06",
                      border: "1px solid rgba(200, 121, 58, 0.5)",
                    }}
                  >
                    <span
                      className="text-amber"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 400,
                        fontSize: "1.25rem",
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <div
                    className="text-white-soft text-base mb-2"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
                  >
                    {step.title}
                  </div>
                  <p
                    className="text-cream/50 text-sm leading-relaxed max-w-[200px]"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                  >
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          5. FORMULARIO DE SOLICITUD
      ════════════════════════════════ */}
      <section
        ref={formRef}
        style={{
          background: "var(--color-base)",
          paddingTop: "5rem",
          paddingBottom: "6rem",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
              custom={0}
              className="text-amber text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              Solicitud de acceso
            </motion.p>

            <motion.h2
              variants={fadeIn}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
              custom={0.1}
              className="text-white-soft mb-3"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              }}
            >
              Abrí tu cuenta mayorista
            </motion.h2>

            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
              custom={0.2}
              className="text-cream/50 text-sm"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              Completá el formulario y te contactamos en 24–48 hs hábiles.
            </motion.p>
          </div>

          {/* Form card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            custom={0.3}
            className="rounded-[4px] p-8 md:p-10"
            style={{
              background: "#1A1510",
              border: "1px solid rgba(200, 121, 58, 0.3)",
            }}
          >
            <SolicitudForm />
          </motion.div>
        </div>
      </section>
    </>
  );
}
