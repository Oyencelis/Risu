import Link from "next/link";
import { Frame, FrameBody } from "@/components/canvas/Frame";
import { HorizontalStory } from "@/components/story/HorizontalStory";
import { Arrow } from "@/components/ui/Arrow";
import type { Entry } from "@/content/site";

const entries: Entry[] = [{ id: "not-found", no: "404", label: "Not found" }];

export default function NotFound() {
  return (
    <HorizontalStory entries={entries}>
      <Frame theme="dark" name="Not found" id="not-found">
        <FrameBody className="min-h-[60svh] justify-between gap-12">
          <p className="mono"><span className="chip">Error 404</span></p>
          <div>
            <h1 className="display text-[calc(8*var(--scale))] wide:text-[calc(18*var(--scale))]">
              Frame not found.
            </h1>
            <p className="body-l mt-6 text-(--mut)">
              The page you are looking for does not exist or has moved.
            </p>
            <Link href="/" className="btn mono mt-8">
              Back to home
              <Arrow />
            </Link>
          </div>
        </FrameBody>
      </Frame>
    </HorizontalStory>
  );
}
