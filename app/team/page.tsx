import type { Metadata } from "next";
import TeamPage from "@/src/v2/TeamPage";

export const metadata: Metadata = {
  title: "Team | ARIA Research Initiative",
  description:
    "The two student researchers behind ARIA.",
};

export default function Team() {
  return <TeamPage />;
}
