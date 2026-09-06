import { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";
import { JsonLd } from "@/components/seo/JsonLd";

const BASE = "https://adruvasolution.com";

export const metadata: Metadata = {
  title:
    "Contact Us | Free Strategy Consultation & Project Booking | Adruva Solution",
  description:
    "Have a project in mind? Book a free 30-minute discovery call with Adruva Solution. Custom web development, mobile apps, AI automation, and ROI-driven marketing from Rishikesh, India.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Adruva Solution | Free Strategy Consultation",
    description:
      "Book a free 30-minute discovery call. We specialise in websites, apps, AI automation & digital marketing — Rishikesh, India.",
    type: "website",
    url: `${BASE}/contact`,
    images: [
      {
        url: `/og?title=${encodeURIComponent("Talk to Adruva Solution")}&subtitle=${encodeURIComponent("Book a free strategy call — Web, Apps, AI, Ads & SEO")}&type=default`,
        width: 1200,
        height: 630,
        alt: "Contact Adruva Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Adruva Solution | Free Strategy Consultation",
    description:
      "Book a free strategy call — Web, Apps, AI Automation & Digital Marketing. Rishikesh, India.",
  },
};

const breadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact Us",
      item: `${BASE}/contact`,
    },
  ],
};

const contactLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Adruva Solution",
  url: BASE,
  telephone: "+91-91492-76799",
  email: "info@adruvasolution.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shanti Nagar, Dhalwala",
    addressLocality: "Rishikesh",
    addressRegion: "Uttarakhand",
    postalCode: "249137",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@adruvasolution.com",
    availableLanguage: ["English", "Hindi"],
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={contactLocalBusinessSchema} />
      <ContactPageClient />
    </>
  );
}
