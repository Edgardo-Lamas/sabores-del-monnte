"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function getSessionId() {
  try {
    let id = localStorage.getItem("_sdm_sid");
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("_sdm_sid", id);
    }
    return id;
  } catch {
    return null;
  }
}

export default function PageTracker() {
  const pathname = usePathname();
  const { data: session } = useSession() ?? {};
  const lastTracked = useRef(null);

  useEffect(() => {
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    const session_id = getSessionId();

    fetch("/api/actividad", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo:        "pageview",
        page:        pathname,
        session_id,
        user_email:  session?.user?.email  ?? null,
        user_nombre: session?.user?.name   ?? null,
        payload:     {},
      }),
    }).catch(() => {});
  }, [pathname, session]);

  return null;
}
