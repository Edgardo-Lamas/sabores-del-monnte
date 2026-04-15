"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to track vertical scroll position.
 * Returns the current scrollY value.
 * Uses passive listener for performance.
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Set initial value
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollY;
}
