"use client";

import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems]           = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addItem = useCallback((product, presentacion, precioFinal = null) => {
    const cartKey = `${product.id}__${presentacion.label}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.cartKey === cartKey);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === cartKey ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          cartKey,
          id:            product.id,
          nombre:        product.nombre,
          imagen:        product.imagen,
          presentacion:  presentacion.label,
          kgUnit:        presentacion.kgUnit,
          precioBase:    presentacion.precioBase,
          precioFinal:   precioFinal ?? presentacion.precioBase,
          qty:           1,
        },
      ];
    });
    setDrawerOpen(true);
  }, []);

  const updateQty = useCallback((cartKey, qty) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.cartKey !== cartKey));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.cartKey === cartKey ? { ...i, qty } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, drawerOpen, setDrawerOpen, addItem, updateQty, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
