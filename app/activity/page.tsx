import type { Metadata } from "next";
import { SitePage } from "@/src/AriaExperience";
import TeacherActivity from "../../src/TeacherActivity";
import { demoBuild, demoCommit } from "../../src/demoMoments";

export const metadata: Metadata = {title: "Would You Step In? | ARIA", description: "Preview eight scripted math tutoring moments and compare your judgment with ARIA's logged decisions."};

export default function ActivityPage() {
  return <SitePage><div className="methodology-page outreach-page">
    <article className="methodology-note">
      <header className="methodology-hero"><p className="kicker">For teachers · Two-minute preview</p><h1>Would you step in?</h1><p>A student is working through a math problem. When would you help, and when would you give them room?</p><div className="methodology-status"><span>Logged by the summit build {demoBuild} (commit {demoCommit})</span><strong>Preview, not active research collection</strong><small>The eight moments and ARIA’s decisions are copied from the summit activity data. Consent review is pending; nothing is uploaded.</small></div></header>
      <TeacherActivity />
      <footer className="methodology-footer"><a href="/participate">Help plan a classroom study</a><a href="/researchers">Methods and evidence</a><a href="/">Back to ARIA</a></footer>
    </article>
  </div></SitePage>;
}
