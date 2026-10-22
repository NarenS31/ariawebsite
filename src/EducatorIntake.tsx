"use client";

import { useState, type FormEvent } from "react";

const roles = [
  { value: "K-12 math teacher", label: "K-12 math teacher", hint: "Look at sample problems and tutor replies." },
  { value: "Researcher or EdTech advisor", label: "Researcher or EdTech advisor", hint: "Critique the evaluation method." },
  { value: "School administrator", label: "School administrator", hint: "Explore possible future low-stakes classroom pilots." },
] as const;

export default function EducatorIntake() {
  const [message, setMessage] = useState("");
  const [needRole, setNeedRole] = useState(false);

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const chosen = values.getAll("role").map(String);
    if (chosen.length === 0) {
      setNeedRole(true);
      setMessage("");
      return;
    }
    setNeedRole(false);
    setMessage([
      "I would like to help test ARIA.",
      "",
      `Name: ${values.get("name")}`,
      `School or organization: ${values.get("org")}`,
      `Email: ${values.get("email")}`,
      `I could help as: ${chosen.join("; ")}`,
    ].join("\n"));
  }

  return (
    <section className="educator-intake section" id="help-us-test">
      <div className="shell">
        <p className="kicker">For educators and advisors</p>
        <h2>Help us test this.</h2>
        <p>Tell us how you could help review ARIA. This is a request for feedback, not a pilot sign-up. Nothing is sent from this page; it prepares an email draft for you to review and send yourself.</p>
        <div className="participation-form">
          <form onSubmit={prepareEmail}>
            <div className="field-grid">
              <label>Name<input name="name" autoComplete="name" maxLength={120} required /></label>
              <label>School or organization<input name="org" autoComplete="organization" maxLength={180} required /></label>
              <label>Email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
            </div>
            <fieldset className="intake-roles" aria-describedby={needRole ? "intake-role-error" : undefined}>
              <legend>How could you help? Choose any that apply.</legend>
              {roles.map((role) => (
                <label className="consent-check" key={role.value}>
                  <input type="checkbox" name="role" value={role.value} />
                  <span><strong>{role.label}:</strong> {role.hint}</span>
                </label>
              ))}
              {needRole && <p id="intake-role-error" role="alert">Please choose at least one.</p>}
            </fieldset>
            <p>Please do not include student names, records, or medical information. <a href="/privacy">Privacy and data</a></p>
            <button className="btn btn--ink" type="submit">Prepare email <span aria-hidden="true">→</span></button>
          </form>
          {message && <div className="email-preview" role="status">
            <h3>Your email is ready to review.</h3>
            <p>Nothing has been submitted. Open your email app, review the message, and send it to the ARIA team.</p>
            <pre>{message}</pre>
            <a className="btn btn--pear" href={`mailto:11narensara11@gmail.com?subject=${encodeURIComponent("Help test ARIA")}&body=${encodeURIComponent(message)}`}>Open email draft <span aria-hidden="true">↗</span></a>
            <p>If your email app does not open, send this to <a href="mailto:11narensara11@gmail.com">11narensara11@gmail.com</a>.</p>
          </div>}
        </div>
      </div>
    </section>
  );
}
