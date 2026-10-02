"use client";

import { useSyncExternalStore } from "react";
import type { Entry } from "@/content/site";

/**
 * Small shared state for the canvas: the current page's entries, which one is
 * in view, whether the zoomed-out overview is open, and how far the canvas
 * has panned. Written by the story, read by the sidebar and status bar.
 */
const NONE: Entry[] = [];
let entries: Entry[] = NONE;
let activeEntry = "";
let overview = false;
let pan = 0;

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setEntries(next: Entry[]) {
  entries = next;
  activeEntry = next[0]?.id ?? "";
  emit();
}

export function setActiveEntry(id: string) {
  if (id === activeEntry) return;
  activeEntry = id;
  emit();
}

export function setOverview(value: boolean) {
  if (value === overview) return;
  overview = value;
  emit();
}

export const toggleOverview = () => setOverview(!overview);
export const isOverview = () => overview;

/** Horizontal pan in px. Not reactive: read on demand (e.g. by the cursor readout). */
export function setPan(value: number) {
  pan = value;
}
export const getPan = () => pan;

export function useEntries(): Entry[] {
  return useSyncExternalStore(
    subscribe,
    () => entries,
    () => NONE,
  );
}

export function useActiveEntry(): string {
  return useSyncExternalStore(
    subscribe,
    () => activeEntry,
    () => "",
  );
}

export function useOverview(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => overview,
    () => false,
  );
}
