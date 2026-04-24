"use client";

import { useEffect, useState, useCallback } from "react";
import {
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Package, TrendingUp,
  CheckCircle, Clock, RefreshCw,
} from "lucide-react";
import InsightsTab from "./InsightsTab";
import AgenteTab from "./AgenteTab";

const ESTADO_LABELS = {
  pendiente:      { label: "Pendiente",       bg: "#F59E0B22", color: "#F59E0B" },
  aprobado:       { label: "Aprobado",        bg: "#22C55E22", color: "#22C55E" },
  rechazado:      { label: "Rechazado",       bg: "#EF444422", color: "#EF4444" },
  recibido:       { label: "Recibido",        bg: "#3B82F622", color: "#3B82F6" },
  en_preparacion: { label: "En preparación",  bg: "#F59E0B22", color: "#F59E0B" },
  enviado:        { label: "Enviado",         bg: "#8B5CF622", color: "#8B5CF6" },
  entregado:      { label: "Entregado",       bg: "#22C55E22", color: "#22C55E" },
  cancelado:      { label: "Cancelado",       bg: "#EF444422", color: "#EF4444" },
};

function Badge({ estado }) {
  const s = ESTADO_LABELS[estado] || { label: estado, bg: "#ffffff11", color: "#9CA3AF" };
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "2px 7px", borderRadius: 3,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.02em",
    }}>
      {s.label}
    </span>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#111113", border: "1px solid #2C2C2E",
      borderRadius: 4, padding: "8px 12px",
    }}>
      <p style={{ color: "#9CA3AF", fontSize: 11, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 12, margin: "2px 0" }}>
          {p.name}: {p.name === "ingresos" ? `$${Number(p.value).toLocaleString("es-AR")}` : p.value}
        </p>
      ))}
    </div>
  );
}

