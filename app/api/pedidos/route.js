import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * POST /api/pedidos
 *
 * Guarda un pedido mayorista. Solo accesible con sesión activa (rol mayorista/admin).
 *
 * TODO: descomentar bloque Supabase cuando esté configurado.
 * Variables de entorno necesarias:
 *   SUPABASE_URL=
 *   SUPABASE_SERVICE_ROLE_KEY=
 */

export async function POST(request) {
  /* ── Auth check ── */
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { rol } = session.user;
  if (rol !== "mayorista" && rol !== "admin") {
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
  }

  /* ── Parse body ── */
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const { items, escala, total } = body;
  if (!items?.length || !total) {
    return NextResponse.json({ error: "Pedido vacío" }, { status: 422 });
  }

  /* ── TODO: Guardar en Supabase ──
  const { getSupabaseAdmin } = await import("@/lib/supabase");
  const supabase = getSupabaseAdmin();

  // Obtener user_id desde la tabla users por email
  const { data: dbUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single();

  const { data: pedido, error } = await supabase
    .from("pedidos")
    .insert({
      user_id:    dbUser.id,
      items_json: items,
      total:      total,
      estado:     "pendiente",
    })
    .select("id")
    .single();

  if (error) {
    console.error("[pedidos] Supabase error:", error);
    return NextResponse.json({ error: "Error al guardar el pedido" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, pedidoId: pedido.id }, { status: 201 });
  ── */

  /* ── Stub response (development) ── */
  const fakePedidoId = `PED-${Date.now()}`;
  console.log(`[pedidos] Nuevo pedido ${fakePedidoId}:`, {
    user:  session.user.email,
    items: items.length,
    escala,
    total,
  });

  return NextResponse.json({ ok: true, pedidoId: fakePedidoId }, { status: 201 });
}
