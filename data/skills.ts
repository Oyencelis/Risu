import type { Service, SkillGroup, Tag } from "@/content/types";

/* ============================================================================
   SKILLS — what you do and what you use.
============================================================================ */

/**
 * Capabilities (Entry 03 on the home page): one column each.
 * The titles also scroll across the contact panel.
 */
export const services: Service[] = [
  {
    title: "Web Development",
    body: "Functional web applications and platforms built to solve real problems: responsive interfaces, database-driven systems, authentication, APIs, and full-stack delivery.",
  },
  {
    title: "UI/UX Design",
    body: "Interfaces that are clear and practical to use, grounded in sound information architecture, usability, visual hierarchy, and consistency.",
  },
  {
    title: "Graphic Design",
    body: "Visual materials and digital content that communicate clearly and sit within a coherent brand identity.",
  },
  {
    title: "Creative Web Experiences",
    body: "Motion, interaction, 3D visuals, and digital storytelling, applied where they serve the content and its purpose.",
  },
];

/** Areas of practice: pills on the Profile panel, a list on the About page. */
export const fields: string[] = [
  "Front-end and full-stack development",
  "UI/UX design",
  "Graphic design",
  "Branding and visual identity",
  "Digital content creation",
  "Interactive web experiences",
];

/**
 * Skills and tools, by group: columns on the About page, and the scrolling
 * rows on the Experience panel.
 */
export const skills: SkillGroup[] = [
  {
    label: "Front-end",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Bootstrap"],
  },
  { label: "Back-end", items: ["Python", "Flask", "Java", "Spring Boot", "REST APIs"] },
  { label: "Database & services", items: ["Supabase", "PostgreSQL", "MySQL"] },
  {
    label: "Design",
    items: [
      "Figma",
      "Canva",
      "Elementor",
      "UI/UX design",
      "Graphic design",
      "Branding",
      "Interface design",
      "Visual composition",
    ],
  },
  { label: "Tools & deployment", items: ["Git", "GitHub", "Vercel"] },
];

/**
 * Floating tags around the wordmark on the cover.
 * `style` is how the tag is drawn: "solid", "outline" or "smoke".
 */
export const coverTags: Tag[] = [
  { label: "UI/UX Design", style: "outline" },
  { label: "Front-end", style: "solid" },
  { label: "Full-stack", style: "smoke" },
  { label: "Graphic Design", style: "outline" },
  { label: "Branding", style: "solid" },
  { label: "Next.js · React", style: "solid" },
  { label: "Laguna, PH", style: "outline" },
];
