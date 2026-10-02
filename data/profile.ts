import type { MetaPair } from "@/content/types";

/* ============================================================================
   PROFILE — who you are. Used on the cover, the Profile panel, the About page
   and in the page metadata.
============================================================================ */

export const profile = {
  /** Display name, used for the wordmark and across the site. */
  brand: "Risu",
  fullName: "Lawrence Celis",
  alias: "Known professionally as Risu",
  role: "Web Developer & Web Designer",
  location: "Laguna, Philippines",
  timezone: { label: "GMT+8", iana: "Asia/Manila" },

  /**
   * Portrait photo. Put the file under public/images/ and give its path.
   * Set to null to hide the portrait.
   */
  portrait: "/images/misc/risu.jpg" as string | null,
  /** Which part of the photo stays in view when it is cropped (x y). */
  portraitFocus: "58% 45%",

  /**
   * Your CV / résumé, offered as a download on About, Profile and Contact.
   * Replace the file in public/files/ (keep the name, or change this path).
   * Set to null to hide the buttons.
   */
  cv: "/files/lawrence-celis-cv.pdf" as string | null,

  /** One line under the wordmark on the cover. */
  descriptor:
    "Web developer and designer building digital products that are functional, accessible, and visually refined.",

  /** Short summary on the Profile panel ("In short"). */
  statement:
    "I design and build digital experiences that are functional, visually engaging, accessible, and intuitive — taking work from layout and interface design through to full-stack implementation.",

  /** Shown as a quote on the Profile panel and the About page. */
  principle: "Everything can be understood through learning.",

  /** Key facts, shown as a small table on the cover, Profile and About. */
  facts: [
    ["Role", "Web Developer & Web Designer"],
    ["Based in", "Laguna, Philippines"],
    ["Currently", "Web Developer / Graphic Designer, Web Growth Pros"],
    ["Education", "BS Information Technology, LSPU"],
  ] as MetaPair[],

  /** Biography on the About page: one card per item. */
  bio: [
    {
      title: "Introduction",
      text: "I am Lawrence Celis, a web developer and web designer based in Laguna, Philippines, working under the name Risu.",
    },
    {
      title: "Approach",
      text: "I build digital experiences that are functional, visually engaging, accessible, and intuitive. I enjoy both sides of the work: the visual and conceptual side of layouts and interfaces, and the implementation that makes them real.",
    },
    {
      title: "Currently",
      text: "I am currently completing a BS in Information Technology at Laguna State Polytechnic University while working as a Web Developer and Graphic Designer at Web Growth Pros.",
    },
  ],

  /** Used by search engines and link previews. */
  seo: {
    title: "Risu | Web Designer & Developer",
    description:
      "Risu is a web developer and web designer based in Laguna, Philippines, designing and building digital products that are functional, accessible, and visually refined.",
  },
};
