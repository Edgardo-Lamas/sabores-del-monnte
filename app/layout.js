import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/Navbar";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

/* ─── Default metadata (overridden per-route) ─── */
export const metadata = {
  metadataBase: new URL("https://saboresdemonte.com.ar"),
  title: {
    default:  "Sabores de Monte | Miel artesanal mayorista | Obispo Trejo, Córdoba",
    template: "%s | Sabores de Monte",
  },
  description:
    "Productora apícola artesanal de Obispo Trejo, Córdoba. Miel pura, aceite de oliva y sal artesanal para distribuidores, restaurantes, hoteles y tiendas gourmet.",
  openGraph: {
    siteName: "Sabores de Monte",
    locale: "es_AR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* ─── Skip to content (accesibilidad) ─── */}
        <a href="#main-content" className="skip-to-content">
          Ir al contenido principal
        </a>

        <Navbar />

        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>

        <Analytics />
      </body>
    </html>
  );
}
