# Adruva Solution Website — Master Guide for AI Agent

> ⚠️ READ THIS FILE FIRST EVERY SESSION before writing any code.
> This is the single source of truth for the entire project.

---

## What Is This Project?

The official marketing website for **Adruva Solution** — a full-service IT & digital growth company based in Dehradun, India.

**Primary Goal:** Generate leads → Convert them into inquiries → Push to AdruvaCRM automatically.

**This website does ONE job:** Attract visitors → Convert to leads → Send to AdruvaCRM.

**NOT AdruvaCMS** — AdruvaCMS is a completely separate project (different repo) for internal client management.

---

## Company

| Field           | Value                                                        |
| --------------- | ------------------------------------------------------------ |
| **Name**        | Adruva Solution                                              |
| **Tagline**     | "The Last Tech Partner You'll Ever Need"                     |
| **Positioning** | "Digital Growth Systems for Local Businesses & Beyond"       |
| **Mission**     | "To empower businesses with cutting-edge technology"         |
| **Vision**      | "To make enterprise-grade tech accessible to every business" |
| **Location**    | Dehradun, Uttarakhand, India                                 |
| **Email**       | hello@adruvaSolution.com                                     |

---

## Tech Stack (Non-Negotiable — Never Change)

| Layer               | Technology                            | Notes                       |
| ------------------- | ------------------------------------- | --------------------------- |
| **Frontend**        | Next.js 14 (App Router)               | NOT Pages Router            |
| **Backend**         | NestJS                                | Port 3001, separate process |
| **Database**        | PostgreSQL                            | Via Prisma ORM              |
| **ORM**             | Prisma                                | Type-safe, NOT raw SQL      |
| **Monorepo**        | Turborepo                             | Single GitHub repo          |
| **Styling**         | Tailwind CSS + Shadcn/ui              |                             |
| **Animations**      | Framer Motion                         | ALL animations              |
| **Forms**           | react-hook-form + Zod                 | ALL forms                   |
| **Data Fetching**   | TanStack Query (React Query)          | ALL API calls               |
| **Rich Text**       | Tiptap                                | Blog editor in admin        |
| **Images**          | Cloudinary                            | ALL image uploads           |
| **Auth (Admin)**    | NextAuth.js                           | /admin routes               |
| **Email**           | Nodemailer + Gmail SMTP               |                             |
| **WhatsApp**        | Meta WhatsApp Cloud API               |                             |
| **CRM Integration** | Webhook → AdruvaCRM                   | On form submit              |
| **Spam Protection** | reCAPTCHA v3 (invisible)              | ALL public forms            |
| **Analytics**       | Google Analytics 4                    |                             |
| **Error Tracking**  | Sentry + Vercel Analytics             |                             |
| **Fonts**           | next/font (Google Fonts self-hosted)  | NOT CDN                     |
| **CDN + SSL**       | Cloudflare                            |                             |
| **Deployment**      | Vercel (frontend) + Railway (backend) |                             |
| **CI/CD**           | GitHub Actions                        | push main → auto deploy     |
| **Code Quality**    | ESLint + Prettier + Husky             |                             |
| **Formatting**      | Prettier: single quotes, 2 spaces     |                             |
| **Testing**         | Jest + React Testing Library          |                             |
| **TypeScript**      | Strict mode everywhere                | No `any` types              |

---

## Brand

| Element            | Value                              |
| ------------------ | ---------------------------------- |
| **Navy**           | `#0B1F3A`                          |
| **Orange**         | `#FF6B00`                          |
| **Blue**           | `#2D8CFF`                          |
| **White**          | `#FFFFFF`                          |
| **Gray**           | `#8A94A6`                          |
| **Black**          | `#0A0A0A`                          |
| **Heading Font**   | Poppins (800, 700, 600)            |
| **Body Font**      | Inter (400, 500)                   |
| **Marketing Font** | Space Grotesk (600, 400)           |
| **Default Theme**  | Light mode (dark toggle available) |

