import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#050B17",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Aerovail Aviation | Private Aviation. Arranged Around You.",
  description:
    "Tailored private jet charters, helicopter services, empty-leg opportunities, and aircraft sales introductions across India and globally, arranged through appropriate aviation operators.",
  keywords: [
    "Private Jet Charter India",
    "Air Charter Brokerage",
    "Mumbai Private Jet",
    "Delhi Private Jet Charter",
    "Helicopter Charter India",
    "Empty Leg Flights",
    "Aircraft Sales Advisory",
    "Aerovail Aviation",
  ],
  authors: [{ name: "Aerovail Aviation" }],
  openGraph: {
    title: "Aerovail Aviation | Private Aviation Arranged Around You",
    description:
      "Bespoke air charter brokerage connecting clients in India and worldwide with vetted private jets and helicopters.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050B17] text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
