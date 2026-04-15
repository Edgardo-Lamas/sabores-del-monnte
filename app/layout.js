import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "Sabores de Monte — Miel artesanal de Córdoba",
  description:
    "Productora apícola artesanal de Obispo Trejo, Córdoba. Miel pura, propóleo y productos de la colmena para distribuidores, restaurantes, hoteles y tiendas gourmet.",
  keywords: [
    "miel artesanal",
    "productora apícola",
    "Córdoba",
    "Obispo Trejo",
    "miel pura",
    "B2B",
    "distribuidores",
    "gourmet",
  ],
  openGraph: {
    title: "Sabores de Monte — Miel artesanal de Córdoba",
    description:
      "Productora apícola artesanal. Miel pura y productos de la colmena para el canal mayorista.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
