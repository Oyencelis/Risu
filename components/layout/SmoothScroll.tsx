"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/** Lenis smooth scrolling. Switched off entirely under prefers-reduced-motion. */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const sync = () => {
      if (query.matches) {
        lenis?.destroy();
        lenis = null;
      } else if (!lenis) {
        lenis = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 1 });
      }
    };

    sync();
    query.addEventListener("change", sync);
    return () => {
      query.removeEventListener("change", sync);
      lenis?.destroy();
    };
  }, []);

  return null;
}
