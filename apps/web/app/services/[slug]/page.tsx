import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { services, SERVICE_SLUGS } from '@/lib/services-data';
import { ServicePageClient } from './ServicePageClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const revalidate = 3600;

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({
    slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) {
    return {};
  }

  const ogTitle = `${service.name} | Services`;
  const ogSubtitle = service.tagline || service.description || '';
  const ogImageUrl = `/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}&type=service`;

  return {
    title: `${service.name} | Services`,
    description: `${service.description} ${service.tagline || ''}`,
    alternates: {
      canonical: `/services/${params.slug}`,
    },
    openGraph: {
      title: `${service.name} | Services`,
      description: service.description || '',
      type: 'website',
      images: [ogImageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.name} | Services`,
      description: service.description || '',
      images: [ogImageUrl],
    },
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) {
    notFound();
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.name,
    'provider': { '@type': 'Organization', 'name': 'Adruva Solution' },
    'description': service.description,
    'areaServed': 'IN',
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': service.price ? service.price.replace(/[^\d]/g, '') : '15000',
      'priceSpecification': {
        '@type': 'UnitPriceSpecification',
        'priceType': 'StartingPrice',
      },
    },
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
        'name': 'Services',
        'item': 'https://adruvaSolution.com/services',
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': service.name,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <ServicePageClient service={service} />
    </>
  );
}
