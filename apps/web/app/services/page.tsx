import React from 'react';
import type { Metadata } from 'next';
import { ServicesPageClient } from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Our Services | Scale, Automate & Grow | Adruva Solution',
  description: 'Explore our digital services including Web Development, Mobile Apps, AI Automation, Digital Marketing (Google Ads, Meta Ads, SEO), and UI/UX Design.',
  openGraph: {
    title: 'Our Services | Scale, Automate & Grow | Adruva Solution',
    description: 'Explore our digital services including Web Development, Mobile Apps, AI Automation, Digital Marketing (Google Ads, Meta Ads, SEO), and UI/UX Design.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
