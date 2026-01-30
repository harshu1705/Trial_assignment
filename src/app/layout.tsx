import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./canvas-animations.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Galaxy.ai - AI Workflow Editor",
  description: "Build and execute AI workflows with ease",
};

import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${inter.className} h-full antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
