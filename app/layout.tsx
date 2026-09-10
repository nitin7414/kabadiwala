import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/lib/ConvexClientProvider";

export const metadata: Metadata = {
  title: "Scrap Setu — Kabadiwala Connect | SIH 2026",
  description:
    "Decentralized E-Waste Traceability & Fair Pricing Platform linking informal collectors, authorized recyclers, and regulatory oversight.",
};

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FBFBFA] text-[#1A2E2A] antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
