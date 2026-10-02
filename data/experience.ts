import type { RecordItem } from "@/content/types";

/* ============================================================================
   EXPERIENCE & EDUCATION — shown on the home page (Entry 04) and on About.
   Add an item to the list to add a job, a course or a milestone.
============================================================================ */

export const experience: RecordItem[] = [
  {
    kind: "Experience",
    period: "2026 — Present",
    title: "Web Developer / Graphic Designer",
    place: "Web Growth Pros",
    points: [
      "Develop and support web interfaces and digital assets",
      "Design graphic materials and digital content",
      "Support digital marketing and online content initiatives",
      "Produce visual materials for the company's digital presence",
    ],
  },
  {
    kind: "Education",
    period: "Present",
    title: "BS Information Technology",
    place: "Laguna State Polytechnic University (LSPU)",
    points: ["Currently enrolled"],
  },
];
