import { CapabilitiesFrame } from "@/components/home/CapabilitiesFrame";
import { CoverFrame } from "@/components/home/CoverFrame";
import { InterludeFrame } from "@/components/home/InterludeFrame";
import { ProfileFrame } from "@/components/home/ProfileFrame";
import { RecordFrame } from "@/components/home/RecordFrame";
import { WorkFrame } from "@/components/home/WorkFrame";
import { ContactFrame } from "@/components/sections/ContactFrame";
import { HorizontalStory } from "@/components/story/HorizontalStory";
import { entry, site } from "@/content/site";

export default function Home() {
  const record = entry("record");

  return (
    <HorizontalStory entries={site.entries} intro>
      <CoverFrame />
      <ProfileFrame />
      <InterludeFrame />
      <WorkFrame />
      <CapabilitiesFrame />
      <RecordFrame label={record.label} />
      <ContactFrame />
    </HorizontalStory>
  );
}
