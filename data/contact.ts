import type { SocialLink } from "@/content/types";

/* ============================================================================
   CONTACT — how people reach you. Shown in the contact panel on every page
   and in the menu.
============================================================================ */

/** Your email. "Contact" in the menu opens a new message to this address. */
export const email = "oyencelis@gmail.com";

/**
 * Where the contact form sends messages. FormSubmit forwards each message to
 * the email above and needs no account. The FIRST message sent triggers an
 * activation email from FormSubmit: click the link in it once, and every
 * message after that arrives normally.
 * To use another service (Formspree, Web3Forms…), paste its endpoint here.
 * Set to null to hide the form and show only the email link.
 */
export const formEndpoint: string | null = `https://formsubmit.co/ajax/${email}`;

/**
 * Social links. Paste each profile URL in place of `null`.
 * While an `href` is null its icon still shows, tagged "soon", but is not a link.
 */
export const socials: SocialLink[] = [
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/lawrence.celis.31" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/10.oyen/" },
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/lawrence-celis-2572b2342/" },
  { label: "GitHub", icon: "github", href: "https://github.com/Oyencelis" },
];

/**
 * Availability. When `show` is true, this label appears as a "Status" row on
 * the cover and as a badge in the contact panel. Set `show` to false to hide it.
 */
export const availability = {
  show: true,
  label: "Open to freelance work and internships",
};
