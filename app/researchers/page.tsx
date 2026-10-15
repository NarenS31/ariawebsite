import type { Metadata } from "next";
import AriaLogo from "../../src/AriaLogo";
import ResearchBenchmark from "../../src/ResearchBenchmark";

export const metadata: Metadata = {title: "For Researchers | ARIA", description: "ARIA's offline replay, classifier benchmarks, limitations, and specific collaboration needs."};

export default function ResearchersPage() {
  return <main className="methodology-page outreach-page">
    <header className="methodology-nav"><a className="methodology-wordmark" href="/"><AriaLogo /></a><a href="/methodology">Evaluation methodology</a></header>
    <article className="methodology-note">
      <header className="methodology-hero"><p className="kicker">For researchers</p><h1>Evidence, methods, and open questions.</h1><p>ARIA separates symbolic correctness, intervention policy, language classification, and student outcomes. Each requires different evidence.</p></header>
      <section className="methodology-section"><h2>Offline replay on public student logs.</h2><p>Using 2009–10 ASSISTments logs (real students, no text), we tested when a simple intervention policy would stay quiet. When interruptions were weighted three times as costly as delayed help, it intervened 52% less often than always-helping and missed 3.7% of help opportunities (95% CI 2.2–5.3%).</p><p>When delayed help was weighted more, the saving disappeared. This is a retrospective policy replay, not a classroom study or evidence that an intervention improves learning.</p><p><strong>Artifact status:</strong> the replay specification and result files are awaiting a verified public release. These figures are reported from the project’s supplied results summary; replay artifacts were not independently verified during the website work.</p></section>
      <ResearchBenchmark />
      <section className="methodology-section"><h2>Specific ways to collaborate.</h2><ul><li>Review the proposed school consent protocol and research ethics.</li><li>Independently label appropriately permissioned student reasoning transcripts.</li><li>Review intervention costs, replay assumptions, and statistical methods.</li><li>Help design an approved feasibility study at a school.</li></ul><p>Please send a description of a potential dataset first, without attaching student records or identifiable transcripts.</p><a className="btn btn--ink" href="mailto:11narensara11@gmail.com?subject=ARIA%20%7C%20Methods%20or%20ethics%20review">Offer a methods or ethics review <span aria-hidden="true">↗</span></a></section>
      <footer className="methodology-footer"><a href="/participate">School partnership planning</a><a href="/privacy">Privacy and data</a><a href="/">Back to ARIA</a></footer>
    </article>
  </main>;
}
