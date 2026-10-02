/** Shapes of the data in /data. You should not need to edit this file. */

export type MetaPair = readonly [key: string, value: string];

export type SocialIcon = "facebook" | "instagram" | "linkedin" | "github";

export type SocialLink = {
  label: string;
  icon: SocialIcon;
  /** Leave as null until the real URL is known. */
  href: string | null;
};

export type Tag = { label: string; style: "solid" | "outline" | "smoke" };

export type Project = {
  /** Used in the URL (/works/<slug>): lowercase, hyphens, no spaces. */
  slug: string;
  /** Short name, shown large. */
  name: string;
  /** Longer descriptive title. */
  title: string;
  kind: string;
  status: string;
  /** What you did on the project, e.g. "Sole developer". */
  role?: string;
  summary: string;
  description?: string[];
  roles?: string[];
  concepts?: string[];
  stack?: string[];
  year?: string;
  /** Short case study, shown as its own panel on the project page. */
  story?: {
    /** What needed solving. */
    problem: string;
    /** What you built and why that way. */
    approach: string;
    /** The hardest part. */
    challenge: string;
    /** What you would do next, or differently. */
    next: string;
  };
  /** Leave null (or out) until the real link is confirmed. */
  liveUrl?: string | null;
  /** Main screenshot, e.g. "/images/projects/my-project/cover.png". */
  cover?: string;
  /** Extra screenshots for the project page. */
  gallery?: string[];
  /** Shows a "Details to follow" notice instead of a full write-up. */
  comingSoon?: boolean;
};

export type Service = { title: string; body: string };

export type RecordItem = {
  kind: "Experience" | "Education";
  period: string;
  title: string;
  place: string;
  points: string[];
};

export type SkillGroup = { label: string; items: string[] };

export type Entry = { id: string; no: string; label: string };
