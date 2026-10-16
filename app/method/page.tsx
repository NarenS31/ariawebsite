import type { Metadata } from "next";
import { HelpModel, PageIntro, SitePage, WatchedStates, Workflow } from "@/src/AriaExperience";

export const metadata: Metadata = {
  title: "Method | ARIA Research Initiative",
  description:
    "How the ARIA tutor works: a symbolic engine verifies each step, help escalates in three levels and never gives the answer, and a policy decides when to stay quiet.",
};

export default function MethodPage() {
  return (
    <SitePage>
      <PageIntro kicker="Method" title="How the tutor decides what to do.">
        Four stages, three levels of help, and a policy that treats staying quiet as a decision.
        Everything here describes the live tutor as built for the October 2026 demonstration; the
        timing model behind the policy is documented on the ARIA-Pace page.
      </PageIntro>
      <Workflow />
      <HelpModel />
      <WatchedStates />
    </SitePage>
  );
}
