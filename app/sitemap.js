import { products } from "@/lib/products";

const BASE_URL = "https://saboresdemonte.com.ar";

export default function sitemap() {
  const staticRoutes = [
    {
      url:             BASE_URL,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        1.0,
    },
    {
      url:             `${BASE_URL}/productos`,
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        0.9,
    },
    {
      url:             `${BASE_URL}/distribuidores`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.8,
    },
    {
      url:             `${BASE_URL}/nosotros`,
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.5,
    },
  ];

  const productRoutes = products.map((p) => ({
    url:             `${BASE_URL}/productos/${p.id}`,
    lastModified:    new Date(),
    changeFrequency: "monthly",
    priority:        0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
