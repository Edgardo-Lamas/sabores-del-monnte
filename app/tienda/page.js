import { auth } from "@/auth";
import TiendaView from "./TiendaView";

export const metadata = {
  title: "Tienda Mayorista — Sabores de Monte",
};

export default async function TiendaPage() {
  const session = await auth();

  return (
    <TiendaView
      empresa={session?.user?.empresa ?? ""}
      userName={session?.user?.name ?? ""}
      userEmail={session?.user?.email ?? ""}
    />
  );
}
