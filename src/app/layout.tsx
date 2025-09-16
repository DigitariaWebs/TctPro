import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/providers/ModalProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TCT Pro - Centre Automobile Complet | Vente & Service Montréal",
  description:
    "Centre automobile TIGERBEC CARS INC. offrant vente de véhicules neufs et d'occasion, service d'entretien, detailing professionnel et customisation. Experts automobiles à Montréal.",
  keywords: [
    "voitures d'occasion",
    "vente automobile",
    "service auto",
    "entretien voiture",
    "detailing",
    "customisation auto",
    "Montréal",
    "TCT Pro",
    "TIGERBEC CARS",
  ],
  authors: [{ name: "TIGERBEC CARS INC." }],
  creator: "TIGERBEC CARS INC.",
  publisher: "TIGERBEC CARS INC.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "TCT Pro - Centre Automobile Complet",
    description:
      "Centre automobile offrant vente de véhicules, service d'entretien, detailing et customisation pour une expérience automobile complète à Montréal.",
    url: "https://tctpro.ca",
    siteName: "TCT Pro",
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TCT Pro - Centre Automobile Complet",
    description:
      "Centre automobile offrant vente de véhicules, service d'entretien, detailing et customisation pour une expérience automobile complète à Montréal.",
    creator: "@tctpro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalProvider>
        {children}
        </ModalProvider>
      </body>
    </html>
  );
}
