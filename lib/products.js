export const products = [
  {
    id: "miel-natural",
    nombre: "Miel 100% Natural",
    categoria: "miel",
    descripcion:
      "Miel multifloral de las sierras de Córdoba. Extracción propia, sin pasteurizar.",
    origen: "Obispo Trejo, Córdoba",
    presentaciones: ["500g", "1kg", "5kg", "20kg"],
    badge: "Producto principal",
    imagen: "/images/productos/miel-natural.webp",
  },
  {
    id: "aceite-oliva-unico",
    nombre: "Aceite de Oliva ÚNICO",
    categoria: "aceite",
    descripcion:
      "Aceite de Oliva Virgen Extra con Ajo Negro líquido. 500ml.",
    origen: "Argentina",
    presentaciones: ["500ml"],
    badge: null,
    imagen: "/images/productos/aceite-unico.webp",
  },
  {
    id: "aceite-ajo-negro",
    nombre: "AOVE Ajo Negro",
    categoria: "aceite",
    descripcion:
      "Aceite de Oliva Virgen Extra macerado con Ajo Negro. Sin conservantes ni colorantes.",
    origen: "Argentina",
    presentaciones: ["250ml", "Pack x6"],
    badge: null,
    imagen: "/images/productos/ajo-negro.webp",
  },
  {
    id: "sal-de-campo",
    nombre: "Sal de Campo",
    categoria: "sal",
    descripcion:
      "Mezclas artesanales de sal con especias. Variedades: Original, Fina, Ahumada, Marina.",
    origen: "Argentina",
    presentaciones: ["250g"],
    badge: "Sin TACC",
    imagen: "/images/productos/sal-campo.webp",
  },
];

export const categories = [
  { value: "todos", label: "Todos" },
  { value: "miel", label: "Miel" },
  { value: "aceite", label: "Aceite" },
  { value: "sal", label: "Sal" },
];
