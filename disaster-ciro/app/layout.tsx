import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DisasterCIRO Pakistan",
  description: "Crisis Intelligence & Response Orchestrator",
  icons: {
    icon: "/logo.svg",
  },
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