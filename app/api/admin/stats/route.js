import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const now = new Date();
  const hace30dias = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();
  const hace7dias  = new Date(now -  7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    { data: pedidos },
    { data: solicitudes },
    { data: stock },
    { data: pedidosRecientes },
    { data: actividad7d },
  ] = await Promise.all([
    supabase.from("pedidos").select("id,total,estado,created_at").gte("created_at", hace30dias),
    supabase.from("solicitudes").select("id,nombre,empresa,email,tipo_negocio,estado,created_at").order("created_at", { ascending: false }).limit(20),
    supabase.from("stock").select("*").order("cantidad", { ascending: true }),
    supabase.from("pedidos").select("id,total,estado,cliente_nombre,created_at").order("created_at", { ascending: false }).limit(10),
    supabase.from("actividad").select("user_email,user_nombre,tipo,payload,created_at").gte("created_at", hace7dias).order("created_at", { ascending: false }),
  ]);

  // Pedidos por día (últimos 14 días)
  const pedidosPorDia = [];
  for (let i = 13; i >= 0; i--) {
    const fecha = new Date(now - i * 24 * 60 * 60 * 1000);
    const label = fecha.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });
    const delDia = (pedidos || []).filter(p =>
      new Date(p.created_at).toDateString() === fecha.toDateString()
    );
    pedidosPorDia.push({
      fecha: label,
      pedidos: delDia.length,
      ingresos: delDia.reduce((s, p) => s + Number(p.total || 0), 0),
    });
  }

  // Distribución por estado de pedidos
  const estadosPedidos = ["recibido","en_preparacion","enviado","entregado","cancelado"]
    .map(estado => ({
      estado,
      label: { recibido:"Recibido", en_preparacion:"En preparación", enviado:"Enviado", entregado:"Entregado", cancelado:"Cancelado" }[estado],
      cantidad: (pedidos || []).filter(p => p.estado === estado).length,
    }))
    .filter(e => e.cantidad > 0);

  // Distribución solicitudes por tipo de negocio
  const tiposNegocio = [...new Set((solicitudes || []).map(s => s.tipo_negocio).filter(Boolean))];
  const solicitudesPorTipo = tiposNegocio.map(tipo => ({
    tipo,
    cantidad: (solicitudes || []).filter(s => s.tipo_negocio === tipo).length,
  }));

  // ── Comunidad — métricas de actividad (últimos 7 días) ──
  const actividad = actividad7d || [];

  // Mayoristas activos (visitaron en 7 días, únicos por email)
  const visitasEmails = [...new Set(
    actividad.filter(a => a.tipo === "visita").map(a => a.user_email)
  )];
  const mayoristasActivos = visitasEmails.map(email => {
    const eventos = actividad.filter(a => a.user_email === email);
    const nombre  = eventos[0]?.user_nombre || email;
    const ultima  = eventos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]?.created_at;
    const visitas = eventos.filter(a => a.tipo === "visita").length;
    return { email, nombre, visitas, ultima };
  }).sort((a, b) => b.visitas - a.visitas);

  // Productos más vistos
  const vistosMap = {};
  actividad.filter(a => a.tipo === "producto_visto").forEach(a => {
    const id = a.payload?.product_id;
    const nombre = a.payload?.nombre || id;
    if (!id) return;
    if (!vistosMap[id]) vistosMap[id] = { product_id: id, nombre, vistas: 0 };
    vistosMap[id].vistas++;
  });
  const productosMasVistos = Object.values(vistosMap)
    .sort((a, b) => b.vistas - a.vistas)
    .slice(0, 5);

  // Carritos agregados (únicos por email, sin conversión — proxy de abandono)
  const carritosMap = {};
  actividad.filter(a => a.tipo === "carrito_agregado").forEach(a => {
    const email = a.user_email;
    if (!carritosMap[email]) carritosMap[email] = { email, nombre: a.user_nombre, items: [] };
    carritosMap[email].items.push(a.payload?.nombre);
  });
  const carritosActivos = Object.values(carritosMap).slice(0, 5);

  return NextResponse.json({
    kpis: {
      totalPedidos:   (pedidos || []).length,
      totalIngresos:  (pedidos || []).reduce((s, p) => s + Number(p.total || 0), 0),
      pendientes:     (solicitudes || []).filter(s => s.estado === "pendiente").length,
      stockBajo:      (stock || []).filter(s => s.cantidad <= s.alerta_minima).length,
      entregados:     (pedidos || []).filter(p => p.estado === "entregado").length,
      mayoristasActivos: mayoristasActivos.length,
    },
    pedidosPorDia,
    estadosPedidos,
    solicitudesPorTipo,
    solicitudes:      solicitudes || [],
    stock:            stock || [],
    pedidosRecientes: pedidosRecientes || [],
    comunidad: {
      mayoristasActivos,
      productosMasVistos,
      carritosActivos,
    },
  });
}
