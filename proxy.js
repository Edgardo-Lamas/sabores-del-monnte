import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const rol = session?.user?.rol;

  /* ── Proteger /tienda/* ── */
  if (nextUrl.pathname.startsWith("/tienda")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    if (rol === "pending") {
      return NextResponse.redirect(
        new URL("/distribuidores?status=pending", nextUrl)
      );
    }
    if (rol !== "mayorista" && rol !== "admin") {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  /* ── Proteger /admin/* ── */
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn || rol !== "admin") {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  /* ── Redirigir /login si ya está autenticado ── */
  if (nextUrl.pathname === "/login" && isLoggedIn) {
    if (rol === "admin" || rol === "mayorista") {
      return NextResponse.redirect(new URL("/tienda", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/tienda/:path*", "/admin/:path*", "/login"],
};
