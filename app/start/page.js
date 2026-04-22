import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function StartPage() {
  const session = await auth();

  if (!session) redirect("/login?callbackUrl=/start");

  const rol = session.user?.rol;
  if (rol === "admin")     redirect("/admin");
  if (rol === "mayorista") redirect("/tienda");

  redirect("/login");
}
