import { AcornMark } from "@/components/ui/AcornMark";

export default function Loading() {
  return (
    <div role="status" className="grid min-h-svh place-items-center text-pop">
      <AcornMark className="acorn-loading size-8" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
