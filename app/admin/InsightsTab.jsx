"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { RefreshCw, TrendingUp, ShoppingCart, Eye, Package } from "lucide-react";

const TIPO_LABELS = {
  distribuidora: "Distribuidora",
  restaurante:   "Restaurante",
  tienda:        "Tienda / Dietética",
  supermercado:  "Supermercado",
  otro:          "Otro",
};

function Panel({ title, children }) {
  return (
    <div style={{ background: "#1C1C1E", border: "1px solid #2C2C2E", borderRadius: 6, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #2C2C2E" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#D1D5DB", letterSpacing: "0.01em" }}>{title}</span>
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}

function BarRow({ label, valor, max, color }) {
  const pct = max ? Math.round((valor / max) * 100) : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <span style={{ fontSize: 12, color: "#9CA3AF", minWidth: 160, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 6, background: "#1F1F21", borderRadius: 3 }}>
        <div style={{ height: "100%", borderRadius: 3, background: color, width: `${pct}%`, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontSize: 12, color: "#6B7280", minWidth: 28, textAlign: "right" }}>{valor}</span>
    </div>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#111113", border: "1px solid #2C2C2E", borderRadius: 4, padding: "8px 12px" }}>
      <p style={{ color: "#9CA3AF", fontSize: 11, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 12, margin: "2px 0" }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
}

export default function InsightsTab() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchInsights() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/insights");
      const json = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchInsights(); }, []);

  if (loading && !data) {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}>
        <RefreshCw size={20} color="#374151" style={{ animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  if (!data) return null;

  const FUNNEL_ICONS = [Eye, Eye, ShoppingCart, Package];
  const FUNNEL_COLORS = ["#3B82F6", "#8B5CF6", "#F59E0B", "#22C55E"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 12, color: "#4B5563", margin: 0 }}>Últimos 30 días</p>
        <button
          onClick={fetchInsights}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 4, border: "1px solid #2C2C2E",
            background: "transparent", color: "#9CA3AF", fontSize: 12, cursor: "pointer",
          }}
        >
          <RefreshCw size={11} />
          Actualizar
        </button>
      </div>

      {/* ── Funnel ── */}
      <Panel title="Embudo de conversión — 30 días">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {data.funnel.map((step, i) => {
            const Icon = FUNNEL_ICONS[i];
            return (
              <div key={i} style={{ position: "relative" }}>
                {i > 0 && (
                  <div style={{
                    position: "absolute", left: -12, top: "50%", transform: "translateY(-50%)",
                    fontSize: 16, color: "#2C2C2E", zIndex: 1,
                  }}>→</div>
                )}
                <div style={{
                  background: "#161618", border: `1px solid ${FUNNEL_COLORS[i]}22`,
                  borderRadius: 5, padding: "14px 12px", textAlign: "center",
                }}>
                  <Icon size={14} color={FUNNEL_COLORS[i]} style={{ marginBottom: 8 }} />
                  <p style={{ fontSize: 24, fontWeight: 700, color: FUNNEL_COLORS[i], margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                    {step.valor}
                  </p>
                  <p style={{ fontSize: 11, color: "#4B5563", margin: "0 0 6px", lineHeight: 1.3 }}>
                    {step.label}
                  </p>
                  {i > 0 && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
                      color: step.pct >= 10 ? "#22C55E" : step.pct >= 3 ? "#F59E0B" : "#EF4444",
                      background: "#1F1F21", padding: "2px 6px", borderRadius: 3,
                    }}>
                      {step.pct}% del paso anterior
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* ── Tendencia pedidos + Ranking productos ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

        <Panel title="Tendencia de pedidos — 14 días">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data.tendenciaPedidos} margin={{ top: 0, right: 8, left: -28, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F1F21" />
              <XAxis dataKey="fecha" tick={{ fill: "#4B5563", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#4B5563", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="pedidos" name="Pedidos" fill="#22C55E" radius={[2,2,0,0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Productos — vistas vs pedidos">
          {!data.rankingProductos.length ? (
            <p style={{ fontSize: 12, color: "#374151" }}>Sin datos aún</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ color: "#4B5563", textAlign: "left" }}>
                    <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E" }}>Producto</th>
                    <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E", textAlign: "right" }}>Vistas</th>
                    <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E", textAlign: "right" }}>Carrito</th>
                    <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E", textAlign: "right" }}>Pedidos</th>
                    <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E", textAlign: "right" }}>Conv.</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rankingProductos.map((p, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #1F1F21" }}>
                      <td style={{ padding: "7px 0", color: "#D1D5DB", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {p.nombre}
                      </td>
                      <td style={{ padding: "7px 0", color: "#3B82F6", textAlign: "right" }}>{p.vistas}</td>
                      <td style={{ padding: "7px 0", color: "#F59E0B", textAlign: "right" }}>{p.carrito}</td>
                      <td style={{ padding: "7px 0", color: "#22C55E", textAlign: "right", fontWeight: 600 }}>{p.pedidos}</td>
                      <td style={{ padding: "7px 0", textAlign: "right" }}>
                        <span style={{
                          fontSize: 11, fontWeight: 700,
                          color: p.convPct >= 10 ? "#22C55E" : p.convPct >= 3 ? "#F59E0B" : "#6B7280",
                        }}>
                          {p.convPct}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </div>

      {/* ── Segmentación ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

        <Panel title="Mayoristas por provincia">
          {!data.segmentacion.provincia.length ? (
            <p style={{ fontSize: 12, color: "#374151" }}>Sin datos aún — los nuevos registros incluirán provincia</p>
          ) : (
            data.segmentacion.provincia.map((p, i) => (
              <BarRow
                key={i}
                label={p.label}
                valor={p.valor}
                max={data.segmentacion.provincia[0].valor}
                color="#3B82F6"
              />
            ))
          )}
        </Panel>

        <Panel title="Mayoristas por tipo de negocio">
          {!data.segmentacion.tipoNegocio.length ? (
            <p style={{ fontSize: 12, color: "#374151" }}>Sin datos aún — los nuevos registros incluirán tipo</p>
          ) : (
            data.segmentacion.tipoNegocio.map((t, i) => (
              <BarRow
                key={i}
                label={TIPO_LABELS[t.label] || t.label}
                valor={t.valor}
                max={data.segmentacion.tipoNegocio[0].valor}
                color="#8B5CF6"
              />
            ))
          )}
        </Panel>
      </div>

      {/* ── Pipeline ── */}
      <Panel title="Pipeline de mayoristas — total histórico">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[
            { key: "pendiente",  label: "Pendientes",  color: "#F59E0B", desc: "Enviaron solicitud, sin procesar" },
            { key: "aprobado",   label: "Aprobados",   color: "#22C55E", desc: "Con acceso activo al Club Origen" },
            { key: "rechazado",  label: "Rechazados",  color: "#EF4444", desc: "Solicitudes no aprobadas" },
          ].map((s) => (
            <div key={s.key} style={{
              background: "#161618", border: `1px solid ${s.color}22`,
              borderRadius: 5, padding: "14px 16px",
            }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: s.color, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                {data.pipeline[s.key] ?? 0}
              </p>
              <p style={{ fontSize: 12, color: "#D1D5DB", margin: "0 0 4px", fontWeight: 600 }}>{s.label}</p>
              <p style={{ fontSize: 11, color: "#374151", margin: 0, lineHeight: 1.4 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* ── Nota accionable ── */}
      <div style={{
        background: "#161618", border: "1px solid #C8793A22",
        borderRadius: 6, padding: "14px 16px",
        display: "flex", alignItems: "flex-start", gap: 12,
      }}>
        <TrendingUp size={14} color="#C8793A" style={{ marginTop: 2, flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: 12, color: "#C8793A", fontWeight: 600, margin: "0 0 4px" }}>
            ¿Qué hacer con estos datos?
          </p>
          <p style={{ fontSize: 12, color: "#6B7280", margin: 0, lineHeight: 1.6 }}>
            Si un producto tiene muchas vistas pero pocas conversiones → revisá el precio o agregá más fotos.
            Si una provincia concentra muchos mayoristas → es candidata para una campaña dirigida.
            Si hay pendientes hace más de 48 hs → contactalos por WhatsApp directamente.
          </p>
        </div>
      </div>

    </div>
  );
}
