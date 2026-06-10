import { MetadataRoute } from 'next';
import { SERVICE_SLUGS } from '@/lib/services-data';
import { blogPosts } from '@/lib/blog-data';
import { projects } from '@/lib/work-data';
import { mockJobs } from '@/lib/careers-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://adruvaSolution.com';

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  // Service pages
  const servicePages = SERVICE_SLUGS.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog pages
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Project pages
  const projectPages = projects.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Career pages
  const careerPages = mockJobs.map((j) => ({
    url: `${baseUrl}/careers/${j.slug}`,
    lastModified: new Date(j.application_deadline),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...blogPages, ...projectPages, ...careerPages];
}
