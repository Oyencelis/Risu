import { Frame, FrameBody, type Theme } from "@/components/canvas/Frame";
import { RecordList } from "@/components/sections/RecordList";
import { Accented } from "@/components/ui/Accented";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

type RecordFrameProps = {
  /** Small label at the top of the panel. */
  label: string;
  theme?: Theme;
};

/** Experience and education, with the toolkit running past as two marquees. */
export function RecordFrame({ label, theme = "dark" }: RecordFrameProps) {
  const skills = site.about.skills.flatMap((group) => group.items);
  const half = Math.ceil(skills.length / 2);

  return (
    <Frame theme={theme} name={label} id="record">
      <FrameBody className="justify-between gap-10 wide:gap-[calc(2.4*var(--scale))]">
        <div>
          <p className="mono">
            <span className="chip chip-solid">{label}</span>
          </p>
          <Reveal
            as="h2"
            className="display drift mt-5 text-[calc(5.4*var(--scale))] wide:text-[calc(11*var(--scale))]"
          >
            <Accented text={site.record.heading} />
          </Reveal>
        </div>

        {/* Toolkit, running edge to edge as tech icons. */}
        <div className="-mx-5 flex flex-col gap-2 py-2 wide:-mx-[calc(3.6*var(--scale))] wide:gap-[calc(1.4*var(--scale))]">
          <Marquee items={skills.slice(0, half)} label="Skills and tools" icons duration={42} />
          <Marquee
            items={skills.slice(half)}
            label="More skills and tools"
            icons
            reverse
            duration={48}
          />
        </div>

        <RecordList />
      </FrameBody>
    </Frame>
  );
}
