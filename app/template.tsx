import type { ReactNode } from "react";
import { AcornMark } from "@/components/ui/AcornMark";
import { site } from "@/content/site";

/**
 * Re-mounts on every navigation, so the curtain plays each time a page opens:
 * a black sheet carrying the mark that lifts away to reveal the new page.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <div aria-hidden="true" className="curtain">
        <span className="curtain-mark">
          <AcornMark className="size-[1em] text-[0.55em]" />
          {site.brand}
        </span>
      </div>
    </>
  );
}
