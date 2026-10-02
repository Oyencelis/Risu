import { Frame } from "@/components/canvas/Frame";
import { Accented } from "@/components/ui/Accented";
import { Arrow } from "@/components/ui/Arrow";
import { Reveal } from "@/components/ui/Reveal";
import { entry, site } from "@/content/site";

/**
 * A lead statement, then one full-height column per capability: number at the
 * top, title in the middle, description at the foot. Hovering a column floods
 * it from the bottom. Wider than a window on desktop.
 */
export function CapabilitiesFrame() {
  const { services } = site;
  const { label } = entry("capabilities");

  return (
    <Frame theme="light" name={label} id="capabilities" fit>
      <div className="flex flex-col wide:h-full wide:flex-row wide:items-stretch">
        <div className="flex flex-col justify-between gap-10 px-5 py-8 wide:w-[calc(56*var(--scale))] wide:shrink-0 wide:p-[calc(3.6*var(--scale))]">
          <p className="mono flex flex-wrap items-center gap-2">
            <span className="chip">{label}</span>
            <span className="chip">{String(services.items.length).padStart(2, "0")} areas</span>
          </p>
          <div>
            <Reveal
              as="h2"
              className="display drift text-[calc(4.4*var(--scale))] wide:text-[calc(7.4*var(--scale))]"
            >
              <Accented text={services.heading} />
            </Reveal>
            <Reveal as="p" delay={100} className="body-l mt-6 max-w-[34em] text-(--mut)">
              {services.body}
            </Reveal>
          </div>
        </div>

        <ol className="flex flex-col wide:flex-row">
          {services.items.map((item, index) => (
            <li
              key={item.title}
              tabIndex={0}
              className="group relative isolate flex min-h-[19rem] flex-col justify-between gap-8 overflow-hidden border-t border-(--rul) px-5 py-8 transition-colors duration-500 hover:text-bone focus-visible:text-bone wide:h-full wide:min-h-0 wide:w-[calc(31*var(--scale))] wide:shrink-0 wide:border-l wide:border-t-0 wide:p-[calc(3.2*var(--scale))]"
            >
              {/* Black flood, rising from the foot of the column. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-out-expo group-hover:scale-y-100 group-focus-visible:scale-y-100"
              />
              <div aria-hidden="true" className="flex items-start justify-between gap-4">
                <p className="outline-num display text-[calc(9*var(--scale))] leading-none wide:text-[calc(13*var(--scale))]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                {/* Corner arrow: turns to point up-right and inverts on hover. */}
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-(--rul) transition-[rotate,background-color,color,border-color] duration-700 ease-out-expo group-hover:-rotate-45 group-hover:border-bone group-hover:bg-bone group-hover:text-ink group-focus-visible:-rotate-45 group-focus-visible:border-bone group-focus-visible:bg-bone group-focus-visible:text-ink wide:size-[calc(4.4*var(--scale))]">
                  <Arrow />
                </span>
              </div>
              {/* Hairline that draws across the column on hover. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-bone transition-transform delay-150 duration-700 ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
              <h3 className="display text-[calc(3.6*var(--scale))] transition-[translate] duration-700 ease-out-expo group-hover:-translate-y-2 wide:text-[calc(4.6*var(--scale))]">
                {item.title}
              </h3>
              <p className="body-s text-(--mut) transition-colors duration-500 group-hover:text-bone group-focus-visible:text-bone">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}
