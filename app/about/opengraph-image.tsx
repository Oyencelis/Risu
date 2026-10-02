import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/content/site";

export const alt = `About ${site.fullName} (${site.brand})`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ label: "01 About", title: site.fullName });
}
