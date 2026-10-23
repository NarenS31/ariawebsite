import type { Metadata } from "next";
import { SitePage } from "@/src/AriaExperience";
import TeacherActivity from "../../src/TeacherActivity";

export const metadata: Metadata = {title: "Would You Step In? | ARIA", description: "Preview eight scripted math tutoring moments and compare your judgment with ARIA's logged decisions."};

export default function ActivityPage() {
  return <SitePage><div className="methodology-page outreach-page">
    <article className="methodology-note">
      <header className="methodology-hero"><p className="kicker">For educators</p><h1>Would you step in?</h1><p>A student is working through a math problem. When would you help, and when would you give them room? Compare your judgment with ARIA across eight example moments.</p></header>
      <TeacherActivity />
      <footer className="methodology-footer"><a href="/participate">Help plan a classroom study</a><a href="/pace">Methods and evidence</a><a href="/">Back to ARIA</a></footer>
    </article>
  </div></SitePage>;
}
