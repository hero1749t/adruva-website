# Adruva Solution Website — Technical Requirements Document (TRD)

> How the system is built. Architecture decisions, patterns, dependencies.

---

## 1. Architecture Overview

```
Visitor Browser
      │
      └── Next.js 14 Frontend (Vercel)
                │
                ├── /app/(public)/      ← SSG/ISR public pages
                ├── /app/(admin)/       ← SSR admin panel (NextAuth protected)
                └── /app/(auth)/        ← Login page
                          │
                          └── NestJS API (Railway, port 3001)
                                    │
                                    ├── Prisma ORM
                                    ├── PostgreSQL (Railway)
                                    ├── Cloudinary (images)
                                    ├── Gmail SMTP (email)
                                    ├── Meta WhatsApp API
                                    └── AdruvaCRM Webhook
```

---

## 2. Rendering Strategy

| Page             | Strategy | Revalidate     |
| ---------------- | -------- | -------------- |
| Home             | ISR      | 3600s (1 hour) |
| About            | SSG      | —              |
| Services Listing | SSG      | —              |
| Service Detail   | ISR      | 3600s          |
| Our Work         | ISR      | 1800s          |
| Case Study       | ISR      | 1800s          |
| Blog Listing     | ISR      | 300s (5 min)   |
| Blog Post        | ISR      | 300s           |
| Contact          | SSG      | —              |
| Careers          | ISR      | 1800s          |
| Job Detail       | ISR      | 1800s          |
| Legal Pages      | SSG      | —              |
| Admin Pages      | SSR      | Always fresh   |

---

## 3. Frontend Stack

### Dependencies

```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "@shadcn/ui": "latest",
  "framer-motion": "11.x",
  "react-hook-form": "7.x",
  "zod": "3.x",
  "@hookform/resolvers": "3.x",
  "@tanstack/react-query": "5.x",
  "next-themes": "0.3.x",
  "next-auth": "4.x",
  "react-google-recaptcha-v3": "latest",
  "@tiptap/react": "2.x",
  "@tiptap/starter-kit": "2.x",
  "sentry/nextjs": "latest",
  "react-hot-toast": "2.x"
}
```

### Font Loading

```typescript
// app/layout.tsx
import { Poppins, Inter, Space_Grotesk } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
```

### Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0B1F3A",
          orange: "#FF6B00",
          "orange-hover": "#E55F00",
          blue: "#2D8CFF",
          gray: "#8A94A6",
          black: "#0A0A0A",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        space: ["var(--font-space-grotesk)", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
        badge: "100px",
      },
    },
  },
  plugins: [],
};
export default config;
```

### TanStack Query Setup

```typescript
// app/providers.tsx
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

### API Fetch Wrapper

```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}/api/v1${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API error");
  }
  return res.json();
}

// Usage with TanStack Query:
const { data } = useQuery({
  queryKey: ["blogs"],
  queryFn: () => apiFetch<BlogsResponse>("/blog?status=published"),
});
```

### Dark Mode

```typescript
// Use next-themes
// Default: light mode
// User toggle saved in localStorage

// globals.css
:root {
  --bg: #FFFFFF;
  --bg-secondary: #F8FAFC;
  --text: #0A0A0A;
  --text-secondary: #475569;
  --border: rgba(11, 31, 58, 0.1);
}

.dark {
  --bg: #0A0A0A;
  --bg-secondary: #0B1F3A;
  --text: #FFFFFF;
  --text-secondary: #CBD5E1;
  --border: rgba(255, 107, 0, 0.15);
}
```

---

## 4. Backend Stack (NestJS)

### Dependencies

```json
{
  "@nestjs/core": "10.x",
  "@nestjs/common": "10.x",
  "@nestjs/platform-express": "10.x",
  "@nestjs/config": "3.x",
  "@prisma/client": "5.x",
  "prisma": "5.x",
  "helmet": "7.x",
  "cors": "2.x",
  "class-validator": "0.14.x",
  "class-transformer": "0.5.x",
  "nodemailer": "6.x",
  "cloudinary": "2.x",
  "multer": "1.x",
  "@sentry/node": "latest"
}
```

### Main Setup

```typescript
// main.ts
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix("api/v1");

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
```

---

## 5. Database (Prisma + PostgreSQL)

### Prisma Schema

