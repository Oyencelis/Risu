"use client";

import { useSyncExternalStore } from "react";

function subscribe(listener: () => void) {
  const timer = window.setInterval(listener, 15_000);
  return () => window.clearInterval(timer);
}

/** Live local time (HH:MM) for a time zone. Blank until hydrated. */
export function Clock({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(
        new Date(),
      ),
    () => "--:--",
  );

  return <span className="tabular-nums">{time}</span>;
}
