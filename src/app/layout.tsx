import type { Metadata } from "next";

// styles
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "CK — Frontend Developer",
  description:
    "Frontend developer crafting precise, performant, and meaningful interfaces.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
