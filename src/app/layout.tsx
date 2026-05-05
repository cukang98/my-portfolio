import type { Metadata } from "next";

// styles
import "@/styles/globals.css";

import {
  GoogleTagManagerNoScript,
  GoogleTagManagerScript,
} from "@/components/analytics/GoogleTagManager";
import GtmPageview from "@/components/analytics/GtmPageview";
import { getSiteUrl, seo } from "@/data/seo";

const siteUrl = getSiteUrl();
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${seo.author}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: seo.author, url: siteUrl }],
  creator: seo.author,
  publisher: seo.author,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: seo.locale,
    url: siteUrl,
    siteName: `${seo.author} Portfolio`,
    title: seo.title,
    description: seo.description,
    firstName: "Cu Kang",
    lastName: "Tin",
    username: "cukang98",
    images: [
      {
        url: seo.image,
        width: 1200,
        height: 630,
        alt: `${seo.author} - React Frontend Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {GTM_ID && <GoogleTagManagerNoScript gtmId={GTM_ID} />}
        {GTM_ID && <GoogleTagManagerScript gtmId={GTM_ID} />}
        {GTM_ID && <GtmPageview />}
        {children}
      </body>
    </html>
  );
}