```prisma
// apps/api/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model WebsiteBlog {
  id                    String    @id @default(uuid())
  title                 String
  slug                  String    @unique
  coverImageUrl         String?
  coverImageCloudinaryId String?
  authorId              String?
  author                WebsiteTeam? @relation(fields: [authorId], references: [id])
  category              String?
  tags                  String[]
  metaTitle             String?
  metaDescription       String?
  ogImageUrl            String?
  content               Json
  readingTimeMinutes    Int?
  status                String    @default("draft")
  publishedAt           DateTime?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  deletedAt             DateTime?

  @@map("website_blogs")
}

model WebsiteProject {
  id                    String    @id @default(uuid())
  title                 String
  slug                  String    @unique
  clientName            String?
  industry              String?
  category              String?
  techStack             String[]
  heroImageUrl          String?
  heroImageCloudinaryId String?
  galleryImages         Json?
  problem               String?
  solution              String?
  results               String?
  isFeatured            Boolean   @default(false)
  metaTitle             String?
  metaDescription       String?
  ogImageUrl            String?
  status                String    @default("draft")
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  deletedAt             DateTime?

  @@map("website_projects")
}

model WebsiteService {
  id             String   @id @default(uuid())
  name           String
  slug           String   @unique
  category       String
  tagline        String?
  description    String?
  benefits       Json?
  whatsIncluded  String[]
  processSteps   Json?
  techStack      String[]
  startingPrice  String?
  faq            Json?
  metaTitle      String?
  metaDescription String?
  ogImageUrl     String?
  isActive       Boolean  @default(true)
  sortOrder      Int      @default(0)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@map("website_services")
}

model WebsiteInquiry {
  id                String   @id @default(uuid())
  name              String
  email             String
  phone             String?
  companyName       String?
  serviceInterested String?
  budgetRange       String?
  timeline          String?
  message           String?
  source            String   @default("contact_form")
  status            String   @default("new")
  crmLeadId         String?
  ipAddress         String?
  userAgent         String?
  createdAt         DateTime @default(now())

  @@map("website_inquiries")
}

model WebsiteTeam {
  id                   String    @id @default(uuid())
  name                 String
  designation          String
  photoUrl             String?
  photoCloudinaryId    String?
  linkedinUrl          String?
  sortOrder            Int       @default(0)
  isActive             Boolean   @default(true)
  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt
  blogs                WebsiteBlog[]

  @@map("website_team")
}

model WebsiteNewsletter {
  id             String    @id @default(uuid())
  email          String    @unique
  status         String    @default("active")
  subscribedAt   DateTime  @default(now())
  unsubscribedAt DateTime?

  @@map("website_newsletter")
}

model WebsiteAdminUser {
  id          String    @id @default(uuid())
  name        String
  email       String    @unique
  passwordHash String?
  googleId    String?
  role        String    @default("content_writer")
  isActive    Boolean   @default(true)
  lastLoginAt DateTime?
  createdAt   DateTime  @default(now())

  @@map("website_admin_users")
}

model WebsiteJob {
  id                  String    @id @default(uuid())
  title               String
  slug                String    @unique
  type                String
  department          String
  locationType        String?
  experienceLevel     String?
  description         String?
  responsibilities    String[]
  requirements        String[]
  skillsRequired      String[]
  salaryMin           Int?
  salaryMax           Int?
  salaryLabel         String?
  isPaid              Boolean   @default(true)
  duration            String?
  openingsCount       Int       @default(1)
  applicationDeadline DateTime?
  processSteps        Json?
  perks               String[]
  status              String    @default("draft")
  createdBy           String?
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
  deletedAt           DateTime?
  applications        WebsiteApplication[]

  @@map("website_jobs")
}

model WebsiteApplication {
  id              String    @id @default(uuid())
  jobId           String
  job             WebsiteJob @relation(fields: [jobId], references: [id])
  jobTitle        String
  fullName        String
  email           String
  phone           String?
  currentLocation String?
  qualification   String?
  experienceLevel String?
  resumeUrl       String?
  resumeCloudinaryId String?
  portfolioUrl    String?
  linkedinUrl     String?
  coverLetter     String?
  whyJoin         String?
  referralSource  String?
  status          String    @default("new")
  internalRating  Int?
  adminNotes      String?
  reviewedBy      String?
  crmLeadId       String?
  ipAddress       String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@map("website_applications")
}
```

---

## 6. Rate Limiting

```typescript
// Per endpoint limits (implement with @nestjs/throttler)
// Contact form: 5 per IP per 15 minutes
// Newsletter: 3 per IP per hour
// Image upload: 20 per admin per minute
// Public API: 100 per IP per minute
// Admin API: 60 per admin per minute
// Careers apply: 3 per IP per hour
```

---

## 7. Error Handling

```typescript
// Standard API response format:
// Success: { success: true, data: {...}, message?: string }
// Paginated: { success: true, data: [...], pagination: { page, limit, total, totalPages } }
// Error: { success: false, error: string, code?: string }

// HTTP Status Codes:
// 200 — Success
// 201 — Created
// 400 — Validation error
// 401 — Not authenticated
// 403 — Not authorized
// 404 — Not found
// 409 — Conflict
// 429 — Rate limit exceeded
// 500 — Server error
```

---

## 8. Image Upload Flow (Cloudinary)

```
Browser → POST /api/v1/upload/image (multipart/form-data)
  → Backend validates: type (jpg/png/webp), size (max 5MB)
  → Upload to Cloudinary with transformations
  → Return: { url, publicId }
  → Frontend stores url in form state
  → On form submit: url saved to DB

Cloudinary folders:
  adruva-website/blogs/       ← Blog covers
  adruva-website/projects/    ← Project screenshots
  adruva-website/team/        ← Team photos (auto-crop face)
  adruva-website/og/          ← OG images
  adruva-website/resumes/     ← Job application resumes (private)
```

---

## 9. reCAPTCHA v3

```typescript
// Frontend: token generated on form submit (invisible)
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const { executeRecaptcha } = useGoogleReCaptcha();
const token = await executeRecaptcha("contact_form");
// Include token in form submission body

// Backend: verify before processing
async function verifyRecaptcha(token: string): Promise<boolean> {
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET}&response=${token}`,
    { method: "POST" },
  );
  const data = await res.json();
  return data.success && data.score >= 0.5;
}

// Action names per form:
// contact_form, newsletter_subscribe, careers_apply
```

---

## 10. Turborepo Config

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {}
  }
}
```

### Dev Commands

```bash
# Root package.json scripts
npm run dev        # Start all apps in dev mode
npm run build      # Build all apps
npm run lint       # Lint all apps
npm run test       # Test all apps

# Individual apps
cd apps/web && npm run dev     # Next.js on port 3000
cd apps/api && npm run dev     # NestJS on port 3001
```

---

## 11. Prettier Config

```json
// .prettierrc (root)
{
  "singleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid"
}
```

---

## 12. GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npm run test

# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```
