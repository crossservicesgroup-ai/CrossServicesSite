import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { Analytics } from "@/components/analytics/Analytics";
import "./globals.css";

/* Display face — h1 and h2 only. */
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
  variable: "--font-newsreader",
});

/* Body and UI. */
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
  variable: "--font-plex-sans",
});

/* Eyebrows, labels and tags. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: true,
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "One call handles your home or your building. Cleaning, grounds, repairs, property management and detailing across MetroWest Boston since 1989.",
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* suppressHydrationWarning applies to this element's own attributes only,
       not to anything nested inside it. Browser extensions commonly add
       attributes to <html> before React hydrates — a11y and dark-mode ones
       add data-js-focus-visible — which React would otherwise report as a
       mismatch on every page load. */
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only rounded-[2px] bg-cross-blue px-4 py-3 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="has-call-bar">
          {children}
        </main>
        <Footer />
        <StickyCallBar />
        <Analytics />
      </body>
    </html>
  );
}
