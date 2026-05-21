import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "VeganEats China",
  description: "Vegan & vegetarian restaurants near muShanghai, Hongqiao",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4"
          style={{ maxWidth: 480, margin: "0 auto" }}>
          <a href="/" className="text-lg font-bold" style={{ color: "#2D6A4F" }}>
            VeganEats
          </a>
          <a href="/about" className="text-sm text-gray-500">About</a>
        </nav>
        <main className="pt-14">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
