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
    description: `Apply for the ${job.title} (${typeLabel}) position at Adruva Solution in Rishikesh, Uttarakhand. ${job.description}`,
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

  const BASE = "https://adruvasolution.com";

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
        name: "Careers",
        item: `${BASE}/careers`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: job.title,
        item: `${BASE}/careers/${job.slug}`,
      },
    ],
  };

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description || "Join our team at Adruva Solution.",
    datePosted: new Date().toISOString().split("T")[0],
    validThrough: job.application_deadline
      ? new Date(job.application_deadline).toISOString().split("T")[0]
      : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 90 days default
    employmentType:
      job.type === "full_time"
        ? "FULL_TIME"
        : job.type === "internship"
          ? "INTERN"
          : "CONTRACTOR",
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
    jobLocationType: job.location_type === "remote" ? "TELECOMMUTE" : undefined,
    baseSalary: job.salary_min
      ? {
          "@type": "MonetaryAmount",
          currency: "INR",
          value: {
            "@type": "QuantitativeValue",
            minValue: job.salary_min,
            maxValue: job.salary_max || job.salary_min,
            unitText: "MONTH",
          },
        }
      : undefined,
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={jobPostingSchema} />
      <JobDetailClient job={job} />
    </>
  );
}
