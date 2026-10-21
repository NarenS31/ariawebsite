import type { Metadata } from "next";
import { SitePage } from "@/src/AriaExperience";
import ResearchBenchmark from "../../src/ResearchBenchmark";

export const metadata: Metadata = {title: "For Researchers | ARIA", description: "ARIA's offline replay, classifier benchmarks, limitations, and specific collaboration needs."};

export default function ResearchersPage() {
  return <SitePage><div className="methodology-page outreach-page">
    <article className="methodology-note">
      <header className="methodology-hero"><p className="kicker">For researchers</p><h1>Evidence, methods, and open questions.</h1><p>ARIA separates symbolic correctness, intervention policy, language classification, and student outcomes. Each requires different evidence.</p></header>
      <section className="methodology-section"><h2>Offline replay on public student logs.</h2><p>ARIA-Pace was fit on public, de-identified 2009–10 ASSISTments logs and evaluated once on a locked held-out split of 597 test students. When interruptions are weighted three times as costly as a delayed hint (the Quiet cost setting), under the 3-correct-in-a-row mastery definition, it intervened 52% less often than helping after every wrong step and missed 3.7% of students who went on to get stuck (95% CI 2.2–5.3%).</p><p>When a delayed hint is weighted three times as costly (the Supportive setting), the saving shrinks to 3% and the difference to always helping includes zero. Quiet, Balanced and Supportive are cost settings we chose, not types of learner. This is a retrospective policy replay, not a classroom study or evidence that an intervention improves learning.</p><p><strong>Sources:</strong> the specification, code and result files are in the <a href="https://github.com/NarenS31/aria.kls">aria.kls repository</a> (branch aria-pace: docs/aria_pace/RESULTS.md and aria_pace/results/test_results.json). The protocol, validation numbers and limits are on the <a href="/pace">ARIA-Pace page</a>.</p></section>
      <ResearchBenchmark />
      <section className="methodology-section"><h2>Specific ways to collaborate.</h2><ul><li>Review the proposed school consent protocol and research ethics.</li><li>Independently label appropriately permissioned student reasoning transcripts.</li><li>Review intervention costs, replay assumptions, and statistical methods.</li><li>Help design an approved feasibility study at a school.</li></ul><p>Please send a description of a potential dataset first, without attaching student records or identifiable transcripts.</p><a className="btn btn--ink" href="mailto:11narensara11@gmail.com?subject=ARIA%20%7C%20Methods%20or%20ethics%20review">Offer a methods or ethics review <span aria-hidden="true">↗</span></a></section>
      <footer className="methodology-footer"><a href="/participate">School partnership planning</a><a href="/privacy">Privacy and data</a><a href="/">Back to ARIA</a></footer>
    </article>
  </div></SitePage>;
}
