import SolicitudForm from "@/components/SolicitudForm";

export const metadata = {
  title: "Acceso Mayorista",
  description:
    "Accedé a precios mayoristas en miel artesanal, sales, ajo negro, nueces, pistacho y más. Envío gratis a CABA y GBA Norte con compra mínima de $80.000.",
  robots: { index: true, follow: true },
};

const BENEFICIOS = [
  {
    icono: "🚚",
    titulo: "Envío sin cargo",
    texto: "Entregamos sin costo en CABA y hasta San Isidro con pedido mínimo de $80.000.",
  },
  {
    icono: "🏷️",
    titulo: "Precios diferenciados",
    texto: "Accedé a la lista de precios mayorista exclusiva para distribuidores y comercios.",
  },
  {
    icono: "🌿",
    titulo: "Productos artesanales",
    texto: "Selección de productos naturales y gourmet de origen controlado, con stock permanente.",
  },
  {
    icono: "🤝",
    titulo: "Atención personalizada",
    texto: "Asesoramiento directo para armar tu pedido según las necesidades de tu negocio.",
  },
];

const CATEGORIAS = [
  {
    nombre: "Miel artesanal",
    detalle: "Multifloral, Algarrobo, Mistol, Cremada",
    badge: "Producción propia",
    badgeColor: "#C8793A",
  },
  {
    nombre: "Sales artesanales",
    detalle: "Original, Ahumada, Cítrica, Picante y más",
    badge: "Producción propia",
    badgeColor: "#C8793A",
  },
  {
    nombre: "Ajo Negro & Aceite de Oliva",
    detalle: "Ajo negro deshidratado, Aceite con ajo negro",
    badge: "Producción propia",
    badgeColor: "#C8793A",
  },
  {
    nombre: "Frutos secos",
    detalle: "Nueces, Pistacho",
    badge: "Selección",
    badgeColor: "#7A8C6E",
  },
  {
    nombre: "Polen",
    detalle: "Polen apícola natural",
    badge: "Selección",
    badgeColor: "#7A8C6E",
  },
  {
    nombre: "Salsas & Dulces",
    detalle: "Salsa picante especial, Dulce de leche artesanal",
    badge: "Selección",
    badgeColor: "#7A8C6E",
  },
];

export default function AccesoMayoristaPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-base)" }}>

      {/* ─── Hero ─── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16">
        <p
          className="text-amber text-xs tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          Programa Mayorista
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h1
              className="text-white-soft mb-5"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                lineHeight: 1.1,
              }}
            >
              Sumá productos naturales y gourmet a tu negocio
            </h1>
            <p
              className="text-cream/65 leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              Somos una distribuidora de alimentos artesanales con producción
              propia de miel, sales y ajo negro en Obispo Trejo, Córdoba.
              Completá el formulario y te contactamos para darte acceso a la
              lista de precios mayorista.
            </p>

            {/* Zona de envío */}
            <div
              className="flex items-start gap-3 p-4 rounded-[4px]"
              style={{
                background: "rgba(200,121,58,0.07)",
                border: "1px solid rgba(200,121,58,0.25)",
              }}
            >
              <span className="text-amber text-lg shrink-0 mt-0.5" aria-hidden="true">📍</span>
              <div>
                <p
                  className="text-cream text-sm leading-snug"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
                >
                  Envío gratis a CABA y GBA Norte (hasta San Isidro)
                </p>
                <p
                  className="text-cream/50 text-xs mt-0.5"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                >
                  Con compra mínima de $80.000. Otras zonas consultá condiciones.
                </p>
              </div>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <p
              className="text-cream/50 text-xs uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              Categorías disponibles
            </p>
            <div className="flex flex-col gap-2.5">
              {CATEGORIAS.map((cat) => (
                <div
                  key={cat.nombre}
                  className="flex items-start gap-3 p-3.5 rounded-[4px]"
                  style={{
                    background: "#1A1510",
                    border: "1px solid rgba(200,121,58,0.12)",
                  }}
                >
                  <div
                    className="shrink-0 w-[3px] self-stretch rounded-full mt-0.5"
                    style={{ background: cat.badgeColor }}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <p
                        className="text-cream text-sm"
                        style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
                      >
                        {cat.nombre}
                      </p>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-sm"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 500,
                          background: cat.badgeColor + "22",
                          color: cat.badgeColor,
                          fontSize: "10px",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {cat.badge}
                      </span>
                    </div>
                    <p
                      className="text-cream/45 text-xs"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                    >
                      {cat.detalle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Divider ─── */}
      <div className="h-px mx-6 lg:mx-8" style={{ background: "rgba(200,121,58,0.1)" }} />

      {/* ─── Beneficios strip ─── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFICIOS.map((b) => (
            <div
              key={b.titulo}
              className="p-5 rounded-[4px]"
              style={{
                background: "#1A1510",
                border: "1px solid rgba(200,121,58,0.12)",
              }}
            >
              <span className="text-2xl mb-3 block" aria-hidden="true">{b.icono}</span>
              <p
                className="text-cream text-sm mb-1.5"
                style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
              >
                {b.titulo}
              </p>
              <p
                className="text-cream/50 text-xs leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                {b.texto}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Divider ─── */}
      <div className="h-px mx-6 lg:mx-8" style={{ background: "rgba(200,121,58,0.1)" }} />

      {/* ─── Formulario ─── */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
        <div className="mb-10">
          <p
            className="text-amber text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            Solicitud de acceso
          </p>
          <h2
            className="text-white-soft mb-3"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: 1.1,
            }}
          >
            Completá tu solicitud
          </h2>
          <p
            className="text-cream/55 text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            Revisamos tu perfil en 24–48 hs y te contactamos para darte acceso
            a los precios mayoristas y la tienda privada.
          </p>
        </div>

        <div
          className="p-7 md:p-10 rounded-[4px]"
          style={{
            background: "#1A1510",
            border: "1px solid rgba(200,121,58,0.15)",
          }}
        >
          <SolicitudForm />
        </div>

        <p
          className="text-cream/30 text-xs text-center mt-8"
          style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
        >
          También podés escribirnos a{" "}
          <a
            href="mailto:contacto@saboresdemonte.com.ar"
            className="hover:text-amber transition-colors duration-200"
          >
            contacto@saboresdemonte.com.ar
          </a>
        </p>
      </div>

    </div>
  );
}
