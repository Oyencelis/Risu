import type { Project } from "@/content/types";

/* ============================================================================
   WORKS — your projects.

   TO ADD A WORK: copy the template below, paste it into the `works` list,
   and fill it in. That is all. It then appears, in list order, on:
     - the home page project list
     - the Works page: the first `featuredCount` works (see the bottom of this
       file) get a full panel each; the rest are cards in "More work"
     - its own page at /works/<slug>

   TEMPLATE
   {
     slug: "my-project",          // used in the URL: lowercase, hyphens, no spaces
     name: "My Project",          // short name, shown large
     title: "What it is, in one line",
     kind: "Type of project",     // e.g. "E-commerce platform"
     status: "Personal project",  // e.g. "Academic project", "Concept", "Live"
     role: "Sole developer",      // what you did on it
     summary: "Two or three sentences describing it.",

     // Everything below is optional. Delete what you do not need.
     description: ["First paragraph.", "Second paragraph."],
     roles: ["Who it is built for"],
     concepts: ["Feature or scope item"],
     stack: ["Next.js", "Supabase"],
     year: "2026",
     liveUrl: "https://example.com",
     cover: "/images/projects/my-project/cover.png",
     gallery: ["/images/projects/my-project/01.png"],
     comingSoon: true,            // shows "Details to follow" on its page
     story: { problem: "…", approach: "…", challenge: "…", next: "…" },
   },

   Screenshots go in public/images/projects/<slug>/ — see the README there.
============================================================================ */

