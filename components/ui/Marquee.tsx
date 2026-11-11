import type { CSSProperties } from "react";
import { TechIcon } from "@/components/ui/TechIcon";

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
  /** Render items as interactive tech icons instead of text. */
  icons?: boolean;
  className?: string;
};

/**
 * A line of words or icons that scrolls sideways forever. The items are rendered twice
 * so the loop is seamless; the second copy is hidden from assistive tech.
 * Pauses on hover and stops under prefers-reduced-motion.
 */
export function Marquee({
  items,
  label,
  reverse = false,
  duration = 36,
  outline = false,
  icons = false,
  className = "",
}: MarqueeProps) {
  const copy = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : label}
      className="flex shrink-0 items-center"
    >
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex items-center whitespace-nowrap">
          {icons ? (
            <div className="group relative flex flex-col items-center gap-2 py-3">
              {/* Icon card with subtle container */}
              <div
                tabIndex={hidden ? -1 : 0}
                role="img"
                aria-label={item}
                title={item}
                className="flex cursor-pointer items-center justify-center rounded-xl border border-(--fg)/10 bg-(--fg)/[0.04] p-3 text-(--fg)/75 shadow-sm transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:scale-105 hover:border-(--fg)/20 hover:bg-(--fg)/10 hover:text-(--fg) hover:shadow-[0_4px_20px_-4px_color-mix(in_srgb,var(--fg)_18%,transparent)] focus-visible:scale-105 focus-visible:border-(--fg)/20 focus-visible:outline-none focus-visible:text-(--fg)"
              >
                <TechIcon
                  name={item}
                  className="size-9 shrink-0 sm:size-10 wide:size-[calc(4.4*var(--scale))]"
                />
              </div>

              {/* Label underneath */}
              {!hidden ? (
                <span
                  aria-hidden="true"
                  className="mono pointer-events-none max-w-[6rem] truncate text-center text-[10px] font-medium uppercase tracking-wide text-(--fg)/40 transition-colors duration-300 ease-out-expo group-hover:text-(--fg)/75 wide:text-[calc(1.05*var(--scale))]"
                >
                  {item}
                </span>
              ) : null}
            </div>
          ) : (
            <span className={outline && index % 2 === 1 ? "outline-text" : ""}>{item}</span>
          )}
          <span
            aria-hidden="true"
            className={
              icons
                ? "mx-3 self-start pt-5 text-xs opacity-20 sm:mx-4 wide:mx-[calc(1.8*var(--scale))]"
                : "mx-[0.5em] text-[0.5em] opacity-60"
            }
          >
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
