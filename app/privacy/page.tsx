import type { Metadata } from "next";
import { SitePage } from "@/src/AriaExperience";

export const metadata: Metadata = {title: "Privacy and Data | ARIA", description: "What this ARIA website collects and what still needs verification before classroom use."};

export default function PrivacyPage() {
  return <SitePage><div className="methodology-page outreach-page privacy-page">
    <article className="methodology-note">
      <header className="methodology-hero"><p className="kicker">Privacy and data · October 2026</p><h1>Your information, explained.</h1></header>
      <section className="methodology-section"><h2>This website</h2><p>The educator form prepares an email containing your name, school, grade band, and email address. It does not submit or save those details to an ARIA database. You decide whether to send the email through your email provider. The student feedback page only downloads your selections to your device; it does not upload them.</p><p>No analytics trackers or advertising cookies are included in the website code. The hosting provider may process ordinary request logs, such as IP addresses. Links to external sites and your email provider have their own privacy policies.</p></section>
      <section className="methodology-section"><h2>Teacher activity and tutor demo</h2><p>The teacher activity keeps eight decisions and optional role, years teaching, and grade band in browser memory. It uploads nothing and saves nothing between page visits. The CSV downloads only when requested. It contains no names, emails, or timestamps; background details can still identify someone in a small group. Research collection and consent review remain pending.</p><p>The homepage examples are logged decisions and accept no student text. The tutor is a separate application. Its storage, network behavior, and deletion process must be verified before classroom use; metadata-only storage and no text leaving the device are not yet promised.</p></section>
      <section className="methodology-section"><h2>Questions or deletion requests</h2><p>Please do not send student records, medical information, or identifiable student work through the interest form. To ask about data or request deletion of an email you sent the team, contact <a href="mailto:11narensara11@gmail.com?subject=ARIA%20privacy%20request">11narensara11@gmail.com</a>.</p></section>
      <footer className="methodology-footer"><a href="/">Back to ARIA</a><a href="/researchers">For researchers</a></footer>
    </article>
  </div></SitePage>;
}
