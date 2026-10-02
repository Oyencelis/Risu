import type { CSSProperties } from "react";

type MarqueeProps = {
  items: string[];
  /** Accessible name for the list. */
  label: string;
  /** Scroll right instead of left. */
  reverse?: boolean;
  /** Seconds for one full pass. */
  duration?: number;
  /** Alternate solid and outlined words. */
  outline?: boolean;
  className?: string;
};

/**
 * A line of words that scrolls sideways forever. The words are rendered twice
 * so the loop is seamless; the second copy is hidden from assistive tech.
 * Pauses on hover and stops under prefers-reduced-motion.
 */
export function Marquee({
  items,
  label,
  reverse = false,
  duration = 36,
  outline = false,
  className = "",
}: MarqueeProps) {
  const copy = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} aria-label={hidden ? undefined : label} className="flex shrink-0">
      {items.map((item, index) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className={outline && index % 2 === 1 ? "outline-text" : ""}>{item}</span>
          <span aria-hidden="true" className="mx-[0.5em] text-[0.5em] opacity-60">
            ✳
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee ${className}`}>
      <div
        className={`marquee-track ${reverse ? "marquee-rev" : ""}`}
        style={{ "--marquee-t": `${duration}s` } as CSSProperties}
      >
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}
