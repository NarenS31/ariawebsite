import type { Metadata } from "next";
import "../src/hallmark.css";

export const metadata: Metadata = {
  title: "ARIA | Metacognitive AI Research",
  description:
    "ARIA is a student-led research initiative testing task-grounded AI that helps learners plan, check, and recover without taking over the work.",
  applicationName: "ARIA Research Initiative",
  openGraph: {
    type: "website",
    title: "ARIA | Metacognitive AI Research",
    description:
      "Testing task-grounded AI that responds to observable student reasoning with better questions, not answers.",
    siteName: "ARIA Research Initiative",
  },
  twitter: {
    card: "summary",
    title: "ARIA | Metacognitive AI Research",
    description:
      "Testing task-grounded AI that responds to observable student reasoning with better questions, not answers.",
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
