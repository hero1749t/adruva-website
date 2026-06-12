import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { mockJobs, mapDbJobToJobListing } from "@/lib/careers-data";
import { JobDetailClient } from "./JobDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 1800; // ISR: Revalidate every 30 minutes

async function getJob(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${apiUrl}/api/v1/careers/${slug}`, {
      next: { revalidate: 1800 },
    });
    if (res.ok) {
      const result = await res.json();
      if (result && result.success && result.data) {
        return mapDbJobToJobListing(result.data);
      }
    }
  } catch (err) {
    console.error(`Failed to fetch job slug ${slug}:`, err);
  }
  // Fallback to mockJobs
  return mockJobs.find((j) => j.slug === slug && j.status === "active") || null;
}

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${apiUrl}/api/v1/careers?status=active&limit=100`);
    if (res.ok) {
      const result = await res.json();
      if (result && result.success && Array.isArray(result.data)) {
        return result.data.map((job: any) => ({
          slug: job.slug,
        }));
      }
    }
  } catch (err) {
    console.error("Failed to generate static params for careers:", err);
  }
  return mockJobs.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJob(params.slug);

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  const typeLabel =
    job.type === "full_time"
      ? "Full-Time"
      : job.type === "internship"
        ? "Internship"
        : "Freelance";
  const ogTitle = `${job.title} (${typeLabel}) | Careers`;
  const ogSubtitle = job.description || "";
  const ogImageUrl = `/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}&type=careers`;

  return {
    title: `${job.title} (${typeLabel}) | Careers`,
    description: `Apply for the ${job.title} (${typeLabel}) position at Adruva Solution in Dehradun. ${job.description}`,
    alternates: {
      canonical: `/careers/${params.slug}`,
    },
    openGraph: {
      title: `${job.title} | Careers`,
      description: job.description,
      type: "website",
      images: [ogImageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} | Careers`,
      description: job.description,
      images: [ogImageUrl],
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const job = await getJob(params.slug);

  if (!job) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://adruvaSolution.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Careers",
        item: "https://adruvaSolution.com/careers",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: job.title,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JobDetailClient job={job} />
    </>
  );
}
