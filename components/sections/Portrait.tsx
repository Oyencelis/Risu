import Image from "next/image";
import { site } from "@/content/site";

/**
 * The portrait. Shows the photo set as `site.profile.portrait`; renders
 * nothing if none is set.
 */
export function Portrait({ className = "" }: { className?: string }) {
  const { portrait, portraitFocus, portraitAlt } = site.profile;

  if (!portrait) return null;

  return (
    <div
      className={`drift relative overflow-hidden rounded-[calc(var(--radius)*0.62)] bg-black/10 ${className}`}
      data-drift={-3}
    >
      <Image
        src={portrait}
        alt={portraitAlt}
        fill
        sizes="(min-width: 48rem) 30vw, 100vw"
        // Always loaded straight away: it is on the first panel of About and comes
        // into view on the home page during the opening zoom.
        loading="eager"
        className="object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
        style={{ objectPosition: portraitFocus }}
      />
    </div>
  );
}
