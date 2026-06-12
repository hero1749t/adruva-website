import React from "react";
import type { Metadata } from "next";
import { ServicesPageClient } from "./ServicesPageClient";
import { services, mapDbServiceToServiceItem } from "@/lib/services-data";

export const revalidate = 3600; // ISR: Revalidate every hour

export const metadata: Metadata = {
  title: "Our Services | Scale, Automate & Grow",
  description:
    "Explore our digital services including Web Development, Mobile Apps, AI Automation, Digital Marketing (Google Ads, Meta Ads, SEO), and UI/UX Design.",
  openGraph: {
    title: "Our Services | Scale, Automate & Grow",
    description:
      "Explore our digital services including Web Development, Mobile Apps, AI Automation, Digital Marketing (Google Ads, Meta Ads, SEO), and UI/UX Design.",
    type: "website",
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

  return <ServicesPageClient initialServices={list} />;
}