### Design Tokens

- **Spacing:** 8px base grid (4, 8, 16, 24, 32, 48, 64, 80px)
- **Typography:** 12/14/16/20/24/32/48px
- **Border Radius:** cards=12px, buttons=8px, badges=100px
- **Components:** Shadcn/ui (customized with brand colors)

---

## Repository Structure

```
adruva-website/                    ← Turborepo monorepo root
├── CLAUDE.md                      ← THIS FILE (read first every session)
├── package.json                   ← Turborepo root
├── turbo.json                     ← Turborepo pipeline config
├── .github/
│   └── workflows/
│       ├── ci.yml                 ← lint + test on every push
│       └── deploy.yml             ← deploy to Vercel on main push
├── apps/
│   ├── web/                       ← Next.js 14 frontend
│   │   ├── app/
│   │   │   ├── (public)/          ← Public pages (SSG/ISR)
│   │   │   │   ├── page.tsx       ← Home /
│   │   │   │   ├── about/
│   │   │   │   ├── services/
│   │   │   │   ├── services/[slug]/
│   │   │   │   ├── work/
│   │   │   │   ├── work/[slug]/
│   │   │   │   ├── blog/
│   │   │   │   ├── blog/[slug]/
│   │   │   │   ├── contact/
│   │   │   │   ├── careers/
│   │   │   │   ├── careers/[slug]/
│   │   │   │   ├── privacy-policy/
│   │   │   │   ├── terms/
│   │   │   │   ├── refund-policy/
│   │   │   │   └── cookie-policy/
│   │   │   ├── (admin)/           ← Admin panel (auth protected)
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── dashboard/
│   │   │   │   ├── blogs/
│   │   │   │   ├── projects/
│   │   │   │   ├── services/
│   │   │   │   ├── team/
│   │   │   │   ├── inquiries/
│   │   │   │   ├── newsletter/
│   │   │   │   ├── careers/
│   │   │   │   └── applications/
│   │   │   ├── (auth)/            ← Admin login
│   │   │   │   └── login/
│   │   │   ├── api/               ← Next.js API routes (auth only)
│   │   │   │   └── auth/[...nextauth]/
│   │   │   ├── og/route.tsx       ← Dynamic OG image generation
│   │   │   ├── sitemap.ts
│   │   │   ├── robots.ts
│   │   │   ├── not-found.tsx      ← 404 page
│   │   │   └── layout.tsx         ← Root layout
│   │   ├── components/
│   │   │   ├── ui/                ← Shadcn/ui components
│   │   │   ├── layout/            ← Navbar, Footer, MobileNav
│   │   │   ├── sections/          ← Page sections
│   │   │   ├── cards/             ← Card components
│   │   │   ├── forms/             ← Form components
│   │   │   ├── admin/             ← Admin panel components
│   │   │   └── seo/               ← JsonLd, Breadcrumb
│   │   ├── lib/
│   │   │   ├── api.ts             ← TanStack Query + fetch wrapper
│   │   │   ├── utils.ts           ← Helper functions
│   │   │   ├── validations.ts     ← Zod schemas
│   │   │   └── constants.ts       ← Service slugs, categories etc.
│   │   ├── hooks/                 ← Custom React hooks
│   │   ├── types/                 ← TypeScript types
│   │   ├── public/
│   │   ├── .env.local             ← Frontend env vars (gitignored)
│   │   └── next.config.ts
│   └── api/                       ← NestJS backend (port 3001)
│       ├── src/
│       │   ├── modules/
│       │   │   ├── blog/
│       │   │   ├── projects/
│       │   │   ├── services-content/
│       │   │   ├── inquiries/
│       │   │   ├── team/
│       │   │   ├── newsletter/
│       │   │   ├── careers/
│       │   │   └── applications/
│       │   ├── common/
│       │   │   ├── email/
│       │   │   ├── whatsapp/
│       │   │   ├── cloudinary/
│       │   │   ├── crm-webhook/
│       │   │   └── recaptcha/
│       │   ├── prisma/
│       │   │   └── schema.prisma  ← Database schema
│       │   └── main.ts
│       ├── prisma/
│       │   ├── schema.prisma
│       │   ├── migrations/
│       │   └── seed.ts
│       └── .env                   ← Backend env vars (gitignored)
├── packages/
│   ├── config/                    ← Shared ESLint + Tailwind + TS configs
│   └── types/                     ← Shared TypeScript types
└── docs/                          ← All requirement docs
    ├── 01-PRD.md
    ├── 02-TRD.md
    ├── 03-PAGES.md
    ├── 04-COMPONENTS.md
    ├── 05-API.md
    ├── 06-CMS-ADMIN.md
    ├── 07-SEO.md
    ├── 08-ANIMATIONS.md
    ├── 09-INTEGRATIONS.md
    ├── 10-DESIGN-SYSTEM.md
    ├── 11-BUILD-ORDER.md
    ├── 12-SERVICE-CONTENT.md
    ├── 13-ENV-SETUP.md
    ├── 14-DB-SEED.md
    ├── 15-DEPLOYMENT.md
    └── 16-CAREERS.md
```

