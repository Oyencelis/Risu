"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the content follows the pointer, as a share of the distance. */
  strength?: number;
};

const SPRING = { stiffness: 220, damping: 16, mass: 0.4 };

/** Wraps a button or link so it leans toward the mouse pointer, then springs back. */
export function Magnetic({ children, className = "", strength = 0.35 }: MagneticProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const onMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}
