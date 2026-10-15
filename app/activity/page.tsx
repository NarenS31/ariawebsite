import type { Metadata } from "next";
import AriaLogo from "../../src/AriaLogo";
import TeacherActivity from "../../src/TeacherActivity";

export const metadata: Metadata = {title: "Would You Step In? | ARIA", description: "Preview eight scripted math tutoring moments and compare your judgment with ARIA's logged decisions."};

export default function ActivityPage() {
  return <main className="methodology-page outreach-page">
    <header className="methodology-nav"><a className="methodology-wordmark" href="/"><AriaLogo /></a><a href="/privacy">Privacy and data</a></header>
    <article className="methodology-note">
      <header className="methodology-hero"><p className="kicker">For teachers · Two-minute preview</p><h1>Would you step in?</h1><p>A student is working through a math problem. When would you help, and when would you give them room?</p><div className="methodology-status"><span>Pre-freeze build 074812d</span><strong>Preview, not active research collection</strong><small>All eight moments must be regenerated and checked against the frozen summit build. Consent review is pending.</small></div></header>
      <TeacherActivity />
      <footer className="methodology-footer"><a href="/participate">Help plan a classroom study</a><a href="/researchers">Methods and evidence</a><a href="/">Back to ARIA</a></footer>
    </article>
  </main>;
}
