import type { Metadata } from "next";
import {
  Inspiration,
  Limitations,
  PageIntro,
  Research,
  SitePage,
  TestingNext,
} from "@/src/AriaExperience";

export const metadata: Metadata = {
  title: "Research | ARIA Research Initiative",
  description:
    "ARIA's evidence to date: software checks on synthetic text, an offline replay of real student logs, the limitations of each, and the open questions.",
};

export default function ResearchPage() {
  return (
    <SitePage>
      <PageIntro kicker="Research" title="What the evidence shows, and what it does not.">
        Two kinds of result exist so far: development checks on synthetic text, and an offline
        replay of real student logs. Neither is a learning result. Each number below says which
        kind it is, and the limitations section says why each claim is phrased the way it is.
      </PageIntro>
      <Research />
      <Limitations />
      <TestingNext />
      <Inspiration />
    </SitePage>
  );
}
