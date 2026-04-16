import { products, categoryLabels } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductDetailView from "./ProductDetailView";

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return {};

  const catLabel = categoryLabels[product.categoria] ?? product.categoria;

  return {
    title: `${product.nombre} | ${catLabel}`,
    description: product.descripcion,
    openGraph: {
      title: `${product.nombre} — Sabores de Monte`,
      description: product.descripcion,
      images: product.imagen ? [{ url: product.imagen }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  return <ProductDetailView product={product} />;
}
