import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const session = await auth();
  if (session?.user?.rol !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const desde = new Date();
  desde.setDate(desde.getDate() - 30);
  const desdeISO = desde.toISOString();

  // Traer todos los eventos de los últimos 30 días
  const { data: eventos } = await supabase
    .from("actividad")
    .select("tipo, payload, user_email, created_at")
    .gte("created_at", desdeISO);

  const ev = eventos || [];

  // ── Funnel ────────────────────────────────────────────────────────────
  const visitas        = ev.filter((e) => e.tipo === "visita"         || e.tipo === "pageview").length;
  const productosVistos = ev.filter((e) => e.tipo === "producto_visto").length;
  const carritosAgregados = ev.filter((e) => e.tipo === "carrito_agregado").length;
  const pedidos        = ev.filter((e) => e.tipo === "pedido_whatsapp").length;

  const funnel = [
    { label: "Visitas al sitio",    valor: visitas,           pct: 100 },
    { label: "Vieron un producto",  valor: productosVistos,   pct: visitas    ? Math.round((productosVistos    / visitas)           * 100) : 0 },
    { label: "Agregaron al carrito",valor: carritosAgregados, pct: visitas    ? Math.round((carritosAgregados  / visitas)           * 100) : 0 },
    { label: "Enviaron pedido WA",  valor: pedidos,           pct: carritosAgregados ? Math.round((pedidos / carritosAgregados) * 100) : 0 },
  ];

  // ── Ranking de productos ──────────────────────────────────────────────
  const contarPorNombre = (tipo) => {
    const mapa = {};
    ev.filter((e) => e.tipo === tipo).forEach((e) => {
      const nombre = e.payload?.nombre || e.payload?.product_id || "Desconocido";
      mapa[nombre] = (mapa[nombre] || 0) + 1;
    });
    return mapa;
  };

  const vistasMap   = contarPorNombre("producto_visto");
  const carritoMap  = contarPorNombre("carrito_agregado");

  // Agregar productos de cada pedido
  const pedidosMap = {};
  ev.filter((e) => e.tipo === "pedido_whatsapp").forEach((e) => {
    (e.payload?.productos || []).forEach((p) => {
      const nombre = p.nombre || "Desconocido";
      pedidosMap[nombre] = (pedidosMap[nombre] || 0) + (p.qty || 1);
    });
  });

  const todosProductos = new Set([
    ...Object.keys(vistasMap),
    ...Object.keys(carritoMap),
    ...Object.keys(pedidosMap),
  ]);

  const rankingProductos = Array.from(todosProductos).map((nombre) => {
    const v = vistasMap[nombre]  || 0;
    const c = carritoMap[nombre] || 0;
    const p = pedidosMap[nombre] || 0;
    return {
      nombre,
      vistas:   v,
      carrito:  c,
      pedidos:  p,
      convPct:  v ? Math.round((p / v) * 100) : 0,
    };
  }).sort((a, b) => b.vistas - a.vistas);

  // ── Segmentación geográfica ───────────────────────────────────────────
  const { data: solicitudes } = await supabase
    .from("solicitudes")
    .select("provincia, tipo_negocio, estado, created_at")
    .gte("created_at", desdeISO);

  const sol = solicitudes || [];

  const porProvincia = {};
  sol.forEach((s) => {
    const p = s.provincia || "Sin datos";
    porProvincia[p] = (porProvincia[p] || 0) + 1;
  });

  const porTipoNegocio = {};
  sol.forEach((s) => {
    const t = s.tipo_negocio || "Sin datos";
    porTipoNegocio[t] = (porTipoNegocio[t] || 0) + 1;
  });

  const segmentacion = {
    provincia:    Object.entries(porProvincia).map(([k, v])   => ({ label: k, valor: v })).sort((a, b) => b.valor - a.valor),
    tipoNegocio:  Object.entries(porTipoNegocio).map(([k, v]) => ({ label: k, valor: v })).sort((a, b) => b.valor - a.valor),
  };

  // ── Pipeline mayoristas ───────────────────────────────────────────────
  const { data: todasSolicitudes } = await supabase
    .from("solicitudes")
    .select("estado");

  const pipeline = { pendiente: 0, aprobado: 0, rechazado: 0 };
  (todasSolicitudes || []).forEach((s) => {
    if (pipeline[s.estado] !== undefined) pipeline[s.estado]++;
  });

  // ── Tendencia diaria (pedidos últimos 14 días) ────────────────────────
  const pedidosPorDia = {};
  ev.filter((e) => e.tipo === "pedido_whatsapp").forEach((e) => {
    const dia = e.created_at.slice(0, 10);
    pedidosPorDia[dia] = (pedidosPorDia[dia] || 0) + 1;
  });

  const tendenciaPedidos = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const key = d.toISOString().slice(0, 10);
    return { fecha: key.slice(5), pedidos: pedidosPorDia[key] || 0 };
  });

  return NextResponse.json({
    funnel,
    rankingProductos,
    segmentacion,
    pipeline,
    tendenciaPedidos,
  });
}
