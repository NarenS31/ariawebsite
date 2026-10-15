import type { Metadata } from "next";
import "../src/hallmark.css";
import "../src/editorial.css";

export const metadata: Metadata = {
  icons: { icon: "/aria-symbol.svg", apple: "/aria-symbol.svg" },
  title: "ARIA Math Tutor | Room to Think",
  description:
    "Meet ARIA, a math tutoring prototype that checks typed steps and offers small prompts while students keep thinking. Explore examples or help plan a school study.",
  applicationName: "ARIA Research Initiative",
  openGraph: {
    type: "website",
    title: "ARIA Math Tutor | Room to Think",
    description:
      "Testing a math-first tutor that responds to observable student reasoning with scaffolded questions, not answers.",
    siteName: "ARIA Research Initiative",
  },
  twitter: {
    card: "summary",
    title: "ARIA Math Tutor | Room to Think",
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
