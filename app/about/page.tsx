import type { Metadata } from "next";
import { About, PageIntro, SitePage, WhyMath } from "@/src/AriaExperience";

export const metadata: Metadata = {
  title: "About | ARIA Research Initiative",
  description:
    "Why ARIA studies when a math tutor should step in, why the study is limited to mathematics, and what the project does and does not claim.",
};

export default function AboutPage() {
  return (
    <SitePage>
      <PageIntro kicker="About" title="Why timing, and why mathematics.">
        ARIA is a student-led research initiative. It began with a personal question about help
        that arrives too fast, and it has become a study of when a tutor should intervene and when
        it should stay quiet. This page covers the motivation, the scope, and the boundaries of
        what the project claims.
      </PageIntro>
      <About />
      <WhyMath />
    </SitePage>
  );
}
