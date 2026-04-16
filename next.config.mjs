/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Formatos modernos — Vercel los genera automáticamente
    formats: ["image/avif", "image/webp"],
    // Tamaños de dispositivo para srcSet
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },
};

export default nextConfig;
