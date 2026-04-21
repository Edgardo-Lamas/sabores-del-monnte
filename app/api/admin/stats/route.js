import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const now = new Date();
  const hace30dias = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [
    { data: pedidos },
    { data: solicitudes },
    { data: stock },
    { data: pedidosRecientes },
  ] = await Promise.all([
    supabase.from("pedidos").select("id,total,estado,created_at").gte("created_at", hace30dias),
    supabase.from("solicitudes").select("id,nombre,empresa,email,tipo_negocio,estado,created_at").order("created_at", { ascending: false }).limit(20),
    supabase.from("stock").select("*").order("cantidad", { ascending: true }),
    supabase.from("pedidos").select("id,total,estado,cliente_nombre,created_at").order("created_at", { ascending: false }).limit(10),
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

  return NextResponse.json({
    kpis: {
      totalPedidos:   (pedidos || []).length,
      totalIngresos:  (pedidos || []).reduce((s, p) => s + Number(p.total || 0), 0),
      pendientes:     (solicitudes || []).filter(s => s.estado === "pendiente").length,
      stockBajo:      (stock || []).filter(s => s.cantidad <= s.alerta_minima).length,
      entregados:     (pedidos || []).filter(p => p.estado === "entregado").length,
    },
    pedidosPorDia,
    estadosPedidos,
    solicitudesPorTipo,
    solicitudes:      solicitudes || [],
    stock:            stock || [],
    pedidosRecientes: pedidosRecientes || [],
  });
}
