import type { ReactNode } from "react";
import { Spotlight } from "@/components/ui/Spotlight";

export type Theme = "light" | "dark";

/** Panels alternate black and white: even positions are black. */
export const themeAt = (index: number): Theme => (index % 2 === 0 ? "dark" : "light");

type FrameProps = {
  children: ReactNode;
  theme: Theme;
  /** Accessible name of the panel. */
  name: string;
  /** Id of the sidebar entry this panel belongs to. Defaults to `id`. */
  entry?: string;
  id?: string;
  className?: string;
  /** Holds the row still for a stretch while this panel animates. */
  pause?: boolean;
  /** Size to the content instead of one window wide (desktop only). */
  fit?: boolean;
};

/**
 * One rounded panel of a page. On desktop panels sit in a row and fill the
 * window height; on phones they stack and grow with their content.
 */
export function Frame({ children, theme, name, entry, id, className = "", pause, fit }: FrameProps) {
  return (
    <section
      id={id}
      aria-label={name}
      data-frame=""
      data-entry={entry ?? id}
      data-pause={pause ? "" : undefined}
      className={`flex w-full shrink-0 scroll-mt-20 flex-col ${fit ? "wide:w-max" : "wide:w-(--frame-w)"}`}
    >
      <div
        className={`sheet theme-${theme} relative flex flex-1 flex-col overflow-clip rounded-(--radius) bg-(--bg) text-(--fg) wide:h-(--frame-h) wide:flex-none ${className}`}
      >
        <Spotlight />
        {children}
      </div>
    </section>
  );
}

/** Standard padded content area of a panel. */
export function FrameBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex flex-1 flex-col px-5 py-8 wide:min-h-0 wide:p-[calc(3.6*var(--scale))] ${className}`}
    >
      {children}
    </div>
  );
}
