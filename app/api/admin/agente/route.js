import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Sos un estratega de marketing especializado en distribución B2B de alimentos artesanales en Argentina.

Tu cliente es Sabores de Monte, una distribuidora artesanal de Obispo Trejo, Córdoba. Producen y distribuyen:
- Miel multifloral (960g, 500g, 250g)
- Miel citrus (250g)
- Miel cremada (960g, 500g, 250g)
- Miel con propóleos (250g)

Canal de ventas: exclusivamente B2B mayorista. Sus clientes son distribuidoras, restaurantes, tiendas gourmet, dietéticas y supermercados de Argentina, con foco en Córdoba y el interior.

El contacto comercial se hace por WhatsApp. No tienen e-commerce propio — los pedidos se confirman por chat.

Cuando recibas datos del negocio, analizalos y respondé SIEMPRE con exactamente estos 4 bloques, usando este formato markdown:

## 📊 Resumen del período
[2-3 oraciones sobre qué pasó con las métricas. Sé directo, sin adornos.]

## 🍯 Producto a empujar esta semana
[Nombré el producto específico y explicá por qué: tiene vistas pero poca conversión, o es temporada, o tiene stock disponible. Una acción concreta.]

## 📞 A quién contactar
[Lista de 2-3 acciones concretas: mayoristas inactivos, provincias sin cubrir, tipos de negocio subrepresentados. Con el mensaje sugerido si aplica.]

## 📣 Campaña sugerida
[Una sola campaña concreta: canal (WhatsApp/Instagram), público, mensaje listo para copiar y pegar, timing.]

Respondé en español rioplatense. Sin introducciones, sin conclusiones, directo a los 4 bloques.`;

export async function POST(request) {
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

  // Recopilar datos del negocio
  const [{ data: eventos }, { data: solicitudes }, { data: usuarios }] = await Promise.all([
    supabase.from("actividad").select("tipo, payload, user_email, created_at").gte("created_at", desdeISO),
    supabase.from("solicitudes").select("provincia, tipo_negocio, estado, created_at").gte("created_at", desdeISO),
    supabase.from("users").select("rol, activo, created_at").eq("rol", "mayorista"),
  ]);

  const ev = eventos || [];

  // Funnel
  const visitas           = ev.filter((e) => e.tipo === "visita" || e.tipo === "pageview").length;
  const productosVistos   = ev.filter((e) => e.tipo === "producto_visto").length;
  const carritosAgregados = ev.filter((e) => e.tipo === "carrito_agregado").length;
  const pedidos           = ev.filter((e) => e.tipo === "pedido_whatsapp").length;

  // Productos más vistos
  const vistasMap = {};
  ev.filter((e) => e.tipo === "producto_visto").forEach((e) => {
    const n = e.payload?.nombre || "Desconocido";
    vistasMap[n] = (vistasMap[n] || 0) + 1;
  });

  // Productos en pedidos
  const pedidosMap = {};
  ev.filter((e) => e.tipo === "pedido_whatsapp").forEach((e) => {
    (e.payload?.productos || []).forEach((p) => {
      const n = p.nombre || "Desconocido";
      pedidosMap[n] = (pedidosMap[n] || 0) + (p.qty || 1);
    });
  });

  // Segmentación
  const porProvincia = {};
  const porTipo = {};
  (solicitudes || []).forEach((s) => {
    if (s.provincia)    porProvincia[s.provincia]   = (porProvincia[s.provincia]   || 0) + 1;
    if (s.tipo_negocio) porTipo[s.tipo_negocio]     = (porTipo[s.tipo_negocio]     || 0) + 1;
  });

  // Inactivos (mayoristas sin actividad en 30 días)
  const emailsActivos = new Set(ev.filter((e) => e.user_email).map((e) => e.user_email));
  const { data: todosUsuarios } = await supabase.from("users").select("email, nombre, empresa").eq("rol", "mayorista").eq("activo", true);
  const inactivos = (todosUsuarios || []).filter((u) => !emailsActivos.has(u.email));

  const contexto = `
DATOS DEL NEGOCIO — últimos 30 días
Fecha del análisis: ${new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" })}

FUNNEL DE CONVERSIÓN:
- Visitas al sitio: ${visitas}
- Vieron un producto: ${productosVistos} (${visitas ? Math.round((productosVistos / visitas) * 100) : 0}% de las visitas)
- Agregaron al carrito: ${carritosAgregados} (${productosVistos ? Math.round((carritosAgregados / productosVistos) * 100) : 0}% de vistas de producto)
- Enviaron pedido por WhatsApp: ${pedidos} (${carritosAgregados ? Math.round((pedidos / carritosAgregados) * 100) : 0}% del carrito)

PRODUCTOS MÁS VISTOS:
${Object.entries(vistasMap).sort((a,b) => b[1]-a[1]).map(([n,v]) => `- ${n}: ${v} vistas`).join("\n") || "Sin datos aún"}

PRODUCTOS EN PEDIDOS:
${Object.entries(pedidosMap).sort((a,b) => b[1]-a[1]).map(([n,v]) => `- ${n}: ${v} unidades pedidas`).join("\n") || "Sin datos aún"}

NUEVOS MAYORISTAS ESTE MES:
- Solicitudes recibidas: ${(solicitudes || []).length}
- Por provincia: ${Object.entries(porProvincia).map(([k,v]) => `${k} (${v})`).join(", ") || "Sin datos"}
- Por tipo de negocio: ${Object.entries(porTipo).map(([k,v]) => `${k} (${v})`).join(", ") || "Sin datos"}

MAYORISTAS TOTALES ACTIVOS: ${(usuarios || []).filter((u) => u.activo).length}

MAYORISTAS INACTIVOS (sin actividad en 30 días): ${inactivos.length}
${inactivos.slice(0, 5).map((u) => `- ${u.nombre} (${u.empresa || "sin empresa"})`).join("\n") || "Ninguno"}
`.trim();

  // Streaming con Claude
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const response = await client.messages.stream({
        model:      "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system:     SYSTEM_PROMPT,
        messages:   [{ role: "user", content: contexto }],
      });

      for await (const chunk of response) {
        if (chunk.type === "content_block_delta" && chunk.delta?.type === "text_delta") {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
