import ProductosClient from "./ProductosClient";

export const metadata = {
  title: "Catálogo mayorista | Miel, Aceite, Sal | Sabores de Monte",
  description:
    "Miel 100% natural, aceite de oliva virgen extra y sal artesanal de Córdoba. Catálogo con precios mayoristas por volumen. Para distribuidores, restaurantes y tiendas gourmet.",
  openGraph: {
    title: "Catálogo mayorista | Sabores de Monte",
    description:
      "Miel pura, aceite de oliva y sal artesanal del monte cordobés. Precios diferenciados por volumen para el canal B2B.",
    url: "https://saboresdemonte.com.ar/productos",
    siteName: "Sabores de Monte",
    locale: "es_AR",
    type: "website",
  },
  alternates: {
    canonical: "https://saboresdemonte.com.ar/productos",
  },
};

export default function ProductosPage() {
  return <ProductosClient />;
}
