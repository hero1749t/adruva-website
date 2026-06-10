import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { GrowthSystem } from '@/components/sections/GrowthSystem';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { WhoWeServe } from '@/components/sections/WhoWeServe';
import { WorkPreview } from '@/components/sections/WorkPreview';
import { ReviewsBadge } from '@/components/sections/ReviewsBadge';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';

export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Adruva Solution',
    'url': 'https://adruvaSolution.com',
    'logo': 'https://adruvaSolution.com/logo.png',
    'description': 'Full-service IT & digital growth company',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Dehradun',
      'addressRegion': 'Uttarakhand',
      'addressCountry': 'IN',
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'email': 'hello@adruvaSolution.com',
    },
    'sameAs': [
      'https://linkedin.com/company/adruva-solution',
      'https://instagram.com/adruvaSolution',
    ],
  };

  return (
    <div className="w-full flex flex-col">
      <JsonLd schema={schema} />
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Stats Strip */}
      <StatsStrip />

      {/* 3. Growth System (Methodology) */}
      <GrowthSystem />

      {/* 4. Client Logo Marquee */}
      <LogoMarquee />

      {/* 5. Services Preview */}
      <ServicesPreview />

      {/* 6. Who We Serve */}
      <WhoWeServe />

      {/* 7. Case Studies / Work Preview */}
      <WorkPreview />

      {/* 8. Google Reviews Badge */}
      <ReviewsBadge />

      {/* 9. Testimonials */}
      <TestimonialsSection />

      {/* 10. Blog Preview */}
      <BlogPreview />

      {/* 11. Final CTA Section */}
      <CTASection />
    </div>
  );
}
