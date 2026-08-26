import React from "react";
import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const revalidate = 3600; // ISR: Revalidate every hour

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We are your business and productivity partner based in Rishikesh, India. We empower businesses with cutting-edge technology and digital growth systems.",
  openGraph: {
    title: "About Us",
    description:
      "We are your business and productivity partner based in Rishikesh, India. We empower businesses with cutting-edge technology and digital growth systems.",
    type: "website",
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
  return <AboutPageClient initialTeam={liveTeam} />;
}
