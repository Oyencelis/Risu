"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Milliseconds to wait before revealing, for gentle staggering. */
  delay?: number;
};

/**
 * Fades content up the first time it enters the viewport. Works for panels
 * arriving sideways too. Reduced motion is handled in CSS via `.reveal`.
 */
export function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.shown = "true";
        observer.disconnect();
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
