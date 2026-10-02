import type { Metadata } from "next";
import Link from "next/link";
import { Frame, FrameBody, themeAt } from "@/components/canvas/Frame";
import { ContactFrame } from "@/components/sections/ContactFrame";
import { HorizontalStory } from "@/components/story/HorizontalStory";
import { Accented, Words } from "@/components/ui/Accented";
import { Tilt } from "@/components/ui/Tilt";
import { Arrow } from "@/components/ui/Arrow";
import { Reveal } from "@/components/ui/Reveal";
import { MoreWorks } from "@/components/works/MoreWorks";
import { ProjectTile } from "@/components/works/ProjectTile";
import { WorksIndex } from "@/components/works/WorksIndex";
import {
  featuredProjects,
  frameNo,
  moreProjects,
  projectIndex,
  realProjects,
  site,
  type Entry,
} from "@/content/site";

const description = `Projects by ${site.brand}: ${realProjects.map((p) => p.name).join(", ")}. ${site.works.intro}`;

export const metadata: Metadata = {
  title: "Works",
  description,
  alternates: { canonical: "/works" },
  openGraph: { title: `Works | ${site.brand}`, description, url: "/works" },
};

// The "More work" panel only exists when there is something to put in it.
const hasMore = moreProjects.length > 0;

// The index, one panel per featured work, "More work", then contact.
const entries: Entry[] = [
  { id: "works", label: "Works" },
  ...featuredProjects.map((project) => ({ id: project.slug, label: project.name })),
  ...(hasMore ? [{ id: "more", label: site.works.moreTitle }] : []),
  { id: "contact", label: site.closing.label },
].map((item, index) => ({ ...item, no: frameNo(index) }));

export default function WorksPage() {
  const { works } = site;
  const moreAt = featuredProjects.length + 1;

  return (
    <HorizontalStory entries={entries}>
      <Frame theme="dark" name="Works" id="works">
        <FrameBody className="justify-between gap-10">
          <header className="flex flex-col gap-6 wide:flex-row wide:items-end wide:justify-between">
            <div>
              <p className="mono text-(--acc)">
                Index · {String(realProjects.length).padStart(2, "0")} projects
              </p>
              <h1 className="display hero-fade mt-4 text-[calc(11*var(--scale))] wide:text-[calc(17*var(--scale))]">
                <Words text="Works" />
              </h1>
            </div>
            <p className="body-l text-(--mut) wide:max-w-[calc(46*var(--scale))] wide:pb-[calc(2*var(--scale))]">
              {works.intro}
            </p>
          </header>

          <WorksIndex featured={featuredProjects} more={moreProjects} moreTitle={works.moreTitle} />
        </FrameBody>
      </Frame>

      {featuredProjects.map((project, index) => (
        <Frame key={project.slug} theme={themeAt(index + 1)} name={project.name} id={project.slug}>
          <FrameBody className="gap-10 wide:flex-row wide:items-stretch wide:gap-[calc(6*var(--scale))]">
            <Reveal className="wide:flex wide:w-[58%] wide:shrink-0 wide:items-center">
              <Link
                href={`/works/${project.slug}`}
                aria-label={`View ${project.name} project details`}
                className="block w-full"
              >
                <Tilt className="lift rounded-[calc(var(--radius)*0.62)]">
                  <ProjectTile project={project} className="aspect-[16/10]" />
                </Tilt>
              </Link>
            </Reveal>

            <div className="flex flex-1 flex-col justify-between gap-8">
              <p className="mono flex justify-between gap-4 text-(--mut)">
                <span className="text-(--acc)">{projectIndex(project)}</span>
                <span>{[project.status, project.year].filter(Boolean).join(" · ")}</span>
              </p>
              <Reveal>
                <h2 className="display text-[calc(5.4*var(--scale))] wide:text-[calc(9*var(--scale))]">
                  {project.name}
                </h2>
                <p className="display-s mt-3 text-[calc(2.2*var(--scale))] wide:text-[calc(2.8*var(--scale))]">
                  {project.title}
                </p>
                <p className="body-l mt-5 text-(--mut)">{project.summary}</p>
                {project.stack ? (
                  <ul aria-label="Stack" className="mono mt-5 flex flex-wrap gap-x-4 gap-y-1">
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
              <Link href={`/works/${project.slug}`} className="btn mono self-start">
                {site.work.viewLabel}
                <Arrow />
              </Link>
            </div>
          </FrameBody>
        </Frame>
      ))}

      {/* More work: every work after the featured ones, in a paged grid.
          The panel stays one window wide however many works there are. */}
      {hasMore ? (
        <Frame theme={themeAt(moreAt)} name={works.moreTitle} id="more">
          <FrameBody className="gap-8 wide:flex-row wide:gap-[calc(5*var(--scale))]">
            <div className="flex flex-col justify-between gap-6 wide:w-[calc(36*var(--scale))] wide:shrink-0">
              <p className="mono flex flex-wrap items-center gap-2">
                <span className="chip chip-solid">{works.moreTitle}</span>
                <span className="chip">{String(moreProjects.length).padStart(2, "0")} projects</span>
              </p>
              <div>
                <h2 className="display text-[calc(5.4*var(--scale))] wide:text-[calc(11*var(--scale))]">
                  <Accented text={works.moreTitle} />
                </h2>
                <p className="body-l mt-4 text-(--mut)">{works.moreBody}</p>
              </div>
            </div>

            <MoreWorks projects={moreProjects} viewLabel={site.work.viewLabel} />
          </FrameBody>
        </Frame>
      ) : null}

      <ContactFrame theme={themeAt(moreAt + (hasMore ? 1 : 0))} />
    </HorizontalStory>
  );
}
