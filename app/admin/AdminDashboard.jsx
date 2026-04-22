"use client";

import { useEffect, useState, useCallback } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  ShoppingBag, Users, Package, TrendingUp,
  AlertTriangle, CheckCircle, Clock, RefreshCw,
} from "lucide-react";

const ESTADO_COLORES = {
  recibido:       "#3B82F6",
  en_preparacion: "#F59E0B",
  enviado:        "#8B5CF6",
  entregado:      "#22C55E",
  cancelado:      "#EF4444",
};

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

function KpiCard({ icon: Icon, label, value, sub, color, alert }) {
  return (
    <div style={{
      background: "#1C1C1E", border: `1px solid ${alert ? "#EF444433" : "#2C2C2E"}`,
      borderRadius: 6, padding: "14px 16px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500, letterSpacing: "0.01em" }}>{label}</span>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: `${color}18`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon size={13} color={color} strokeWidth={2} />
        </div>
      </div>
      <p style={{ fontSize: 22, fontWeight: 700, color: "#F9FAFB", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
        {value}
      </p>
      {sub && <p style={{ fontSize: 11, color: "#4B5563", margin: 0 }}>{sub}</p>}
    </div>
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
  const [data, setData]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

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

  // Tasa de aprobación calculada con datos reales
  const tasaAprobacion = data
    ? (() => {
        const total    = data.solicitudes.length;
        const aprobadas = data.solicitudes.filter(s => s.estado === "aprobado").length;
        return total === 0 ? null : Math.round((aprobadas / total) * 100);
      })()
    : null;

  return (
    <div style={{
      minHeight: "100vh", background: "#111113", paddingTop: 72,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 20px 48px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
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

        {loading && !data ? (
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}>
            <RefreshCw size={20} color="#374151" style={{ animation: "spin 1s linear infinite" }} />
          </div>
        ) : data && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* KPIs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
              <KpiCard
                icon={ShoppingBag}
                label="Pedidos — 30 días"
                value={data.kpis.totalPedidos}
                color="#F59E0B"
              />
              <KpiCard
                icon={TrendingUp}
                label="Ingresos estimados"
                value={`$${data.kpis.totalIngresos.toLocaleString("es-AR")}`}
                sub="Suma precios base"
                color="#10B981"
              />
              <KpiCard
                icon={Users}
                label="Solicitudes pendientes"
                value={data.kpis.pendientes}
                sub={data.kpis.pendientes > 5 ? "⚠ Revisar pronto" : "Al día"}
                color={data.kpis.pendientes > 5 ? "#EF4444" : "#3B82F6"}
                alert={data.kpis.pendientes > 5}
              />
              <KpiCard
                icon={Package}
                label="Stock bajo alerta"
                value={data.kpis.stockBajo}
                sub={data.kpis.stockBajo > 0 ? "Reabastecer" : "Stock OK"}
                color={data.kpis.stockBajo > 0 ? "#EF4444" : "#10B981"}
                alert={data.kpis.stockBajo > 0}
              />
              <KpiCard
                icon={CheckCircle}
                label="Tasa de aprobación"
                value={tasaAprobacion !== null ? `${tasaAprobacion}%` : "—"}
                sub={`${data.solicitudes.filter(s => s.estado === "aprobado").length} de ${data.solicitudes.length} solicitudes`}
                color="#8B5CF6"
              />
            </div>

            {/* Gráficos */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>

              <Panel title="Actividad — últimos 14 días">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data.pedidosPorDia} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F1F21" />
                    <XAxis dataKey="fecha" tick={{ fill: "#4B5563", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#4B5563", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<ChartTooltip />} />
                    <Line type="monotone" dataKey="pedidos" name="pedidos" stroke="#F59E0B" strokeWidth={1.5} dot={false} activeDot={{ r: 4 }} />
                    <Line type="monotone" dataKey="ingresos" name="ingresos" stroke="#3B82F6" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
                  </LineChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                  {[{ color: "#F59E0B", label: "Pedidos" }, { color: "#3B82F6", label: "Ingresos" }].map((l, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 8, height: 2, background: l.color, borderRadius: 1 }} />
                      <span style={{ fontSize: 11, color: "#4B5563" }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Estados de pedidos">
                {data.estadosPedidos.length === 0 ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 180, color: "#374151", fontSize: 12 }}>
                    Sin pedidos aún
                  </div>
                ) : (
                  <>
                    <ResponsiveContainer width="100%" height={150}>
                      <PieChart>
                        <Pie data={data.estadosPedidos} dataKey="cantidad" nameKey="label"
                          cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={2}>
                          {data.estadosPedidos.map((e, i) => (
                            <Cell key={i} fill={ESTADO_COLORES[e.estado] || "#6B7280"} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: "#111113", border: "1px solid #2C2C2E", borderRadius: 4, fontSize: 11 }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
                      {data.estadosPedidos.map((e, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: ESTADO_COLORES[e.estado] }} />
                            <span style={{ fontSize: 11, color: "#6B7280" }}>{e.label}</span>
                          </div>
                          <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600 }}>{e.cantidad}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </Panel>
            </div>

            {/* Solicitudes + Stock */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

              <Panel title="Club Origen — tipo de negocio">
                {data.solicitudesPorTipo.length === 0 ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 120, color: "#374151", fontSize: 12 }}>
                    Sin solicitudes
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={data.solicitudesPorTipo} layout="vertical" margin={{ left: 8, right: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F1F21" horizontal={false} />
                      <XAxis type="number" tick={{ fill: "#4B5563", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="tipo" tick={{ fill: "#6B7280", fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
                      <Tooltip contentStyle={{ background: "#111113", border: "1px solid #2C2C2E", borderRadius: 4, fontSize: 11 }} />
                      <Bar dataKey="cantidad" name="Solicitudes" fill="#3B82F6" radius={[0, 3, 3, 0]} maxBarSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Panel>

              <Panel title="Stock actual">
                {data.stock.length === 0 ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 120, color: "#374151", fontSize: 12 }}>
                    Sin registros
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 180, overflowY: "auto" }}>
                    {data.stock.map((s) => {
                      const pct   = Math.min(100, (s.cantidad / Math.max(s.alerta_minima * 3, 1)) * 100);
                      const color = s.cantidad === 0 ? "#EF4444" : s.cantidad <= s.alerta_minima ? "#F59E0B" : "#22C55E";
                      return (
                        <div key={s.id}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 11, color: "#9CA3AF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "70%" }}>
                              {s.product_id} · {s.presentacion}
                            </span>
                            <span style={{ fontSize: 11, color, fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>
                              {s.cantidad} u.
                              {s.cantidad <= s.alerta_minima && <AlertTriangle size={10} style={{ marginLeft: 4, display: "inline" }} />}
                            </span>
                          </div>
                          <div style={{ height: 3, borderRadius: 2, background: "#2C2C2E" }}>
                            <div style={{ height: "100%", borderRadius: 2, width: `${pct}%`, background: color, transition: "width 0.4s" }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Panel>
            </div>

            {/* Tablas */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

              <Panel
                title="Solicitudes recientes"
                action={<span style={{ fontSize: 11, color: "#4B5563" }}>últimas 20</span>}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ color: "#4B5563", textAlign: "left" }}>
                      <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E" }}>Nombre</th>
                      <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E" }}>Tipo</th>
                      <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E" }}>Estado</th>
                      <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E" }}>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.solicitudes.length === 0 ? (
                      <tr><td colSpan={4} style={{ paddingTop: 20, textAlign: "center", color: "#374151", fontSize: 12 }}>Sin solicitudes</td></tr>
                    ) : data.solicitudes.map((s) => (
                      <tr key={s.id} style={{ borderBottom: "1px solid #1F1F21" }}>
                        <td style={{ padding: "7px 8px 7px 0", color: "#D1D5DB", maxWidth: 110, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.nombre}</td>
                        <td style={{ padding: "7px 8px 7px 0", color: "#6B7280", textTransform: "capitalize" }}>{s.tipo_negocio || "—"}</td>
                        <td style={{ padding: "7px 8px 7px 0" }}><Badge estado={s.estado} /></td>
                        <td style={{ padding: "7px 0", color: "#374151" }}>
                          {new Date(s.created_at).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Panel>

              <Panel
                title="Últimos pedidos"
                action={<span style={{ fontSize: 11, color: "#4B5563" }}>últimos 10</span>}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ color: "#4B5563", textAlign: "left" }}>
                      <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E" }}>Cliente</th>
                      <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E" }}>Total</th>
                      <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E" }}>Estado</th>
                      <th style={{ paddingBottom: 8, fontWeight: 500, borderBottom: "1px solid #2C2C2E" }}>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pedidosRecientes.length === 0 ? (
                      <tr><td colSpan={4} style={{ paddingTop: 20, textAlign: "center", color: "#374151", fontSize: 12 }}>Sin pedidos aún</td></tr>
                    ) : data.pedidosRecientes.map((p) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid #1F1F21" }}>
                        <td style={{ padding: "7px 8px 7px 0", color: "#D1D5DB", maxWidth: 110, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.cliente_nombre || "—"}</td>
                        <td style={{ padding: "7px 8px 7px 0", color: "#F59E0B", fontWeight: 600 }}>${Number(p.total).toLocaleString("es-AR")}</td>
                        <td style={{ padding: "7px 8px 7px 0" }}><Badge estado={p.estado} /></td>
                        <td style={{ padding: "7px 0", color: "#374151" }}>
                          {new Date(p.created_at).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Panel>
            </div>

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
