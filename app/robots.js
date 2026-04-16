export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/tienda", "/tienda/", "/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: "https://saboresdemonte.com.ar/sitemap.xml",
  };
}
