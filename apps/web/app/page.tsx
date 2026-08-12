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

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Adruva Solution",
    url: "https://adruvasolution.com",
    logo: "https://adruvasolution.com/logo.png",
    description: "Full-service IT & digital growth company",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dehradun",
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@adruvaSolution.com",
    },
    sameAs: [
      "https://www.facebook.com/p/Adruva-solution-61559775392656/",
      "https://www.instagram.com/adruvasolution/",
      "https://www.linkedin.com/company/adruva-solution",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Adruva Solution",
    url: "https://adruvasolution.com",
  };

  return (
    <div className="w-full flex flex-col">
      <JsonLd schema={schema} />
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