---

## All Pages

### Public Pages

| Page                 | Route              | Rendering   |
| -------------------- | ------------------ | ----------- |
| Home                 | `/`                | ISR (3600s) |
| About                | `/about`           | SSG         |
| Services Listing     | `/services`        | SSG         |
| Service Detail (×14) | `/services/[slug]` | ISR (3600s) |
| Our Work             | `/work`            | ISR (1800s) |
| Case Study           | `/work/[slug]`     | ISR (1800s) |
| Blog Listing         | `/blog`            | ISR (300s)  |
| Blog Post            | `/blog/[slug]`     | ISR (300s)  |
| Contact              | `/contact`         | SSG         |
| Careers              | `/careers`         | ISR (1800s) |
| Job Detail           | `/careers/[slug]`  | ISR (1800s) |
| Privacy Policy       | `/privacy-policy`  | SSG         |
| Terms of Service     | `/terms`           | SSG         |
| Refund Policy        | `/refund-policy`   | SSG         |
| Cookie Policy        | `/cookie-policy`   | SSG         |
| 404                  | `/not-found`       | Static      |

### Admin Pages (all SSR, auth-protected)

| Page         | Route                                        |
| ------------ | -------------------------------------------- |
| Login        | `/login`                                     |
| Dashboard    | `/admin/dashboard`                           |
| Blog Manager | `/admin/blogs`                               |
| Blog Editor  | `/admin/blogs/new`, `/admin/blogs/[id]/edit` |
| Projects     | `/admin/projects`                            |
| Services     | `/admin/services`                            |
| Team         | `/admin/team`                                |
| Inquiries    | `/admin/inquiries`                           |
| Newsletter   | `/admin/newsletter`                          |
| Job Listings | `/admin/careers`                             |
| Applications | `/admin/applications`                        |

---

## Service Slugs (All 14)

### Build

- `web-development` (Starting ₹15,000)
- `mobile-app-development` (Starting ₹30,000)
- `saas-custom-software` (Starting ₹75,000)

### Automate

- `ai-automation`
- `ai-ads`
- `custom-ai-solutions`

### Grow

- `google-ads`
- `meta-ads`
- `seo`
- `social-media-management`
- `email-marketing`

### Design

- `ui-ux-design`
- `graphic-designing`
- `video-editing`

---

## Admin Roles

| Role             | Access                                                |
| ---------------- | ----------------------------------------------------- |
| `owner`          | Full access — everything                              |
| `manager`        | Blogs + Projects + Inquiries + Careers + Applications |
| `content_writer` | Blogs only (create/edit, cannot publish)              |
| `hr`             | Careers + Applications only (future role)             |

---

