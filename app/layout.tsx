import type { Metadata } from "next";
import "../src/hallmark.css";
import "../src/editorial.css";

export const metadata: Metadata = {
  icons: { icon: "/aria-symbol.svg", apple: "/aria-symbol.svg" },
  title: "ARIA | When should a math tutor step in?",
  description:
    "ARIA is a student-led research initiative studying when a math tutor should intervene and when it should stay quiet. Each step is verified symbolically; a timing model fit on real student logs decides whether to help. Results are from log replay, not classroom studies.",
  applicationName: "ARIA Research Initiative",
  openGraph: {
    type: "website",
    title: "ARIA | When should a math tutor step in?",
    description:
      "A research prototype that verifies each math step and decides when to offer a hint. Evaluated on real student logs; no classroom claims.",
    siteName: "ARIA Research Initiative",
  },
  twitter: {
    card: "summary",
    title: "ARIA | When should a math tutor step in?",
    description:
      "A research prototype that verifies each math step and decides when to offer a hint. Evaluated on real student logs; no classroom claims.",
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
