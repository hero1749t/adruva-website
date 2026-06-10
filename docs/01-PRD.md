# Adruva Solution Website — Product Requirements Document (PRD)

> What the website does. Read this before building any feature.

---

## 1. Product Summary

Adruva Solution website is a **lead generation + brand credibility** platform.

**Core Job:** Convert visitors into leads → automatically push leads to AdruvaCRM.

**NOT a project management tool** — that's AdruvaCMS.

---

## 2. User Types

### Visitor (Anonymous)

- Browses services, reads blog, views case studies
- Fills contact form or books a call
- Goal: Understand what Adruva does → get in touch

### Admin (Internal Team)

- Manages blog posts, case studies, service content
- Views and manages contact form inquiries
- 3 roles: Owner, Manager, Content Writer

---

## 3. Core Modules

### 3.1 Home Page

**Sections (top to bottom):**

1. **Navbar** — Logo + links + CTA button, transparent on top → solid on scroll, dark/light toggle
2. **Hero** — Bold headline + animated typing effect + subtext + "Get a Free Audit" + "View Services" CTAs + floating particle animation background
3. **Stats Strip** — 15+ Projects | 10+ Clients | 100% On-time | 4+ Industries
4. **Adruva Growth System** — 5-step methodology: Attract → Convert → Manage → Automate → Scale
5. **Client Logos Marquee** — Infinite scroll marquee strip
6. **Services Preview** — 6 cards (icon + name + 1-line desc + starting price)
7. **Who We Serve** — Industry tags cloud (all industries) + "If you have customers, we can help" CTA
8. **Our Work Preview** — 3 featured projects (image + title + tags + tech stack)
9. **Google Reviews Badge** — Rating + review count
10. **Testimonials** — 3 client testimonials (photo + name + role + quote)
11. **Blog Preview** — 3 latest posts (cover + title + date + category)
12. **Final CTA Section** — Bold callout + "Book a Free Call" button
13. **Footer** — 4 columns + newsletter + social links
14. **Floating WhatsApp Button** — Every page, bottom right, pulse animation

### 3.2 About Page

**Sections:**

1. Hero — Page title + tagline
2. Company Story — Founding narrative (passion + market gap)
3. Mission + Vision + Values — 3 blocks with icons
4. Why Choose Adruva — 5 points (end-to-end, fast delivery, affordable, dedicated PM, client portal)
5. Team Section — All members: photo + name + designation (NO founder/co-founder titles)
6. CTA — "Work with us" → Contact page

### 3.3 Services Listing Page (`/services`)

- 4 category tabs: Build | Automate | Grow | Design
- Each service card: icon + name + description + starting price + "Learn More" CTA
- Click → individual service page

### 3.4 Individual Service Page (`/services/[slug]`)

**Sections (in order):**

1. Hero — Service name + tagline + CTA
2. Benefits — 4-6 benefit points with icons
3. What's Included — Detailed deliverables list
4. Our Process — Discovery → Design → Development → Testing → Launch (5 steps)
5. Tech Stack — Technologies used
6. Pricing — "Starting at ₹X" or "Custom quote"
7. Related Case Studies — 2-3 relevant projects
8. FAQ — 4-6 questions specific to this service
9. CTA — "Start a Project" → Contact

### 3.5 Our Work Page (`/work`)

- Dual filters: Category + Industry
- 3-column grid layout
- Each card: project image + title + category tag + industry tag
- Click → individual case study page

### 3.6 Case Study Page (`/work/[slug]`)

**Sections:**

1. Hero — Project name + industry + hero image
2. Overview — Client background + scope
3. Problem — Challenge faced
4. Solution — What Adruva built
5. Tech Stack — Technologies used
6. Results — Outcomes
7. Screenshots Gallery
8. CTA — "Have a similar project?" → Contact

### 3.7 Blog Listing Page (`/blog`)

- Search bar + category filter
- 3-column grid
- Each card: cover image + title + date + category + reading time
- Pagination

### 3.8 Blog Post Page (`/blog/[slug]`)

**Elements:**

- Cover image (full width)
- Title + author + date + category + reading time
- Rich text content
- Social share buttons (LinkedIn, Twitter, WhatsApp, Copy link)
- Related posts (3 cards) at bottom

### 3.9 Contact Page (`/contact`)

**Layout:**

- Left: Contact info (phone, email, address, social links, WhatsApp button)
- Right: Contact form
- Bottom: Calendly embed (full calendar)
- Google Maps embed

**Contact Form Fields:**

- Full Name \*
- Email Address \*
- Phone Number \*
- Company Name
- Service Interested In (dropdown)
- Budget Range (dropdown: <₹50K / ₹50K–2L / ₹2L–5L / ₹5L+ / Let's discuss)
- Timeline (dropdown: ASAP / 1-3 months / 3-6 months / 6+ months)
- Message \*
- reCAPTCHA v3 (invisible)

**On Submit:**

1. Toast notification: "Message sent! We'll get back within 24 hours."
2. Confirmation email → user
3. Notification email → Adruva team
4. WhatsApp notification → Adruva team (Meta API)
5. Webhook → AdruvaCRM (create lead automatically)

### 3.10 Legal Pages

- `/privacy-policy`
- `/terms`
- `/refund-policy`
- `/cookie-policy`
- Cookie consent banner (first visit, GDPR compliant) — "Accept All" / "Manage Preferences"

### 3.11 Admin Panel (`/admin`)

**Auth:** NextAuth.js — Email + Google OAuth
**Roles:** Owner | Manager | Content Writer

**Modules:**

1. **Dashboard** — Stats: total blogs, projects, inquiries, newsletter subscribers
2. **Blog Manager** — List + Create/Edit/Delete/Publish (Tiptap editor)
3. **Projects Manager** — Add/edit/delete case studies + Cloudinary image upload
4. **Services Manager** — Edit service descriptions, pricing (Owner only)
5. **Team Manager** — Add/edit/remove team members + photos
6. **Inquiries** — View all contact form submissions, mark status
7. **Newsletter** — View subscribers list + export CSV

---

## 4. Non-Functional Requirements

| Requirement   | Spec                                                            |
| ------------- | --------------------------------------------------------------- |
| Performance   | Core Web Vitals green (LCP < 2.5s, CLS < 0.1, FID < 100ms)      |
| Mobile        | Fully responsive, mobile-first CSS                              |
| Browsers      | Chrome, Firefox, Safari, Edge + Chrome Mobile + Safari iOS      |
| Theme         | Light default + Dark mode toggle                                |
| Animations    | Medium level — scroll animations + hover effects + counters     |
| Loading       | Skeleton loaders for dynamic content                            |
| Errors        | Toast notifications for errors, inline validation for forms     |
| SEO           | Full — OG tags + schema + sitemap + robots.txt + canonical URLs |
| Accessibility | WCAG 2.1 AA — proper aria labels, keyboard navigation           |
| Security      | reCAPTCHA v3, parameterized queries, Helmet.js, CORS whitelist  |
