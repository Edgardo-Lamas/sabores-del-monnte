"use client";

import { useEffect, useRef } from "react";

/**
 * Observes the returned ref. When the element enters the viewport
 * it sets data-revealed="" on it, triggering .reveal-up children.
 * Immediately marks as revealed when prefers-reduced-motion is set.
 */
export function useScrollReveal({ margin = "-60px 0px" } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.revealed = "";
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.revealed = "";
          io.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.05 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return ref;
}
