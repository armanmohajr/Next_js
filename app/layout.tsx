import React, { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "AI Summary App",
  description: "Simple text summarizer built with Next.js",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-2xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
