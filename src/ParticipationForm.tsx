"use client";

import { useState, type FormEvent } from "react";

export default function ParticipationForm() {
  const [message, setMessage] = useState("");
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setMessage([
      "I would like to help plan an ARIA classroom evaluation.",
      "",
      `Name: ${values.get("name")}`,
      `School: ${values.get("school")}`,
      `Grade band: ${values.get("gradeBand")}`,
      `Email: ${values.get("email")}`,
      "",
      "Please share the readiness checks and proposed school consent process.",
    ].join("\n"));
  }
  return (
    <div className="participation-form">
      <form onSubmit={prepareEmail}>
        <div className="field-grid">
          <label>Name<input name="name" autoComplete="name" maxLength={120} required /></label>
          <label>School<input name="school" autoComplete="organization" maxLength={180} required /></label>
          <label>Grade band<select name="gradeBand" required defaultValue=""><option value="" disabled>Select a grade band</option><option>Middle school</option><option>High school</option><option>Higher education</option><option>Multiple grade bands</option></select></label>
          <label>Email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
        </div>
        <p>This form is for educators and school staff. Please do not include student names, records, or medical information. <a href="/privacy">Privacy and data</a></p>
        <button className="btn btn--ink" type="submit">Prepare planning request <span aria-hidden="true">→</span></button>
      </form>
      {message && <div className="email-preview" role="status">
        <h3>Your email is ready to review.</h3>
        <p>Nothing has been submitted. Open your email app, review the request, and send it to the ARIA team.</p>
        <pre>{message}</pre>
        <a className="btn btn--pear" href={`mailto:11narensara11@gmail.com?subject=${encodeURIComponent("ARIA classroom evaluation planning")}&body=${encodeURIComponent(message)}`}>Open email draft <span aria-hidden="true">↗</span></a>
        <p>If your email app does not open, send this request to <a href="mailto:11narensara11@gmail.com">11narensara11@gmail.com</a>.</p>
      </div>}
    </div>
  );
}
