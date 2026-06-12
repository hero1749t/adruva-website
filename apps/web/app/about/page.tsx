import React from 'react';
import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'We are your business and productivity partner based in Dehradun, India. We empower businesses with cutting-edge technology and digital growth systems.',
  openGraph: {
    title: 'About Us',
    description: 'We are your business and productivity partner based in Dehradun, India. We empower businesses with cutting-edge technology and digital growth systems.',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
