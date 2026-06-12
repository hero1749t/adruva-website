import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { mockJobs } from '@/lib/careers-data';
import { JobDetailClient } from './JobDetailClient';
import { JsonLd } from '@/components/seo/JsonLd';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return mockJobs.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = mockJobs.find((j) => j.slug === params.slug && j.status === 'active');
  
  if (!job) {
    return {
      title: 'Job Not Found',
    };
  }

  const typeLabel = job.type === 'full_time' ? 'Full-Time' : job.type === 'internship' ? 'Internship' : 'Freelance';
  const ogTitle = `${job.title} (${typeLabel}) | Careers`;
  const ogSubtitle = job.description || '';
  const ogImageUrl = `/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}&type=careers`;

  return {
    title: `${job.title} (${typeLabel}) | Careers`,
    description: `Apply for the ${job.title} (${typeLabel}) position at Adruva Solution in Dehradun. ${job.description}`,
    alternates: {
      canonical: `/careers/${params.slug}`,
    },
    openGraph: {
      title: `${job.title} | Careers`,
      description: job.description,
      type: 'website',
      images: [ogImageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} | Careers`,
      description: job.description,
      images: [ogImageUrl],
    },
  };
}

export default function JobDetailPage({ params }: Props) {
  const job = mockJobs.find((j) => j.slug === params.slug && j.status === 'active');
  
  if (!job) {
    notFound();
  }

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
        'name': 'Careers',
        'item': 'https://adruvaSolution.com/careers',
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': job.title,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JobDetailClient job={job} />
    </>
  );
}
