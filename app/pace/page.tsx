import type { Metadata } from "next";
import PacePage from "@/src/v2/PacePage";

export const metadata: Metadata = {
  title: "ARIA-Pace | ARIA Research Initiative",
  description:
    "ARIA-Pace is the timing rule behind ARIA: a knowledge-tracing model fit on real student logs plus a policy for when a tutor should stay quiet. Question, data, model, protocol, results, limits.",
};

export default function Pace() {
  return <PacePage />;
}
