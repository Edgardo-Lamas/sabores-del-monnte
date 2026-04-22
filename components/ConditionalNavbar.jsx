"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const HIDDEN_PATHS = ["/tienda", "/admin"];

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const hidden = HIDDEN_PATHS.some((p) => pathname.startsWith(p));
  if (hidden) return null;
  return <Navbar />;
}
