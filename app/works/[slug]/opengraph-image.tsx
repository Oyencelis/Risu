import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { getProject, projectIndex, realProjects, site } from "@/content/site";

export const alt = `Project by ${site.brand}`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return realProjects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return renderOg({ label: "Works", title: "Works" });
  return renderOg({
    label: `${projectIndex(project)} ${project.name}`,
    title: project.name,
    caption: project.kind,
  });
}
