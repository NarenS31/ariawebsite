import type { ReactNode } from "react";

/** One hand-drawn underline per page, at most. The stroke draws itself once; static under reduced motion. */
export function Underline({ children }: { children: ReactNode }) {
  return (
    <span className="hl">
      <span className="hl__t">{children}</span>
      <svg className="hl__svg" viewBox="0 0 240 16" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path pathLength={1} d="M4 10 C38 3 78 13 120 7 S196 4 236 9" />
      </svg>
    </span>
  );
}

/** Small decorative marks (aria-hidden). */
export function Doodle({ kind, className = "" }: { kind: "burst" | "squiggle" | "loop" | "arrow"; className?: string }) {
  const common = { className: `doodle doodle--${kind} ${className}`.trim(), "aria-hidden": true, focusable: false } as const;
  if (kind === "burst")
    return (
      <svg {...common} viewBox="0 0 40 40">
        <path d="M20 4v9M20 27v9M4 20h9M27 20h9M9 9l6 6M25 25l6 6M31 9l-6 6M15 25l-6 6" />
      </svg>
    );
  if (kind === "squiggle")
    return (
      <svg {...common} viewBox="0 0 80 20">
        <path d="M3 12q8-12 14 0t14 0 14 0 14 0 14 0" />
      </svg>
    );
  if (kind === "loop")
    return (
      <svg {...common} viewBox="0 0 60 50">
        <path d="M6 40C14 10 44 4 50 20c4 12-14 14-20 4S34 8 54 6" />
      </svg>
    );
  return (
    <svg {...common} viewBox="0 0 60 40">
      <path d="M4 30C20 34 38 24 52 8M52 8l-14 1M52 8l-2 13" />
    </svg>
  );
}

export function Pill({ status }: { status: "Complete" | "Current" | "Planned" }) {
  return <span className={`pill pill--${status.toLowerCase()}`}>{status}</span>;
}

/** Simple line icons for the three pillars. */
export function PillarIcon({ kind }: { kind: "research" | "tool" | "engagement" }) {
  const common = { className: "pillar__icon", viewBox: "0 0 48 48", "aria-hidden": true, focusable: false } as const;
  if (kind === "research")
    return (
      <svg {...common}>
        <path d="M8 38V10M8 38h32" />
        <path d="M14 30l8-9 7 5 10-14" />
        <circle cx="14" cy="30" r="2" />
        <circle cx="22" cy="21" r="2" />
        <circle cx="29" cy="26" r="2" />
        <circle cx="39" cy="12" r="2" />
      </svg>
    );
  if (kind === "tool")
    return (
      <svg {...common}>
        <rect x="6" y="10" width="36" height="26" rx="3" />
        <path d="M14 20l5 4-5 4M24 28h9" />
        <path d="M18 42h12" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="16" cy="16" r="5" />
      <circle cx="33" cy="18" r="4" />
      <path d="M6 38c1-8 5-12 10-12s9 4 10 12M27 38c1-6 3-9 7-9s6 3 8 9" />
    </svg>
  );
}
