import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModelProvider } from "@/components/providers/ModelProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TCT Pro - Centre Automobile Complet | Vente & Service Montréal",
    template: "%s | TCT Pro - Centre Automobile Montréal",
  },
  description:
    "Centre automobile TIGERBEC CARS INC. offrant vente de véhicules neufs et d'occasion, service d'entretien, detailing professionnel et customisation. Plus de 50 véhicules en stock, financement disponible. Experts automobiles à Montréal depuis plus de 10 ans.",
  keywords: [
    "voitures d'occasion Montréal",
    "vente automobile Québec",
    "service auto professionnel",
    "entretien voiture Montréal",
    "detailing automobile",
    "customisation auto",
    "financement automobile",
    "essai routier gratuit",
    "garantie véhicule occasion",
    "TCT Pro",
    "TIGERBEC CARS",
    "concessionnaire auto Montréal",
    "BMW occasion",
    "Audi occasion",
    "Mercedes occasion",
    "voiture sport occasion",
  ],
  authors: [{ name: "TIGERBEC CARS INC.", url: "https://tct.pro" }],
  creator: "TIGERBEC CARS INC.",
  publisher: "TIGERBEC CARS INC.",
  applicationName: "TCT Pro",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "automotive",
  classification: "business",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "TCT Pro - Centre Automobile Complet | Vente & Service Montréal",
    description:
      "Centre automobile offrant vente de véhicules d'occasion premium, service d'entretien, detailing et customisation. Plus de 50 véhicules en stock avec financement disponible. Experts automobiles à Montréal.",
    url: "https://tct.pro",
    siteName: "TCT Pro - Centre Automobile",
    locale: "fr_CA",
    type: "website",
    images: [
      {
        url: "https://tct.pro/HeroSection.jpg",
        width: 1200,
        height: 630,
        alt: "TCT Pro - Centre Automobile Montréal",
        type: "image/jpeg",
      },
      {
        url: "https://tct.pro/Logo.png",
        width: 800,
        height: 600,
        alt: "TCT Pro Logo",
        type: "image/png",
      },
    ],
    videos: [],
    audio: [],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tctpro",
    creator: "@tctpro",
    title: "TCT Pro - Centre Automobile Complet | Montréal",
    description:
      "Centre automobile offrant vente de véhicules d'occasion premium, service d'entretien, detailing et customisation. Plus de 50 véhicules en stock avec financement disponible.",
    images: [
      {
        url: "https://tct.pro/HeroSection.jpg",
        alt: "TCT Pro - Centre Automobile Montréal",
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "", // Add Google Search Console verification code when available
    yandex: "", // Add Yandex verification code when available
    yahoo: "", // Add Yahoo verification code when available
    other: {
      me: ["https://tct.pro", "mailto:info@tct.pro"],
    },
  },
  alternates: {
    canonical: "https://tct.pro",
    languages: {
      "fr-CA": "https://tct.pro",
      "en-CA": "https://tct.pro/en", // If English version is planned
    },
  },
  other: {
    "business:contact_data:street_address": "Montréal, QC",
    "business:contact_data:locality": "Montréal",
    "business:contact_data:region": "Québec",
    "business:contact_data:postal_code": "",
    "business:contact_data:country_name": "Canada",
    "business:contact_data:phone_number": "+1 (514) 494-3795",
    "business:contact_data:website": "https://tct.pro",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "TCT Pro - TIGERBEC CARS INC.",
    alternateName: "TCT Pro",
    description:
      "Centre automobile offrant vente de véhicules d'occasion premium, service d'entretien, detailing et customisation à Montréal",
    url: "https://tct.pro",
    logo: "https://tct.pro/Logo.png",
    image: ["https://tct.pro/HeroSection.jpg", "https://tct.pro/Logo.png"],
    telephone: "+1-514-494-3795",
    email: "info@tct.pro",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montréal",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "45.5017",
      longitude: "-73.5673",
    },
    openingHours: ["Mo-Fr 09:00-18:00", "Sa 09:00-17:00"],
    paymentAccepted: ["Cash", "Credit Card", "Financing"],
    currenciesAccepted: "CAD",
    priceRange: "$5,000 - $80,000",
    areaServed: {
      "@type": "Place",
      name: "Montréal, Quebec, Canada",
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "45.5017",
        longitude: "-73.5673",
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Véhicules d'occasion",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Car",
            name: "Véhicules d'occasion premium",
            description:
              "Large sélection de véhicules d'occasion inspectés et garantis",
          },
        },
      ],
    },
    makesOffer: [
      {
        "@type": "Offer",
        name: "Vente de véhicules d'occasion",
        description: "Vente de véhicules d'occasion premium avec garantie",
      },
      {
        "@type": "Offer",
        name: "Service d'entretien automobile",
        description:
          "Service d'entretien et réparation automobile professionnel",
      },
      {
        "@type": "Offer",
        name: "Detailing automobile",
        description:
          "Service de detailing et nettoyage automobile professionnel",
      },
      {
        "@type": "Offer",
        name: "Customisation automobile",
        description: "Service de customisation et modification de véhicules",
      },
      {
        "@type": "Offer",
        name: "Financement automobile",
        description:
          "Solutions de financement flexibles pour l'achat de véhicules",
      },
    ],
    sameAs: [
      "https://www.facebook.com/tctpro",
      "https://www.instagram.com/tctpro",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <html lang="fr-CA">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#f59e0b" />
        <meta name="msapplication-TileColor" content="#f59e0b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TCT Pro" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Preconnect */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Canonical Link */}
        <link rel="canonical" href="https://tct.pro" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModelProvider>{children}</ModelProvider>
      </body>
    </html>
  );
}
