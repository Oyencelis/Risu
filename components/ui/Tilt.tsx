"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Largest tilt, in degrees. */
  max?: number;
};

const SPRING = { stiffness: 180, damping: 18, mass: 0.5 };

/** Tilts its content in 3D toward the mouse pointer, like a card held in the hand. */
export function Tilt({ children, className = "", max = 7 }: TiltProps) {
  const reduce = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, SPRING);
  const springY = useSpring(rotateY, SPRING);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * max * 2);
    rotateX.set(-py * max * 2);
  };
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
