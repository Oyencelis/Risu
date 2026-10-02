import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { site, type SocialIcon } from "@/content/site";

// Simple original glyphs, drawn on a 24 × 24 grid.
const GLYPHS: Record<SocialIcon, ReactNode> = {
  facebook: (
    <path
      fill="currentColor"
      d="M13.6 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.6-1.5h1.6V4.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.1H7.7v3h2.7V21h3.2Z"
    />
  ),
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.9" y="3.9" width="16.2" height="16.2" rx="4.6" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="16.6" cy="7.4" r="0.6" fill="currentColor" />
    </g>
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M6.6 9.5H3.5V20h3.1V9.5ZM5 4.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM20.5 20v-5.8c0-3-1.6-4.9-4.2-4.9-1.3 0-2.4.6-3 1.6V9.5h-3V20h3.100v-5.600c0-1.500.800-2.400 2-2.400s2 .800 2 2.400V20h3.100Z"
    />
  ),
  github: (
    <path
      fill="currentColor"
      d="M12 2.2a10 10 0 0 0-3.160 19.490c.500.090.680-.220.680-.480v-1.700c-2.780.600-3.370-1.340-3.370-1.340-.450-1.160-1.110-1.470-1.110-1.470-.910-.620.070-.610.070-.610 1 .070 1.530 1.030 1.530 1.030.890 1.530 2.340 1.090 2.910.830.090-.650.350-1.090.630-1.340-2.220-.250-4.560-1.110-4.560-4.940 0-1.090.390-1.980 1.030-2.680-.100-.250-.450-1.270.100-2.650 0 0 .840-.270 2.750 1.020a9.560 9.560 0 0 1 5 0c1.910-1.290 2.750-1.020 2.750-1.020.550 1.380.200 2.400.100 2.650.640.700 1.030 1.590 1.030 2.680 0 3.840-2.340 4.680-4.570 4.930.360.310.680.920.680 1.850v2.740c0 .270.180.580.690.480A10 10 0 0 0 12 2.200Z"
    />
  ),
};

function Icon({ name }: { name: SocialIcon }) {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.25em]" aria-hidden="true">
      {GLYPHS[name]}
    </svg>
  );
}

type SocialRailProps = {
  className?: string;
  /** Always lay the icons out in a row, at a compact size (used in the menu). */
  row?: boolean;
};

/**
 * Social links as round icon buttons: a column on desktop, a row on phones.
 * At rest each one bobs, with a dashed ring turning around it and a ripple
 * pulsing outward. On hover it fills, grows and tilts, the icon rolls, and
 * its name slides out beside it. An icon without a URL yet animates the same
 * way but is not a link.
 */
export function SocialRail({ className = "", row = false }: SocialRailProps) {
  const layout = row ? "flex-row gap-5" : "gap-5 wide:flex-col wide:gap-[calc(2.4*var(--scale))]";
  const box = row
    ? "social size-11 text-base"
    : "social size-12 text-lg wide:size-[calc(6*var(--scale))] wide:text-[calc(2*var(--scale))]";

  return (
    <ul aria-label="Social links" className={`flex ${layout} ${className}`}>
      {site.socials.map((link, index) => {
        const roll = (
          <span className="social-roll">
            <Icon name={link.icon} />
            <Icon name={link.icon} />
          </span>
        );
        const icon = (
          <div
            className="float social-wrap"
            style={
              {
                "--float-d": `${index * -0.8}s`,
                "--float-t": `${2.4 + index * 0.3}s`,
                "--ripple-d": `${index * 0.7}s`,
              } as CSSProperties
            }
          >
            {link.href ? (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className={box}
              >
                {roll}
              </a>
            ) : (
              <span
                role="img"
                tabIndex={0}
                aria-label={`${link.label} (link to be added)`}
                className={box}
              >
                {roll}
              </span>
            )}
            {row ? null : (
              <span aria-hidden="true" className="social-tip mono hidden wide:block">
                {link.label}
                {link.href ? "" : " · soon"}
              </span>
            )}
          </div>
        );
        return (
          // In the menu the icons show at once; in a panel they pop in on arrival.
          <li key={link.label}>{row ? icon : <Reveal delay={index * 110}>{icon}</Reveal>}</li>
        );
      })}
    </ul>
  );
}
