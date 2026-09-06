import { Metadata } from "next";
import { BlogPageClient } from "./BlogPageClient";
import { blogPosts, mapDbBlogToBlogPost } from "@/lib/blog-data";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 300; // ISR: Revalidate every 5 minutes

const BASE = "https://adruvasolution.com";

export const metadata: Metadata = {
  title: "Tech Insights, Web Development & AI Growth Blog | Adruva Solution",
  description:
    "Read in-depth engineering guides, technical SEO tutorials, AI automation case studies, and digital marketing insights published by the Adruva Solution team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Tech Insights, Web Development & AI Growth Blog | Adruva Solution",
    description:
      "Read in-depth engineering guides, technical SEO tutorials, AI automation case studies, and digital marketing insights published by the Adruva Solution team.",
    type: "website",
    url: `${BASE}/blog`,
    images: [
      {
        url: `/og?title=${encodeURIComponent("Engineering & AI Insights Blog")}&subtitle=${encodeURIComponent("Tutorials, Architecture Guides & Marketing Strategies")}&type=blog`,
        width: 1200,
        height: 630,
        alt: "Adruva Solution Insights & Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Insights, Web Development & AI Growth Blog | Adruva Solution",
    description:
      "Engineering guides, technical SEO tutorials, AI automation case studies, and digital growth strategies.",
  },
};

async function getLiveBlogs() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(
      `${apiUrl}/api/v1/blog?status=published&limit=100`,
      {
        next: { revalidate: 300 },
      },
    );
    if (!res.ok) {
      return null;
    }
    const result = await res.json();
    if (result && result.success && Array.isArray(result.data)) {
      return result.data.map(mapDbBlogToBlogPost);
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch live blogs:", err);
    return null;
  }
}

export default async function BlogPage() {
  const livePosts = await getLiveBlogs();
  const posts = livePosts && livePosts.length > 0 ? livePosts : blogPosts;

  const breadcrumbsSchema = {
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
        name: "Blog",
        item: `${BASE}/blog`,
      },
    ],
  };

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Adruva Solution Tech & Growth Insights",
    description:
      "Insights, guides, and tutorials on modern web development, headless CMS architectures, AI workflows, and digital marketing.",
    url: `${BASE}/blog`,
    blogPost: posts.map((post: any) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.summary,
      url: `${BASE}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author?.name || "Adruva Team",
      },
    })),
  };

  return (
    <>
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={blogListSchema} />
      <BlogPageClient initialPosts={posts} />
    </>
  );
}
