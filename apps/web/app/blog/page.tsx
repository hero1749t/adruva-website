import { Metadata } from 'next';
import { BlogPageClient } from './BlogPageClient';

export const revalidate = 300; // ISR: Revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'Blog & Resources | Adruva Solution',
  description: 'Read the latest insights and resources on Web Development, AI Automation, Digital Ads, and growth strategies for service businesses from Adruva.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
