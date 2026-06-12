import React from 'react';
import type { Metadata } from 'next';
import { CareersPageClient } from './CareersPageClient';

export const metadata: Metadata = {
  title: 'Careers | Join Our Team',
  description: 'Join our team at Adruva Solution in Dehradun. Explore career opportunities, internships, and freelance projects in Web Dev, AI/ML, Design, and SEO.',
  openGraph: {
    title: 'Careers | Join Our Team',
    description: 'Join our team at Adruva Solution in Dehradun. Explore career opportunities, internships, and freelance projects in Web Dev, AI/ML, Design, and SEO.',
    type: 'website',
  },
};

export default function CareersPage() {
  return <CareersPageClient />;
}
