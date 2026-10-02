"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { GotoLink } from "@/components/ui/GotoLink";
import { ProjectTile } from "@/components/works/ProjectTile";
import { projectIndex, type Project } from "@/content/site";

type WorksIndexProps = {
  featured: Project[];
  more: Project[];
  moreTitle: string;
};

const ROW =
  "group grid grid-cols-[3em_1fr] items-baseline gap-x-4 py-3 transition-colors duration-300 wide:grid-cols-[3.5em_1fr] wide:py-[calc(1.2*var(--scale))]";

/**
 * The Works index: a large list of the featured works plus one row for the
 * rest, with a preview of the highlighted project beside it.
 */
export function WorksIndex({ featured, more, moreTitle }: WorksIndexProps) {
  const [active, setActive] = useState("featured-0");
  const preview: Project[] = active === "more" ? more.slice(0, 4) : [featured[Number(active.split("-")[1])] ?? featured[0]];

  return (
    <div className="flex flex-col gap-8 wide:min-h-0 wide:flex-1 wide:flex-row wide:items-end wide:gap-[calc(5*var(--scale))]">
      <ul className="border-t border-(--rul) wide:flex-1">
        {featured.map((project, index) => (
          <li key={project.slug} className="border-b border-(--rul)">
            <GotoLink
              target={project.slug}
              className={`${ROW} ${active === `featured-${index}` ? "text-(--fg)" : "text-(--mut)"} hover:text-(--fg)`}
            >
              <span
                className="mono"
                onPointerEnter={() => setActive(`featured-${index}`)}
                onFocus={() => setActive(`featured-${index}`)}
              >
                {projectIndex(project)}
              </span>
              <span
                onPointerEnter={() => setActive(`featured-${index}`)}
                className="display text-[calc(3.6*var(--scale))] transition-[translate] duration-500 ease-out-expo group-hover:translate-x-2 wide:text-[calc(6.4*var(--scale))]"
              >
                {project.name}
              </span>
              <span className="mono col-start-2">
                {[project.kind, project.year].filter(Boolean).join(" · ")}
              </span>
            </GotoLink>
          </li>
        ))}
        {more.length > 0 ? (
          <li className="border-b border-(--rul)">
            <GotoLink
              target="more"
              className={`${ROW} ${active === "more" ? "text-(--fg)" : "text-(--mut)"} hover:text-(--fg)`}
            >
              <span className="mono" onPointerEnter={() => setActive("more")}>
                +{String(more.length).padStart(2, "0")}
              </span>
              <span
                onPointerEnter={() => setActive("more")}
                className="display text-[calc(3.6*var(--scale))] transition-[translate] duration-500 ease-out-expo group-hover:translate-x-2 wide:text-[calc(6.4*var(--scale))]"
              >
                {moreTitle}
              </span>
              <span className="mono col-start-2 truncate">
                {more
                  .slice(0, 3)
                  .map((project) => project.name)
                  .join(" · ")}
                {more.length > 3 ? " · …" : ""}
              </span>
            </GotoLink>
          </li>
        ) : null}
      </ul>

      {/* Preview of the highlighted row. Desktop only; on phones the rows link straight through. */}
      <div aria-hidden="true" className="relative hidden aspect-[16/10] w-[calc(62*var(--scale))] shrink-0 wide:block">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            className={`absolute inset-0 grid gap-2 ${preview.length > 1 ? "grid-cols-2" : ""}`}
            initial={{ opacity: 0, scale: 0.97, rotate: -1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {preview.map((project) => (
              <ProjectTile
                key={project.slug}
                project={project}
                bare={preview.length > 1}
                sizes="(min-width: 48rem) 34vw, 1px"
                className="h-full min-h-0"
              />
            ))}
          </motion.div>
        </AnimatePresence>
        <p className="mono absolute -bottom-7 left-0 flex items-center gap-2 text-(--mut)">
          <Arrow />
          {active === "more" ? `${more.length} more projects` : "Scroll or click to open"}
        </p>
      </div>
    </div>
  );
}
