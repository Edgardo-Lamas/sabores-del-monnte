"use client";

import { useCallback } from "react";

export function useTracking(userEmail, userNombre) {
  const track = useCallback((tipo, payload = {}) => {
    if (!userEmail) return;
    fetch("/api/actividad", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_email: userEmail, user_nombre: userNombre, tipo, payload }),
    }).catch(() => {});
  }, [userEmail, userNombre]);

  return track;
}
