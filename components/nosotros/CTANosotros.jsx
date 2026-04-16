"use client";

import Link from "next/link";
import { useScrollReveal } from "./useScrollReveal";

export default function CTANosotros() {
  const ref = useScrollReveal({ margin: "-40px 0px" });

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-24"
      style={{ background: "#C8793A" }}
      aria-labelledby="cta-nosotros-heading"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">

        <p
          className="reveal-up uppercase mb-4"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "12px",
            letterSpacing: "0.18em",
            color: "rgba(13,10,6,0.55)",
          }}
        >
          ¿Trabajamos juntos?
        </p>

        <h2
          id="cta-nosotros-heading"
          className="reveal-up mb-5"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 300,
            fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
            lineHeight: "1.05",
            color: "#0D0A06",
            "--reveal-delay": "80ms",
          }}
        >
          ¿Querés conocer nuestro apiario?
        </h2>

        <p
          className="reveal-up text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            color: "rgba(13,10,6,0.65)",
            "--reveal-delay": "140ms",
          }}
        >
          Abrimos el acceso mayorista a distribuidores, restaurantes y
          tiendas gourmet que buscan un proveedor directo con calidad
          certificada.
        </p>

        <div
          className="reveal-up flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ "--reveal-delay": "200ms" }}
        >
          <Link href="/acceso-mayorista" className="btn-primary">
            Solicitar cuenta mayorista
          </Link>

          <Link href="/productos" className="btn-outline">
            Ver catálogo completo
          </Link>
        </div>

      </div>
    </section>
  );
}
