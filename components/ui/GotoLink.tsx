"use client";

import type { ReactNode } from "react";
import { gotoPanel } from "@/components/story/HorizontalStory";

type GotoLinkProps = {
  /** Id of the home-canvas frame to pan to. */
  target: string;
  children: ReactNode;
  className?: string;
};

/** In-page link that pans the home canvas to a frame. */
export function GotoLink({ target, children, className }: GotoLinkProps) {
  return (
    <a
      href={`#${target}`}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        gotoPanel(target);
      }}
    >
      {children}
    </a>
  );
}
