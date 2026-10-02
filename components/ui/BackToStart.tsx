"use client";

import { Arrow } from "@/components/ui/Arrow";

/** Pans the canvas back to its first panel (the top of the page on phones). */
export function BackToStart({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`group inline-flex cursor-pointer items-center gap-2 ${className}`}
    >
      <span className="link-u">Back to start</span>
      <Arrow className="-rotate-90 transition-[translate] duration-500 ease-out-expo group-hover:-translate-y-0.5 wide:rotate-180 wide:group-hover:-translate-x-0.5 wide:group-hover:translate-y-0" />
    </button>
  );
}
