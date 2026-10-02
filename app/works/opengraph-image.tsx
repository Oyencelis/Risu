import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/content/site";

export const alt = `Works by ${site.brand}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ label: "01 Works", title: "Works" });
}
