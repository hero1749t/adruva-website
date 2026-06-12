import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-data';
import { BlogPostClient } from './BlogPostClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const revalidate = 300; // ISR: Revalidate every 5 minutes

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static routes for all mock blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post was not found.',
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
      type: 'article',
      url: `/blog/${post.slug}`,
      images: [ogImageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [ogImageUrl],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const ogImageUrl = `/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.summary)}&type=blog`;

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'image': ogImageUrl || '/logo.png',
    'datePublished': post.publishedDate || new Date().toISOString(),
    'dateModified': post.publishedDate || new Date().toISOString(),
    'author': { '@type': 'Person', 'name': post.author.name || 'Adruva Team' },
    'publisher': { '@type': 'Organization', 'name': 'Adruva Solution' },
    'description': post.summary,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://adruvaSolution.com',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog',
        'item': 'https://adruvaSolution.com/blog',
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': post.title,
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
