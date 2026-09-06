import React from "react";
import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 3600; // ISR: Revalidate every hour

const BASE = "https://adruvasolution.com";

export const metadata: Metadata = {
  title: "About Us | Adruva Solution — Web & AI Development Agency, Rishikesh",
  description:
    "Meet the engineering and growth team at Adruva Solution. We deliver robust custom software, high-performance web development, and custom AI integrations from Rishikesh, Uttarakhand, India.",
  openGraph: {
    title: "About Adruva Solution | IT & AI Agency, Rishikesh",
    description:
      "Meet the engineering and growth team at Adruva Solution — web development, AI automation & digital marketing experts based in Rishikesh, India.",
    type: "website",
    url: `${BASE}/about`,
    images: [
      {
        url: `/og?title=${encodeURIComponent("About Adruva Solution")}&subtitle=${encodeURIComponent("IT & Digital Growth Agency — Rishikesh, India")}&type=default`,
        width: 1200,
        height: 630,
        alt: "About Adruva Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Adruva Solution | IT & AI Agency, Rishikesh",
    description:
      "Web development, AI automation & digital marketing experts based in Rishikesh, India.",
  },
  alternates: {
    canonical: "/about",
  },
};

async function getLiveTeam() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${apiUrl}/api/v1/team`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return null;
    }
    const result = await res.json();
    if (result && result.success && Array.isArray(result.data)) {
      return result.data;
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch live team:", err);
    return null;
  }
}

export default async function AboutPage() {
  const liveTeam = await getLiveTeam();

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
        name: "About Us",
        item: `${BASE}/about`,
      },
    ],
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Adruva Solution",
    description:
      "Company overview, mission, core values, and leadership team of Adruva Solution.",
    url: `${BASE}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "Adruva Solution",
      url: BASE,
      logo: `${BASE}/logo.png`,
      foundingLocation: {
        "@type": "Place",
        name: "Rishikesh, Uttarakhand, India",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shanti Nagar, Dhalwala",
        addressLocality: "Rishikesh",
        addressRegion: "Uttarakhand",
        postalCode: "249137",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={aboutSchema} />
      <AboutPageClient initialTeam={liveTeam} />
    </>
  );
}
