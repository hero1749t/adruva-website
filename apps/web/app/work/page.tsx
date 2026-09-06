import React from "react";
import type { Metadata } from "next";
import { WorkPageClient } from "./WorkPageClient";
import { projects, mapDbProjectToProjectItem } from "@/lib/work-data";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 1800; // ISR: Revalidate every 30 minutes

const BASE = "https://adruvasolution.com";

export const metadata: Metadata = {
  title:
    "Case Studies & Client Portfolio | Web & Software Engineering | Adruva Solution",
  description:
    "Explore verified client case studies and digital transformation projects by Adruva Solution. High-speed Next.js web applications, headless booking engines, custom CRMs, and high-ROI ad campaigns.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title:
      "Case Studies & Client Portfolio | Web & Software Engineering | Adruva Solution",
    description:
      "Explore verified client case studies and digital transformation projects by Adruva Solution. High-speed Next.js web applications, headless booking engines, custom CRMs, and high-ROI ad campaigns.",
    type: "website",
    url: `${BASE}/work`,
    images: [
      {
        url: `/og?title=${encodeURIComponent("Client Case Studies & Portfolio")}&subtitle=${encodeURIComponent("Custom Web Development, AI Automation & Scalable Systems")}&type=work`,
        width: 1200,
        height: 630,
        alt: "Adruva Solution Client Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Case Studies & Client Portfolio | Web & Software Engineering | Adruva Solution",
    description:
      "Explore verified client case studies: high-speed web apps, headless booking engines, and custom AI systems.",
  },
};

async function getLiveProjects() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${apiUrl}/api/v1/projects?status=published`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) {
      return null;
    }
    const result = await res.json();
    if (result && result.success && Array.isArray(result.data)) {
      return result.data.map(mapDbProjectToProjectItem);
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch live projects:", err);
    return null;
  }
}

export default async function WorkPage() {
  const liveProjects = await getLiveProjects();
  const list =
    liveProjects && liveProjects.length > 0 ? liveProjects : projects;

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
        name: "Our Work",
        item: `${BASE}/work`,
      },
    ],
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Adruva Solution Case Studies & Portfolio",
    description:
      "Verified engineering and digital growth case studies for local businesses and global brands.",
    url: `${BASE}/work`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: list.map((project: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.overview || project.problem,
          url: `${BASE}/work/${project.slug}`,
          creator: {
            "@type": "Organization",
            name: "Adruva Solution",
            url: BASE,
          },
        },
      })),
    },
  };

  return (
    <>
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={portfolioSchema} />
      <WorkPageClient initialProjects={list} />
    </>
  );
}
