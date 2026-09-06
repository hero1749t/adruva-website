import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, mapDbProjectToProjectItem } from "@/lib/work-data";
import { CaseStudyClient } from "./CaseStudyClient";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 1800; // ISR: Revalidate every 30 minutes

interface PageProps {
  params: {
    slug: string;
  };
}

async function getLiveProject(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${apiUrl}/api/v1/projects/${slug}`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) {
      return null;
    }
    const result = await res.json();
    if (result && result.success && result.data) {
      return mapDbProjectToProjectItem(result.data);
    }
    return null;
  } catch (err) {
    console.error(`Failed to fetch live project "${slug}":`, err);
    return null;
  }
}

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${apiUrl}/api/v1/projects?status=published`);
    if (res.ok) {
      const result = await res.json();
      if (result && result.success && Array.isArray(result.data)) {
        return result.data.map((post: any) => ({
          slug: post.slug,
        }));
      }
    }
  } catch (err) {
    console.error("Failed to generate static params for projects:", err);
  }

  // Fallback to static mock slugs
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const liveProject = await getLiveProject(params.slug);
  const project = liveProject || projects.find((p) => p.slug === params.slug);
  if (!project) {
    return {};
  }

  const ogTitle = `${project.title} Case Study | Adruva Solution`;
  const ogSubtitle = project.overview || "";
  const ogImageUrl = `/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}&type=work`;

  return {
    title: `${project.title} | Case Study & Results | Adruva Solution`,
    description: project.overview,
    alternates: {
      canonical: `/work/${params.slug}`,
    },
    openGraph: {
      title: `${project.title} | Case Study & Results | Adruva Solution`,
      description: project.overview,
      type: "website",
      images: [ogImageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study & Results | Adruva Solution`,
      description: project.overview,
      images: [ogImageUrl],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const liveProject = await getLiveProject(params.slug);
  const project = liveProject || projects.find((p) => p.slug === params.slug);
  if (!project) {
    notFound();
  }

  const BASE = "https://adruvasolution.com";

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${BASE}/work/${project.slug}#casestudy`,
    name: project.title,
    description: project.overview,
    url: `${BASE}/work/${project.slug}`,
    image: project.gallery?.[0]
      ? `${BASE}${project.gallery[0]}`
      : `${BASE}/og-image.png`,
    creator: {
      "@type": "Organization",
      name: "Adruva Solution",
      url: BASE,
    },
    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
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
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${BASE}/work/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={caseStudySchema} />
      <JsonLd schema={breadcrumbSchema} />
      <CaseStudyClient project={project} />
    </>
  );
}
