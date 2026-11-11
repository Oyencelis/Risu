import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Chrome } from "@/components/layout/Chrome";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

// Display grotesque loaded locally with display: 'swap' to prevent layout shifts (CLS).
const display = localFont({
  src: "../assets/fonts/BricolageGrotesque-Bold.ttf",
  variable: "--font-bricolage",
  display: "swap",
  weight: "700",
});

// Italic serif for single emphasised words.
const serif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

// Body sans, kept quiet.
const body = Inter_Tight({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// Labels, numbers and metadata.
const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

// Vercel sets VERCEL_PROJECT_PRODUCTION_URL, so no extra configuration is needed.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.seo.title,
    template: `%s | ${site.brand}`,
  },
  description: site.seo.description,
  applicationName: `${site.brand} — ${site.edition}`,
  authors: [{ name: site.fullName }],
  creator: site.fullName,
  publisher: site.fullName,
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
  openGraph: {
    type: "website",
    siteName: `${site.brand} — ${site.edition}`,
    title: site.seo.title,
    description: site.seo.description,
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.brand} — ${site.edition}. ${site.role}.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    creator: `@${site.brand.toLowerCase()}`,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${body.variable} ${code.variable} antialiased`}
    >
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {/* Fixed stage behind every page: aurora light and fine grain. */}
        <div aria-hidden="true" className="aurora fixed inset-0 -z-10" />
        <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 -z-10" />

        <a href="#main" className="skip-link mono">
          Skip to content
        </a>
        <SmoothScroll />
        <Chrome />
        <main id="main">{children}</main>
        {/* Visitor counts. Only active on Vercel, once Analytics is enabled there. */}
        <Analytics />
      </body>
    </html>
  );
}
