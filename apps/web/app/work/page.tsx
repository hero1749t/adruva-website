import React from "react";
import type { Metadata } from "next";
import { WorkPageClient } from "./WorkPageClient";
import { projects, mapDbProjectToProjectItem } from "@/lib/work-data";

export const revalidate = 1800; // ISR: Revalidate every 30 minutes

export const metadata: Metadata = {
  title: "Our Work | Case Studies",
  description:
    "Explore our digital projects, software builds, AI automations, digital marketing, and design case studies that help local businesses scale.",
  openGraph: {
    title: "Our Work | Case Studies",
    description:
      "Explore our digital projects, software builds, AI automations, digital marketing, and design case studies that help local businesses scale.",
    type: "website",
  },
  alternates: {
    canonical: "/work",
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

  return <WorkPageClient initialProjects={list} />;
}
