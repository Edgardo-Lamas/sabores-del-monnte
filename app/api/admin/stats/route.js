import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const now       = new Date();
  const hace30d   = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();
  const hace7d    = new Date(now -  7 * 24 * 60 * 60 * 1000).toISOString();
  const hoy       = new Date(now.setHours(0, 0, 0, 0)).toISOString();

  const [
    { data: solicitudes },
    { data: actividad30d },
  ] = await Promise.all([
    supabase
      .from("solicitudes")
      .select("id,nombre,empresa,email,estado,created_at")
      .order("created_at", { ascending: false })
      .limit(30),
    supabase
      .from("actividad")
      .select("user_email,user_nombre,tipo,payload,page,session_id,created_at")
      .gte("created_at", hace30d)
      .order("created_at", { ascending: false }),
  ]);

  const act = actividad30d || [];
  const act7d = act.filter(a => a.created_at >= hace7d);
  const actHoy = act.filter(a => a.created_at >= hoy);

  /* ── Pageviews ── */
  const pageviews = act.filter(a => a.tipo === "pageview");
  const pageviews7d = act7d.filter(a => a.tipo === "pageview");
  const pageviewsHoy = actHoy.filter(a => a.tipo === "pageview");

  // Visitantes únicos por session_id o user_email
  function uniqueVisitors(list) {
    const ids = new Set(list.map(a => a.session_id || a.user_email).filter(Boolean));
    return ids.size;
  }

  // Visitas por día (últimos 14 días)
  const visitasPorDia = [];
  for (let i = 13; i >= 0; i--) {
    const fecha = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const label = fecha.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });
    const del_dia = pageviews.filter(a =>
      new Date(a.created_at).toDateString() === fecha.toDateString()
    );
    const uniquesDia = new Set(del_dia.map(a => a.session_id || a.user_email).filter(Boolean)).size;
    visitasPorDia.push({ fecha: label, visitas: del_dia.length, unicos: uniquesDia });
  }

  // Páginas más visitadas (últimos 7 días)
  const paginasMap = {};
  pageviews7d.forEach(a => {
    const p = a.page || "/";
    if (!paginasMap[p]) paginasMap[p] = 0;
    paginasMap[p]++;
  });
  const paginasMasVisitadas = Object.entries(paginasMap)
    .map(([page, visitas]) => ({ page, visitas }))
    .sort((a, b) => b.visitas - a.visitas)
    .slice(0, 6);

  /* ── Productos más vistos ── */
  const productosMap = {};
  act7d.filter(a => a.tipo === "producto_visto").forEach(a => {
    const id     = a.payload?.product_id;
    const nombre = a.payload?.nombre || id;
    if (!id) return;
    if (!productosMap[id]) productosMap[id] = { nombre, vistas: 0 };
    productosMap[id].vistas++;
  });
  const productosMasVistos = Object.values(productosMap)
    .sort((a, b) => b.vistas - a.vistas)
    .slice(0, 5);

  /* ── Pedidos WhatsApp ── */
  const pedidosWA7d    = act7d.filter(a => a.tipo === "pedido_whatsapp").length;
  const pedidosWAHoy   = actHoy.filter(a => a.tipo === "pedido_whatsapp").length;

  /* ── Registros ── */
  const registros7d    = act7d.filter(a => a.tipo === "registro").length;
  const registrosTotal = (solicitudes || []).length;

  /* ── Mayoristas activos (visitaron en 7d, con sesión) ── */
  const emailsMayoristas = [...new Set(
    act7d
      .filter(a => a.tipo === "pageview" && a.user_email)
      .map(a => a.user_email)
  )];
  const mayoristasActivos = emailsMayoristas.map(email => {
    const eventos = act7d.filter(a => a.user_email === email);
    const nombre  = eventos[0]?.user_nombre || email;
    const visitas = eventos.filter(a => a.tipo === "pageview").length;
    const ultima  = eventos[0]?.created_at;
    return { email, nombre, visitas, ultima };
  }).sort((a, b) => b.visitas - a.visitas);

  /* ── Tasa de conversión: visitantes únicos → pedidos WA ── */
  const visitantesUnicos7d = uniqueVisitors(pageviews7d);
  const conversionPct = visitantesUnicos7d > 0
    ? Math.round((pedidosWA7d / visitantesUnicos7d) * 100)
    : 0;

  /* ── Tasa de aprobación solicitudes ── */
  const totalSol     = (solicitudes || []).length;
  const aprobadas    = (solicitudes || []).filter(s => s.estado === "aprobado").length;
  const tasaAprobacion = totalSol > 0 ? Math.round((aprobadas / totalSol) * 100) : null;

  return NextResponse.json({
    kpis: {
      visitasHoy:       pageviewsHoy.length,
      visitasUnicasHoy: uniqueVisitors(pageviewsHoy),
      visitas7d:        pageviews7d.length,
      visitasUnicas7d:  visitantesUnicos7d,
      pedidosWAHoy,
      pedidosWA7d,
      registros7d,
      registrosTotal,
      mayoristasActivos: mayoristasActivos.length,
      conversionPct,
      tasaAprobacion,
    },
    visitasPorDia,
    paginasMasVisitadas,
    productosMasVistos,
    solicitudes:       (solicitudes || []).slice(0, 10),
    comunidad: {
      mayoristasActivos,
    },
  });
}
