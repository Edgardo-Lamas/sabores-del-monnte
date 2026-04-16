import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

/* ─── Lazy load below-fold sections ─── */
const ValueProposition  = dynamic(() => import("@/components/ValueProposition"));
const ProductsShowcase  = dynamic(() => import("@/components/ProductsShowcase"));
const BenefitsShowcase  = dynamic(() => import("@/components/BenefitsShowcase"));

/* ─── Page metadata ─── */
export const metadata = {
  title: "Sabores de Monte | Miel artesanal mayorista | Obispo Trejo, Córdoba",
  description:
    "Productora apícola artesanal de Obispo Trejo, Córdoba. Miel pura, aceite de oliva y sal artesanal para distribuidores, restaurantes, hoteles y tiendas gourmet. Pedidos mayoristas con precios diferenciados por volumen.",
  keywords: [
    "miel artesanal mayorista",
    "productora apícola Córdoba",
    "miel Obispo Trejo",
    "miel pura sin pasteurizar",
    "proveedor miel B2B",
    "distribuidor miel Argentina",
    "aceite de oliva gourmet",
    "sal artesanal",
  ],
  openGraph: {
    title: "Sabores de Monte | Miel artesanal mayorista",
    description:
      "Miel pura y productos gourmet del monte cordobés para el canal mayorista. Precios por escala, atención directa del productor.",
    url: "https://saboresdemonte.com.ar",
    siteName: "Sabores de Monte",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabores de Monte | Miel artesanal mayorista",
    description: "Miel pura y productos gourmet para el canal mayorista.",
  },
  alternates: {
    canonical: "https://saboresdemonte.com.ar",
  },
};

/* ─── JSON-LD schema ─── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://saboresdemonte.com.ar/#organization",
      name: "Sabores de Monte",
      url: "https://saboresdemonte.com.ar",
      description:
        "Productora apícola artesanal de Obispo Trejo, Córdoba. Miel 100% natural, aceite de oliva y sal artesanal para el canal mayorista.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Obispo Trejo",
        addressRegion: "Córdoba",
        addressCountry: "AR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        availableLanguage: "Spanish",
      },
    },
    {
      "@type": "Product",
      "@id": "https://saboresdemonte.com.ar/productos/miel-natural",
      name: "Miel 100% Natural",
      description:
        "Miel multifloral de las sierras de Córdoba. Extracción propia, sin pasteurizar. Disponible en presentaciones de 500g, 1kg, 5kg y 20kg.",
      brand: { "@id": "https://saboresdemonte.com.ar/#organization" },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "ARS",
        availability: "https://schema.org/InStoreOnly",
        seller: { "@id": "https://saboresdemonte.com.ar/#organization" },
      },
      category: "Alimentos naturales / Miel",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ValueProposition />
      <ProductsShowcase />
      <BenefitsShowcase />
    </>
  );
}
