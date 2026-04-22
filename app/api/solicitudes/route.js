import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { enviarEmailNuevaSolicitud, enviarEmailConfirmacionSolicitud } from "@/lib/email";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  /* ─── Validación server-side ─── */
  const required = ["nombre", "empresa", "cuit", "email", "telefono", "tipoNegocio", "provincia", "volumen"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `Campo requerido: ${field}` }, { status: 422 });
    }
  }

  if (body.terminos !== true) {
    return NextResponse.json(
      { error: "Debés aceptar los términos y condiciones" },
      { status: 422 }
    );
  }

  /* ─── Guardar en Supabase ─── */
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { error: dbError } = await supabase
    .from("solicitudes")
    .insert({
      nombre:       body.nombre,
      empresa:      body.empresa,
      cuit:         body.cuit,
      email:        body.email,
      telefono:     body.telefono,
      negocio:      body.empresa,
      tipo_negocio: body.tipoNegocio,
      provincia:    body.provincia,
      volumen:      body.volumen,
      mensaje:      body.mensaje ?? null,
      estado:       "pendiente",
    });

  if (dbError) {
    console.error("[solicitudes] Supabase error:", dbError);
    return NextResponse.json({ error: "Error al guardar la solicitud" }, { status: 500 });
  }

  /* ─── Emails ─── */
  await Promise.allSettled([
    enviarEmailNuevaSolicitud({
      nombre:       body.nombre,
      empresa:      body.empresa,
      email:        body.email,
      tipo_negocio: body.tipoNegocio,
      provincia:    body.provincia,
    }),
    enviarEmailConfirmacionSolicitud({
      nombre: body.nombre,
      email:  body.email,
    }),
  ]);

  return NextResponse.json({ ok: true }, { status: 201 });
}
