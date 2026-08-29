import React from "react";
import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const revalidate = 3600; // ISR: Revalidate every hour

export const metadata: Metadata = {
  title: "About Us | Adruva Solution — IT & Digital Growth Agency, Rishikesh",
  description:
    "Meet the team behind Adruva Solution — a full-service IT & digital growth agency based in Rishikesh, Uttarakhand, India. We empower businesses with cutting-edge technology, AI automation, and digital marketing systems.",
  openGraph: {
    title: "About Adruva Solution | IT & Digital Agency, Rishikesh",
    description:
      "Meet the team behind Adruva Solution — web development, AI automation & digital marketing experts based in Rishikesh, India.",
    type: "website",
    url: "https://adruvasolution.com/about",
    images: [
      {
        url: `/og?title=${encodeURIComponent("About Adruva Solution")}&subtitle=${encodeURIComponent("IT & Digital Growth Agency — Rishikesh, India")}&type=default`,
        width: 1200,
        height: 630,
        alt: "About Adruva Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Adruva Solution | IT & Digital Agency, Rishikesh",
    description:
      "Web development, AI automation & digital marketing experts based in Rishikesh, India.",
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
