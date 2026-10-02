import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/content/site";

export const alt = `${site.brand} — ${site.edition}. ${site.role}.`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ label: "00 Cover", title: site.brand });
}
