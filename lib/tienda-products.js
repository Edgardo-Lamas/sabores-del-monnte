/**
 * Catálogo con precios mayoristas escalonados.
 * Precios en ARS por unidad de presentación.
 *
 * Escalas (volumen total mensual del pedido):
 *   escala[0] → 1 – 10 kg
 *   escala[1] → 11 – 50 kg
 *   escala[2] → 51 – 100 kg
 *   escala[3] → +100 kg
 *
 * TODO: reemplazar con consulta a Supabase (tabla productos + precios)
 */

export const ESCALAS = [
  { label: "1 – 10 kg",   min: 0,   max: 10  },
  { label: "11 – 50 kg",  min: 10,  max: 50  },
  { label: "51 – 100 kg", min: 50,  max: 100 },
  { label: "+ 100 kg",    min: 100, max: Infinity },
];

export const tiendaProducts = [
  {
    id:          "miel-natural",
    nombre:      "Miel 100% Natural",
    categoria:   "miel",
    descripcion: "Miel multifloral de las sierras de Córdoba. Extracción propia, sin pasteurizar.",
    imagen:      "/img/miel/miel-1.png",
    badge:       "Producto principal",
    presentaciones: [
      { label: "500 g",  kgUnit: 0.5,  precios: [3200,  2900,  2600,  2300]  },
      { label: "1 kg",   kgUnit: 1,    precios: [5800,  5200,  4700,  4200]  },
      { label: "5 kg",   kgUnit: 5,    precios: [27000, 24500, 22000, 19500] },
      { label: "20 kg",  kgUnit: 20,   precios: [98000, 90000, 82000, 74000] },
    ],
  },
  {
    id:          "aceite-oliva-unico",
    nombre:      "Aceite de Oliva ÚNICO",
    categoria:   "aceite",
    descripcion: "AOVE con Ajo Negro líquido. Sin conservantes ni colorantes.",
    imagen:      "/img/oliva/oliva-1.png",
    badge:       null,
    presentaciones: [
      { label: "500 ml", kgUnit: 0.5, precios: [4800, 4400, 4000, 3600] },
    ],
  },
  {
    id:          "aceite-ajo-negro",
    nombre:      "AOVE Ajo Negro",
    categoria:   "aceite",
    descripcion: "Aceite de Oliva Virgen Extra macerado con Ajo Negro.",
    imagen:      "/img/oliva/oliva-2.png",
    badge:       null,
    presentaciones: [
      { label: "250 ml", kgUnit: 0.25, precios: [2800, 2550, 2300, 2050] },
      { label: "Pack ×6",kgUnit: 1.5,  precios: [15500, 14200, 13000, 11800] },
    ],
  },
  {
    id:          "sal-de-campo",
    nombre:      "Sal de Campo",
    categoria:   "sal",
    descripcion: "Mezclas artesanales con especias. Variedades: Original, Fina, Ahumada, Marina.",
    imagen:      "/img/sal/sal-1.png",
    badge:       "Sin TACC",
    presentaciones: [
      { label: "250 g",  kgUnit: 0.25, precios: [1600, 1450, 1300, 1150] },
    ],
  },
];

/**
 * Determina el índice de escala según kg totales en el carrito.
 */
export function getEscalaIndex(totalKg) {
  for (let i = ESCALAS.length - 1; i >= 0; i--) {
    if (totalKg > ESCALAS[i].min) return i;
  }
  return 0;
}
