import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/** Experience and education, each hung from a timeline node. */
export function RecordList() {
  return (
    <ol className="grid gap-12 wide:grid-cols-2 wide:gap-[calc(6*var(--scale))]">
      {site.record.items.map((item, index) => (
        <li key={item.title}>
          <Reveal delay={index * 120}>
            <div aria-hidden="true" className="flex items-center gap-3 text-(--acc)">
              <span className="size-2.5 rounded-full bg-current" />
              <span className="h-px flex-1 bg-(--rul)" />
            </div>
            <p className="mono mt-4 flex justify-between gap-4 text-(--mut)">
              <span className="text-(--acc)">{item.kind}</span>
              <span>{item.period}</span>
            </p>
            <p className="display-s mt-4 text-[calc(2.6*var(--scale))] wide:text-[calc(3.4*var(--scale))]">
              {item.title}
            </p>
            <p className="body-l mt-2 text-(--mut)">{item.place}</p>
            <ul className="acorn-list body-s mt-6 space-y-2">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
