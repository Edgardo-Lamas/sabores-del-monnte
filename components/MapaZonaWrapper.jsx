"use client";

import dynamic from "next/dynamic";

const MapaZona = dynamic(() => import("@/components/MapaZona"), {
  ssr: false,
  loading: () => (
    <div
      className="rounded-[4px] flex items-center justify-center"
      style={{
        height: "380px",
        background: "#1A1510",
        border: "1px solid rgba(200,121,58,0.25)",
      }}
    >
      <span className="text-cream/30 text-sm" style={{ fontFamily: "var(--font-body)" }}>
        Cargando mapa…
      </span>
    </div>
  ),
});

export default function MapaZonaWrapper() {
  return <MapaZona />;
}
