"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Polígono aproximado que cubre CABA + GBA Norte hasta San Isidro
const ZONA_COORDS = [
  [-34.527, -58.570], // San Isidro NO
  [-34.447, -58.510], // San Isidro Norte (límite río)
  [-34.448, -58.355], // Costa norte (Tigre / San Fernando límite)
  [-34.530, -58.335], // Costa NE CABA
  [-34.622, -58.335], // Costa SE CABA
  [-34.706, -58.368], // Sur CABA
  [-34.706, -58.532], // Sur-oeste CABA
  [-34.620, -58.565], // Oeste CABA
  [-34.527, -58.570], // cierre
];

export default function MapaZona() {
  useEffect(() => {
    // Parchear el ícono por defecto de Leaflet en Next.js
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <div
      className="rounded-[4px] overflow-hidden"
      style={{ border: "1px solid rgba(200,121,58,0.25)", height: "380px" }}
    >
      <MapContainer
        center={[-34.58, -58.45]}
        zoom={11}
        scrollWheelZoom={false}
        zoomControl={true}
        style={{ height: "100%", width: "100%", background: "#0D0A06" }}
        attributionControl={false}
      >
        {/* Tiles oscuros — CartoDB Dark Matter, sin costo */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {/* Zona de cobertura */}
        <Polygon
          positions={ZONA_COORDS}
          pathOptions={{
            color: "#C8793A",
            weight: 2,
            fillColor: "#C8793A",
            fillOpacity: 0.18,
            dashArray: "6 4",
          }}
        >
          <Tooltip
            permanent
            direction="center"
            className="mapa-tooltip"
          >
            <span style={{
              fontFamily: "sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "#F0A835",
              background: "rgba(13,10,6,0.85)",
              padding: "4px 10px",
              borderRadius: "3px",
              border: "1px solid rgba(200,121,58,0.4)",
              whiteSpace: "nowrap",
            }}>
              Zona de entrega sin cargo
            </span>
          </Tooltip>
        </Polygon>
      </MapContainer>
    </div>
  );
}
