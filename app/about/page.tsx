import type { Metadata } from "next";
import AboutPage from "@/src/v2/AboutPage";

export const metadata: Metadata = {
  title: "About | ARIA Research Initiative",
  description:
    "ARIA's mission, what the project is, why it is limited to mathematics, and what it does and does not claim.",
};

export default function About() {
  return <AboutPage />;
}
