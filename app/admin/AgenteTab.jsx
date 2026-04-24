"use client";

import { useState, useRef } from "react";
import { Sparkles, RefreshCw, Copy, Check } from "lucide-react";

function MarkdownBlock({ text }) {
  if (!text) return null;

  const lines = text.split("\n");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {lines.map((line, i) => {
        if (line.startsWith("## ")) {
          return (
            <p key={i} style={{ fontSize: 13, fontWeight: 700, color: "#F9FAFB", margin: "16px 0 6px", letterSpacing: "0.01em" }}>
              {line.replace("## ", "")}
            </p>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <p key={i} style={{ fontSize: 13, color: "#9CA3AF", margin: "2px 0", paddingLeft: 12, borderLeft: "2px solid #2C2C2E" }}>
              {line.replace("- ", "")}
            </p>
          );
        }
        if (line.trim() === "") return <div key={i} style={{ height: 4 }} />;
        return (
          <p key={i} style={{ fontSize: 13, color: "#D1D5DB", margin: "2px 0", lineHeight: 1.65 }}>
            {line}
          </p>
        );
      })}
    </div>
  );
}

export default function AgenteTab() {
  const [analisis, setAnalisis] = useState("");
  const [loading, setLoading]   = useState(false);
  const [copiado, setCopiado]   = useState(false);
  const [fecha, setFecha]       = useState(null);
  const abortRef                = useRef(null);

  async function generarAnalisis() {
    if (loading) {
      abortRef.current?.abort();
      return;
    }

    setLoading(true);
    setAnalisis("");
    setFecha(null);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/admin/agente", {
        method: "POST",
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setAnalisis(`Error: ${err.error || "No se pudo generar el análisis"}`);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let texto = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        texto += decoder.decode(value, { stream: true });
        setAnalisis(texto);
      }

      setFecha(new Date().toLocaleString("es-AR", {
        day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit",
      }));
    } catch (err) {
      if (err.name !== "AbortError") {
        setAnalisis("Error de conexión. Intentá de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  }

  function copiar() {
    if (!analisis) return;
    navigator.clipboard.writeText(analisis);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Header con botón */}
      <div style={{
        background: "#1C1C1E", border: "1px solid #2C2C2E",
        borderRadius: 6, padding: "20px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
        flexWrap: "wrap",
      }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#F9FAFB", margin: "0 0 4px" }}>
            Agente de Marketing
          </p>
          <p style={{ fontSize: 12, color: "#4B5563", margin: 0 }}>
            Analiza los datos reales del negocio y propone acciones concretas para la semana
          </p>
        </div>
        <button
          onClick={generarAnalisis}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 20px", borderRadius: 4, border: "none",
            background: loading ? "#2C2C2E" : "#C8793A",
            color: loading ? "#6B7280" : "#0D0A06",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            transition: "background 0.2s", whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#F0A835"; }}
          onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#C8793A"; }}
        >
          {loading
            ? <><RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> Analizando…</>
            : <><Sparkles size={14} /> Generar análisis</>
          }
        </button>
      </div>

      {/* Resultado */}
      {analisis && (
        <div style={{ background: "#1C1C1E", border: "1px solid #2C2C2E", borderRadius: 6, overflow: "hidden" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 16px", borderBottom: "1px solid #2C2C2E",
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#D1D5DB" }}>
              Análisis generado{fecha ? ` · ${fecha}` : ""}
            </span>
            <button
              onClick={copiar}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "4px 10px", borderRadius: 4, border: "1px solid #2C2C2E",
                background: "transparent", color: "#6B7280", fontSize: 11, cursor: "pointer",
              }}
            >
              {copiado ? <><Check size={11} /> Copiado</> : <><Copy size={11} /> Copiar</>}
            </button>
          </div>
          <div style={{ padding: "16px 20px" }}>
            <MarkdownBlock text={analisis} />
            {loading && (
              <span style={{
                display: "inline-block", width: 8, height: 14,
                background: "#C8793A", borderRadius: 1,
                animation: "blink 0.8s step-end infinite", marginLeft: 2, verticalAlign: "middle",
              }} />
            )}
          </div>
        </div>
      )}

      {/* Estado vacío */}
      {!analisis && !loading && (
        <div style={{
          background: "#161618", border: "1px dashed #2C2C2E",
          borderRadius: 6, padding: "48px 24px", textAlign: "center",
        }}>
          <Sparkles size={24} color="#2C2C2E" style={{ marginBottom: 12 }} />
          <p style={{ fontSize: 13, color: "#374151", margin: 0 }}>
            Tocá "Generar análisis" para obtener recomendaciones basadas en los datos reales del negocio
          </p>
        </div>
      )}

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}
