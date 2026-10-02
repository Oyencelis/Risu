"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { Tilt } from "@/components/ui/Tilt";
import { ProjectTile } from "@/components/works/ProjectTile";
import { projectIndex, type Project } from "@/content/site";
import { useMediaQuery, WIDE_QUERY } from "@/lib/prefs";

// Cards shown at a time: a 3 × 2 grid on desktop, 2 × 2 on phones.
const PER_PAGE_WIDE = 6;
const PER_PAGE_NARROW = 4;

const two = (n: number) => String(n).padStart(2, "0");

/**
 * The works after the featured ones, as a paged grid of compact cards.
 * The panel keeps the same size however many works there are: more works
 * simply means more pages.
 */
export function MoreWorks({ projects, viewLabel }: { projects: Project[]; viewLabel: string }) {
  const wide = useMediaQuery(WIDE_QUERY);
  const perPage = wide ? PER_PAGE_WIDE : PER_PAGE_NARROW;
  const pages = Math.max(1, Math.ceil(projects.length / perPage));
  const [requested, setPage] = useState(0);
  // The page count changes with the screen size, so keep the page in range.
  const page = Math.min(requested, pages - 1);
  const shown = projects.slice(page * perPage, page * perPage + perPage);

  // With only a couple of works, use two larger cards instead of a sparse grid.
  const few = projects.length <= 2;

  const pagerButton =
    "grid size-11 cursor-pointer place-items-center rounded-full border border-(--rul) transition-colors duration-300 hover:bg-(--fg) hover:text-(--bg) disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-(--fg)";

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div className="relative flex min-h-0 flex-1 flex-col justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={`${page}-${perPage}`}
            aria-label={`More work, page ${page + 1} of ${pages}`}
            className={`grid grid-cols-2 gap-x-3 gap-y-6 wide:gap-x-[calc(2.4*var(--scale))] wide:gap-y-[calc(2.4*var(--scale))] ${
              few ? "wide:grid-cols-2" : "wide:grid-cols-3"
            }`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {shown.map((project) => (
              <li key={project.slug}>
                <Link href={`/works/${project.slug}`} className="group block">
                  <Tilt className="lift rounded-[calc(var(--radius)*0.62)]">
                    <ProjectTile
                      project={project}
                      bare
                      sizes="(min-width: 48rem) 22vw, 45vw"
                      className="aspect-[16/10]"
                    />
                  </Tilt>
                  <p className="mono mt-3 flex justify-between gap-3 text-(--mut)">
                    <span className="text-(--acc)">{projectIndex(project)}</span>
                    <span className="truncate">
                      {[project.status, project.year].filter(Boolean).join(" · ")}
                    </span>
                  </p>
                  <h3 className="display mt-1 text-[calc(2.4*var(--scale))] wide:text-[calc(3*var(--scale))]">
                    {project.name}
                  </h3>
                  <p className="mono mt-1 line-clamp-1 text-(--mut)">{project.kind}</p>
                  <span className="sr-only">{viewLabel}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>

      {pages > 1 ? (
        <nav aria-label="More work pages" className="mono flex shrink-0 items-center justify-between gap-4 border-t border-(--rul) pt-4">
          <p aria-live="polite">
            Page {two(page + 1)} <span className="text-(--mut)">/ {two(pages)}</span>
          </p>
          <div className="flex items-center gap-2">
            {/* One dot per page; click to jump. */}
            <ol className="mr-3 hidden items-center gap-1.5 sm:flex">
              {Array.from({ length: pages }, (_, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => setPage(index)}
                    aria-label={`Page ${index + 1}`}
                    aria-current={index === page ? "page" : undefined}
                    className={`block h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                      index === page ? "w-6 bg-(--fg)" : "w-1.5 bg-(--mut)"
                    }`}
                  />
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              aria-label="Previous page"
              className={pagerButton}
            >
              <Arrow className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => setPage(page + 1)}
              disabled={page === pages - 1}
              aria-label="Next page"
              className={pagerButton}
            >
              <Arrow />
            </button>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
