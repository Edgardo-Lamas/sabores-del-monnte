import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@/auth";

const DEFAULT_DESCUENTO = 15;

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("config")
      .select("key, value");

    if (error) throw error;

    const config = {};
    for (const row of data ?? []) config[row.key] = row.value;

    return NextResponse.json({
      descuento_mayorista: Number(config.descuento_mayorista ?? DEFAULT_DESCUENTO),
    });
  } catch {
    return NextResponse.json({ descuento_mayorista: DEFAULT_DESCUENTO });
  }
}

export async function PATCH(request) {
  const session = await auth();
  if (!session?.user || session.user.rol !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const { descuento_mayorista } = body;
  if (descuento_mayorista === undefined || isNaN(Number(descuento_mayorista))) {
    return NextResponse.json({ error: "Valor inválido" }, { status: 422 });
  }

  const pct = Math.min(100, Math.max(0, Number(descuento_mayorista)));

  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from("config")
      .upsert({ key: "descuento_mayorista", value: String(pct) }, { onConflict: "key" });

    if (error) throw error;
    return NextResponse.json({ ok: true, descuento_mayorista: pct });
  } catch (err) {
    return NextResponse.json({ error: "Error al guardar", detail: err.message }, { status: 500 });
  }
}
