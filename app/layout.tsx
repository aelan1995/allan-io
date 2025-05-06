import "./globals.css";
import { Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Allan IO | Web Developer",
  description:
    "Portfolio website built by Allan — showcasing clean, responsive, and modern design.",
  robots: "index, follow",
  alternates: {
    canonical: "https://allan-io.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lato.className}>
      <head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://allan-io.vercel.app" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* These are optional and help for social media preview */}
        <meta property="og:title" content="Allan IO | Web Developer" />
        <meta
          property="og:description"
          content="Clean, responsive portfolio website built in Next.js."
        />
        <meta property="og:url" content="https://allan-io.vercel.app" />
        <meta property="og:type" content="website" />
      </head>
      <body className="bg-slate-900 text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
