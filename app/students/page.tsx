import type { Metadata } from "next";
import { SitePage } from "@/src/AriaExperience";
import StudentSurvey from "../../src/StudentSurvey";

export const metadata: Metadata = {title: "Student Experience | ARIA", description: "Three optional questions about what math help you would use."};

export default function StudentsPage() {
  return <SitePage><div className="methodology-page outreach-page">
    <article className="methodology-note">
      <header className="methodology-hero"><p className="kicker">Student experience</p><h1>What math help would you actually use?</h1><p>Three optional questions to help you describe your preferences. You can keep or download your responses; nothing is sent to ARIA.</p></header>
      <section className="methodology-section"><StudentSurvey /></section>
      <footer className="methodology-footer"><a href="/">Back to ARIA</a></footer>
    </article>
  </div></SitePage>;
}
