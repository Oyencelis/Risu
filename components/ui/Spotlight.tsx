"use client";

import { useEffect, useRef } from "react";

/** A soft light inside its parent panel that follows the pointer. Decorative. */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = ref.current;
    const host = light?.parentElement;
    if (!light || !host) return;
    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      light.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      light.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    return () => host.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={ref} aria-hidden="true" className="spotlight pointer-events-none absolute inset-0" />;
}
