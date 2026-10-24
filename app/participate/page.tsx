import type { Metadata } from "next";
import { SitePage } from "@/src/AriaExperience";
import ParticipationForm from "../../src/ParticipationForm";

export const metadata: Metadata = {title: "For Educators | ARIA", description: "Help plan a reviewed classroom evaluation of ARIA."};

export default function ParticipatePage() {
  return <SitePage><div className="methodology-page outreach-page">
    <article className="methodology-note">
      <header className="methodology-hero"><p className="kicker">For educators</p><h1>Help shape ARIA’s classroom evaluation.</h1><p>Tell us what would make a math tutor useful in your classroom. We are seeking school partners to help define a small, reviewed study.</p><div className="methodology-status"><span>Planning stage</span><strong>Pilot enrollment is not open</strong><small>Readiness checks and school approval come before student sessions.</small></div></header>
      <section className="methodology-section"><h2>A small study, planned together.</h2><p>The proposed format is 2–3 sessions of 30–45 minutes, focused on typed mathematics from algebra through calculus. Session length, tasks, and participation would be agreed with the school.</p><p>Educators would help choose useful measures and review the support ARIA provides. The team works from Waxhaw, North Carolina (Eastern Time); support arrangements would be agreed before a study starts.</p><a href="/activity">Try the two-minute “Would you step in?” preview →</a></section>
      <section className="methodology-section"><h2>What must be ready first.</h2><ul><li>A verified Wi-Fi-off run and documented data handling.</li><li>A tested per-session teacher summary.</li><li>A frozen demo and completed release checks.</li><li>A school-approved consent process and applicable research review.</li><li>An agreed class, room, laptop setup, and adult point of contact.</li></ul><p>Offline operation, teacher summaries, and specific privacy guarantees will be offered only after these checks are complete.</p></section>
      <section className="methodology-section" id="request"><h2>Start a planning conversation.</h2><p>This is an expression of interest, not a commitment to run a pilot.</p><ParticipationForm /></section>
      <footer className="methodology-footer"><a href="/join">Join ARIA</a><a href="/researchers">For researchers</a><a href="/">Back to ARIA</a></footer>
    </article>
  </div></SitePage>;
}
