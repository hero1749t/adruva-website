# Adruva Solution Website — Build Order

> Exact sequence to build the website. Complete one step before starting the next.
> Give Claude Code this doc + CLAUDE.md at start of each session.

---

## How to Use This With Claude Code

1. Start every session: give Claude Code `CLAUDE.md` + this file
2. Tell Claude which step you're on
3. Before any feature: Claude reads relevant doc from `/docs/`
4. Complete one step fully before moving to next
5. Commit after every step

---

## Phase 1 — Setup + Design System + Home (Week 1-2)

### Step 1: Monorepo Setup
```
Read: CLAUDE.md

1. Init Turborepo:
   npx create-turbo@latest adruva-website
   
2. Setup apps/web (Next.js 14):
   - App Router
   - TypeScript strict
   - Tailwind CSS
   - ESLint + Prettier + Husky
   
3. Setup apps/api (NestJS):
   npm i @nestjs/cli
   nest new api
   
4. Configure Turborepo:
   - Shared build pipeline
   - Shared lint config
   
5. Setup packages/config:
   - Shared ESLint config
   - Shared Tailwind config
   - Shared TypeScript config

6. Setup .env files:
   - .env.local (web)
   - .env (api)
   - .env.example (committed to git)

7. Setup GitHub repo (private)
8. Setup Husky pre-commit hooks:
   - lint-staged: ESLint + Prettier on staged files
   
9. Setup GitHub Actions:
   - .github/workflows/ci.yml
   - On push: lint + test
   - On push to main: deploy to Vercel

10. Deploy skeleton to Vercel (empty app)

Test: Both apps run locally, CI passes
```

### Step 2: Design System
```
Read: docs/10-DESIGN-SYSTEM.md

1. Configure Tailwind with brand colors, fonts, spacing, border-radius
2. Install + configure Shadcn/ui:
   npx shadcn@latest init
   Add components: Button, Card, Input, Textarea, Select, Badge, Toast, Dialog, Dropdown
   
3. Install next-themes (dark/light mode)
4. Setup CSS variables for dark/light in globals.css
5. Install + configure Framer Motion
6. Setup font loading (Poppins + Inter + Space Grotesk via next/font)
7. Create base components:
   - Section wrapper
   - Container (max-width + padding)
   - Typography components (Heading, Text, Label)
   - ThemeToggle button

Test: Design system renders correctly in light + dark mode
```

### Step 3: Layout Components
```
Read: docs/04-COMPONENTS.md

1. Navbar component:
   - Logo (left) + Links (center) + CTA button (right)
   - Transparent on top → solid background on scroll (useScroll hook)
   - Sticky positioning
   - Services mega dropdown menu (4 categories)
   - Dark/light toggle
   - Mobile: hamburger → full screen overlay
   
2. Footer component:
   - 4 columns: Brand+Newsletter | Services | Company | Contact+Social
   - Newsletter signup form
   - Social links (LinkedIn, Instagram, Twitter, YouTube, WhatsApp)
   - Copyright bar
   
3. FloatingWhatsApp component:
   - Fixed bottom-right
   - Pulse animation
   - Opens WhatsApp chat with pre-filled message
   
4. MobileBottomBar component:
   - Fixed bottom on mobile only
   - "Book a Free Call" + "WhatsApp" buttons
   
5. CookieBanner component
6. BackToTop button
7. PageTransition wrapper (Framer Motion)
8. Root layout (fonts + providers + navbar + footer)

Test: Layout renders on all screen sizes
```

### Step 4: Home Page
```
Read: docs/03-PAGES.md (Home section)

Build sections in order:
1. Hero — headline + animated typing effect + particles + CTAs
2. Stats Strip — animated counters on scroll
3. Growth System — 5-step methodology grid
4. Marquee — infinite scroll client logos
5. Services Preview — 6 service cards
6. Who We Serve — industry tags cloud + CTA box
7. Our Work Preview — 3 featured project cards (static data first)
8. Google Reviews Badge — static display
9. Testimonials — 3 cards carousel
10. Blog Preview — 3 latest posts (static data first)
11. Final CTA Section
12. Floating elements

Test: Home page renders perfectly on mobile + desktop + tablet
```

---

## Phase 2 — Services Pages (Week 3-4)

### Step 5: Services Listing Page
```
Read: docs/03-PAGES.md (Services section)

1. Services listing page (/services)
   - 4 category tabs: Build | Automate | Grow | Design
   - Service cards grid
   - Static data (seed from docs/01-PRD.md service list)

2. Navbar mega menu:
   - 4 columns (one per category)
   - Service links per column
   - Hover reveal animation (Framer Motion)

Test: All service categories filter correctly
```

