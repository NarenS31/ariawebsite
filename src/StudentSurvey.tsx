"use client";

import { useState, type FormEvent } from "react";

export default function StudentSurvey() {
  const [downloaded, setDownloaded] = useState(false);
  function download(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = {
      version: "student-experience-v1",
      hardestPart: form.get("hardestPart"),
      preferredHelp: form.get("preferredHelp"),
      preferredInput: form.get("preferredInput"),
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {type: "application/json"}));
    const link = document.createElement("a");
    link.href = url;
    link.download = "aria-student-experience.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  }
  return (
    <form className="participation-form" onSubmit={download}>
      <div className="field-grid">
        <label>Which part of math is hardest to get through?<select name="hardestPart" required defaultValue=""><option value="" disabled>Select one</option><option>Getting started</option><option>Choosing the next step</option><option>Finding a mistake</option><option>Checking the final answer</option><option>Keeping going after an error</option><option>Prefer not to answer</option></select></label>
        <label>What help would you prefer first?<select name="preferredHelp" required defaultValue=""><option value="" disabled>Select one</option><option>A question about my plan</option><option>A small hint</option><option>A worked example of a different problem</option><option>Time to keep trying</option><option>Prefer not to answer</option></select></label>
        <label>How would you prefer to interact?<select name="preferredInput" required defaultValue=""><option value="" disabled>Select one</option><option>Type a short step</option><option>Tap a choice</option><option>Speak privately</option><option>Depends on the setting</option><option>Prefer not to answer</option></select></label>
      </div>
      <p>No name, email, school, age, or free-text answers are requested. Your selections stay in this page until you download them. This is optional design feedback, not enrollment in a research study.</p>
      <button className="btn btn--ink" type="submit">Download my responses <span aria-hidden="true">↓</span></button>
      {downloaded && <p role="status">Your response file was prepared. It has not been sent to ARIA. You can choose whether to share it with the team in person.</p>}
    </form>
  );
}
