import React from 'react';
import type { Metadata } from 'next';
import { WorkPageClient } from './WorkPageClient';

export const metadata: Metadata = {
  title: 'Our Work | Case Studies | Adruva Solution',
  description: 'Explore our digital projects, software builds, AI automations, digital marketing, and design case studies that help local businesses scale.',
  openGraph: {
    title: 'Our Work | Case Studies | Adruva Solution',
    description: 'Explore our digital projects, software builds, AI automations, digital marketing, and design case studies that help local businesses scale.',
    type: 'website',
  },
};

export default function WorkPage() {
  return <WorkPageClient />;
}
