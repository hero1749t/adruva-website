# Adruva Solution Website — SEO Implementation

> Full SEO spec. Read before implementing any SEO feature.

---

## 1. Metadata Per Page

```typescript
// app/layout.tsx — Default metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://adruvaSolution.com"),
  title: {
    default: "Adruva Solution | Your Business & Productivity Partner",
    template: "%s | Adruva Solution",
  },
  description:
    "IT company India — web apps, mobile apps, AI solutions, SEO, Google ads. The last tech partner you'll ever need.",
  keywords: [
    "web development company India",
    "AI automation company India",
    "digital marketing agency India",
    "IT company Dehradun",
    "affordable software development India",
  ],
  authors: [{ name: "Adruva Solution" }],
  creator: "Adruva Solution",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://adruvaSolution.com",
    siteName: "Adruva Solution",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@adruvaSolution",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};
```

### Page-Specific Metadata

| Page                      | Title                                                   | Description                                               |
| ------------------------- | ------------------------------------------------------- | --------------------------------------------------------- |
| Home                      | Adruva Solution \| Your Business & Productivity Partner | IT company India — web apps, mobile apps, AI solutions... |
| About                     | About Us \| Adruva Solution                             | Learn about Adruva Solution — our story, mission, team... |
| Services                  | Services \| Web Dev, AI, Marketing & More               | Full-spectrum digital services...                         |
| /services/web-development | Web Development Services \| Starting ₹15,000            | Custom websites & web applications...                     |
| Our Work                  | Our Work \| Case Studies                                | See how we've helped businesses grow...                   |
| Blog                      | Blog \| Tech Insights & Growth Tips                     | Articles on AI, web development, digital marketing...     |
| Contact                   | Contact Us \| Book a Free Call                          | Get in touch with Adruva Solution...                      |

---

## 2. Dynamic OG Images (Next.js Image Response)

```typescript
// app/og/route.tsx
import { ImageResponse } from 'next/og'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Adruva Solution'
  const subtitle = searchParams.get('subtitle') || 'Your Business & Productivity Partner'
  const type = searchParams.get('type') || 'default' // default | blog | service

  return new ImageResponse(
    (
      <div style={{
        background: '#0A0A0A',
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        padding: '60px',
      }}>
        {/* Adruva logo + orange accent */}
        {/* Title */}
        {/* Subtitle */}
        {/* Bottom: adruvaSolution.com */}
      </div>
    ),
    { width: 1200, height: 630 }
  )
}

// Usage in page metadata:
openGraph: {
  images: [`/og?title=${encodeURIComponent(title)}&type=blog`]
}
```

---

## 3. Schema Markup (JSON-LD)

### Organization Schema (Home Page)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Adruva Solution",
  "url": "https://adruvaSolution.com",
  "logo": "https://adruvaSolution.com/logo.png",
  "description": "Full-service IT & digital growth company",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dehradun",
    "addressRegion": "Uttarakhand",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "hello@adruvaSolution.com"
  },
  "sameAs": [
    "https://linkedin.com/company/adruva-solution",
    "https://instagram.com/adruvaSolution"
  ]
}
```

### Service Schema (Each Service Page)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Web Development",
  "provider": { "@type": "Organization", "name": "Adruva Solution" },
  "description": "Custom websites and web applications",
  "areaServed": "IN",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": "15000",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "priceType": "StartingPrice"
    }
  }
}
```

### BlogPosting Schema (Blog Posts)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[Post Title]",
  "image": "[OG Image URL]",
  "datePublished": "[ISO date]",
  "dateModified": "[ISO date]",
  "author": { "@type": "Person", "name": "[Author Name]" },
  "publisher": { "@type": "Organization", "name": "Adruva Solution" },
  "description": "[Meta description]"
}
```

### BreadcrumbList (All Inner Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://adruvaSolution.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://adruvaSolution.com/services"
    },
    { "@type": "ListItem", "position": 3, "name": "Web Development" }
  ]
}
```

---

## 4. Sitemap

```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://adruvaSolution.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${baseUrl}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/work`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Service pages
  const servicePages = SERVICE_SLUGS.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic blog posts (from API)
  const blogs = await fetchAllPublishedBlogs();
  const blogPages = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updated_at,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Dynamic case studies (from API)
  const projects = await fetchAllProjects();
  const projectPages = projects.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: p.updated_at,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...blogPages, ...projectPages];
}
```

---

## 5. Robots.txt

```typescript
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: "https://adruvaSolution.com/sitemap.xml",
  };
}
```

---

## 6. Canonical URLs

```typescript
// Every page must have canonical URL
// Next.js 14 handles this automatically via metadataBase
// But explicitly set for dynamic pages:

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    alternates: {
      canonical: `https://adruvaSolution.com/blog/${params.slug}`,
    },
  };
}
```

---

## 7. Target Keywords Per Page

| Page                      | Primary Keyword               | Secondary Keywords                                  |
| ------------------------- | ----------------------------- | --------------------------------------------------- |
| Home                      | web development company India | IT company Dehradun, digital agency India           |
| /services/web-development | web development company India | affordable web development, Next.js developer India |
| /services/ai-automation   | AI automation company India   | business automation India, AI solutions             |
| /services/google-ads      | Google Ads agency India       | PPC management India, Google Ads Dehradun           |
| /services/seo             | SEO company India             | SEO services Dehradun, digital marketing India      |
| Blog posts                | Long-tail keywords per topic  | Related LSI keywords                                |