export const works: Project[] = [
  {
    slug: "laguna-guide",
    name: "Laguna Guide",
    title: "Laguna Tourism, Culture, Arts and Trade Office (LTCATO) Platform",
    kind: "Tourism platform & management system",
    status: "Capstone project",
    role: "Sole developer",
    year: "2026",
    summary:
      "A tourism platform and management system promoting tourism, culture, arts, and trade across Laguna, built as a multi-role system for provincial tourism management, local government units, tourism establishments, and tourists.",
    description: [
      "A tourism platform and management system promoting tourism, culture, arts, and trade across Laguna.",
      "It is a multi-role system serving provincial tourism management, local government units, tourism establishments, and tourists.",
    ],
    roles: [
      "Provincial tourism management",
      "Local government units",
      "Tourism establishments",
      "Tourists",
    ],
    concepts: [
      "Destination discovery",
      "Establishment information management",
      "Tourist arrival submissions and monitoring",
      "Reviews and feedback",
      "AI chatbot for tourism inquiries",
      "Natural language processing",
      "AI-assisted decision support",
      "Analytics and data visualization",
      "Role-based access",
    ],
    stack: ["Flask", "Supabase", "PostgreSQL", "Vercel", "AI and NLP integrations"],
    liveUrl: "https://new-ltcato.vercel.app/",
    // DRAFT: placeholder wording written for now. Replace with your own account.
    story: {
      problem:
        "Tourism information for Laguna was spread across separate offices and pages, and the provincial office had no single place to collect arrival figures from establishments.",
      approach:
        "One platform with four roles: the provincial office, local government units, establishments and tourists. Each role sees only what it needs, while a trip planner and an AI chatbot answer the questions visitors ask most.",
      challenge:
        "Role-based access. The same record has to be editable by an establishment, reviewable by its local government unit and reportable by the province, without anything leaking between them.",
      next: "Offline support for the trip planner, since many destinations have a weak signal.",
    },
    cover: "/images/projects/laguna-guide/1.png",
    gallery: [
      "/images/projects/laguna-guide/2.png",
      "/images/projects/laguna-guide/3.png",
      "/images/projects/laguna-guide/4.png",
    ],
  },
  {
    slug: "life-archive",
    name: "Life Archive",
    title: "Personal Digital Archive",
    kind: "Personal digital archive",
    status: "Personal project",
    role: "Sole developer",
    year: "2026",
    stack: ["Next.js", "Supabase"],
    // DRAFT: placeholder wording written for now. Replace with your own account.
    roles: ["One private owner", "Personal journaling", "Family and personal history"],
    concepts: [
      "Private sign-in",
      "Timeline of eras and milestones",
      "Journal entries",
      "People and relationships graph",
      "Media library",
      "Field notes",
    ],
    story: {
      problem:
        "Personal memories end up scattered across social apps that are built for an audience, not for the person keeping them.",
      approach:
        "Single-owner by design: one account, a private sign-in, and no feeds or followers. Content is organised by time, through eras and milestones, and by the people involved.",
      challenge:
        "Modelling how people, memories and events relate, so the same moment can appear on the timeline and in the people graph.",
      next: "Import tools for existing photos and notes, so the archive is not started from zero.",
    },
    summary:
      "A private, single-owner digital archive for personal memories, records, and meaningful information. It is deliberately not a social network: no public feeds, no followers, and no required interaction.",
    description: [
      "A private, single-owner digital archive for personal memories, records, and meaningful information.",
      "It is a personal space, not a social network: no public feeds, no followers, and no required social interaction.",
    ],
    liveUrl: "https://life-archive-tan.vercel.app/",
    cover: "/images/projects/life-archive/2.jpg",
    gallery: [
      "/images/projects/life-archive/1.jpg",
      "/images/projects/life-archive/3.jpg",
      "/images/projects/life-archive/4.jpg",
    ],
  },
  {
    slug: "e-lance",
    name: "E-Lance",
    title: "E-Commerce / Smartphone Marketplace",
    kind: "Smartphone buying platform",
    status: "Academic project",
    role: "Sole developer",
    year: "2025",
    stack: ["Flask", "Supabase", "PostgreSQL", "Vercel"],
    // DRAFT: placeholder wording written for now. Replace with your own account.
    roles: ["Smartphone buyers", "Sellers"],
    concepts: [
      "Product catalogue by category",
      "Search",
      "Shopping cart and checkout",
      "Seller dashboard",
      "Product and stock management",
      "Order management",
      "Payments",
      "Profile management",
    ],
    story: {
      problem:
        "Buying a phone online usually means comparing listings across several shops, with no consistent detail between them.",
      approach:
        "Two sides to one marketplace. Buyers browse by category and check out from a cart; sellers manage products, orders and payments from their own dashboard.",
      challenge:
        "Keeping stock and order status consistent between a buyer's cart and the seller's inventory.",
      next: "Order tracking and product reviews.",
    },
    summary:
      "An e-commerce platform for buying and selling smartphones, connecting buyers and sellers in real time.",
    description: [
      "E-Lance is a smartphone marketplace that connects buyers and sellers in real time, with secure login and tools for managing profiles and transactions.",
      "It also offers promotions and analytics for both buyers and sellers.",
    ],
    cover: "/images/projects/e-lance/1.png",
    gallery: ["/images/projects/e-lance/2.png", "/images/projects/e-lance/3.png"],
  },
  {
    slug: "scholarly",
    name: "Scholarly",
    title: "Academic / School Management Platform",
    kind: "School management platform",
    status: "Academic project",
    role: "Sole developer",
    year: "2024",
    stack: ["Java", "Spring Boot"],
    // DRAFT: placeholder wording written for now. Replace with your own account.
    roles: ["Students", "Mentors"],
    concepts: [
      "Sign-up and login",
      "Timeline",
      "Discover page with filters",
      "Member profiles",
      "Search",
    ],
    story: {
      problem:
        "Students rarely have one place to share academic work and find mentors within their own school.",
      approach:
        "A community with two roles, students and mentors, built around a timeline, a discover page with filters, and member profiles.",
      challenge:
        "Structuring the application cleanly in Java and Spring Boot, from controllers and services through to login.",
      next: "Shared project spaces and messaging between members.",
    },
    summary:
      "A school management platform supporting academic processes and educational administration.",
    cover: "/images/projects/scholarly/1.png",
    // 3-blurred.png is 3.png with other people's names and email addresses blurred.
    gallery: ["/images/projects/scholarly/2.png", "/images/projects/scholarly/3-blurred.png"],
  },
];

/**
 * How many works, from the top of the list, get a full panel of their own on
 * the Works page. Every work after that is shown as a card in "More work".
 */
export const featuredCount = 2;
