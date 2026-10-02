import Link from "next/link";
import { Frame, FrameBody } from "@/components/canvas/Frame";
import { Portrait } from "@/components/sections/Portrait";
import { Arrow } from "@/components/ui/Arrow";
import { Words } from "@/components/ui/Accented";
import { Reveal } from "@/components/ui/Reveal";
import { entry, site } from "@/content/site";

const CARD = "flex flex-col gap-4 p-5 wide:p-[calc(2.2*var(--scale))]";

/**
 * Profile as a bento: name, portrait, then four cards (summary, facts, areas
 * of practice, working principle). On phones the cards become a strip you
 * swipe sideways, so the panel stays short without dropping any content.
 */
export function ProfileFrame() {
  const { profile, about, hero } = site;
  const { label } = entry("profile");

  return (
    <Frame theme="light" name={label} id="profile">
      <FrameBody className="gap-6 wide:flex-row wide:gap-[calc(3*var(--scale))]">
        <Reveal className="order-2 wide:order-none wide:h-full wide:shrink-0">
          <Portrait className="aspect-[4/3] w-full wide:aspect-auto wide:h-full wide:w-[calc(32*var(--scale))]" />
        </Reveal>

        <div className="contents wide:flex wide:min-h-0 wide:flex-1 wide:flex-col wide:gap-[calc(2.4*var(--scale))]">
          <Reveal className="order-1 wide:order-none">
            <p className="mono flex flex-wrap items-center gap-2">
              <span className="chip chip-solid">{label}</span>
              <span className="chip">{profile.alias}</span>
            </p>
            <h2 className="display drift mt-4 text-[calc(6.4*var(--scale))] wide:text-[calc(12*var(--scale))]">
              <Words text={site.fullName} />
            </h2>
          </Reveal>

          <div className="swipe order-3 wide:order-none wide:min-h-0 wide:flex-1 wide:grid-cols-12 wide:grid-rows-2">
            <Reveal className={`card ${CARD} wide:col-span-7`}>
              <p className="mono text-(--mut)">01 · {profile.statementLabel}</p>
              <p className="display-s text-[calc(2.1*var(--scale))] wide:text-[calc(2.5*var(--scale))]">
                {profile.statement}
              </p>
            </Reveal>

            <Reveal delay={80} className={`card ${CARD} wide:col-span-5`}>
              <p className="mono text-(--mut)">02 · {profile.factsLabel}</p>
              <dl className="mono">
                {hero.record.map(([key, value]) => (
                  <div key={key} className="border-b border-(--rul) py-2 last:border-b-0">
                    <dt className="text-(--mut)">{key}</dt>
                    <dd className="mt-0.5">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={160} className={`card ${CARD} wide:col-span-7`}>
              <p className="mono text-(--mut)">03 · {about.fieldsHeading}</p>
              <ul className="mono flex flex-wrap gap-2">
                {about.fields.map((field) => (
                  <li key={field} className="chip">
                    {field}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={240} className={`card-inv ${CARD} justify-between wide:col-span-5`}>
              <div>
                <p className="mono opacity-60">04 · {profile.principleLabel}</p>
                <p className="serif-i mt-3 text-[calc(2.6*var(--scale))] leading-[1.08] wide:text-[calc(3*var(--scale))]">
                  “{profile.principle}”
                </p>
              </div>
              <div className="mono flex flex-wrap gap-2">
                <Link
                  href="/about"
                  className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-(--inv-fg) px-5 text-(--inv-bg) transition-[scale] duration-300 ease-out-expo hover:scale-105"
                >
                  {profile.linkLabel}
                  <Arrow className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
                </Link>
                {profile.cv ? (
                  <a
                    href={profile.cv}
                    download
                    className="inline-flex min-h-11 items-center gap-3 rounded-full border border-current/40 px-5 transition-colors duration-300 hover:bg-(--inv-fg) hover:text-(--inv-bg)"
                  >
                    {profile.cvLabel}
                    <Arrow className="rotate-90" />
                  </a>
                ) : null}
              </div>
            </Reveal>
          </div>

          <p aria-hidden="true" className="mono order-4 text-(--mut) wide:hidden">
            Swipe the cards →
          </p>
        </div>
      </FrameBody>
    </Frame>
  );
}
