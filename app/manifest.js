export default function manifest() {
  return {
    id: "/",
    name: "Sabores del Monte",
    short_name: "Sabores",
    description: "Distribuidora artesanal mayorista — miel, aceites y productos de campo",
    start_url: "/",
    display: "standalone",
    background_color: "#0D0A06",
    theme_color: "#0D0A06",
    orientation: "portrait-primary",
    categories: ["food", "business"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/icons/screenshot-mobile.png",
        sizes: "390x844",
        type: "image/png",
      },
      {
        src: "/icons/screenshot-desktop.png",
        sizes: "1280x800",
        type: "image/png",
        form_factor: "wide",
      },
    ],
  };
}
