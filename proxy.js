import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const rol = session?.user?.rol;

  /* ── Proteger /tienda/* ── */
  if (nextUrl.pathname.startsWith("/tienda")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", nextUrl);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (rol === "pending") {
      return NextResponse.redirect(
        new URL("/distribuidores?status=pending", nextUrl)
      );
    }
    if (rol !== "mayorista" && rol !== "admin") {
      const loginUrl = new URL("/login", nextUrl);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  /* ── Proteger /admin/* ── */
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn || rol !== "admin") {
      const loginUrl = new URL("/login", nextUrl);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
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
