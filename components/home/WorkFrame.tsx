"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { useEffect, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { Frame, FrameBody } from "@/components/canvas/Frame";
import { Arrow } from "@/components/ui/Arrow";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectTile } from "@/components/works/ProjectTile";
import { entry, projectIndex, projects, realProjects, site, type Project } from "@/content/site";

const SPRING = { stiffness: 240, damping: 28, mass: 0.5 };
// How many works are set large; the rest are compact rows.
const LARGE_ROWS = 3;

/**
 * The project list, set large. Hovering a row inverts it and floats that
 * project's tile beside the pointer.
 */
export function WorkFrame() {
  const { work } = site;
  const { label } = entry("work");
  const [active, setActive] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  // The row can scroll away under a still pointer, so drop the preview on scroll.
  useEffect(() => {
    const clear = () => setActive((current) => (current ? null : current));
    window.addEventListener("scroll", clear, { passive: true });
    return () => window.removeEventListener("scroll", clear);
  }, []);

  const show = (event: PointerEvent, project: Project) => {
    if (!active) {
      // Start beside the pointer instead of flying in from the corner.
      springX.jump(event.clientX);
      springY.jump(event.clientY);
    }
    setActive(project);
  };

  return (
    <Frame theme="dark" name={label} id="work">
      <FrameBody className="gap-10 wide:flex-row wide:gap-[calc(6*var(--scale))]">
        <div className="contents wide:flex wide:w-[calc(34*var(--scale))] wide:shrink-0 wide:flex-col wide:justify-between wide:gap-8">
          <div>
            <p className="mono flex flex-wrap items-center gap-2">
              <span className="chip chip-solid">{label}</span>
              <span className="chip">{String(realProjects.length).padStart(2, "0")} projects</span>
            </p>
            <p className="display-s mt-6 text-[calc(2.4*var(--scale))] wide:text-[calc(2.8*var(--scale))]">
              {work.intro}
            </p>
            <p className="mono mt-5 text-(--mut)">{work.note}</p>
          </div>
          <Magnetic className="order-last !block wide:order-none wide:!inline-block wide:self-start">
            <Link
              href="/works"
              className="group flex items-center justify-between gap-4 rounded-full bg-(--fg) py-2 pl-6 pr-2 text-(--bg) transition-[scale] duration-500 ease-out-expo hover:scale-[1.02] wide:pl-[calc(2.6*var(--scale))]"
            >
              <span className="display-s text-xl wide:text-[calc(2.2*var(--scale))]">
                {work.linkLabel}
              </span>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-(--bg) text-(--fg) transition-[rotate] duration-500 ease-out-expo group-hover:-rotate-45 wide:size-[calc(5*var(--scale))]">
                <Arrow />
              </span>
            </Link>
          </Magnetic>
        </div>

        <Reveal className="flex flex-1 flex-col justify-center">
          <ul
            onPointerMove={(event) => {
              x.set(event.clientX);
              y.set(event.clientY);
            }}
            onPointerLeave={() => setActive(null)}
            className="border-t border-(--rul)"
          >
            {projects.map((project, position) =>
              position >= LARGE_ROWS ? (
                // Later works: compact rows, so the list always fits the panel.
                <li key={project.slug} className="border-b border-(--rul)">
                  <Link
                    href={`/works/${project.slug}`}
                    aria-label={`View ${project.name} project details`}
                    onPointerEnter={(event) => show(event, project)}
                    className="group flex items-baseline gap-5 px-3 py-3 transition-colors duration-300 hover:bg-(--inv-bg) hover:text-(--inv-fg) wide:py-[calc(1.2*var(--scale))]"
                  >
                    <span className="mono w-[3em] shrink-0 opacity-60">{projectIndex(project)}</span>
                    <span className="display-s flex-1 text-[calc(2.4*var(--scale))] wide:text-[calc(3*var(--scale))]">
                      {project.name}
                    </span>
                    <span className="mono hidden opacity-60 sm:inline">{project.kind}</span>
                    <Arrow className="shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5" />
                  </Link>
                </li>
              ) : (
                <li key={project.slug} className="border-b border-(--rul)">
                  <Link
                    href={`/works/${project.slug}`}
                    aria-label={`View ${project.name} project details`}
                    onPointerEnter={(event) => show(event, project)}
                    className="group relative isolate flex items-center gap-5 overflow-hidden rounded-[calc(var(--radius)*0.4)] px-3 py-4 transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-(--inv-bg) before:transition-transform before:duration-500 before:ease-out-expo hover:text-(--inv-fg) hover:before:scale-x-100 focus-visible:text-(--inv-fg) focus-visible:before:scale-x-100 wide:py-[calc(1.4*var(--scale))]"
                  >
                    <span className="mono w-[3em] shrink-0 opacity-60">{projectIndex(project)}</span>
                    <span className="flex-1">
                      <span className="display block text-[calc(5*var(--scale))] transition-[translate] duration-500 ease-out-expo group-hover:translate-x-2 wide:text-[calc(9.4*var(--scale))]">
                        {project.name}
                      </span>
                      <span className="mono mt-1 block opacity-60">
                        {[project.kind, project.status, project.year].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-current transition-[rotate] duration-500 group-hover:-rotate-45 wide:size-[calc(5*var(--scale))]">
                      <Arrow />
                    </span>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </Reveal>
      </FrameBody>

      {/* Floating preview. Portalled to <body> so it is not affected by the panning row. */}
      {active
        ? createPortal(
            <motion.div
              aria-hidden="true"
              className="theme-light pointer-events-none fixed left-0 top-0 z-[65] hidden [@media(hover:hover)_and_(pointer:fine)]:block"
              style={{ x: springX, y: springY }}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={active.slug}
                  className="absolute left-8 top-0 w-[calc(30*var(--scale))] -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: -5 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectTile
                    project={active}
                    className="aspect-[16/10] shadow-2xl shadow-black/50 ring-1 ring-white/25"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>,
            document.body,
          )
        : null}
    </Frame>
  );
}