### Step 6: All 13 Individual Service Pages
```
Read: docs/03-PAGES.md (Individual Service Page section)

Build template first, then generate all 13 pages:

Template sections:
1. Hero
2. Benefits grid
3. What's Included list
4. Process timeline (5 steps)
5. Tech Stack badges
6. Pricing card
7. Related Projects (3 cards)
8. FAQ accordion
9. CTA section

Services to build:
Build: web-development, mobile-app-development, saas-custom-software
Automate: ai-automation, ai-ads, custom-ai-solutions
Grow: google-ads, meta-ads, seo, social-media-management, email-marketing
Design: ui-ux-design, graphic-designing, video-editing

Use static JSON data files for now (real data from admin later)
```

---

## Phase 3 — Remaining Pages (Week 5-6)

### Step 7: About Page
```
1. Hero section
2. Company story (narrative copy)
3. Mission + Vision + Values (3 blocks)
4. Why Choose Adruva (5 points)
5. Team grid (static data — placeholder photos)
6. CTA
```

### Step 8: Our Work + Case Studies
```
1. Our Work listing page:
   - Dual filter (category + industry) — client-side filtering
   - 3-column grid
   - Static data (3-5 placeholder projects)

2. Case Study template page:
   - All sections (problem, solution, results, gallery)
   - Image lightbox for gallery
```

### Step 9: Blog Pages
```
1. Blog listing page:
   - Search (client-side for now)
   - Category filter
   - 3-column grid
   - Skeleton loader

2. Blog post page:
   - Cover image
   - Rich text rendering (from Tiptap JSON)
   - Social share buttons
   - Reading progress bar (optional)
   - Related posts

3. Blog post JSON renderer:
   - Map Tiptap JSON nodes to React components
   - Code blocks with syntax highlighting (Prism.js)
```

### Step 10: Contact Page
```
1. Contact form (all fields + Zod validation)
2. reCAPTCHA v3 setup (frontend token generation)
3. Calendly embed
4. Google Maps embed
5. Form submission (to backend — Step 13)
6. Toast success/error notifications
```

### Step 11: Legal + 404 Pages
```
1. Privacy Policy page (static content)
2. Terms of Service page (static content)
3. Refund Policy page (static content)
4. Cookie Policy page (static content)
5. 404 page (simple: message + home button)
```

---

## Phase 4 — Backend + Admin + Integrations (Week 7-9)

### Step 12: NestJS + Database Setup
```
Read: docs/02-TRD.md (Backend section)

1. NestJS app setup:
   - pg-pool database module
   - Config module (.env)
   - Helmet + CORS + ValidationPipe
   - Rate limiting

2. Database migrations:
   - Run all CREATE TABLE statements from docs/02-TRD.md
   - Seed services data (13 services)

3. Health endpoint: GET /health
```

### Step 13: Inquiries API + All Integrations
```
Read: docs/09-INTEGRATIONS.md

1. POST /api/v1/inquiries endpoint:
   - Zod validation
   - reCAPTCHA verification
   - Save to website_inquiries table
   - Trigger parallel:
     a. Confirmation email to user
     b. Notification email to team
     c. WhatsApp to team
     d. CRM webhook

2. Email service (Nodemailer + Gmail SMTP)
3. WhatsApp service (Meta Cloud API)
4. CRM webhook service
5. Cloudinary service

Test: Submit form → all 4 actions trigger correctly
```

### Step 14: Blog + Projects API
```
1. Blog CRUD API:
   GET /api/v1/blog (list, paginated)
   GET /api/v1/blog/:slug (single post)
   POST /api/v1/blog (admin only)
   PATCH /api/v1/blog/:id (admin only)
   DELETE /api/v1/blog/:id (admin only, soft delete)

2. Projects CRUD API:
   GET /api/v1/projects
   GET /api/v1/projects/:slug
   POST /api/v1/projects (admin only)
   PATCH /api/v1/projects/:id (admin only)
   DELETE /api/v1/projects/:id (admin only)

3. Services API:
   GET /api/v1/services
   GET /api/v1/services/:slug
   PATCH /api/v1/services/:id (admin only)

4. Newsletter API:
   POST /api/v1/newsletter/subscribe
```

