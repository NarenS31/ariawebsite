import type { Metadata } from "next";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/plus-jakarta-sans";
import "../src/hallmark.css";

export const metadata: Metadata = {
  title: "ARIA | Metacognitive AI Research",
  description:
    "ARIA is an open research initiative building metacognitive AI for students with ADHD and learning disabilities.",
  applicationName: "ARIA Research Initiative",
  openGraph: {
    type: "website",
    title: "ARIA | Metacognitive AI Research",
    description:
      "Detecting cognitive states from student think-alouds and responding with better questions, not answers.",
    siteName: "ARIA Research Initiative",
  },
  twitter: {
    card: "summary",
    title: "ARIA | Metacognitive AI Research",
    description:
      "Detecting cognitive states from student think-alouds and responding with better questions, not answers.",
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
