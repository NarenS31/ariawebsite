import type { Metadata } from "next";
import AriaLogo from "../../src/AriaLogo";
import StudentSurvey from "../../src/StudentSurvey";

export const metadata: Metadata = {title: "Student Experience | ARIA", description: "Three optional questions about what math help you would use."};

export default function StudentsPage() {
  return <main className="methodology-page outreach-page">
    <header className="methodology-nav"><a className="methodology-wordmark" href="/"><AriaLogo /></a><a href="/privacy">Privacy and data</a></header>
    <article className="methodology-note">
      <header className="methodology-hero"><p className="kicker">Student experience</p><h1>What math help would you actually use?</h1><p>Three optional questions to help you describe your preferences. You can keep or download your responses; nothing is sent to ARIA.</p></header>
      <section className="methodology-section"><StudentSurvey /></section>
      <footer className="methodology-footer"><a href="/">Back to ARIA</a></footer>
    </article>
  </main>;
}
