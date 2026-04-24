"use client";

import { useCallback } from "react";

export function useTracking(userEmail, userNombre) {
  const track = useCallback((tipo, payload = {}) => {
    fetch("/api/actividad", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email:  userEmail  || null,
        user_nombre: userNombre || null,
        tipo,
        payload,
      }),
    }).catch(() => {});
  }, [userEmail, userNombre]);

  return track;
}
