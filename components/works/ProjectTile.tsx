import Image from "next/image";
import type { CSSProperties } from "react";
import { projectIndex, projects, type Project } from "@/content/site";

type ProjectTileProps = {
  project: Project;
  className?: string;
  /** Hide the small captions, for tiles used as decoration. */
  bare?: boolean;
  /** Screenshot to show instead of the project's cover (used by the gallery). */
  src?: string;
  /** Hint for the browser about the rendered width. */
  sizes?: string;
  /** Load straight away. Set this where the picture is visible on arrival. */
  eager?: boolean;
};

// Each project gets a different background pattern, in turn.
const PATTERNS = ["grid", "dots", "lines"];

/**
 * A project's picture. Shows the screenshot set as `cover` in content/site.ts;
 * until one exists it shows a designed tile: the project name in large
 * type over a fine pattern.
 */
export function ProjectTile({
  project,
  className = "",
  bare = false,
  src,
  sizes = "(min-width: 48rem) 60vw, 100vw",
  eager = false,
}: ProjectTileProps) {
  const image = src ?? project.cover;

  if (image) {
    return (
      <div
        className={`relative overflow-hidden rounded-[calc(var(--radius)*0.62)] bg-black/10 ${className}`}
      >
        <Image
          src={image}
          alt={`Screenshot of ${project.name}`}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className="object-cover object-left-top"
        />
      </div>
    );
  }

  const position = projects.findIndex((p) => p.slug === project.slug);

  return (
    <div
      data-pat={PATTERNS[Math.max(position, 0) % PATTERNS.length]}
      className={`tile ${className}`}
      style={{ "--chars": project.name.length } as CSSProperties}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-[4cqi]">
        <p className="tile-meta flex justify-between gap-4">
          {bare ? null : (
            <>
              <span>{projectIndex(project)}</span>
              <span>{project.status}</span>
            </>
          )}
        </p>
        <p className="tile-name">{project.name}</p>
        <p className="tile-meta flex justify-between gap-4">
          {bare ? null : (
            <>
              <span>{project.kind}</span>
              <span>Screenshot pending</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