## Document Index — Read Before EVERY Task

| Task                     | Read This Doc                |
| ------------------------ | ---------------------------- |
| Any feature requirements | `docs/01-PRD.md`             |
| Architecture decisions   | `docs/02-TRD.md`             |
| Any page spec            | `docs/03-PAGES.md`           |
| Any component            | `docs/04-COMPONENTS.md`      |
| Any API endpoint         | `docs/05-API.md`             |
| Admin panel              | `docs/06-CMS-ADMIN.md`       |
| SEO implementation       | `docs/07-SEO.md`             |
| Any animation            | `docs/08-ANIMATIONS.md`      |
| CRM/Email/WhatsApp       | `docs/09-INTEGRATIONS.md`    |
| Colors/fonts/spacing     | `docs/10-DESIGN-SYSTEM.md`   |
| What to build next       | `docs/11-BUILD-ORDER.md`     |
| Service page content     | `docs/12-SERVICE-CONTENT.md` |
| Environment variables    | `docs/13-ENV-SETUP.md`       |
| Database seed data       | `docs/14-DB-SEED.md`         |
| Deployment steps         | `docs/15-DEPLOYMENT.md`      |
| Careers page + admin     | `docs/16-CAREERS.md`         |

---

## How to Use With AI Agent (Phase by Phase)

### Starting a new session — ALWAYS say this:

```
Read CLAUDE.md first. We are on [Phase X, Step Y].
Now read [relevant doc] and [what to build].
```

### Phase 1 — Setup + Design System + Home

```
Session 1: "Read CLAUDE.md + docs/11-BUILD-ORDER.md.
Start Step 1: Initialize Turborepo monorepo with Next.js 14 + NestJS."

Session 2: "Read CLAUDE.md + docs/10-DESIGN-SYSTEM.md.
Start Step 2: Set up design system — Tailwind config, Shadcn/ui, brand colors, fonts."

Session 3: "Read CLAUDE.md + docs/04-COMPONENTS.md.
Start Step 3: Build all layout components — Navbar, Footer, FloatingWhatsApp, MobileBottomBar."

Session 4: "Read CLAUDE.md + docs/03-PAGES.md (Home section) + docs/08-ANIMATIONS.md.
Start Step 4: Build complete Home page with all sections."
```

### Phase 2 — Services Pages

```
Session 5: "Read CLAUDE.md + docs/03-PAGES.md (Services) + docs/12-SERVICE-CONTENT.md.
Start Step 5: Build Services listing page + mega menu."

Session 6: "Read CLAUDE.md + docs/03-PAGES.md (Individual Service) + docs/12-SERVICE-CONTENT.md.
Start Step 6: Build individual service page template + all 14 service pages."
```

### Phase 3 — Remaining Pages

```
Session 7: "Read CLAUDE.md + docs/03-PAGES.md (About).
Build About page."

Session 8: "Read CLAUDE.md + docs/03-PAGES.md (Work + Case Studies).
Build Our Work page + Case Study template."

Session 9: "Read CLAUDE.md + docs/03-PAGES.md (Blog).
Build Blog listing + Blog post page."

Session 10: "Read CLAUDE.md + docs/03-PAGES.md (Contact) + docs/09-INTEGRATIONS.md.
Build Contact page with form + Calendly embed."

Session 11: "Read CLAUDE.md + docs/16-CAREERS.md.
Build Careers page + Job detail page."

Session 12: "Read CLAUDE.md.
Build all legal pages + 404 page."
```

### Phase 4 — Backend + Admin + Integrations

```
Session 13: "Read CLAUDE.md + docs/02-TRD.md + docs/14-DB-SEED.md.
Set up NestJS + Prisma + PostgreSQL. Run migrations + seed data."

Session 14: "Read CLAUDE.md + docs/05-API.md + docs/09-INTEGRATIONS.md.
Build inquiries API + all integrations (email + WhatsApp + CRM webhook)."

Session 15: "Read CLAUDE.md + docs/05-API.md.
Build blog + projects + services + team + newsletter APIs."

Session 16: "Read CLAUDE.md + docs/05-API.md + docs/16-CAREERS.md.
Build careers + applications APIs."

Session 17: "Read CLAUDE.md + docs/06-CMS-ADMIN.md.
Build admin panel — all modules."
```

