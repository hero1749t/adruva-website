import React from "react";
import type { Metadata } from "next";
import { ServicesPageClient } from "./ServicesPageClient";
import { services, mapDbServiceToServiceItem } from "@/lib/services-data";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 3600; // ISR: Revalidate every hour

const BASE = "https://adruvasolution.com";

export const metadata: Metadata = {
  title:
    "Web Development, Mobile Apps & AI Automation Services | Adruva Solution",
  description:
    "Explore full-suite digital engineering services by Adruva Solution: custom Next.js web development, mobile apps, SaaS systems, AI automation workflows, Google & Meta Ads, and technical SEO.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title:
      "Web Development, Mobile Apps & AI Automation Services | Adruva Solution",
    description:
      "Explore full-suite digital engineering services by Adruva Solution: custom Next.js web development, mobile apps, SaaS systems, AI automation workflows, Google & Meta Ads, and technical SEO.",
    type: "website",
    url: `${BASE}/services`,
    images: [
      {
        url: `/og?title=${encodeURIComponent("Our Engineering & Growth Services")}&subtitle=${encodeURIComponent("Web Development, Mobile Apps, AI Automation & Digital Marketing")}&type=service`,
        width: 1200,
        height: 630,
        alt: "Adruva Solution Digital Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Web Development, Mobile Apps & AI Automation Services | Adruva Solution",
    description:
      "Custom Next.js web development, mobile apps, AI automation workflows, Google & Meta Ads, and technical SEO.",
  },
};

async function getLiveServices() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${apiUrl}/api/v1/services`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return null;
    }
    const result = await res.json();
    if (result && result.success && Array.isArray(result.data)) {
      return result.data.map(mapDbServiceToServiceItem);
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch live services:", err);
    return null;
  }
}

export default async function ServicesPage() {
  const liveServices = await getLiveServices();
  const list =
    liveServices && liveServices.length > 0 ? liveServices : services;

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
        name: "Services",
        item: `${BASE}/services`,
      },
    ],
  };

  const servicesCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Adruva Solution Services Catalog",
    description:
      "Full suite of IT, software development, AI automation, and digital marketing services.",
    itemListElement: list.map((service: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: `${BASE}/services/${service.slug}`,
        provider: {
          "@type": "Organization",
          name: "Adruva Solution",
          url: BASE,
        },
      },
    })),
  };

  return (
    <>
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={servicesCatalogSchema} />
      <ServicesPageClient initialServices={list} />
    </>
  );
}
