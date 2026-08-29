import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { GrowthSystem } from "@/components/sections/GrowthSystem";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { WorkPreview } from "@/components/sections/WorkPreview";
import { ReviewsBadge } from "@/components/sections/ReviewsBadge";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { mapDbBlogToBlogPost } from "@/lib/blog-data";
import { mapDbProjectToProjectItem } from "@/lib/work-data";
import { mapDbServiceToServiceItem } from "@/lib/services-data";

async function getLiveBlogs() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${apiUrl}/api/v1/blog?status=published&limit=3`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const result = await res.json();
    if (result && result.success && Array.isArray(result.data)) {
      return result.data.map(mapDbBlogToBlogPost);
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch live blogs for homepage:", err);
    return null;
  }
}

async function getLiveProjects() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${apiUrl}/api/v1/projects?status=published`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;
    const result = await res.json();
    if (result && result.success && Array.isArray(result.data)) {
      const mapped = result.data.map(mapDbProjectToProjectItem);
      const featured = mapped.filter((p: any) => p.isFeatured);
      return featured.length >= 3 ? featured.slice(0, 3) : mapped.slice(0, 3);
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch live projects for homepage:", err);
    return null;
  }
}

async function getLiveServices() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${apiUrl}/api/v1/services`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const result = await res.json();
    if (result && result.success && Array.isArray(result.data)) {
      const mapped = result.data
        .filter((s: any) => s.isActive)
        .map(mapDbServiceToServiceItem);
      return mapped.slice(0, 6);
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch live services for homepage:", err);
    return null;
  }
}

export default async function Home() {
  const [liveBlogs, liveProjects, liveServices] = await Promise.all([
    getLiveBlogs(),
    getLiveProjects(),
    getLiveServices(),
  ]);

  const BASE = "https://adruvasolution.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: "Adruva Solution",
    url: BASE,
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/logo.png`,
      width: 200,
      height: 60,
    },
    description:
      "Full-service IT & digital growth agency based in Rishikesh, India — websites, mobile apps, AI automation, Google Ads, Meta Ads, and SEO.",
    foundingDate: "2021",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rishikesh",
      addressLocality: "Rishikesh",
      addressRegion: "Uttarakhand",
      postalCode: "249201",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "info@adruvasolution.com",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/p/Adruva-solution-61559775392656/",
      "https://www.instagram.com/adruvasolution/",
      "https://www.linkedin.com/company/adruva-solution",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE}/#localbusiness`,
    name: "Adruva Solution",
    url: BASE,
    image: `${BASE}/og-image.png`,
    description:
      "Web development, mobile apps, AI automation, digital marketing agency in Rishikesh, Uttarakhand, India.",
    telephone: "+91-XXXXXXXXXX",
    email: "info@adruvasolution.com",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rishikesh",
      addressLocality: "Rishikesh",
      addressRegion: "Uttarakhand",
      postalCode: "249201",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0869,
      longitude: 78.2676,
    },
    areaServed: [
      { "@type": "State", name: "Uttarakhand" },
      { "@type": "Country", name: "India" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    hasMap: "https://maps.google.com/?q=Rishikesh,Uttarakhand",
    sameAs: [
      "https://www.facebook.com/p/Adruva-solution-61559775392656/",
      "https://www.instagram.com/adruvasolution/",
      "https://www.linkedin.com/company/adruva-solution",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    name: "Adruva Solution",
    url: BASE,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="w-full flex flex-col">
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={localBusinessSchema} />
      <JsonLd schema={websiteSchema} />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Stats Strip */}
      <StatsStrip />

      {/* 3. Growth System (Methodology) */}
      <GrowthSystem />

      {/* 4. Client Logo Marquee */}
      <LogoMarquee />

      {/* 5. Services Preview */}
      <ServicesPreview initialServices={liveServices || undefined} />

      {/* 6. Who We Serve */}
      <WhoWeServe />

      {/* 7. Case Studies / Work Preview */}
      <WorkPreview initialProjects={liveProjects || undefined} />

      {/* 8. Google Reviews Badge */}
      <ReviewsBadge />

      {/* 9. Testimonials */}
      <TestimonialsSection />

      {/* 10. Blog Preview */}
      <BlogPreview initialPosts={liveBlogs || undefined} />

      {/* 11. Final CTA Section */}
      <CTASection />
    </div>
  );
}
