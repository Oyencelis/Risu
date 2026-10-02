import type { Metadata } from "next";
import { Frame, FrameBody } from "@/components/canvas/Frame";
import { RecordFrame } from "@/components/home/RecordFrame";
import { ContactFrame } from "@/components/sections/ContactFrame";
import { Portrait } from "@/components/sections/Portrait";
import { HorizontalStory } from "@/components/story/HorizontalStory";
import { Accented, Words } from "@/components/ui/Accented";
import { Arrow } from "@/components/ui/Arrow";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { frameNo, site, type Entry } from "@/content/site";

const description = `${site.fullName} (${site.brand}) — ${site.role} based in ${site.location}. Profile, areas of practice, skills, experience, and education.`;

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: `About | ${site.brand}`, description, url: "/about" },
};

const entries: Entry[] = [
  { id: "about", label: "About" },
  { id: "practice", label: site.about.fieldsHeading },
  { id: "skills", label: site.about.skillsHeading },
  { id: "record", label: "Experience" },
  { id: "contact", label: site.closing.label },
].map((item, index) => ({ ...item, no: frameNo(index) }));

export default function AboutPage() {
  const { about, profile, hero } = site;
  const [intro, practice, skills, record] = entries;

  return (
    <HorizontalStory entries={entries}>
      <Frame theme="dark" name={intro.label} id="about">
        <FrameBody className="gap-6 wide:flex-row wide:gap-[calc(3*var(--scale))]">
          <Reveal className="order-2 wide:order-none wide:h-full wide:shrink-0">
            <Portrait
              className="aspect-[4/3] w-full wide:aspect-auto wide:h-full wide:w-[calc(32*var(--scale))]"
            />
          </Reveal>

          <div className="contents wide:flex wide:min-h-0 wide:flex-1 wide:flex-col wide:justify-between wide:gap-[calc(2.4*var(--scale))]">
            <header className="order-1 wide:order-none">
              <p className="mono flex flex-wrap items-center gap-2">
                <span className="chip chip-solid">About</span>
                <span className="chip">{profile.alias}</span>
                <span className="chip">{site.role}</span>
              </p>
              <h1 className="display hero-fade mt-4 text-[calc(6.4*var(--scale))] wide:text-[calc(13*var(--scale))]">
                <Words text={site.fullName} />
              </h1>
              {profile.cv ? (
                <a href={profile.cv} download className="btn mono mt-5">
                  {profile.cvLabel}
                  <Arrow className="rotate-90" />
                </a>
              ) : null}
            </header>

            {/* The biography, one card per paragraph. Swiped sideways on phones. */}
            <div className="swipe order-3 wide:order-none wide:grid-cols-3">
              {about.bio.map((paragraph, index) => (
                <Reveal
                  key={paragraph}
                  delay={index * 80}
                  className={`${index === 0 ? "card-inv" : "card"} flex flex-col gap-4 p-5 wide:p-[calc(2.2*var(--scale))]`}
                >
                  <p className="mono opacity-60">
                    {frameNo(index)} · {about.bioTitles[index]}
                  </p>
                  <p className="body-l">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <p aria-hidden="true" className="mono order-4 text-(--mut) wide:hidden">
              Swipe the cards →
            </p>

            <dl className="mono order-5 grid grid-cols-2 gap-x-4 border-t border-(--rul) wide:order-none wide:grid-cols-4 wide:gap-x-[calc(2*var(--scale))]">
              {hero.record.map(([key, value]) => (
                <div key={key} className="border-b border-(--rul) py-2.5 wide:border-b-0">
                  <dt className="text-(--mut)">{key}</dt>
                  <dd className="mt-0.5">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FrameBody>
      </Frame>

      <Frame theme="light" name={practice.label} id="practice">
        <FrameBody className="gap-10 wide:flex-row wide:gap-[calc(8*var(--scale))]">
          <div className="flex flex-col justify-between gap-10 wide:w-[calc(48*var(--scale))] wide:shrink-0">
            <div>
              <p className="mono"><span className="chip">Practice</span></p>
              <h2
                className="display mt-4 text-[calc(5*var(--scale))] wide:text-[calc(9*var(--scale))]"
              >
                <Accented text={about.fieldsHeading} />
              </h2>
            </div>
            <blockquote className="border-l border-(--acc) pl-5">
              <p className="mono text-(--mut)">{profile.principleLabel}</p>
              <p className="display-s mt-2 text-[calc(2.2*var(--scale))] wide:text-[calc(2.6*var(--scale))]">
                “{profile.principle}”
              </p>
            </blockquote>
          </div>
          <ol className="flex flex-1 flex-col justify-center border-t border-(--rul) wide:border-t-0">
            {about.fields.map((field, index) => (
              <li key={field} className="border-b border-(--rul) wide:first:border-t">
                <Reveal
                  delay={index * 50}
                  className="flex items-baseline gap-5 py-4 wide:py-[calc(2*var(--scale))]"
                >
                  <span className="mono w-8 shrink-0 text-(--mut)">{frameNo(index)}</span>
                  <span className="display-s text-[calc(2.4*var(--scale))] wide:text-[calc(3.6*var(--scale))]">
                    {field}
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
        </FrameBody>
      </Frame>

      <Frame theme="dark" name={skills.label} id="skills">
        <FrameBody className="justify-between gap-10">
          <div>
            <p className="mono"><span className="chip">Toolkit</span></p>
            <h2
              className="display mt-4 text-[calc(5*var(--scale))] wide:text-[calc(11*var(--scale))]"
            >
              <Accented text={about.skillsHeading} />
            </h2>
          </div>
          <Marquee
            items={about.fields}
            label="Areas of practice"
            outline
            duration={44}
            className="display -mx-5 text-[calc(4.4*var(--scale))] wide:-mx-[calc(3.6*var(--scale))] wide:text-[calc(7*var(--scale))]"
          />
          {/* One card per group; the first card is set on the opposite surface. */}
          <div className="grid gap-3 sm:grid-cols-2 wide:grid-cols-6 wide:gap-[calc(1.6*var(--scale))]">
            {about.skills.map((group, index) => (
              <Reveal
                key={group.label}
                delay={index * 60}
                className={`${index === 0 ? "card-inv" : "card"} flex flex-col gap-4 p-5 wide:p-[calc(2.2*var(--scale))] ${
                  index < 2 ? "wide:col-span-3" : "wide:col-span-2"
                }`}
              >
                <h3 className="mono flex justify-between opacity-60">
                  <span>{group.label}</span>
                  <span>{String(group.items.length).padStart(2, "0")}</span>
                </h3>
                <ul className="mono flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </FrameBody>
      </Frame>

      <RecordFrame label={record.label} theme="light" />
      <ContactFrame theme="dark" />
    </HorizontalStory>
  );
}
