import React from "react";
import type { Metadata } from "next";
import { CareersPageClient } from "./CareersPageClient";
import { mockJobs, mapDbJobToJobListing } from "@/lib/careers-data";

export const revalidate = 1800; // ISR: Revalidate every 30 minutes

export const metadata: Metadata = {
  title: "Careers | Join Our Team",
  description:
    "Join our team at Adruva Solution in Dehradun. Explore career opportunities, internships, and freelance projects in Web Dev, AI/ML, Design, and SEO.",
  openGraph: {
    title: "Careers | Join Our Team",
    description:
      "Join our team at Adruva Solution in Dehradun. Explore career opportunities, internships, and freelance projects in Web Dev, AI/ML, Design, and SEO.",
    type: "website",
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

  return <CareersPageClient initialJobs={jobs} />;
}
