import { TechIcon } from "@/components/ui/TechIcon";

export type TechStackProps = {
  /** Array of technology names (e.g. ["Next.js", "Supabase", "PostgreSQL"]) */
  items: string[];
  className?: string;
  /** Size variant for the icon buttons */
  size?: "sm" | "md" | "lg";
  /** Aria label for the list */
  label?: string;
};

const SIZES = {
  sm: {
    box: "p-1.5",
    icon: "size-4",
    label: "text-[9px]",
    gap: "gap-1.5",
  },
  md: {
    box: "p-2.5 wide:p-[calc(1.1*var(--scale))]",
    icon: "size-5 wide:size-[calc(2.2*var(--scale))]",
    label: "text-[10px]",
    gap: "gap-2",
  },
  lg: {
    box: "p-3 wide:p-[calc(1.3*var(--scale))]",
    icon: "size-6 wide:size-[calc(2.6*var(--scale))]",
    label: "text-[11px]",
    gap: "gap-2.5",
  },
};

/**
 * Renders a list of technologies as interactive icon cards with labels underneath.
 * Uses a subtle container card with monochrome palette and hover glow.
 */
export function TechStack({
  items,
  className = "",
  size = "md",
  label = "Tech stack",
}: TechStackProps) {
  if (!items || items.length === 0) return null;

  const s = SIZES[size];

  return (
    <ul
      aria-label={label}
      className={`flex flex-wrap items-start ${s.gap} wide:gap-[calc(1.1*var(--scale))] ${className}`}
    >
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="group flex flex-col items-center gap-1.5"
        >
          {/* Subtle card container */}
          <div
            tabIndex={0}
            role="img"
            aria-label={item}
            title={item}
            className={`flex cursor-pointer items-center justify-center rounded-xl border border-(--fg)/8 bg-(--fg)/[0.03] text-(--fg)/80 shadow-sm transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:scale-105 hover:border-(--fg)/20 hover:bg-(--fg)/8 hover:text-(--fg) hover:shadow-[0_0_16px_-2px_color-mix(in_srgb,var(--fg)_15%,transparent)] focus-visible:scale-105 focus-visible:border-(--fg)/20 focus-visible:outline-none focus-visible:text-(--fg) ${s.box}`}
          >
            <TechIcon name={item} className={`shrink-0 ${s.icon}`} />
          </div>

          {/* Label underneath */}
          <span
            aria-hidden="true"
            className={`mono pointer-events-none max-w-[5.5rem] truncate text-center font-medium uppercase tracking-wide text-(--fg)/40 transition-colors duration-300 ease-out-expo group-hover:text-(--fg)/70 ${s.label}`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
