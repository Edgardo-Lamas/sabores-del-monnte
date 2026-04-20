export const metadata = {
  title: "Términos y condiciones",
  description: "Términos y condiciones de uso del sitio y del servicio de venta mayorista de Sabores de Monte.",
  robots: { index: false, follow: false },
};

const SECTIONS = [
  {
    titulo: "1. Objeto",
    texto: `El presente documento establece los términos y condiciones que rigen el uso del sitio web saboresdemonte.com.ar (en adelante, "el Sitio") y la contratación del servicio de venta mayorista ofrecido por Sabores de Monte (en adelante, "el Vendedor"), con domicilio en Obispo Trejo, Córdoba, Argentina.`,
  },
  {
    titulo: "2. Acceso mayorista",
    texto: `El acceso a la tienda mayorista y a los precios diferenciados por volumen está reservado a compradores institucionales (distribuidores, restaurantes, hoteles, tiendas gourmet y comercios similares) que hayan completado el proceso de solicitud de cuenta y recibido aprobación expresa por parte del Vendedor. El Vendedor se reserva el derecho de aprobar o rechazar solicitudes sin necesidad de expresar motivo.`,
  },
  {
    titulo: "3. Precios y disponibilidad",
    texto: `Los precios publicados en la tienda mayorista están expresados en pesos argentinos (ARS), son válidos al momento de la consulta y pueden modificarse sin previo aviso. La disponibilidad de stock es informativa y puede variar. El Vendedor confirmará la disponibilidad al momento de procesar cada pedido.`,
  },
  {
    titulo: "4. Pedidos y confirmación",
    texto: `Un pedido se considera confirmado únicamente cuando el Vendedor emite una confirmación expresa por escrito (correo electrónico o WhatsApp). La sola presentación del pedido no genera obligación de entrega. El Vendedor podrá rechazar pedidos por falta de stock, problemas de logística o cualquier otra causa, reintegrando el pago recibido en su totalidad.`,
  },
  {
    titulo: "5. Envíos y entrega",
    texto: `Las condiciones de envío, plazos y costos se informan al momento de confirmar cada pedido y pueden variar según la zona geográfica, el volumen del pedido y la disponibilidad logística. Los plazos indicados son estimativos y no constituyen garantía de entrega en fecha exacta.`,
  },
  {
    titulo: "6. Devoluciones y reclamos",
    texto: `El comprador deberá verificar el estado del pedido al momento de la recepción. Cualquier reclamo por productos dañados, faltantes o incorrectos deberá realizarse dentro de las 48 horas de recibida la mercadería, por los canales de contacto habilitados. No se aceptarán devoluciones fuera de ese plazo salvo defecto de fabricación comprobable.`,
  },
  {
    titulo: "7. Propiedad intelectual",
    texto: `Todos los contenidos del Sitio (textos, imágenes, marca, diseño) son propiedad de Sabores de Monte o están utilizados con autorización. Queda prohibida su reproducción total o parcial sin consentimiento escrito previo.`,
  },
  {
    titulo: "8. Limitación de responsabilidad",
    texto: `El Vendedor no será responsable por daños indirectos, lucro cesante o pérdida de negocio derivados del uso del Sitio o de interrupciones en el servicio. La responsabilidad máxima del Vendedor frente al comprador se limita al valor de los productos efectivamente entregados.`,
  },
  {
    titulo: "9. Ley aplicable",
    texto: `Estos términos se rigen por las leyes de la República Argentina. Cualquier controversia será sometida a la jurisdicción de los tribunales ordinarios de la ciudad de Córdoba, renunciando las partes a cualquier otro fuero que pudiera corresponder.`,
  },
  {
    titulo: "10. Modificaciones",
    texto: `El Vendedor podrá modificar estos términos en cualquier momento. Los cambios entrarán en vigor desde su publicación en el Sitio. El uso continuado del Sitio o del servicio mayorista implica la aceptación de los términos vigentes.`,
  },
];

export default function TerminosPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-base)" }}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-32 pb-24">

        {/* Header */}
        <p
          className="text-amber text-xs tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          Legal
        </p>
        <h1
          className="text-white-soft mb-3"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.1,
          }}
        >
          Términos y condiciones
        </h1>
        <p
          className="text-cream/40 text-sm mb-12"
          style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
        >
          Última actualización: {new Date().toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div
          className="h-px mb-12"
          style={{ background: "rgba(200,121,58,0.15)" }}
        />

        {/* Sections */}
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.titulo}>
              <h2
                className="text-cream text-base mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
              >
                {s.titulo}
              </h2>
              <p
                className="text-cream/60 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                {s.texto}
              </p>
            </div>
          ))}
        </div>

        <div
          className="h-px mt-12 mb-8"
          style={{ background: "rgba(200,121,58,0.15)" }}
        />

        <p
          className="text-cream/30 text-xs"
          style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
        >
          Sabores de Monte · Obispo Trejo, Córdoba, Argentina ·{" "}
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
