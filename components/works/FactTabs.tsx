"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

export type FactTab = {
  label: string;
  items: string[];
  /** "list" numbers the items; "chips" shows them as pills. */
  style: "list" | "chips";
};

/**
 * A segmented control over a project's details (built for, scope, stack).
 * One group shows at a time, so the panel stays compact.
 */
export function FactTabs({ tabs }: { tabs: FactTab[] }) {
  const id = useId();
  const [requested, setActive] = useState(0);
  const active = Math.min(requested, tabs.length - 1);
  const tab = tabs[active];

  return (
    <div className="card p-2">
      <div role="tablist" aria-label="Project details" className="mono flex gap-1 rounded-full bg-(--fg)/8 p-1">
        {tabs.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              id={`${id}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              onClick={() => setActive(index)}
              className="relative flex-1 cursor-pointer rounded-full px-3 py-2 transition-colors duration-300"
            >
              {selected ? (
                <motion.span
                  layoutId={`${id}-pill`}
                  className="absolute inset-0 rounded-full bg-(--fg)"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}
              <span className={`relative ${selected ? "text-(--bg)" : "text-(--mut)"}`}>
                {item.label} <span className="opacity-60">{String(item.items.length).padStart(2, "0")}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        data-lenis-prevent
        // A fixed height keeps the card steady while switching; one tab needs none.
        className={`overflow-y-auto px-3 pb-3 pt-4 ${
          tabs.length > 1 ? "h-44 wide:h-[calc(19*var(--scale))] wide:min-h-36" : ""
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {tab.style === "chips" ? (
              <ul className="mono flex flex-wrap gap-1.5">
                {tab.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <ol className="gap-x-5 text-[max(13px,calc(1.35*var(--scale)))] leading-[1.35] sm:columns-2">
                {tab.items.map((item, i) => (
                  <li key={item} className="mb-2 flex break-inside-avoid gap-2">
                    <span className="mono shrink-0 text-(--mut)">{String(i + 1).padStart(2, "0")}</span>
                    {item}
                  </li>
                ))}
              </ol>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
