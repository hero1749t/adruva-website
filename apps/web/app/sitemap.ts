import { MetadataRoute } from "next";
import { SERVICE_SLUGS } from "@/lib/services-data";
import { blogPosts } from "@/lib/blog-data";
import { projects } from "@/lib/work-data";
import { mockJobs } from "@/lib/careers-data";

export const revalidate = 3600; // Regenerate sitemap every hour

const BASE_URL = "https://adruvaSolution.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function getLiveBlogSlugs(): Promise<
  { slug: string; updatedAt?: string }[]
> {
  try {
    const res = await fetch(
      `${API_URL}/api/v1/blog?status=published&limit=500`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];
    const result = await res.json();
    if (result?.success && Array.isArray(result.data)) {
      return result.data.map(
        (p: { slug: string; updated_at?: string; updatedAt?: string }) => ({
          slug: p.slug,
          updatedAt: p.updated_at || p.updatedAt,
        }),
      );
    }
    return [];
  } catch {
    return [];
  }
}

async function getLiveProjectSlugs(): Promise<{ slug: string }[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1/projects?status=published`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const result = await res.json();
    if (result?.success && Array.isArray(result.data)) {
      return result.data.map((p: { slug: string }) => ({ slug: p.slug }));
    }
    return [];
  } catch {
    return [];
  }
}

async function getLiveCareerSlugs(): Promise<
  { slug: string; deadline?: string }[]
> {
  try {
    const res = await fetch(
      `${API_URL}/api/v1/careers?status=active&limit=200`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];
    const result = await res.json();
    if (result?.success && Array.isArray(result.data)) {
      return result.data.map(
        (j: { slug: string; application_deadline?: string }) => ({
          slug: j.slug,
          deadline: j.application_deadline,
        }),
      );
    }
    return [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Service pages (static slugs from lib — services rarely change)
  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Fetch live data in parallel with static fallbacks
  const [liveBlogSlugs, liveProjectSlugs, liveCareerSlugs] = await Promise.all([
    getLiveBlogSlugs(),
    getLiveProjectSlugs(),
    getLiveCareerSlugs(),
  ]);

  // Blog pages — prefer live data, fall back to static
  const blogSlugsToUse =
    liveBlogSlugs.length > 0
      ? liveBlogSlugs
      : blogPosts.map((p) => ({ slug: p.slug, updatedAt: p.publishedDate }));

  const blogPages: MetadataRoute.Sitemap = blogSlugsToUse.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Project pages — prefer live data, fall back to static
  const projectSlugsToUse =
    liveProjectSlugs.length > 0
      ? liveProjectSlugs
      : projects.map((p) => ({ slug: p.slug }));

  const projectPages: MetadataRoute.Sitemap = projectSlugsToUse.map((p) => ({
    url: `${BASE_URL}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Career pages — prefer live data, fall back to mock
  const careerSlugsToUse =
    liveCareerSlugs.length > 0
      ? liveCareerSlugs
      : mockJobs.map((j) => ({
          slug: j.slug,
          deadline: j.application_deadline,
        }));

  const careerPages: MetadataRoute.Sitemap = careerSlugsToUse.map((j) => ({
    url: `${BASE_URL}/careers/${j.slug}`,
    lastModified: j.deadline ? new Date(j.deadline) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...projectPages,
    ...careerPages,
  ];
}
