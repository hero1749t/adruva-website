import type { Metadata } from "next";
import { Poppins, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";
import { PageTransition } from "@/components/layout/PageTransition";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { DynamicBackground } from "@/components/ui/DynamicBackground";
import { GoogleAnalytics } from "@next/third-parties/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adruvasolution.com"),
  title: {
    default:
      "Adruva Solution | Web Development, AI Automation & Digital Marketing Agency in India",
    template: "%s | Adruva Solution",
  },
  description:
    "Adruva Solution — Full-service IT & digital growth agency based in Rishikesh, India. We build high-converting websites, mobile apps, AI automation systems, run Google & Meta Ads, and drive SEO results for local businesses and growing brands.",
  applicationName: "Adruva Solution",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "web development company India",
    "web development company Rishikesh",
    "AI automation company India",
    "digital marketing agency Rishikesh",
    "digital marketing agency Uttarakhand",
    "IT company Rishikesh",
    "mobile app development India",
    "Google Ads agency India",
    "SEO agency India",
    "affordable software development India",
    "adruva solution",
    "adruvasolution.com",
  ],
  authors: [{ name: "Adruva Solution", url: "https://adruvasolution.com" }],
  creator: "Adruva Solution",
  publisher: "Adruva Solution",
  category: "technology",
  classification: "IT & Digital Services",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://adruvasolution.com",
    siteName: "Adruva Solution",
    title:
      "Adruva Solution | Web Development, AI Automation & Digital Marketing",
    description:
      "Full-service IT & digital growth agency in Rishikesh, India. Websites, mobile apps, AI automation, Google Ads, Meta Ads, and SEO.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Adruva Solution | Web Development, AI Automation & Digital Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@adruvaSolution",
    creator: "@adruvaSolution",
    title:
      "Adruva Solution | Web Development, AI Automation & Digital Marketing",
    description:
      "Full-service IT & digital growth agency in Rishikesh, India. Websites, apps, AI automation, Google Ads & SEO.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300 relative">
            {/* Premium tech-grid plus pattern overlay (only visible in light mode) */}
            <div className="absolute inset-0 bg-grid-plus-dots pointer-events-none z-0 opacity-70 dark:hidden" />

            <CursorGlow />
            <DynamicBackground />
            <PublicLayoutWrapper>
              <PageTransition>{children}</PageTransition>
            </PublicLayoutWrapper>
          </div>
        </Providers>
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX"}
        />
      </body>
    </html>
  );
}
