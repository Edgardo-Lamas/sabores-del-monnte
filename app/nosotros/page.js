/*
 * ══════════════════════════════════════════════════════════════
 *  /nosotros — Sabores de Monte
 * ══════════════════════════════════════════════════════════════
 *
 *  PLACEHOLDERS A COMPLETAR (buscar con Ctrl+F → "[["):
 *
 *  HeroNosotros.jsx
 *    [[TITULAR HERO]]      → título H1 en 2 líneas, máx 10 palabras
 *    [[BAJADA]]            → 1-2 oraciones B2B, sin poesía
 *    [[X]] años            → años de trayectoria del productor
 *
 *  HistoriaSection.jsx
 *    [[H2 HISTORIA]]       → título de la sección historia
 *    [[AÑO]]               → año de inicio de la producción
 *    [[X]] (colmenas)      → cantidad de colmenas al inicio
 *    [[P2]]                → motivo del paso al canal mayorista
 *    [[P3]]                → estado actual, alcance geográfico
 *    [[PROVINCIAS]]        → regiones/provincias a las que llegan
 *    [[NOMBRE DEL PRODUCTOR]] → nombre de quien aparece en la foto
 *    [[AÑO DE INICIO]]     → año para la caption de la foto
 *
 *  TerritorioSection.jsx
 *    [[ALTITUD]]           → metros sobre el nivel del mar
 *    [[T MIN]] / [[T MAX]] → temperaturas media anual
 *    [[ESPECIES]]          → flora melífera nativa (ej: algarrobo, espinillo…)
 *    [[MES]] / [[MES]]     → meses de temporada principal
 *    [[X]] colmenas        → cantidad actual
 *    [[X]] ha              → superficie del apiario
 *    [[X]] años            → años de trayectoria
 *
 *  ProcesoSection.jsx
 *    Paso 2: [[X]]°C       → temperatura máxima de extracción
 *    Paso 3: [[NÚMERO]]    → número de habilitación bromatológica
 *
 *  ValoresSection.jsx
 *    [[Describir trazabilidad]]  → documentación, análisis, etc.
 *    [[Describir volumen]]       → kg disponibles, mínimo de pedido
 *    [[Describir atención]]      → canal, horario, tiempo de respuesta
 *
 *  RespaldoSection.jsx
 *    [[X]]+ colmenas activas
 *    [[X]] años en el rubro
 *    [[X]] kg producción anual
 *    [[X]] clientes B2B activos
 *
 *  IMÁGENES A COLOCAR en /public/nosotros/:
 *    hero-apiario.webp     → foto del apiario o sierras (16:9 o 4:3, mín 1600px ancho)
 *                            → activar: HeroNosotros.jsx línea 10: HAS_IMAGE = true
 *    productor.webp        → foto del productor (4:5 o 3:4, mín 800px ancho)
 *                            → activar: HistoriaSection.jsx línea 10: HAS_IMAGE = true
 * ══════════════════════════════════════════════════════════════
 */

import HeroNosotros    from "@/components/nosotros/HeroNosotros";
import HistoriaSection from "@/components/nosotros/HistoriaSection";
import TerritorioSection from "@/components/nosotros/TerritorioSection";
import ProcesoSection  from "@/components/nosotros/ProcesoSection";
import ValoresSection  from "@/components/nosotros/ValoresSection";
import RespaldoSection from "@/components/nosotros/RespaldoSection";
import CTANosotros     from "@/components/nosotros/CTANosotros";

export const metadata = {
  title: "Nosotros | Sabores de Monte — Productor apícola de Obispo Trejo",
  description:
    "Productores apícolas artesanales de Obispo Trejo, Córdoba. Miel sin pasteurizar, sales y aceite de oliva para el canal mayorista. Trato directo con el productor.",
  openGraph: {
    title: "Nosotros | Sabores de Monte",
    description:
      "Productores apícolas de Obispo Trejo, Córdoba. Proveedor directo para distribuidores, restaurantes y tiendas gourmet.",
    url: "https://saboresdemonte.com.ar/nosotros",
    images: [
      {
        url: "/nosotros/hero-apiario.webp",
        width: 1600,
        height: 900,
        alt: "Apiario Sabores de Monte — Obispo Trejo, Córdoba",
      },
    ],
  },
  alternates: {
    canonical: "https://saboresdemonte.com.ar/nosotros",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://saboresdemonte.com.ar/nosotros",
  url: "https://saboresdemonte.com.ar/nosotros",
  name: "Sobre Nosotros — Sabores de Monte",
  description:
    "Productores apícolas artesanales de Obispo Trejo, Córdoba. Historia, territorio, proceso y compromisos con el canal mayorista.",
  about: {
    "@type": "Organization",
    "@id": "https://saboresdemonte.com.ar/#organization",
    name: "Sabores de Monte",
    url: "https://saboresdemonte.com.ar",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Obispo Trejo",
      addressRegion: "Córdoba",
      addressCountry: "AR",
    },
  },
};

export default function NosotrosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroNosotros />
      <HistoriaSection />
      <TerritorioSection />
      <ProcesoSection />
      <ValoresSection />
      <RespaldoSection />
      <CTANosotros />
    </>
  );
}
