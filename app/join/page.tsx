import type { Metadata } from "next";
import { SitePage } from "@/src/AriaExperience";
import JoinForm from "../../src/JoinForm";

export const metadata: Metadata = {title: "Join ARIA | ARIA", description: "Register your interest in ARIA, a student-led research initiative on when a math tutor should step in."};

export default function JoinPage() {
  return <SitePage><div className="methodology-page outreach-page">
    <article className="methodology-note">
      <header className="methodology-hero"><p className="kicker">Join ARIA</p><h1>Tell us you’re interested.</h1><p>Teachers, researchers, students, and parents are welcome. Share a few details and we will contact you when there is something to review or try.</p><div className="methodology-status"><span>Expression of interest</span><strong>Not a commitment</strong><small>Your details are stored in a database we control. See the privacy page.</small></div></header>
      <section className="methodology-section" id="signup"><h2>Your details.</h2><JoinForm /></section>
      <footer className="methodology-footer"><a href="/privacy">Privacy and data</a><a href="/">Back to ARIA</a></footer>
    </article>
  </div></SitePage>;
}
