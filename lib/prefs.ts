"use client";

import { useSyncExternalStore } from "react";

/** Subscribes to a CSS media query. False on the server. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (listener) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", listener);
      return () => list.removeEventListener("change", listener);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Matches the `wide:` Tailwind variant: the horizontal desktop layout. */
export const WIDE_QUERY = "(min-width: 48rem) and (orientation: landscape) and (min-height: 30rem)";