function Panel({ title, children, action }) {
  return (
    <div style={{ background: "#1C1C1E", border: "1px solid #2C2C2E", borderRadius: 6, overflow: "hidden" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 16px", borderBottom: "1px solid #2C2C2E",
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#D1D5DB", letterSpacing: "0.01em" }}>{title}</span>
        {action}
      </div>
      <div style={{ padding: "16px" }}>{children}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const [tab, setTab]             = useState("panel");
  const [data, setData]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [descuento, setDescuento]   = useState(15);
  const [descuentoInput, setDescuentoInput] = useState("15");
  const [savingDescuento, setSavingDescuento] = useState(false);
  const [descuentoOk, setDescuentoOk] = useState(false);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((d) => {
        setDescuento(d.descuento_mayorista);
        setDescuentoInput(String(d.descuento_mayorista));
      })
      .catch(() => {});
  }, []);

  async function guardarDescuento() {
    setSavingDescuento(true);
    try {
      const res = await fetch("/api/config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descuento_mayorista: Number(descuentoInput) }),
      });
      if (res.ok) {
        setDescuento(Number(descuentoInput));
        setDescuentoOk(true);
        setTimeout(() => setDescuentoOk(false), 2500);
      }
    } finally {
      setSavingDescuento(false);
    }
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const json = await res.json();
      setData(json);
      setLastUpdate(new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 60000);
    return () => clearInterval(id);
  }, [fetchData]);

  return (
    <div style={{
      minHeight: "100vh", background: "#111113", paddingTop: 72,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 20px 48px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 600, color: "#F9FAFB", margin: "0 0 2px" }}>
              Panel de control
            </h1>
            <p style={{ fontSize: 12, color: "#4B5563", margin: 0 }}>Sabores del Monte · datos últimos 30 días</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {lastUpdate && (
              <span style={{ fontSize: 11, color: "#374151" }}>Actualizado {lastUpdate}</span>
            )}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "5px 12px", borderRadius: 4, border: "1px solid #2C2C2E",
                background: "transparent", color: "#6B7280", fontSize: 12,
                textDecoration: "none", cursor: "pointer",
              }}
            >
              Ver sitio ↗
            </a>
            <button
              onClick={fetchData}
              disabled={loading}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "5px 12px", borderRadius: 4, border: "1px solid #2C2C2E",
                background: "transparent", color: "#9CA3AF", fontSize: 12, cursor: "pointer",
                opacity: loading ? 0.5 : 1,
              }}
            >
              <RefreshCw size={11} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
              Actualizar
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid #2C2C2E", paddingBottom: 0 }}>
          {[
            { key: "panel",    label: "Panel" },
            { key: "insights", label: "Insights" },
            { key: "agente",   label: "✦ Agente" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: "8px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer",
                background: "transparent", border: "none",
                borderBottom: tab === t.key ? "2px solid #C8793A" : "2px solid transparent",
                color: tab === t.key ? "#F9FAFB" : "#4B5563",
                marginBottom: -1, transition: "color 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "insights" && <InsightsTab />}
        {tab === "agente"   && <AgenteTab />}

        {tab === "panel" && loading && !data && (
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}>
            <RefreshCw size={20} color="#374151" style={{ animation: "spin 1s linear infinite" }} />
          </div>
        )}

        {tab === "panel" && !loading && data && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* ─── Analytics — Actividad del sitio ─── */}
            <Panel title="Actividad del sitio esta semana">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 16 }}>
                {[
                  { label: "Visitas hoy",          value: data.kpis.visitasHoy,          sub: `${data.kpis.visitasUnicasHoy} personas únicas`,  color: "#3B82F6" },
                  { label: "Visitas esta semana",   value: data.kpis.visitas7d,           sub: `${data.kpis.visitasUnicas7d} personas únicas`,   color: "#3B82F6" },
                  { label: "Pedidos por WhatsApp",  value: data.kpis.pedidosWA7d,         sub: `${data.kpis.pedidosWAHoy} hoy`,                  color: "#22C55E" },
                  { label: "Nuevos mayoristas",     value: data.kpis.registros7d,         sub: `${data.kpis.registrosTotal} en total`,            color: "#F59E0B" },
                  { label: "Mayoristas activos",    value: data.kpis.mayoristasActivos,   sub: "Visitaron esta semana",                           color: "#8B5CF6" },
                  { label: "Conversión",            value: `${data.kpis.conversionPct}%`, sub: "Visitantes → pedido WA",                         color: "#10B981" },
                ].map((k, i) => (
                  <div key={i} style={{ background: "#161618", border: "1px solid #2C2C2E", borderRadius: 5, padding: "12px 14px" }}>
                    <p style={{ fontSize: 11, color: "#6B7280", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{k.label}</p>
                    <p style={{ fontSize: 22, fontWeight: 700, color: k.color, margin: "0 0 3px", letterSpacing: "-0.02em" }}>{k.value}</p>
                    <p style={{ fontSize: 11, color: "#374151", margin: 0 }}>{k.sub}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: "#4B5563", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Visitas diarias — últimos 14 días</p>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={data.visitasPorDia} margin={{ top: 0, right: 8, left: -28, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F1F21" />
                  <XAxis dataKey="fecha" tick={{ fill: "#4B5563", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#4B5563", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="visitas" name="Visitas" fill="#3B82F6" radius={[2,2,0,0]} opacity={0.8} />
                  <Bar dataKey="unicos"  name="Únicos"  fill="#8B5CF6" radius={[2,2,0,0]} opacity={0.6} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
                {[{ color: "#3B82F6", label: "Visitas totales" }, { color: "#8B5CF6", label: "Visitantes únicos" }].map((l, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 8, height: 8, background: l.color, borderRadius: 2 }} />
                    <span style={{ fontSize: 11, color: "#4B5563" }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Páginas y productos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Panel title="Páginas más visitadas — 7 días">
                {!(data.paginasMasVisitadas?.length) ? (
                  <p style={{ fontSize: 12, color: "#374151" }}>Sin datos aún</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {data.paginasMasVisitadas.map((p, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 11, color: "#4B5563", width: 16, textAlign: "right" }}>{i + 1}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                            <span style={{ fontSize: 12, color: "#D1D5DB", fontWeight: 500 }}>{p.page}</span>
                            <span style={{ fontSize: 11, color: "#6B7280" }}>{p.visitas}</span>
                          </div>
                          <div style={{ height: 3, background: "#1F1F21", borderRadius: 2 }}>
                            <div style={{ height: "100%", borderRadius: 2, background: "#3B82F6", width: `${Math.round((p.visitas / data.paginasMasVisitadas[0].visitas) * 100)}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>
              <Panel title="Productos más vistos — 7 días">
                {!(data.productosMasVistos?.length) ? (
                  <p style={{ fontSize: 12, color: "#374151" }}>Sin datos aún</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {data.productosMasVistos.map((p, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 11, color: "#4B5563", width: 16, textAlign: "right" }}>{i + 1}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                            <span style={{ fontSize: 12, color: "#D1D5DB", fontWeight: 500 }}>{p.nombre}</span>
                            <span style={{ fontSize: 11, color: "#6B7280" }}>{p.vistas} vistas</span>
                          </div>
                          <div style={{ height: 3, background: "#1F1F21", borderRadius: 2 }}>
                            <div style={{ height: "100%", borderRadius: 2, background: "#F59E0B", width: `${Math.round((p.vistas / data.productosMasVistos[0].vistas) * 100)}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>
            </div>

            {/* Solicitudes recientes + Mayoristas activos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

              <Panel
                title="Solicitudes recientes"
                action={<span style={{ fontSize: 11, color: "#4B5563" }}>últimas 10</span>}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead>
                      <tr style={{ color: "#4B5563", textAlign: "left" }}>
                        <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E", whiteSpace: "nowrap" }}>Nombre</th>
                        <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E", whiteSpace: "nowrap" }}>Negocio</th>
                        <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E", whiteSpace: "nowrap" }}>Email</th>
                        <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E", whiteSpace: "nowrap" }}>WhatsApp</th>
                        <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E", whiteSpace: "nowrap" }}>Estado</th>
                        <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E", whiteSpace: "nowrap" }}>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data.solicitudes || []).length === 0 ? (
                        <tr><td colSpan={6} style={{ paddingTop: 20, textAlign: "center", color: "#374151", fontSize: 12 }}>Sin solicitudes</td></tr>
                      ) : data.solicitudes.map((s) => (
                        <tr key={s.id} style={{ borderBottom: "1px solid #1F1F21" }}>
                          <td style={{ padding: "7px 12px 7px 0", color: "#D1D5DB", whiteSpace: "nowrap" }}>{s.nombre}</td>
                          <td style={{ padding: "7px 12px 7px 0", color: "#6B7280", whiteSpace: "nowrap" }}>{s.empresa || "—"}</td>
                          <td style={{ padding: "7px 12px 7px 0", whiteSpace: "nowrap" }}>
                            <a href={`mailto:${s.email}`} style={{ color: "#3B82F6", textDecoration: "none" }}>{s.email}</a>
                          </td>
                          <td style={{ padding: "7px 12px 7px 0", whiteSpace: "nowrap" }}>
                            {s.telefono
                              ? <a href={`https://wa.me/${s.telefono.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer" style={{ color: "#22C55E", textDecoration: "none" }}>{s.telefono}</a>
                              : <span style={{ color: "#374151" }}>—</span>
                            }
                          </td>
                          <td style={{ padding: "7px 12px 7px 0" }}><Badge estado={s.estado} /></td>
                          <td style={{ padding: "7px 0", color: "#374151", whiteSpace: "nowrap" }}>
                            {new Date(s.created_at).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Panel>

              <Panel
                title="Mayoristas activos — 7 días"
                action={<span style={{ fontSize: 11, color: "#4B5563" }}>{data.comunidad.mayoristasActivos.length} únicos</span>}
              >
                {data.comunidad.mayoristasActivos.length === 0 ? (
                  <p style={{ fontSize: 12, color: "#374151", textAlign: "center", padding: "16px 0" }}>Sin actividad aún</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {data.comunidad.mayoristasActivos.map((m, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <p style={{ fontSize: 12, color: "#D1D5DB", margin: "0 0 2px", fontWeight: 500 }}>{m.nombre}</p>
                          <p style={{ fontSize: 11, color: "#4B5563", margin: 0 }}>{m.email}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontSize: 12, color: "#10B981", fontWeight: 600, margin: "0 0 2px" }}>{m.visitas} visitas</p>
                          <p style={{ fontSize: 11, color: "#374151", margin: 0 }}>
                            {new Date(m.ultima).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>

            </div>

            {/* Configuración */}
            <Panel title="Configuración">
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontSize: 11, color: "#6B7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    % Descuento Club Origen
                  </p>
                  <p style={{ fontSize: 11, color: "#4B5563", marginBottom: 8 }}>
                    Se aplica automáticamente a todos los mayoristas logueados
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={descuentoInput}
                      onChange={(e) => setDescuentoInput(e.target.value)}
                      style={{
                        width: 70, padding: "6px 10px",
                        background: "#111113", border: "1px solid #3C3C3E",
                        borderRadius: 4, color: "#F9FAFB", fontSize: 14, fontWeight: 600,
                        outline: "none",
                      }}
                    />
                    <span style={{ color: "#6B7280", fontSize: 13 }}>%</span>
                    <button
                      onClick={guardarDescuento}
                      disabled={savingDescuento}
                      style={{
                        padding: "6px 14px", borderRadius: 4, fontSize: 12, fontWeight: 600,
                        background: descuentoOk ? "#22C55E" : "#C8793A",
                        color: "#0D0A06", border: "none", cursor: savingDescuento ? "not-allowed" : "pointer",
                        opacity: savingDescuento ? 0.6 : 1, transition: "background 0.3s",
                      }}
                    >
                      {descuentoOk ? "✓ Guardado" : savingDescuento ? "Guardando…" : "Guardar"}
                    </button>
                    <span style={{ fontSize: 11, color: "#4B5563" }}>
                      Actual: <strong style={{ color: "#C8793A" }}>{descuento}%</strong>
                    </span>
                  </div>
                </div>
              </div>
            </Panel>

            {/* Referencia operativa */}
            <Panel title="Referencia operativa">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                {[
                  { icon: Clock,        color: "#22C55E", label: "Tiempo de respuesta",  valor: "< 48 hs",   desc: "Para solicitudes Club Origen" },
                  { icon: TrendingUp,   color: "#F59E0B", label: "Crecimiento mensual",  valor: "> 10%",     desc: "En cantidad de pedidos" },
                  { icon: CheckCircle,  color: "#8B5CF6", label: "Tasa de aprobación",   valor: "> 70%",     desc: "Solicitudes aprobadas vs total" },
                  { icon: Package,      color: "#3B82F6", label: "Stock mínimo seguro",  valor: "3× alerta", desc: "Para no quedar sin stock" },
                ].map((m, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "10px 12px", borderRadius: 4, background: "#161618", border: "1px solid #2C2C2E",
                  }}>
                    <m.icon size={13} color={m.color} strokeWidth={2} style={{ marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 11, color: "#4B5563", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{m.label}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: m.color, margin: "0 0 2px" }}>{m.valor}</p>
                      <p style={{ fontSize: 11, color: "#374151", margin: 0 }}>{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

          </div>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
