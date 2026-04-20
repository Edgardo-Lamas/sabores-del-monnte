export const metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad y tratamiento de datos personales de Sabores de Monte.",
  robots: { index: false, follow: false },
};

const SECTIONS = [
  {
    titulo: "1. Responsable del tratamiento",
    texto: `Sabores de Monte, con domicilio en Obispo Trejo, Córdoba, Argentina, es responsable del tratamiento de los datos personales recopilados a través del sitio saboresdemonte.com.ar y de sus formularios de contacto y solicitud.`,
  },
  {
    titulo: "2. Datos que recopilamos",
    texto: `Recopilamos los datos que usted nos proporciona voluntariamente al completar formularios en el Sitio: nombre, empresa, correo electrónico, teléfono, provincia, tipo de negocio y volumen estimado de compra. También recopilamos datos de navegación (páginas visitadas, tiempo de sesión) de forma agregada y anónima a través de herramientas de analítica web.`,
  },
  {
    titulo: "3. Finalidad del tratamiento",
    texto: `Los datos personales recabados se utilizan exclusivamente para: (a) evaluar y gestionar solicitudes de acceso mayorista; (b) comunicarnos con usted en relación a su solicitud o pedido; (c) mejorar el funcionamiento del Sitio en base a datos de uso agregados. No utilizamos sus datos para envío de publicidad no solicitada.`,
  },
  {
    titulo: "4. Base legal",
    texto: `El tratamiento de sus datos se basa en el consentimiento expreso que usted otorga al completar y enviar cualquier formulario del Sitio, conforme a lo establecido en la Ley 25.326 de Protección de Datos Personales de la República Argentina.`,
  },
  {
    titulo: "5. Conservación de datos",
    texto: `Conservamos sus datos personales durante el tiempo necesario para cumplir la finalidad para la que fueron recopilados y para cumplir con obligaciones legales. Las solicitudes no aprobadas se eliminan dentro de los 90 días de su recepción.`,
  },
  {
    titulo: "6. Compartición con terceros",
    texto: `No vendemos, alquilamos ni cedemos sus datos personales a terceros. Podemos compartir datos con proveedores de servicios tecnológicos (hosting, analítica) que actúan como encargados del tratamiento bajo acuerdos de confidencialidad. Estos proveedores no pueden usar sus datos para fines propios.`,
  },
  {
    titulo: "7. Sus derechos",
    texto: `Conforme a la Ley 25.326, usted tiene derecho a acceder, rectificar, actualizar, suprimir o solicitar la confidencialidad de sus datos personales. Para ejercer estos derechos puede escribirnos a contacto@saboresdemonte.com.ar indicando en el asunto "Datos Personales". Responderemos dentro de los 5 días hábiles.`,
  },
  {
    titulo: "8. Cookies",
    texto: `El Sitio utiliza cookies técnicas necesarias para su funcionamiento y cookies de analítica anónima. No utilizamos cookies de seguimiento publicitario de terceros. Al continuar navegando el Sitio, usted acepta el uso de cookies técnicas descritas en esta política.`,
  },
  {
    titulo: "9. Seguridad",
    texto: `Implementamos medidas técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, pérdida o divulgación. La transmisión de datos se realiza mediante conexión cifrada (HTTPS).`,
  },
  {
    titulo: "10. Modificaciones",
    texto: `Podemos actualizar esta política en cualquier momento. La versión vigente siempre estará disponible en esta página con la fecha de última actualización. Le recomendamos revisarla periódicamente.`,
  },
];

export default function PrivacidadPage() {
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
          Política de privacidad
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
