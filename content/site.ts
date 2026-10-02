/**
 * Site content, assembled.
 *
 * YOUR DATA lives in /data (profile, works, skills, experience, contact).
 * Edit those files to change what the site says about you.
 *
 * THIS FILE only joins that data with the site's fixed wording: button
 * labels, section titles, menu items. Edit it to reword the interface itself.
 */

import { availability, email, formEndpoint, socials } from "@/data/contact";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { coverTags, fields, services, skills } from "@/data/skills";
import { featuredCount, works } from "@/data/works";
import type { Entry, Project } from "./types";

export type * from "./types";

export const site = {
  // --- From /data/profile.ts ---
  brand: profile.brand,
  fullName: profile.fullName,
  role: profile.role,
  location: profile.location,
  timezone: profile.timezone,
  seo: profile.seo,

  // --- From /data/contact.ts ---
  availability,
  contact: { email, formEndpoint },
  socials,

  // --- Fixed wording ---
  edition: "Portfolio",
  copyrightYear: 2026,
  /** The word used for each numbered section, e.g. "Section 02". */
  sectionWord: "Section",

  /** Menu items. `note` is the short descriptor shown beside each one. */
  nav: [
    { label: "Home", href: "/", note: "Overview" },
    { label: "About", href: "/about", note: "Profile & skills" },
    { label: "Works", href: "/works", note: "All projects" },
  ],

  /** The numbered sections of the home page, in scroll order. */
  entries: [
    { id: "cover", no: "00", label: "Cover" },
    { id: "profile", no: "01", label: "Profile" },
    { id: "work", no: "02", label: "Selected work" },
    { id: "capabilities", no: "03", label: "Capabilities" },
    { id: "record", no: "04", label: "Experience" },
    { id: "contact", no: "05", label: "Contact" },
  ] as Entry[],

  hero: {
    tag: profile.role,
    tags: coverTags,
    descriptor: profile.descriptor,
    record: profile.facts,
    workCta: "View selected work",
    contactCta: "Get in touch",
  },

  profile: {
    alias: profile.alias,
    statement: profile.statement,
    principle: profile.principle,
    portrait: profile.portrait,
    portraitFocus: profile.portraitFocus,
    cv: profile.cv,
    cvLabel: "Download CV",
    portraitAlt: `Portrait of ${profile.fullName}.`,
    statementLabel: "In short",
    factsLabel: "At a glance",
    principleLabel: "Working principle",
    linkLabel: "Full profile",
  },

  interlude: {
    lines: ["Selected", "Work"],
    caption: "Projects",
  },

  work: {
    intro: "Capstone, academic and personal projects across tourism, e-commerce, education, and personal archiving.",
    note: "Each project has its own page with screenshots, scope and stack.",
    linkLabel: "All works",
    viewLabel: "View entry",
  },

  services: {
    heading: "Design and development, practised as one discipline.",
    body: "From concept and interface design through to a working, maintainable product.",
    items: services,
  },

  record: {
    heading: "Experience & education",
    items: experience,
  },

  works: {
    intro:
      "Capstone, academic and personal projects, each designed and built by me as the sole developer.",
    moreTitle: "More work",
    moreBody: "Other projects. Each one has its own page.",
    detailsSoon: "Details to follow",
    detailsSoonBody:
      "This project is at concept stage. A full write-up will be published once the details are confirmed.",
    liveLabel: "Visit live site",
    livePending: "Live link to be added",
  },

  closing: {
    label: "Contact",
    headingLines: ["Let's work", "together."],
    body: "For project inquiries, collaborations, or questions about my work, please get in touch.",
    contactLabel: "Email",
    credit: `Designed & developed by ${profile.brand}`,
    rights: "All rights reserved.",
  },

  about: {
    bio: profile.bio.map((item) => item.text),
    bioTitles: profile.bio.map((item) => item.title),
    fieldsHeading: "Areas of practice",
    skillsHeading: "Skills & tools",
    fields,
    skills,
  },
};

/** Every row in the project lists. */
export const projects: Project[] = works;
export const realProjects = works;
/** Works page: the first few get a full panel each, the rest go in "More work". */
export const featuredProjects = works.slice(0, featuredCount);
export const moreProjects = works.slice(featuredCount);

export const getProject = (slug: string) => realProjects.find((p) => p.slug === slug);

/** Three-digit number for a project, based on its position in the list. */
export function projectIndex(project: Project): string {
  // Matched by slug: client components receive copies, not the same objects.
  const position = projects.findIndex((p) => p.slug === project.slug);
  return String(position + 1).padStart(3, "0");
}

/** Look up a home-page entry by id, e.g. entry("work") → { no: "02", ... }. */
export function entry(id: string): Entry {
  return site.entries.find((item) => item.id === id) ?? site.entries[0];
}

/** Two-digit frame number from a position, e.g. frameNo(0) → "01". */
export const frameNo = (index: number) => String(index + 1).padStart(2, "0");

/** Where "Contact" in the menu goes: the contact panel, or an email if the form is off. */
export const contactHref = site.contact.formEndpoint ? "#contact" : `mailto:${site.contact.email}`;
