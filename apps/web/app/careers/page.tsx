import React from "react";
import type { Metadata } from "next";
import { CareersPageClient } from "./CareersPageClient";
import { mockJobs, mapDbJobToJobListing } from "@/lib/careers-data";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 1800; // ISR: Revalidate every 30 minutes

const BASE = "https://adruvasolution.com";

export const metadata: Metadata = {
  title: "Careers & Open Positions | Engineering & AI Jobs | Adruva Solution",
  description:
    "Join the engineering, AI, and marketing team at Adruva Solution in Rishikesh, India. Explore open career opportunities, internships, and developer roles.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers & Open Positions | Engineering & AI Jobs | Adruva Solution",
    description:
      "Explore career opportunities, internships, and freelance projects in Web Dev, AI, Design, and SEO in Rishikesh, India.",
    type: "website",
    url: `${BASE}/careers`,
    images: [
      {
        url: `/og?title=${encodeURIComponent("Join Our Team")}&subtitle=${encodeURIComponent("Explore Careers & Internships at Adruva Solution")}&type=default`,
        width: 1200,
        height: 630,
        alt: "Careers at Adruva Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers & Open Positions | Engineering & AI Jobs | Adruva Solution",
    description:
      "Explore career opportunities in Web Dev, AI, Design, and SEO in Rishikesh, India.",
  },
};

async function getLiveJobs() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(
      `${apiUrl}/api/v1/careers?status=active&limit=100`,
      {
        next: { revalidate: 1800 },
      },
    );
    if (!res.ok) {
      return null;
    }
    const result = await res.json();
    if (result && result.success && Array.isArray(result.data)) {
      return result.data.map(mapDbJobToJobListing);
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch live jobs:", err);
    return null;
  }
}

export default async function CareersPage() {
  const liveJobs = await getLiveJobs();
  const jobs = liveJobs && liveJobs.length > 0 ? liveJobs : mockJobs;

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
        name: "Careers",
        item: `${BASE}/careers`,
      },
    ],
  };

  const careersListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Adruva Solution Job Openings",
    description:
      "Open job vacancies in web development, AI automation, graphic design, and technical SEO.",
    itemListElement: jobs.map((job: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "JobPosting",
        title: job.title,
        description: job.description || job.roleOverview,
        datePosted: job.postedDate || "2026-01-01",
        employmentType: job.type === "Full-time" ? "FULL_TIME" : "CONTRACTOR",
        hiringOrganization: {
          "@type": "Organization",
          name: "Adruva Solution",
          sameAs: BASE,
          logo: `${BASE}/logo.png`,
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Rishikesh",
            addressRegion: "Uttarakhand",
            addressCountry: "IN",
          },
        },
      },
    })),
  };

  return (
    <>
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={careersListSchema} />
      <CareersPageClient initialJobs={jobs} />
    </>
  );
}
