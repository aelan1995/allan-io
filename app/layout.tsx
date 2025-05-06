// app/layout.tsx
import "./globals.css";
import { Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// ✅ Next.js 13+ metadata API (automatically injected into <head>)
export const metadata = {
  title: "Allan IO | Web Developer",
  description:
    "Portfolio website built by Allan — showcasing clean, responsive, and modern design.",
  robots: "index, follow",
  alternates: {
    canonical: "https://allan-io.vercel.app",
  },
  openGraph: {
    title: "Allan IO | Web Developer",
    description: "Clean, responsive portfolio website built in Next.js.",
    url: "https://allan-io.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allan IO | Web Developer",
    description: "Clean, responsive portfolio website built in Next.js.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lato.className}>
      <body className="bg-slate-900 text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
