import CatalogoClient from "./CatalogoClient";

export const metadata = {
  title: "Catálogo de Selección | Origen Natural",
  description:
    "8 productos artesanales seleccionados: miel pura, aceite de oliva, sal de campo, pimientas especiales y más. Distribuidora mayorista para restaurantes y tiendas gourmet.",
  openGraph: {
    title: "Catálogo de Selección | Origen Natural",
    description:
      "Productos artesanales de calidad premium. Precios mayoristas para distribuidores, restaurantes y tiendas.",
    siteName: "Origen Natural",
    locale: "es_AR",
    type: "website",
  },
};

export default function CatalogoPage() {
  return <CatalogoClient />;
}
