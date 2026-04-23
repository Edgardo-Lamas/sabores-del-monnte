"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

/* Rutas donde el footer no debe mostrarse */
const HIDDEN_PATHS = ["/login", "/admin"];

export default function ConditionalFooter() {
  const pathname = usePathname();
  const hidden = HIDDEN_PATHS.some((p) => pathname.startsWith(p));
  if (hidden) return null;
  return <Footer />;
}
