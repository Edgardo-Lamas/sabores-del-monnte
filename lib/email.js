import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM || "onboarding@resend.dev";
const ADMIN = process.env.EMAIL_ADMIN;

export async function enviarEmailNuevaSolicitud({ nombre, empresa, email, tipo_negocio, provincia }) {
  if (!ADMIN) return;

  await resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `Nueva solicitud Club Origen — ${nombre}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#0D0A06;color:#E2D0A8;border-radius:6px;">
        <h2 style="color:#C8793A;margin:0 0 16px;font-size:18px;font-weight:600;">Nueva solicitud de Club Origen</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#9CA3AF;width:120px;">Nombre</td><td style="padding:6px 0;">${nombre}</td></tr>
          <tr><td style="padding:6px 0;color:#9CA3AF;">Empresa</td><td style="padding:6px 0;">${empresa || "—"}</td></tr>
          <tr><td style="padding:6px 0;color:#9CA3AF;">Email</td><td style="padding:6px 0;">${email}</td></tr>
          <tr><td style="padding:6px 0;color:#9CA3AF;">Tipo negocio</td><td style="padding:6px 0;">${tipo_negocio || "—"}</td></tr>
          <tr><td style="padding:6px 0;color:#9CA3AF;">Provincia</td><td style="padding:6px 0;">${provincia || "—"}</td></tr>
        </table>
        <p style="margin:20px 0 0;font-size:12px;color:#4B5563;">Respondé en menos de 48hs para una mejor experiencia.</p>
      </div>
    `,
  });
}

export async function enviarEmailConfirmacionSolicitud({ nombre, email }) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "¡Bienvenido al Club Origen! — Sabores del Monte",
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#0D0A06;color:#E2D0A8;border-radius:6px;">
        <h2 style="color:#C8793A;margin:0 0 12px;font-size:18px;font-weight:600;">¡Bienvenido, ${nombre}!</h2>
        <p style="font-size:14px;line-height:1.6;margin:0 0 16px;">
          Tu cuenta en el <strong style="color:#C8793A;">Club Origen</strong> de Sabores del Monte ya está activa.
        </p>
        <p style="font-size:14px;line-height:1.6;margin:0 0 16px;">
          Podés ingresar a tu tienda mayorista en cualquier momento con el email y contraseña que registraste.
        </p>
        <div style="margin:20px 0;text-align:center;">
          <a href="https://saboresdemonte.com.ar/login" style="display:inline-block;padding:12px 28px;background:#C8793A;color:#0D0A06;text-decoration:none;border-radius:4px;font-weight:600;font-size:14px;">
            Ingresar a mi tienda
          </a>
        </div>
        <p style="font-size:12px;color:#4B5563;margin:24px 0 0;">
          Sabores del Monte · Distribuidora artesanal · Obispo Trejo, Córdoba
        </p>
      </div>
    `,
  });
}
