import { NextResponse } from "next/server";

/**
 * POST /api/solicitudes
 *
 * Recibe la solicitud de cuenta mayorista, la guarda en Supabase
 * y envía un email de confirmación al solicitante.
 *
 * TODO: configurar las siguientes variables de entorno en .env.local:
 *   SUPABASE_URL=
 *   SUPABASE_SERVICE_ROLE_KEY=
 *   EMAIL_FROM=
 *   RESEND_API_KEY=   (o el proveedor de email que se use)
 */

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  /* ─── Validación básica server-side ─── */

  const required = ["nombre", "empresa", "cuit", "email", "telefono", "tipoNegocio", "provincia", "volumen"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `Campo requerido: ${field}` },
        { status: 422 }
      );
    }
  }

  if (body.terminos !== true) {
    return NextResponse.json(
      { error: "Debés aceptar los términos y condiciones" },
      { status: 422 }
    );
  }

  /* ─── TODO: Guardar en Supabase ─── */
  /*
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error: dbError } = await supabase
    .from("solicitudes_mayoristas")
    .insert({
      nombre:       body.nombre,
      empresa:      body.empresa,
      cuit:         body.cuit,
      email:        body.email,
      telefono:     body.telefono,
      tipo_negocio: body.tipoNegocio,
      provincia:    body.provincia,
      volumen:      body.volumen,
      mensaje:      body.mensaje ?? null,
      estado:       "pendiente",
      created_at:   new Date().toISOString(),
    });

  if (dbError) {
    console.error("[solicitudes] Supabase error:", dbError);
    return NextResponse.json({ error: "Error al guardar la solicitud" }, { status: 500 });
  }
  */

  /* ─── TODO: Enviar email de confirmación (ej. con Resend) ─── */
  /*
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from:    process.env.EMAIL_FROM,
    to:      body.email,
    subject: "Solicitud recibida — Sabores de Monte",
    html: `
      <p>Hola ${body.nombre},</p>
      <p>Recibimos tu solicitud de cuenta mayorista para <strong>${body.empresa}</strong>.</p>
      <p>Revisamos tu perfil en las próximas 24–48 hs hábiles y te contactamos para darte acceso.</p>
      <p>— Sabores de Monte</p>
    `,
  });
  */

  /* ─── Respuesta de éxito ─── */
  return NextResponse.json({ ok: true }, { status: 201 });
}
