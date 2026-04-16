import DistribuidoresView from "./DistribuidoresView";

export const metadata = {
  title: "Programa de distribuidores | Sabores de Monte",
  description:
    "Accedé al programa de distribuidores mayoristas de Sabores de Monte. Precios escalonados por volumen, atención directa del productor y cuenta propia con historial de pedidos.",
  openGraph: {
    title: "Programa de distribuidores | Sabores de Monte",
    description:
      "Precios diferenciados, cuenta propia y atención directa del productor para distribuidores, restaurantes, hoteles y tiendas gourmet.",
    url: "https://saboresdemonte.com.ar/distribuidores",
    siteName: "Sabores de Monte",
    locale: "es_AR",
    type: "website",
  },
  alternates: {
    canonical: "https://saboresdemonte.com.ar/distribuidores",
  },
};

export default function DistribuidoresPage() {
  return <DistribuidoresView />;
}
