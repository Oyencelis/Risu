"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { BrowserFrame } from "@/components/works/BrowserFrame";
import { ProjectTile } from "@/components/works/ProjectTile";
import type { Project } from "@/content/site";

type GalleryProps = {
  project: Project;
  /** Screenshots to show, in order. Empty shows the cover or placeholder. */
  images: string[];
  /** Text shown in the browser frame's address bar. */
  address: string;
  className?: string;
};

const two = (n: number) => String(n).padStart(2, "0");

/**
 * Screenshot stage: a dark, softly lit card with one large browser frame, a
 * filmstrip of thumbnails and previous / next controls. It stays the same
 * size however many screenshots there are.
 */
export function Gallery({ project, images, address, className = "" }: GalleryProps) {
  const [requested, setIndex] = useState(0);
  const count = Math.max(images.length, 1);
  const index = Math.min(requested, count - 1);
  const step = (by: number) => setIndex((index + by + count) % count);
  const current = images[index];

  const control =
    "grid size-10 cursor-pointer place-items-center rounded-full bg-white/10 text-bone transition-colors duration-300 hover:bg-bone hover:text-ink";

  return (
    <div
      className={`stage relative isolate flex flex-col gap-4 overflow-hidden rounded-[calc(var(--radius)*0.8)] bg-ink p-4 text-bone wide:gap-[calc(1.8*var(--scale))] wide:p-[calc(2.4*var(--scale))] ${className}`}
    >
      <p className="mono flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-bone" />
          Screens
        </span>
        <span aria-live="polite" className="text-fog">
          {two(index + 1)} / {two(count)}
        </span>
      </p>

      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current ?? "cover"}
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrowserFrame address={address} className="aspect-[16/9] w-full">
              <ProjectTile project={project} src={current} />
            </BrowserFrame>
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 ? (
        <div className="flex items-center gap-3">
          <ul className="flex min-w-0 flex-1 gap-2 overflow-x-auto p-1" data-lenis-prevent>
            {images.map((src, i) => (
              <li key={src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show screenshot ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`block w-16 cursor-pointer rounded-lg transition-opacity duration-300 wide:w-[calc(9*var(--scale))] ${
                    i === index
                      ? "opacity-100 ring-2 ring-bone ring-offset-2 ring-offset-ink"
                      : "opacity-45 hover:opacity-100"
                  }`}
                >
                  <ProjectTile
                    project={project}
                    src={src}
                    sizes="160px"
                    className="aspect-[16/10] !rounded-lg"
                  />
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot" className={control}>
            <Arrow className="rotate-180" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next screenshot" className={control}>
            <Arrow />
          </button>
        </div>
      ) : null}
    </div>
  );
}
