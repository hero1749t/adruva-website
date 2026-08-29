import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, mapDbBlogToBlogPost } from "@/lib/blog-data";
import { BlogPostClient } from "./BlogPostClient";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 300; // ISR: Revalidate every 5 minutes

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getLiveBlogPost(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${apiUrl}/api/v1/blog/${slug}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      return null;
    }
    const result = await res.json();
    if (result && result.success && result.data) {
      return mapDbBlogToBlogPost(result.data);
    }
    return null;
  } catch (err) {
    console.error(`Failed to fetch live blog post "${slug}":`, err);
    return null;
  }
}

// Generate static routes for all blog posts
export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${apiUrl}/api/v1/blog?status=published&limit=100`);
    if (res.ok) {
      const result = await res.json();
      if (result && result.success && Array.isArray(result.data)) {
        return result.data.map((post: any) => ({
          slug: post.slug,
        }));
      }
    }
  } catch (err) {
    console.error("Failed to generate static params for blogs:", err);
  }

  // Fallback to static mock slugs
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const livePost = await getLiveBlogPost(params.slug);
  const post = livePost || blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post was not found.",
    };
  }

  const ogTitle = post.title;
  const ogSubtitle = post.summary;
  const ogImageUrl = `/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}&type=blog`;

  return {
    title: `${post.title} | Blog`,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: `/blog/${post.slug}`,
      images: [ogImageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const livePost = await getLiveBlogPost(params.slug);
  const post = livePost || blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const BASE = "https://adruvasolution.com";
  const ogImageUrl = `/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.summary)}&type=blog`;
  const absoluteOgImage = `${BASE}${ogImageUrl}`;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${BASE}/blog/${post.slug}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.summary,
    image: {
      "@type": "ImageObject",
      url: absoluteOgImage,
      width: 1200,
      height: 630,
    },
    datePublished: post.publishedDate || new Date().toISOString(),
    dateModified: post.publishedDate || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: post.author?.name || "Adruva Team",
      url: `${BASE}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Adruva Solution",
      url: BASE,
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    url: `${BASE}/blog/${post.slug}`,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "Blog",
      name: "Adruva Solution Blog",
      url: `${BASE}/blog`,
    },
  };

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
        name: "Blog",
        item: `${BASE}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${BASE}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={blogSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <BlogPostClient post={post} />
    </>
  );
}
