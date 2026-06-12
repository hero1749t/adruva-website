import { Metadata } from "next";
import { BlogPageClient } from "./BlogPageClient";
import { blogPosts, mapDbBlogToBlogPost } from "@/lib/blog-data";

export const revalidate = 300; // ISR: Revalidate every 5 minutes

export const metadata: Metadata = {
  title: "Blog & Resources",
  description:
    "Read the latest insights and resources on Web Development, AI Automation, Digital Ads, and growth strategies for service businesses from Adruva.",
  alternates: {
    canonical: "/blog",
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

  return <BlogPageClient initialPosts={posts} />;
}