### Step 15: Admin Panel
```
Read: docs/06-CMS-ADMIN.md

1. NextAuth.js setup:
   - Email + password provider
   - Google OAuth provider
   - Role-based session (owner | manager | content_writer)

2. Admin layout (sidebar + header)

3. Dashboard page:
   - Stats cards
   - Recent inquiries list

4. Blog manager:
   - List view with status badges
   - Tiptap editor (rich text)
   - Cloudinary image upload
   - Publish/unpublish toggle

5. Projects manager:
   - List + CRUD
   - Image gallery upload (Cloudinary)
   - Featured toggle

6. Services manager:
   - Edit pricing, description, FAQ (owner only)

7. Team manager:
   - Add/edit/remove members
   - Photo upload (Cloudinary)

8. Inquiries manager:
   - List with filters
   - Status update
   - View full inquiry details

9. Newsletter:
   - Subscriber count
   - Export CSV
```

### Step 16: Connect Frontend to Backend
```
1. Blog listing: fetch from API (ISR)
2. Blog post: fetch from API (ISR)
3. Our Work: fetch from API (ISR)
4. Case study: fetch from API (ISR)
5. Services: fetch from API (ISR)
6. Team: fetch from API (ISR)
7. Contact form: submit to API
8. Newsletter form: submit to API
```

---

## Phase 5 — SEO + Performance + Launch (Week 10-11)

### Step 17: SEO Implementation
```
Read: docs/07-SEO.md

1. Metadata API (Next.js 14):
   - generateMetadata() for all dynamic pages
   - Static metadata for static pages

2. Dynamic OG images:
   - app/og/route.tsx (Next.js Image Response API)
   - Blog post OG: cover image + title
   - Service OG: service name + category
   - Default OG: Adruva logo + tagline

3. Schema markup (JSON-LD):
   - Organization schema (home page)
   - Service schema (service pages)
   - BlogPosting schema (blog posts)
   - BreadcrumbList (all inner pages)

4. XML Sitemap: app/sitemap.ts
5. Robots.txt: app/robots.ts
6. Canonical URLs on all pages
```

### Step 18: Performance Optimization
```
1. Audit Core Web Vitals (Lighthouse)
2. Image optimization (all next/image with proper sizes)
3. Font optimization (verify next/font working)
4. Bundle analysis (next bundle analyzer)
5. Remove unused dependencies
6. Lazy load below-fold sections
7. Optimize Framer Motion (lazy import)
```

### Step 19: Analytics + Monitoring
```
1. GA4 integration (pageview + events)
2. Sentry setup (frontend + backend)
3. Vercel Analytics enable
4. Google Search Console verify
```

### Step 20: Testing + QA
```
1. Jest unit tests for:
   - Form validation (Zod schemas)
   - API response handlers
   - Utility functions

2. Manual testing checklist:
   - All pages load correctly
   - Contact form submits → all 4 actions work
   - Dark/light mode toggle works
   - Mobile responsive (all breakpoints)
   - All links work (no broken links)
   - Admin panel all CRUD operations work

3. Cross-browser testing:
   - Chrome + Firefox + Safari + Edge
   - Chrome Mobile + Safari iOS
```

### Step 21: Pre-Launch
```
1. Replace all placeholder content with real content
2. Add real team photos
3. Add real client logos (marquee)
4. Add real testimonials
5. Add 3-5 real case studies
6. Publish 3-4 blog posts
7. Real Google Maps embed (Adruva office)
8. All social media links correct
9. Calendly URL configured
10. reCAPTCHA keys (production)
11. All .env.production variables set
12. Cloudflare DNS configured
13. SSL certificate active
14. Final Lighthouse audit (target 90+ all categories)
```

### Step 22: Launch
```
1. Push to main branch → auto-deploy to Vercel
2. Verify production deployment works
3. Submit sitemap to Google Search Console
4. Test contact form on production
5. Monitor Sentry for errors
6. Monitor GA4 for traffic
7. 🚀 LAUNCHED!
```

---

## Quick Reference: What to Read Before Each Task

| Task | Read |
|---|---|
| Any page spec | docs/03-PAGES.md |
| Any component | docs/04-COMPONENTS.md |
| Any API endpoint | docs/05-API.md |
| Admin panel | docs/06-CMS-ADMIN.md |
| SEO | docs/07-SEO.md |
| Animations | docs/08-ANIMATIONS.md |
| CRM/Email/WhatsApp | docs/09-INTEGRATIONS.md |
| Colors/fonts/spacing | docs/10-DESIGN-SYSTEM.md |
| Architecture | docs/02-TRD.md |
| Features list | docs/01-PRD.md |
| Everything else | CLAUDE.md |
