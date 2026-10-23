import type { Metadata } from "next";
import RoadmapPage from "@/src/v2/RoadmapPage";

export const metadata: Metadata = {
  title: "Roadmap | ARIA Research Initiative",
  description:
    "ARIA's five research phases in order, the current one marked, and the ethics gates before any work with students.",
};

export default function Roadmap() {
  return <RoadmapPage />;
}
