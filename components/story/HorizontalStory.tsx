"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  type MotionValue,
} from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import type { Entry } from "@/content/site";
import { useMediaQuery, WIDE_QUERY } from "@/lib/prefs";
import {
  isOverview,
  setActiveEntry,
  setEntries,
  setOverview,
  setPan,
  toggleOverview,
  useOverview,
} from "@/lib/story-store";

type StoryContextValue = {
  /** True when frames run sideways (desktop). False when they stack (phones). */
  horizontal: boolean;
  /** 0 → 1 while the pinned "pause" frame holds the canvas still. */
  pause: MotionValue<number>;
};

const StoryContext = createContext<StoryContextValue | null>(null);

export function useStory(): StoryContextValue {
  const value = useContext(StoryContext);
  if (!value) throw new Error("useStory must be used inside <HorizontalStory>");
  return value;
}

export const STORY_GOTO = "story:goto";

/** Scrolls the canvas to a frame by id. Works in both layouts. */
export function gotoPanel(id: string) {
  window.dispatchEvent(new CustomEvent(STORY_GOTO, { detail: id }));
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const ZOOM = { duration: 0.75, ease: [0.7, 0, 0.2, 1] } as const;
const OVERVIEW_MARGIN = 40;

type HorizontalStoryProps = {
  children: ReactNode;
  /** The frames of this page, listed in the sidebar index. */
  entries: Entry[];
  /** Play the opening zoom-in (home only). */
  intro?: boolean;
};

/**
 * Every page is a row of frames on a canvas, and vertical scrolling pans it.
 *
 * On desktop the wrapper is made as tall as the row is wide; a sticky,
 * viewport-sized window stays put while the row translates left. A frame
 * marked [data-pause] holds the canvas still for an extra stretch of scrolling
 * so it can play its own animation. "Overview" zooms the whole row out to fit
 * the window; clicking a frame zooms back in on it. On phones frames stack.
 */
export function HorizontalStory({ children, entries, intro = false }: HorizontalStoryProps) {
  const horizontal = useMediaQuery(WIDE_QUERY);
  const overview = useOverview();
  const wrapper = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const metrics = useRef({ distance: 0, pauseAt: 0, pauseLen: 0, lead: 0 });
  /**
   * Frame positions and their drifting elements, measured once per resize so
   * the scroll handler never reads layout (reading layout while also writing
   * styles forces the browser to recompute the page on every scroll step).
   */
  type FrameInfo = { el: HTMLElement; left: number; width: number; entry?: string; drifts: HTMLElement[] };
  const frameInfo = useRef<FrameInfo[]>([]);
  /** Last drift written to each element, to skip writes that change nothing. */
  const lastDrift = useRef(new WeakMap<HTMLElement, number>());
  /** True while the overview owns the transform, so scrolling must not pan. */
  const zoomedOut = useRef(false);
  const enteredAt = useRef(0);

  const { scrollY } = useScroll();
  const x = useMotionValue(0);
  const scale = useMotionValue(1);
  const pause = useMotionValue(0);

  // Publish this page's frames to the sidebar.
  useEffect(() => {
    setEntries(entries);
    return () => setEntries([]);
  }, [entries]);

  /** Scroll position → canvas pan. */
  const panAt = useCallback((v: number) => {
    const { distance, pauseAt, pauseLen } = metrics.current;
    return clamp(v <= pauseAt ? v : v <= pauseAt + pauseLen ? pauseAt : v - pauseLen, 0, distance);
  }, []);

  /** Canvas pan → the scroll position that produces it. */
  const toScroll = useCallback((offset: number) => {
    const { distance, pauseAt, pauseLen } = metrics.current;
    const tx = clamp(offset, 0, distance);
    return tx <= pauseAt ? tx : tx + pauseLen;
  }, []);

  const update = useCallback(() => {
    const { pauseAt, pauseLen, lead } = metrics.current;
    const v = scrollY.get();
    const tx = horizontal ? panAt(v) : 0;

    // Scrolling while zoomed out zooms back in.
    if (zoomedOut.current && isOverview() && performance.now() - enteredAt.current > 500) {
      setOverview(false);
    }
    if (!zoomedOut.current) x.set(-tx);
    pause.set(horizontal && pauseLen ? clamp((v - pauseAt) / pauseLen, 0, 1) : 0);
    setPan(tx);

    // Report which entry sits under the middle of the visible canvas, and move
    // the drifting elements of the frames near the screen. Positions come from
    // the cache, so nothing here reads layout.
    const width = window.innerWidth;
    const centre = horizontal ? (width + lead) / 2 : window.innerHeight / 2 + v;
    for (const frame of frameInfo.current) {
      const start = horizontal ? frame.left - tx : frame.left;
      if (start <= centre && start + frame.width > centre && frame.entry) {
        setActiveEntry(frame.entry);
      }
      if (!horizontal || frame.drifts.length === 0) continue;
      // Distance from the frame's resting place, in screen widths.
      const rel = (start - lead) / width;
      if (rel < -1.6 || rel > 1.6) continue;
      for (const el of frame.drifts) {
        const shift = Math.round(rel * Number(el.dataset.drift ?? 7) * width) / 100;
        if (lastDrift.current.get(el) === shift) continue;
        lastDrift.current.set(el, shift);
        el.style.translate = `${shift}px 0`;
      }
    }
  }, [horizontal, panAt, pause, scrollY, x]);

  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    const wrapperEl = wrapper.current;
    const rowEl = row.current;
    if (!wrapperEl || !rowEl) return;

    const measure = () => {
      // Cache frame positions (page coordinates on phones, row offsets on desktop).
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      frameInfo.current = [...rowEl.querySelectorAll<HTMLElement>("[data-frame]")].map((el) => {
        const drifts = horizontal && !reduce ? [...el.querySelectorAll<HTMLElement>(".drift")] : [];
        if (!horizontal) for (const d of el.querySelectorAll<HTMLElement>(".drift")) d.style.translate = "";
        return {
          el,
          left: horizontal ? el.offsetLeft : el.getBoundingClientRect().top + window.scrollY,
          width: horizontal ? el.offsetWidth : el.offsetHeight,
          entry: el.dataset.entry,
          drifts,
        };
      });
      lastDrift.current = new WeakMap();
      if (!horizontal) {
        wrapperEl.style.height = "";
        metrics.current = { distance: 0, pauseAt: 0, pauseLen: 0, lead: 0 };
      } else {
        const first = rowEl.querySelector<HTMLElement>("[data-frame]");
        const pauseFrame = rowEl.querySelector<HTMLElement>("[data-pause]");
        const lead = first?.offsetLeft ?? 0;
        const distance = Math.max(rowEl.offsetWidth - window.innerWidth, 0);
        const pauseLen = pauseFrame ? window.innerHeight * 1.5 : 0;
        metrics.current = {
          distance,
          pauseAt: pauseFrame ? pauseFrame.offsetLeft - lead : 0,
          pauseLen,
          lead,
        };
        wrapperEl.style.height = `${distance + pauseLen + window.innerHeight}px`;
      }
      update();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rowEl);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      setOverview(false);
    };
  }, [horizontal, update]);

  // Overview: zoom the whole row out to fit beside the sidebar, and back in.
  useEffect(() => {
    const rowEl = row.current;
    if (!rowEl || !horizontal) return;
    document.documentElement.dataset.overview = overview ? "on" : "off";

    if (overview) {
      zoomedOut.current = true;
      enteredAt.current = performance.now();
      const lead = metrics.current.lead;
      const fit = (window.innerWidth - lead - OVERVIEW_MARGIN) / (rowEl.offsetWidth - lead);
      animate(scale, Math.min(fit, 1), ZOOM);
      // Keep the first frame's left edge where it normally sits.
      animate(x, lead * (1 - Math.min(fit, 1)), ZOOM);
    } else if (zoomedOut.current) {
      animate(x, -panAt(window.scrollY), ZOOM);
      animate(scale, 1, ZOOM).then(() => {
        zoomedOut.current = false;
        update();
      });
    }
    return () => {
      delete document.documentElement.dataset.overview;
    };
  }, [overview, horizontal, panAt, scale, update, x]);

  // Keyboard: O toggles the overview, Escape leaves it, arrows step panels.
  useEffect(() => {
    if (!horizontal) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
      const target = event.target;
      if (target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.key.toLowerCase() === "o") toggleOverview();
      if (event.key === "Escape") setOverview(false);

      // Left / right arrows step to the previous / next panel.
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      if (isOverview() || document.querySelector("dialog[open]")) return;
      if (target instanceof HTMLElement && target.closest('[role="tablist"]')) return;
      const { lead } = metrics.current;
      const starts = [...(row.current?.querySelectorAll<HTMLElement>("[data-frame]") ?? [])].map(
        (frame) => toScroll(frame.offsetLeft - lead),
      );
      const here = window.scrollY;
      const next =
        event.key === "ArrowRight"
          ? starts.find((start) => start > here + 2)
          : [...starts].reverse().find((start) => start < here - 2);
      if (next === undefined) return;
      event.preventDefault();
      window.scrollTo({ top: next, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [horizontal, toScroll]);

  // Jump to a frame: from the sidebar index, a Contact link, or a #hash on load.
  useEffect(() => {
    const go = (id: string, smooth: boolean) => {
      const frame = document.getElementById(id);
      if (!frame) return;
      setOverview(false);
      const top = horizontal
        ? toScroll(frame.offsetLeft - metrics.current.lead)
        : frame.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
    };
    const onGoto = (event: Event) => go((event as CustomEvent<string>).detail, true);
    window.addEventListener(STORY_GOTO, onGoto);
    const hash = window.location.hash.slice(1);
    const timer = hash ? window.setTimeout(() => go(hash, false), 100) : undefined;
    return () => {
      window.removeEventListener(STORY_GOTO, onGoto);
      window.clearTimeout(timer);
    };
  }, [horizontal, toScroll]);

  // In the overview a click picks a frame instead of following links.
  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!isOverview()) return;
    event.preventDefault();
    event.stopPropagation();
    const frame = (event.target as HTMLElement).closest<HTMLElement>("[data-frame]");
    if (frame) {
      window.scrollTo({
        top: toScroll(frame.offsetLeft - metrics.current.lead),
        behavior: "instant",
      });
    }
    setOverview(false);
  };

  // Keyboard users: bring a focused link that is off-screen into view.
  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!horizontal || !row.current || isOverview()) return;
    const rect = event.target.getBoundingClientRect();
    if (rect.left >= metrics.current.lead && rect.right <= window.innerWidth) return;
    const offset = rect.left - row.current.getBoundingClientRect().left;
    window.scrollTo({ top: toScroll(offset - window.innerWidth * 0.3) });
  };

  return (
    <StoryContext.Provider value={{ horizontal, pause }}>
      <div ref={wrapper} className="relative">
        <div className="wide:sticky wide:top-0 wide:h-dvh wide:overflow-clip">
          <motion.div
            style={{ x, scale, transformOrigin: "0% 50%" }}
            onFocus={onFocus}
            onClickCapture={onClickCapture}
            className="wide:h-dvh wide:w-max"
          >
            <div
              ref={row}
              className={`relative flex min-h-svh flex-col gap-3 px-(--m) pb-6 pt-[calc(var(--bar-t)+1rem)] wide:h-dvh wide:min-h-0 wide:w-max wide:min-w-[100vw] wide:flex-row wide:flex-nowrap wide:items-start wide:gap-(--m) wide:pb-0 wide:pl-[calc(var(--side)+2*var(--m))] wide:pr-(--m) wide:pt-(--m) ${
                intro ? "canvas-intro" : ""
              }`}
            >
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </StoryContext.Provider>
  );
}
