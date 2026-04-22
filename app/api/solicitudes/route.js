import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { enviarEmailNuevaSolicitud, enviarEmailConfirmacionSolicitud } from "@/lib/email";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const { nombre, negocio, email, telefono, password } = body;

  if (!nombre || !negocio || !email || !telefono || !password) {
    return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 422 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 422 });
  }

  // Operaciones de usuarios requieren service role key (bypasea RLS)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Verificar que el email no exista ya
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: "Ya existe una cuenta con ese email" }, { status: 409 });
  }

  // Crear usuario con acceso inmediato
  const password_hash = bcrypt.hashSync(password, 10);

  const { error: userError } = await supabase
    .from("users")
    .insert({
      email:         email.toLowerCase(),
      password_hash,
      nombre,
      empresa:       negocio,
      rol:           "mayorista",
      activo:        true,
    });

  if (userError) {
    console.error("[solicitudes] Error creando usuario:", userError);
    return NextResponse.json({ error: "Error al crear la cuenta", detail: userError.message }, { status: 500 });
  }

  // Guardar en solicitudes para visibilidad del admin
  await supabase.from("solicitudes").insert({
    nombre,
    empresa:  negocio,
    email:    email.toLowerCase(),
    telefono,
    estado:   "aprobado",
  });

  // Emails en paralelo (no bloquean la respuesta)
  Promise.allSettled([
    enviarEmailNuevaSolicitud({ nombre, empresa: negocio, email, tipo_negocio: "mayorista", provincia: "" }),
    enviarEmailConfirmacionSolicitud({ nombre, email }),
  ]);

  return NextResponse.json({ ok: true }, { status: 201 });
}
