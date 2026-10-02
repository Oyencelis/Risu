import type { CSSProperties, ReactNode } from "react";

type BrowserFrameProps = {
  children: ReactNode;
  /** Text shown in the address bar, e.g. the live site's host. */
  address: string;
  className?: string;
};

// Inside the window the placeholder tile is always light, like a web page.
const PAGE = { "--inv-bg": "#f4f4f1", "--inv-fg": "#0b0b0c" } as CSSProperties;

/** A simple browser window around a website screenshot. */
export function BrowserFrame({ children, address, className = "" }: BrowserFrameProps) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-[calc(var(--radius)*0.62)] bg-[#1c1c1e] shadow-2xl shadow-black/40 ring-1 ring-white/15 ${className}`}
    >
      <div aria-hidden="true" className="flex h-9 shrink-0 items-center gap-3 px-4">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white" />
          <span className="size-2.5 rounded-full bg-white/50" />
          <span className="size-2.5 rounded-full bg-white/25" />
        </span>
        <span className="mono flex-1 truncate rounded-full bg-white/10 px-3 py-0.5 text-center !text-[10px] text-fog">
          {address}
        </span>
      </div>
      <div className="min-h-0 flex-1 [&>*]:h-full [&>*]:rounded-none" style={PAGE}>
        {children}
      </div>
    </div>
  );
}
