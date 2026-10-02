"use client";

import { motion, useScroll } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { Frame } from "@/components/canvas/Frame";
import { useStory } from "@/components/story/HorizontalStory";
import { ProjectTile } from "@/components/works/ProjectTile";
import { realProjects, site } from "@/content/site";

// Through the window the tiles are pale grey, so the white window reads clearly.
const TILES = { "--inv-bg": "#dadad5", "--inv-fg": "#0b0b0c" } as CSSProperties;

/**
 * Title panel for the work section. While it is pinned, a window opens
 * between the two words, pushes them apart, and grows until the projects
 * behind it fill the panel.
 * Desktop: the horizontal row pauses and the words part sideways.
 * Phones: the panel sticks in place and the words part vertically.
 */
export function InterludeFrame() {
  const { horizontal, pause } = useStory();
  const pin = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pin, offset: ["start start", "end end"] });
  const [first, second] = site.interlude.lines;
  const [lead, ...rest] = realProjects;
  const count = String(realProjects.length).padStart(2, "0");

  return (
    <Frame theme="dark" name={`${first} ${second}`} entry="work" pause>
      <div ref={pin} className="h-[240svh] wide:h-full">
        <motion.div
          style={{ "--p": horizontal ? pause : scrollYProgress } as unknown as CSSProperties}
          className="portal-stage sticky top-(--bar-t) h-[calc(100svh-var(--bar-t)-1rem)] overflow-clip wide:static wide:h-full"
        >
          <h2 className="sr-only">
            {first} {second}
          </h2>

          <p
            aria-hidden="true"
            className="portal-first display absolute bottom-1/2 left-1/2 z-20 -translate-x-1/2 text-[calc(7*var(--scale))] wide:bottom-auto wide:left-auto wide:right-1/2 wide:top-1/2 wide:-translate-y-1/2 wide:translate-x-0 wide:text-[calc(15*var(--scale))]"
          >
            {first}
          </p>
          <p
            aria-hidden="true"
            className="portal-second display absolute left-1/2 top-1/2 z-20 -translate-x-1/2 text-[calc(7*var(--scale))] text-(--acc) wide:-translate-y-1/2 wide:translate-x-0 wide:text-[calc(15*var(--scale))]"
          >
            <span className="serif-i">{second}</span>
          </p>

          {/* The window, and the projects seen through it. */}
          <div aria-hidden="true" className="portal-window theme-light absolute inset-0 z-10 bg-(--bg) text-(--fg)">
            <div style={TILES} className="portal-inner grid h-full grid-rows-[auto_1.3fr_1fr_1fr] gap-3 p-5 wide:grid-cols-12 wide:grid-rows-[auto_1fr_1fr] wide:gap-[calc(1.6*var(--scale))] wide:p-[calc(3.6*var(--scale))]">
              <p className="mono flex items-center justify-between gap-3 wide:col-span-12">
                <span className="chip">
                  {first} {second}
                </span>
                <span className="chip">
                  {count} {site.interlude.caption}
                </span>
              </p>
              <ProjectTile
                project={lead}
                eager
                className="h-full min-h-0 wide:col-span-7 wide:row-span-2"
              />
              {rest.slice(0, 2).map((project) => (
                <ProjectTile
                  key={project.slug}
                  project={project}
                  className="h-full min-h-0 wide:col-span-5"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Frame>
  );
}
