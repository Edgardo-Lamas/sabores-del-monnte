import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/",              label: "Inicio"         },
  { href: "/nosotros",      label: "Nosotros"        },
  { href: "/productos",     label: "Productos"       },
  { href: "/distribuidores",label: "Quiero distribuir"  },
];

const LEGAL_LINKS = [
  { href: "/terminos",   label: "Términos y condiciones" },
  { href: "/privacidad", label: "Política de privacidad"  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#1A1510",
        borderTop: "1px solid rgba(200, 121, 58, 0.15)",
      }}
    >
      {/* ─── Main content ─── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 group mb-4">
              <div
                className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
                style={{ borderColor: "rgba(200, 121, 58, 0.4)" }}
              >
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  className="text-amber group-hover:text-gold transition-colors duration-300"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2L17.196 5.5V12.5L12 16L6.804 12.5V5.5L12 2Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
                  />
                  <path
                    d="M12 16L17.196 19.5V22L12 22L6.804 22V19.5L12 16Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5"
                  />
                </svg>
              </div>
              <span
                className="text-white-soft text-lg group-hover:text-gold transition-colors duration-300"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
              >
                Sabores del Monte
              </span>
            </Link>

            <p
              className="text-cream/50 text-sm leading-relaxed max-w-[240px]"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              Distribuidora artesanal de productos naturales seleccionados. Miel, aceites, sales y más.
            </p>
          </div>

          {/* Col 2 — Navegación */}
          <div>
            <p
              className="text-amber text-[11px] tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              Navegación
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/55 text-sm hover:text-gold transition-colors duration-200"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/tienda"
                  className="text-amber/70 text-sm hover:text-gold transition-colors duration-200"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                >
                  Club Origen →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 — Contacto */}
          <div>
            <p
              className="text-amber text-[11px] tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              Contacto
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin
                  size={14} strokeWidth={1.5}
                  className="text-amber/60 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span
                  className="text-cream/55 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                >
                  Obispo Trejo, Córdoba
                  <br />Argentina
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail
                  size={14} strokeWidth={1.5}
                  className="text-amber/60 shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="mailto:contacto@saboresdemonte.com.ar"
                  className="text-cream/55 text-sm hover:text-gold transition-colors duration-200"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                >
                  contacto@saboresdemonte.com.ar
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone
                  size={14} strokeWidth={1.5}
                  className="text-amber/60 shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="https://wa.me/5493510000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/55 text-sm hover:text-gold transition-colors duration-200"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                >
                  WhatsApp comercial
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Bottom bar ─── */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(200, 121, 58, 0.1)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-cream/30 text-xs"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            © {year} Sabores del Monte. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4">
            {/* Sello Studio Lamas */}
            <a
              href="https://studio-lamas.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 group transition-opacity duration-200 hover:opacity-80"
              aria-label="Diseño y desarrollo por Studio Lamas"
            >
              <span
                className="text-cream/25 text-[11px] group-hover:text-cream/50 transition-colors duration-200"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                Diseño y desarrollo
              </span>
              {/* Logo E de Studio Lamas */}
              <svg viewBox="0 0 14 22" fill="none" width="10" height="16" aria-hidden="true">
                <rect x="0" y="0"    width="3.5" height="22"  rx="1.75" fill="#c9a227" opacity="0.5" />
                <rect x="0" y="0"    width="11"  height="3.5" rx="1.75" fill="#c9a227" opacity="0.5" />
                <rect x="0" y="9.25" width="8"   height="3.5" rx="1.75" fill="#c9a227" opacity="0.5" />
                <rect x="0" y="18.5" width="11"  height="3.5" rx="1.75" fill="#c9a227" opacity="0.5" />
              </svg>
              <span
                className="text-cream/30 text-[11px] group-hover:text-amber transition-colors duration-200"
                style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
              >
                Studio Lamas
              </span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/30 text-xs hover:text-cream/60 transition-colors duration-200"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
