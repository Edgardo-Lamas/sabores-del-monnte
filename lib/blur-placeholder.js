/**
 * Tiny dark-amber SVG usado como blur placeholder en next/image.
 * Evita el flash de fondo blanco mientras carga la imagen real.
 */
export const PRODUCT_BLUR_URL =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="10">
      <rect width="8" height="10" fill="#2A1F12"/>
    </svg>`
  ).toString("base64");
