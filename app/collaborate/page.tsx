import type { Metadata } from "next";
import { Join, PageIntro, Researchers, SitePage } from "@/src/AriaExperience";

export const metadata: Metadata = {
  title: "Collaborate | ARIA Research Initiative",
  description:
    "Who is doing the ARIA research and how teachers, students, and researchers can review the study design, host a pilot, or critique the methods.",
};

export default function CollaboratePage() {
  return (
    <SitePage>
      <PageIntro kicker="Collaborate" title="Who is doing the work, and what we need.">
        ARIA is run by two student researchers and is looking for a teacher or researcher to
        advise on the study design. The most useful help right now is criticism of the methods
        and a classroom willing to host a small offline pilot.
      </PageIntro>
      <Researchers />
      <Join />
    </SitePage>
  );
}
