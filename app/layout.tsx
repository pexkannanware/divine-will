import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thedivinewill.example"),
  title: {
    default: "The Divine Will",
    template: "%s | The Divine Will",
  },
  description:
    "Compassionate, confidential counseling and psychological support for individuals, students, couples, families and workplaces.",
  keywords: [
    "counseling",
    "emotional wellness",
    "psychological support",
    "online counseling",
    "family counseling",
  ],
  openGraph: {
    title: "The Divine Will",
    description:
      "A safe, confidential and non-judgmental space to be heard, understood and supported.",
    type: "website",
    images: [
      {
        url: "/images/counselling-hero.webp",
        width: 1536,
        height: 1024,
        alt: "A counselor listening with care to a client",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
