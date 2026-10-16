import type { Metadata } from "next";
import { PageIntro, Roadmap, SitePage, StudentFeedback, Summit } from "@/src/AriaExperience";

export const metadata: Metadata = {
  title: "Roadmap | ARIA Research Initiative",
  description:
    "ARIA's five research phases in order, the current one marked, and the ethics gates before any work with students.",
};

export default function RoadmapPage() {
  return (
    <SitePage>
      <PageIntro kicker="Roadmap" title="Five phases, in order.">
        Each phase has to hold up before the next is worth running. The timing model is the
        current phase; interviews and classroom evaluation are planned and gated on ethics review
        and consent. The October 2026 summit is where the design is put in front of teachers.
      </PageIntro>
      <Roadmap />
      <StudentFeedback />
      <Summit />
    </SitePage>
  );
}