### Phase 5 — SEO + Performance + Launch

```
Session 18: "Read CLAUDE.md + docs/07-SEO.md.
Implement full SEO — metadata, OG images, schema, sitemap, robots."

Session 19: "Read CLAUDE.md + docs/13-ENV-SETUP.md + docs/15-DEPLOYMENT.md.
Set up all accounts + environment variables + deploy to Vercel + Railway."

Session 20: "Read CLAUDE.md + docs/15-DEPLOYMENT.md.
Run full pre-launch checklist + performance audit + launch."
```

---

## Key Rules — NEVER Violate These

1. **Read relevant doc before every task** — no exceptions
2. **Never hardcode secrets** — always `process.env.VARIABLE_NAME`
3. **TypeScript strict** — no `any` types ever
4. **next/image for ALL images** — never raw `<img>` tag
5. **next/font for ALL fonts** — never external Google Fonts CDN
6. **Framer Motion for ALL animations** — no CSS keyframes for complex animations
7. **Shadcn/ui for ALL UI components** — don't build buttons/inputs from scratch
8. **Cloudinary for ALL image uploads** — never store on server disk
9. **Zod for ALL validation** — both frontend + backend
10. **react-hook-form for ALL forms** — no uncontrolled forms
11. **TanStack Query for ALL API calls** — no bare useEffect fetching
12. **Prisma for ALL DB queries** — no raw SQL
13. **reCAPTCHA v3 on ALL public forms** — contact, newsletter, careers
14. **Mobile-first CSS** — write mobile styles first, then md: lg: breakpoints
15. **ESLint must pass** before every commit (Husky enforces this)
16. **`once: true` on all Framer Motion viewport** — don't re-animate on scroll up
17. **ISR not SSR for public pages** — better performance
18. **Soft delete everywhere** — never hard delete from DB

---

## Environment Variables Quick Reference

### apps/web/.env.local

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_CALENDLY_URL=
NEXT_PUBLIC_SENTRY_DSN=
```

### apps/api/.env

```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://user:pass@localhost:5432/adruva_website
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
RECAPTCHA_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GMAIL_USER=
GMAIL_APP_PASSWORD=
TEAM_EMAIL=
META_WHATSAPP_TOKEN=
META_PHONE_NUMBER_ID=
TEAM_WHATSAPP=
ADRUVA_CRM_WEBHOOK_URL=
ADRUVA_CRM_WEBHOOK_SECRET=
SENTRY_DSN=
```

---

## Prisma Schema (Quick Reference)

Tables (all prefixed with `website_`):

- `website_blogs` — blog posts
- `website_projects` — case studies
- `website_services` — service content
- `website_inquiries` — contact form submissions
- `website_team` — team members
- `website_newsletter` — email subscribers
- `website_admin_users` — admin accounts
- `website_jobs` — job listings
- `website_applications` — job applications

Full schema in: `apps/api/prisma/schema.prisma`
Seed data in: `docs/14-DB-SEED.md`

---

## Git Workflow

```
main          ← Production (auto-deploys to Vercel)
develop       ← Staging/testing
feature/*     ← Individual features

Never push directly to main.
Flow: feature branch → develop → main
```

---

## Important Reminders

- **Website ≠ AdruvaCMS** — completely separate projects
- **Website's only job** = generate leads → push to AdruvaCRM
- **Admin panel** = content management only (blogs, projects, services, team, careers)
- **AdruvaCRM** = handles everything after lead is received (projects, invoices, clients)
- **Same PostgreSQL DB** as AdruvaCMS but different tables (website\_\* prefix)
