import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    const body = await request.json();
    const { user_email, user_nombre, tipo, payload } = body;

    if (!user_email || !tipo) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    await supabase.from("actividad").insert({ user_email, user_nombre, tipo, payload });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
