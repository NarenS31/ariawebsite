import type { Metadata } from "next";
import "../src/hallmark.css";

export const metadata: Metadata = {
  title: "ARIA | Math-First Metacognitive AI Research",
  description:
    "ARIA is a student-led research initiative testing a math-first metacognitive tutor that helps learners plan, check, and recover without taking over the work. Current results are preliminary.",
  applicationName: "ARIA Research Initiative",
  openGraph: {
    type: "website",
    title: "ARIA | Math-First Metacognitive AI Research",
    description:
      "Testing a math-first tutor that responds to observable student reasoning with scaffolded questions, not answers.",
    siteName: "ARIA Research Initiative",
  },
  twitter: {
    card: "summary",
    title: "ARIA | Math-First Metacognitive AI Research",
    description:
      "Testing a math-first tutor that responds to observable student reasoning with scaffolded questions, not answers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
