import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Frame, FrameBody, themeAt } from "@/components/canvas/Frame";
import { ContactFrame } from "@/components/sections/ContactFrame";
import { HorizontalStory } from "@/components/story/HorizontalStory";
import { Accented, Words } from "@/components/ui/Accented";
import { Arrow } from "@/components/ui/Arrow";
import { Magnetic } from "@/components/ui/Magnetic";
import { Tilt } from "@/components/ui/Tilt";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserFrame } from "@/components/works/BrowserFrame";
import { FactTabs, type FactTab } from "@/components/works/FactTabs";
import { Gallery } from "@/components/works/Gallery";
import { ProjectTile } from "@/components/works/ProjectTile";
import { frameNo, getProject, projectIndex, realProjects, site, type Entry } from "@/content/site";

// Only the projects in content/site.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return realProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name} — ${project.title}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/works/${project.slug}` },
    openGraph: {
      title: `${title} | ${site.brand}`,
      description: project.summary,
      url: `/works/${project.slug}`,
    },
  };
}

export default async function ProjectPage(props: PageProps<"/works/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const { works } = site;
  const index = projectIndex(project);
  const next = realProjects[(realProjects.indexOf(project) + 1) % realProjects.length];

  const gallery = project.gallery ?? [];
  // What the browser frame's address bar shows.
  const address = project.liveUrl
    ? new URL(project.liveUrl).host
    : `${project.slug}.preview`;

  const entries: Entry[] = [
    { id: "project", label: project.name },
    { id: "overview", label: "Overview" },
    ...(project.story ? [{ id: "story", label: "Case study" }] : []),
    { id: "next", label: "Next project" },
    { id: "contact", label: site.closing.label },
  ].map((item, i) => ({ ...item, no: frameNo(i) }));
  const overview = entries[1];
  const nextEntry = entries[entries.length - 2];
  const tabs: FactTab[] = [
    ...(project.concepts ? [{ label: "Scope", items: project.concepts, style: "list" as const }] : []),
    ...(project.roles ? [{ label: "Built for", items: project.roles, style: "chips" as const }] : []),
    ...(project.stack ? [{ label: "Stack", items: project.stack, style: "chips" as const }] : []),
  ];
  // The first paragraph is set large; a concept-stage project shows its summary.
  const [lead, ...rest] =
    project.comingSoon || !project.description ? [project.summary] : project.description;

  return (
    <HorizontalStory entries={entries}>
      <Frame theme="dark" name={project.name} id="project">
        <FrameBody className="gap-10 wide:flex-row wide:items-stretch wide:gap-[calc(6*var(--scale))]">
          <div className="flex flex-1 flex-col justify-between gap-10">
            <nav aria-label="Breadcrumb" className="mono flex items-center gap-3 text-(--mut)">
              <Link href="/works" className="link-u text-(--fg)">
                Works
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-(--acc)">
                {index} {project.name}
              </span>
            </nav>

            <header>
              <h1
                className="display hero-fade text-[calc(8*var(--scale))] wide:text-[calc(15*var(--scale))]"
              >
                <Words text={project.name} />
              </h1>
              <p className="display-s mt-4 text-[calc(2.4*var(--scale))] wide:text-[calc(3.2*var(--scale))]">
                {project.title}
              </p>
            </header>

            <dl className="mono border-t border-(--rul)">
              <div className="flex gap-4 border-b border-(--rul) py-2.5">
                <dt className="w-[7em] shrink-0 text-(--mut)">Type</dt>
                <dd>{project.kind}</dd>
              </div>
              <div className="flex gap-4 border-b border-(--rul) py-2.5">
                <dt className="w-[7em] shrink-0 text-(--mut)">Status</dt>
                <dd>{project.status}</dd>
              </div>
              {project.role ? (
                <div className="flex gap-4 border-b border-(--rul) py-2.5">
                  <dt className="w-[7em] shrink-0 text-(--mut)">Role</dt>
                  <dd>{project.role}</dd>
                </div>
              ) : null}
              {project.year ? (
                <div className="flex gap-4 border-b border-(--rul) py-2.5">
                  <dt className="w-[7em] shrink-0 text-(--mut)">Year</dt>
                  <dd>{project.year}</dd>
                </div>
              ) : null}
              <div className="flex gap-4 border-b border-(--rul) py-2.5">
                <dt className="w-[7em] shrink-0 text-(--mut)">Live site</dt>
                <dd>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link-u text-(--acc)"
                    >
                      {works.liveLabel} ↗
                    </a>
                  ) : (
                    <span className="text-(--mut)">{works.livePending}</span>
                  )}
                </dd>
              </div>
            </dl>
          </div>

          {/* Website preview. Set `cover` in content/site.ts to show a real screenshot. */}
          <Reveal className="wide:flex wide:w-[54%] wide:shrink-0 wide:items-center">
            <Tilt className="w-full" max={5}>
              <BrowserFrame address={address} className="aspect-[16/9] w-full">
                <ProjectTile project={project} eager />
              </BrowserFrame>
            </Tilt>
          </Reveal>
        </FrameBody>
      </Frame>

      {/* Overview: the story on the left, the screenshot stage on the right. */}
      <Frame theme="light" name={overview.label} id="overview">
        <FrameBody className="gap-8 wide:flex-row wide:items-stretch wide:gap-[calc(4.5*var(--scale))]">
          <div className="flex flex-1 flex-col justify-between gap-7">
            <p className="mono flex flex-wrap items-center gap-2">
              <span className="chip chip-solid">{overview.label}</span>
              <span className="chip">{project.kind}</span>
            </p>

            <Reveal>
              <p
                className={`display-s ${
                  tabs.length > 0
                    ? "text-[calc(2.5*var(--scale))] wide:text-[calc(2.9*var(--scale))]"
                    : "text-[calc(2.8*var(--scale))] wide:text-[calc(3.8*var(--scale))]"
                }`}
              >
                {lead}
              </p>
              {rest.map((paragraph) => (
                <p key={paragraph} className="body-l mt-4 text-(--mut)">
                  {paragraph}
                </p>
              ))}
              {project.comingSoon ? (
                <p className="mono mt-5 flex flex-wrap items-center gap-3 text-(--mut)">
                  <span className="chip">{works.detailsSoon}</span>
                  <span className="normal-case tracking-normal">{works.detailsSoonBody}</span>
                </p>
              ) : null}
            </Reveal>

            {tabs.length > 0 ? (
              <Reveal delay={80}>
                <FactTabs tabs={tabs} />
              </Reveal>
            ) : null}

            <div className="mono flex flex-wrap items-center gap-3">
              {project.liveUrl ? (
                <Magnetic>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn group">
                    {works.liveLabel}
                    <Arrow className="-rotate-45 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Magnetic>
              ) : (
                <span className="chip text-(--mut)">{works.livePending}</span>
              )}
              <span className="chip">{project.status}</span>
            </div>
          </div>

          <Reveal className="wide:w-[calc(76*var(--scale))] wide:shrink-0 wide:self-center">
            <Gallery project={project} images={gallery} address={address} />
          </Reveal>
        </FrameBody>
      </Frame>

      {/* Case study: the story behind the project, as four cards. */}
      {project.story ? (
        <Frame theme="dark" name="Case study" id="story">
          <FrameBody className="gap-8 wide:flex-row wide:items-stretch wide:gap-[calc(5*var(--scale))]">
            <div className="flex flex-col justify-between gap-6 wide:w-[calc(40*var(--scale))] wide:shrink-0">
              <p className="mono flex flex-wrap items-center gap-2">
                <span className="chip chip-solid">Case study</span>
                {project.role ? <span className="chip">{project.role}</span> : null}
              </p>
              <Reveal>
                <h2 className="display text-[calc(5.4*var(--scale))] wide:text-[calc(10*var(--scale))]">
                  <Accented text="Behind the build" />
                </h2>
                <p className="body-l mt-4 text-(--mut)">
                  The problem, the approach, the hardest part, and what comes next.
                </p>
              </Reveal>
            </div>

            <ol className="swipe wide:flex-1 wide:grid-cols-2 wide:grid-rows-2">
              {(
                [
                  ["Problem", project.story.problem],
                  ["Approach", project.story.approach],
                  ["Challenge", project.story.challenge],
                  ["Next", project.story.next],
                ] as const
              ).map(([label, text], i) => (
                <li key={label} className="flex">
                  <Reveal
                    delay={i * 80}
                    className={`${i === 1 ? "card-inv" : "card"} flex flex-1 flex-col justify-between gap-6 p-5 wide:p-[calc(2.4*var(--scale))]`}
                  >
                    <p className="flex items-start justify-between gap-4">
                      <span className="mono opacity-60">{label}</span>
                      <span
                        aria-hidden="true"
                        className="display text-[calc(5*var(--scale))] leading-none opacity-15 wide:text-[calc(6.5*var(--scale))]"
                      >
                        {frameNo(i)}
                      </span>
                    </p>
                    <p className="display-s text-[calc(1.9*var(--scale))] wide:text-[calc(2.1*var(--scale))]">
                      {text}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </FrameBody>
        </Frame>
      ) : null}

      <Frame theme={themeAt(entries.length - 2)} name={nextEntry.label} id="next" fit>
        <Link
          href={`/works/${next.slug}`}
          className="group flex h-full flex-col justify-between gap-10 px-5 py-10 wide:w-[calc(72*var(--scale))] wide:p-[calc(3.2*var(--scale))]"
        >
          <p className="mono flex justify-between gap-4 text-(--mut)">
            <span className="text-(--acc)">{nextEntry.label}</span>
            <span>{projectIndex(next)}</span>
          </p>
          <div className="lift rounded-[calc(var(--radius)*0.62)]">
            <ProjectTile project={next} className="aspect-[16/10]" />
          </div>
          <div className="flex items-end justify-between gap-6">
            <p className="display text-[calc(5*var(--scale))] transition-colors duration-300 group-hover:text-(--acc) wide:text-[calc(7*var(--scale))]">
              {next.name}
            </p>
            <p className="mono flex shrink-0 items-center gap-3 pb-2">
              <span className="link-u">{site.work.viewLabel}</span>
              <Arrow className="text-(--acc) transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5" />
            </p>
          </div>
        </Link>
      </Frame>

      <ContactFrame theme={themeAt(entries.length - 1)} />
    </HorizontalStory>
  );
}
