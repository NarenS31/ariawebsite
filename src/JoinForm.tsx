"use client";

import { useRef, useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "done" | "error";

export default function JoinForm() {
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const v = new FormData(form);
    setStatus("sending");
    setError("");
    setFields({});
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: v.get("firstName"),
          lastName: v.get("lastName"),
          affiliation: v.get("affiliation"),
          email: v.get("email"),
          interest: v.get("interest"),
          role: v.get("role"),
          consent: v.get("consent") === "on",
          website: v.get("website"),
          startedAt: startedAt.current,
          source: new URLSearchParams(window.location.search).get("source") ?? "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("done");
        form.reset();
        return;
      }
      setFields(data.fields ?? {});
      setError(data.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setError("Could not reach the server. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return <div className="email-preview" role="status"><h3>Thank you for your interest.</h3><p>We have your details and will be in touch when there is something to share.</p></div>;
  }
  const err = (k: string) => fields[k] && <small role="alert">{fields[k]}</small>;
  return (
    <div className="participation-form">
      <form onSubmit={submit} noValidate={false}>
        <div className="field-grid">
          <label>First name<input name="firstName" autoComplete="given-name" maxLength={80} required />{err("firstName")}</label>
          <label>Last name<input name="lastName" autoComplete="family-name" maxLength={80} required />{err("lastName")}</label>
          <label>School or organization<input name="affiliation" autoComplete="organization" maxLength={160} required />{err("affiliation")}</label>
          <label>Email<input name="email" type="email" autoComplete="email" maxLength={254} required />{err("email")}</label>
          <label>I am a<select name="role" defaultValue=""><option value="">Prefer not to say</option><option>Teacher</option><option>Researcher</option><option>Student</option><option>Parent</option><option>Other</option></select>{err("role")}</label>
        </div>
        <label>What interests you about ARIA?<textarea name="interest" rows={4} maxLength={400} required />{err("interest")}</label>
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
          <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <label><input name="consent" type="checkbox" required /> I agree that ARIA may store these details to contact me about the project. <a href="/privacy">Privacy and data</a>{err("consent")}</label>
        <p>Please do not include student names, records, or medical information.</p>
        {error && <p role="alert">{error}</p>}
        <button className="btn btn--ink" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Join ARIA"} <span aria-hidden="true">→</span></button>
      </form>
    </div>
  );
}
