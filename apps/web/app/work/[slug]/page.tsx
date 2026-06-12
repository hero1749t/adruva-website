import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects, WORK_SLUGS } from '@/lib/work-data';
import { CaseStudyClient } from './CaseStudyClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const revalidate = 1800;

export function generateStaticParams() {
  return WORK_SLUGS.map((slug) => ({
    slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return {};
  }

  const ogTitle = `${project.title} | Case Studies`;
  const ogSubtitle = project.overview || '';
  const ogImageUrl = `/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}&type=work`;

  return {
    title: `${project.title} | Case Studies`,
    description: project.overview,
    alternates: {
      canonical: `/work/${params.slug}`,
    },
    openGraph: {
      title: `${project.title} | Case Studies`,
      description: project.overview,
      type: 'website',
      images: [ogImageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Case Studies`,
      description: project.overview,
      images: [ogImageUrl],
    },
  };
}

export default function CaseStudyDetailPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
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
        'name': 'Our Work',
        'item': 'https://adruvaSolution.com/work',
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': project.title,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <CaseStudyClient project={project} />
    </>
  );
}
