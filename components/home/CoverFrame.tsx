import type { CSSProperties } from "react";
import { Frame, FrameBody } from "@/components/canvas/Frame";
import { Arrow } from "@/components/ui/Arrow";
import { Clock } from "@/components/ui/Clock";
import { GotoLink } from "@/components/ui/GotoLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { entry, site, type MetaPair } from "@/content/site";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

// The role tag sits across the wordmark, larger than the rest.
const ROLE_SPOT = "wide:right-[-1%] wide:top-[50%] wide:-rotate-6";

// Where each of the other floating tags sits (desktop) and how it tilts.
const SPOTS = [
  "wide:left-[1%] wide:top-[6%] wide:-rotate-6",
  "wide:left-[30%] wide:top-[0%] wide:rotate-3",
  "wide:left-[57%] wide:top-[9%] wide:-rotate-2",
  "wide:left-[13%] wide:top-[27%] wide:rotate-6",
  "wide:left-[43%] wide:top-[25%] wide:-rotate-3",
  "wide:left-[72%] wide:top-[31%] wide:rotate-2",
  "wide:left-[84%] wide:top-[2%] wide:-rotate-12",
];

/** Opening panel: the wordmark, a cloud of floating tags, a descriptor and the key facts. */
export function CoverFrame() {
  const { hero } = site;
  const { label } = entry("cover");
  const record: MetaPair[] = [
    ...hero.record,
    ...(site.availability.show ? ([["Status", site.availability.label]] as MetaPair[]) : []),
  ];
  const float = (index: number) =>
    ({
      "--float-d": `${index * -0.7}s`,
      "--float-t": `${2.6 + (index % 4) * 0.45}s`,
    }) as CSSProperties;

  return (
    <Frame theme="dark" name={label} id="cover">
      <FrameBody className="relative min-h-[calc(100svh-6rem)] justify-between gap-8 wide:min-h-0">
        <div className="hero-fade mono flex flex-wrap items-center justify-between gap-3">
          <span className="chip">
            {site.edition} · {site.copyrightYear}
          </span>
          {/* Scroll cue: the arrow nudges the way the page moves. */}
          <span className="chip order-last wide:order-none">
            Scroll to explore
            <span aria-hidden="true" className="nudge inline-flex rotate-90 wide:rotate-0">
              <Arrow />
            </span>
          </span>
          <span className="chip">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-(--acc)" />
            {site.location} · <Clock timeZone={site.timezone.iana} /> {site.timezone.label}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-8 wide:min-h-0 wide:flex-row wide:items-stretch wide:justify-between wide:gap-[calc(5*var(--scale))]">
          <div className="relative flex flex-1 flex-col justify-end gap-6">
            {/* Floating tags, the role first. They fade in together, then bob.
                A wrapped row on phones; scattered around the wordmark on desktop. */}
            <ul
              aria-label="What I do"
              className="hero-fade mono z-10 flex flex-wrap gap-2 wide:pointer-events-none wide:absolute wide:inset-0 wide:block"
              style={order(2)}
            >
              <li className={`float wide:absolute ${ROLE_SPOT}`} style={float(7)}>
                <span className="chip chip-solid whitespace-nowrap shadow-lg shadow-black/40 wide:!text-[calc(1.5*var(--scale))]">
                  {hero.tag}
                </span>
              </li>
              {hero.tags.map((tag, index) => (
                <li
                  key={tag.label}
                  className={`float wide:absolute ${SPOTS[index % SPOTS.length]}`}
                  style={float(index)}
                >
                  <span
                    className={`chip tag-${tag.style} whitespace-nowrap shadow-lg shadow-black/30 wide:!text-[calc(1.4*var(--scale))]`}
                  >
                    {tag.label}
                  </span>
                </li>
              ))}
            </ul>

            <h1
              aria-label={`${site.brand} — ${site.role}`}
              className="display w-max whitespace-nowrap text-[calc(17*var(--scale))] leading-[0.8] wide:text-[calc(52*var(--scale))]"
            >
              <span aria-hidden="true" className="-ml-[0.04em] block">
                {Array.from(site.brand).map((letter, index) => (
                  <span key={index} className="hero-mask">
                    <span className="hero-letter" style={order(index)}>
                      {letter}
                    </span>
                  </span>
                ))}
              </span>
            </h1>
          </div>

          <div
            className="hero-fade flex flex-col justify-end gap-4 wide:w-[max(calc(42*var(--scale)),24rem)] wide:shrink-0"
            style={order(1)}
          >
            <p className="display-s text-[calc(2.6*var(--scale))] wide:text-[calc(3.2*var(--scale))]">
              {hero.descriptor}
            </p>

            <dl className="card mono px-5 py-2">
              {record.map(([key, value]) => (
                <div key={key} className="flex gap-4 border-b border-(--rul) py-2.5 last:border-b-0">
                  <dt className="w-[8em] shrink-0 text-(--mut)">{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mono flex flex-wrap gap-3">
              <Magnetic>
                <GotoLink target="work" className="btn">
                  {hero.workCta}
                  <Arrow />
                </GotoLink>
              </Magnetic>
              <Magnetic>
                <GotoLink target="contact" className="btn btn-ghost">
                  {hero.contactCta}
                </GotoLink>
              </Magnetic>
            </div>
          </div>
        </div>
      </FrameBody>
    </Frame>
  );
}
