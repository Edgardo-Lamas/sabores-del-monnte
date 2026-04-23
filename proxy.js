import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const rol = session?.user?.rol;

  /* ── Proteger /admin/* (excepto manifest) ── */
  if (
    nextUrl.pathname.startsWith("/admin") &&
    !nextUrl.pathname.endsWith(".webmanifest")
  ) {
    if (!isLoggedIn || rol !== "admin") {
      const loginUrl = new URL("/login", nextUrl);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  /* ── Redirigir /login si ya está autenticado ── */
  if (nextUrl.pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/start", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/login", "/start"],
};
