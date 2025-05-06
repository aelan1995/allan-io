import "./globals.css";
import { Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"], // optional: add more weights as needed
  display: "swap",
});

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
