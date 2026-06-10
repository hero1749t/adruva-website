# Adruva Solution Website — Pages Specification

> Exact spec for every page. Read before building any page.

---

## 1. Home Page (`/`)

### Navbar

- Logo left | Links center | CTA + theme toggle right
- Links: Home, About, Services (mega menu), Our Work, Blog, Contact
- CTA: "Book a Free Call" (orange button)
- Transparent on top → solid bg-black/90 + blur on scroll
- Sticky, z-index 100

### Section 1: Hero

```
Layout: Full width, min-height 90vh
Left content (60%):
  - Badge: "🟠 Now offering AI Automation & AI Ads"
  - H1: "The Last Tech Partner" (line 1)
         "You'll Ever [animated word]." (line 2)
  - Animated words cycling: "Need." → "Trust." → "Choose." → "Need."
  - Subtext (Space Grotesk): "Digital Growth Systems for Local Businesses & Beyond"
  - Body: "From Google Ads to custom SaaS — Adruva builds digital systems that bring customers, automate growth, and scale your revenue."
  - CTA row: "Get a Free Audit" (orange primary) + "View Services" (ghost)

Right content (40%):
  - Floating particles animation (subtle orange + blue dots)
  - Optional: abstract dashboard mockup illustration

Mobile: Stack vertically, particles hidden
```

### Section 2: Stats Strip

```
4 stats in a row, separated by vertical borders:
- 15+ | Projects Delivered
- 10+ | Happy Clients
- 100% | On-Time Delivery
- 4+ | Industries Served

Each number animates counting up on scroll into view
Border top + bottom: 0.5px solid var(--border)
```

### Section 3: Adruva Growth System

```
Tag: "OUR METHODOLOGY"
Title: "The Adruva Growth System"

5-column grid (stacked on mobile):
1. Attract — Google Ads, Meta Ads & SEO
2. Convert — Optimized websites & landing pages
3. Manage — CRM systems to organize leads
4. Automate — AI-powered follow-ups & bookings
5. Scale — Optimize for compounding growth

Each step: Number badge + icon + title + 1-line desc
Background: dark card grid with orange borders
```

### Section 4: Client Logos Marquee

```
Label: "TRUSTED BY BUSINESSES ACROSS INDIA"
Infinite scroll marquee (pauses on hover)
Show actual client names (from admin — website_team table)
Orange dot separators between names
```

### Section 5: Services Preview

```
Tag: "WHAT WE DO"
Title: "Full-spectrum digital services"
Right: "View all services →" link

6-card grid (3x2):
- Web Development (Starting ₹15,000)
- Mobile Apps (Starting ₹30,000)
- Google & Meta Ads (Custom quote)
- AI Automation (Custom quote)
- SEO & Marketing (Custom quote)
- Social Media (Custom quote)

Each card: icon + name + 1-line desc + price
Hover: background shift + border-orange
```

### Section 6: Who We Serve

```
Tag: "WHO WE SERVE"
Title: "If you have customers, we can help you grow."
Subtitle: "We work with any local or service-based business."

Tag cloud (flex-wrap):
Restaurants | Salons & Spas | Clinics & Hospitals | Real Estate |
Yoga Retreats | Gyms & Fitness | Schools & Institutes | Medical Practices |
Travel Agencies | Retail Businesses | Interior Design | Auto Services |
Photography Studios | Bakeries & Cafes | IT & Tech Startups |
Coaching Centres | Event Management | And many more...

Bottom CTA box:
"Not sure if we can help? Book a free 30-minute call — if we can't help, we'll tell you honestly."
+ "Book a Free Call →" button
```

### Section 7: Our Work Preview

```
Tag: "OUR WORK"
Title: "Projects we're proud of"
Right: "View all projects →" link

3 featured projects (is_featured = true from DB)
Each card: project image + title + category tags + tech stack

Fetch: GET /api/v1/projects?featured=true&limit=3
```

### Section 8: Google Reviews Badge

```
Centered, clean display:
⭐⭐⭐⭐⭐  "4.9 out of 5"
"Based on Google Reviews"
[View on Google] link → Google Business Profile
```

### Section 9: Testimonials

```
Tag: "CLIENT LOVE"
Title: "What our clients say"

3-column grid:
Each card: " " quote mark + testimonial text + author (photo + name + role)
Auto-rotating carousel on mobile

Fetch: Static data (no DB — admin edits directly in code or future DB)
```

### Section 10: Blog Preview

```
Tag: "INSIGHTS"
Title: "From our desk"
Right: "All articles →" link

3 latest published blog posts
Each card: cover image + category tag + title + date
Fetch: GET /api/v1/blog?limit=3&status=published
```

### Section 11: Final CTA

```
Full-width box with orange glow:
H2: "Ready to grow your business digitally?"
Sub: "Book a free 30-minute discovery call. No commitment, no sales pitch — just honest advice."
CTAs: "Book a Free Call →" + "See Our Services"
```

### Footer (All Pages)

```
4 columns:
Col 1: Logo + tagline + newsletter form
Col 2: Services links (all 13 services + "View all")
Col 3: Company (About, Work, Blog, Contact, Privacy, Terms, Refund)
Col 4: Contact info (email, phone, address) + social icons (5)

Bottom: Copyright | "Made with ♥ in Dehradun"
```

---

## 2. About Page (`/about`)

### Hero

```
Page title: "About Adruva Solution"
Tagline: "We are your business and productivity partner"
Background: subtle gradient
```

### Company Story

```
H2: "Why We Started"
3-4 paragraphs:
Para 1: The gap we saw — local businesses struggling with quality tech
Para 2: What we decided to do about it
Para 3: Where we are today — full-stack team, multiple services
Para 4: Where we're going — vision for the future

Optional: Timeline component (year → milestone)
```

### Mission + Vision + Values

```
3 separate blocks side by side:

Mission: "To empower businesses with cutting-edge technology"
Vision: "To make enterprise-grade tech accessible to every business"
Values:
  - Transparency (no hidden charges, honest communication)
  - Quality (enterprise-grade work at startup prices)
  - Speed (fast delivery without cutting corners)
  - Partnership (we grow when you grow)
  - Innovation (always using the latest, best tools)
```

### Why Choose Adruva

```
H2: "Why Choose Adruva?"
5 points (icon + title + 2-line desc):
1. End-to-end service — one partner for everything
2. Fast delivery + transparent communication
3. Affordable pricing without compromising quality
4. Dedicated project manager for every project
5. Secure client portal — professional project management
```

### Team Section

```
H2: "Meet Our Team"
Grid of team member cards (3-4 per row):
Each: Photo (Cloudinary) + Name + Designation

Note: NO founder/co-founder titles displayed
Fetch: GET /api/v1/team (active members, sorted by sort_order)
```

### CTA

```
"Interested in working with us?"
"Book a Free Call →" button
```

---

## 3. Services Listing Page (`/services`)

### Hero

```
Title: "Our Services"
Subtitle: "Everything you need to attract customers, build products, and grow your business — all under one roof."
```

### Category Tabs

```
4 tabs: Build | Automate | Grow | Design
Default: show all (or first tab active)
Tab click → filter cards (client-side)
```

### Service Cards Grid

```
3-column grid
Each card:
  - Category icon
  - Service name
  - 2-line description
  - Starting price (or "Custom quote")
  - "Learn More →" link → /services/[slug]

Hover: border-orange + translateY(-4px)
```

### Bottom CTA

```
"Not sure which service you need?"
"Book a free consultation — we'll tell you exactly what your business needs."
"Book a Free Call →"
```

---

## 4. Individual Service Page (`/services/[slug]`)

### Dynamic Metadata

```typescript
export async function generateMetadata({ params }) {
  const service = await getService(params.slug);
  return {
    title: `${service.name} | Adruva Solution`,
    description: service.tagline,
    alternates: { canonical: `/services/${params.slug}` },
  };
}
```

### Section Order

```
1. Breadcrumb: Home > Services > [Service Name]

2. Hero:
   - Badge: category (Build / Automate / Grow / Design)
   - H1: Service name
   - Tagline
   - "Get a Free Quote →" button
   - Hero image (from Cloudinary — service-specific illustration)

3. Benefits (4-6 points):
   - Icon + Title + 2-line description
   - 2-column grid

4. What's Included:
   - Checklist with ✅ icons
   - Clear, specific items

5. Our Process (5 steps):
   - Discovery → Design → Development → Testing → Launch
   - Horizontal timeline on desktop, vertical on mobile
   - Each step: number + title + 1-line description

6. Tech Stack:
   - Technology badges/pills
   - Only for technical services (Build + Automate)

7. Pricing:
   - "Starting at ₹X" card
   - OR "Custom Quote" card
   - What's included in base price
   - "Get a Custom Quote →" CTA

8. Related Case Studies (2-3):
   - Project cards from same category
   - Fetch: GET /api/v1/projects?category=[slug_category]&limit=3

9. FAQ (4-6 questions):
   - Accordion (Shadcn Accordion component)
   - Service-specific questions

10. Final CTA:
    - "Ready to start your [Service Name] project?"
    - "Book a Free Call →"
```

### Static Generation

```typescript
export async function generateStaticParams() {
  // Return all 13 service slugs
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}
```

---

## 5. Our Work Page (`/work`)

### Hero

```
Title: "Our Work"
Subtitle: "Real projects, real results. See how we've helped businesses grow."
```

### Filters

```
Category filter: All | Build | Automate | Grow | Design
Industry filter: All | Education | Healthcare | Restaurant | Real Estate | Retail | etc.
Both filters work together (AND logic)
Client-side filtering (no API call on filter change)
```

### Projects Grid

```
3-column grid (2 on tablet, 1 on mobile)
Each card:
  - Project image (Cloudinary, aspect ratio 16:9)
  - Category tag + Industry tag
  - Project title
  - Tech stack (2-3 badges)
  - "View Case Study →" link

Hover: border-orange + translateY(-4px)
Fetch: GET /api/v1/projects?status=published
```

---

## 6. Case Study Page (`/work/[slug]`)

### Sections

```
1. Breadcrumb: Home > Our Work > [Project Name]

2. Hero:
   - Project title (H1)
   - Client industry + category badges
   - Hero image (full width, 16:9)

3. Quick Stats bar:
   - Industry | Tech Stack | Timeline | Category

4. Problem:
   - H2: "The Challenge"
   - 2-3 paragraphs

5. Solution:
   - H2: "Our Solution"
   - 2-3 paragraphs

6. Tech Stack:
   - Technology badges

7. Results:
   - H2: "The Results"
   - 3 result cards (metric + description)

8. Screenshots Gallery:
   - Masonry or grid layout
   - Lightbox on click (Shadcn Dialog)

9. CTA:
   - "Have a similar project in mind?"
   - "Let's Talk →" → /contact

10. Related Projects (3 cards from same category)
```

---

## 7. Blog Listing Page (`/blog`)

### Hero

```
Title: "Insights & Resources"
Subtitle: "Articles on AI, web development, digital marketing, and business growth."
```

### Filters + Search

```
Search bar (top): search by title (client-side filter)
Category pills: All | AI & Tech | Web Dev | Marketing | Design | Company News
```

### Blog Grid

```
3-column grid (2 on tablet, 1 on mobile)
Each card:
  - Cover image (16:9, Cloudinary)
  - Category tag + Reading time
  - Title
  - Published date
  - "Read More →"

Pagination: 9 posts per page
Fetch: GET /api/v1/blog?page=1&limit=9&status=published
```

---

## 8. Blog Post Page (`/blog/[slug]`)

### Layout

```
Max-width: 760px (reading width), centered

1. Breadcrumb: Home > Blog > [Title]
2. Category tag + Published date + Reading time
3. H1: Post title
4. Author: photo + name + designation
5. Cover image (full-width, rounded-card)
6. Rich text content (Tiptap JSON → React)
7. Tags row
8. Social share: LinkedIn | Twitter | WhatsApp | Copy Link
9. Divider
10. Related posts (3 cards, same category)
```

### Rich Text Rendering

```
Map Tiptap JSON nodes:
- heading → <h2>, <h3> (styled)
- paragraph → <p>
- bulletList → <ul>
- orderedList → <ol>
- blockquote → <blockquote> (orange left border)
- codeBlock → <pre><code> (Prism.js syntax highlight)
- image → next/image (Cloudinary optimized)
- bold, italic, link → inline styles
```

---

## 9. Contact Page (`/contact`)

### Layout

```
2-column layout (desktop):
Left (40%):
  - H2: "Let's Build Something Great"
  - Subtitle
  - Contact details:
    📧 hello@adruvaSolution.com
    📱 +91 XXXXX XXXXX
    📍 Dehradun, Uttarakhand
  - Social links row
  - WhatsApp CTA button (green)
  - Google Maps embed

Right (60%):
  - Contact form (all fields)
  - Submit button: "Send Message →"

Below (full-width):
  - "Or book directly:"
  - Calendly inline embed
```

### Form Fields

```
1. Full Name * (text input)
2. Email Address * (email input)
3. Phone Number * (tel input)
4. Company Name (text input, optional)
5. Service Interested In * (select dropdown):
   Options: Web Dev | Mobile App | SaaS | AI Automation | AI Ads |
   Custom AI | Google Ads | Meta Ads | SEO | Social Media |
   Email Marketing | UI/UX | Graphic Design | Video Editing | Not Sure
6. Budget Range * (select):
   Options: < ₹50K | ₹50K – ₹2L | ₹2L – ₹5L | ₹5L+ | Let's discuss
7. Timeline * (select):
   Options: ASAP | 1-3 months | 3-6 months | 6+ months
8. Message * (textarea, min 3 rows)
9. reCAPTCHA v3 (invisible, runs on submit)

Submit: POST /api/v1/inquiries
Success: Toast "Message sent! We'll reply within 24 hours." + form reset
Error: Toast "Something went wrong. Please try WhatsApp." + show WhatsApp link
```

---

## 10. Admin Panel Pages (`/admin`)

### Login (`/admin/login`)

```
Centered card:
- "Adruva Admin" heading
- Email + Password inputs
- "Sign in with Google" button (NextAuth)
- Error handling (wrong credentials)
- Redirect to /admin/dashboard on success
```

### Dashboard (`/admin/dashboard`)

```
Header: "Good morning, [Name] 👋"
Stats row: Total Blogs | Published | Projects | Inquiries (this week)

Recent Inquiries table (last 10):
  Name | Service | Budget | Status | Date | Actions

Quick actions: "+ New Blog" | "+ New Project"
```

### Blog Manager (`/admin/blogs`)

```
Header: "Blog Posts" + "+ New Post" button
Filter: All | Draft | Published | Archived
Table: Title | Status | Category | Author | Date | Actions (edit/delete)
Search by title

New/Edit Post page:
- Title input
- Slug (auto-generated from title, editable)
- Category select
- Tags input
- Cover image upload (Cloudinary)
- Meta title + description
- Tiptap rich text editor (full width)
- Sidebar: Status (draft/published) + Publish date + Author
- "Save Draft" + "Publish" buttons
```

### Projects Manager (`/admin/projects`)

```
Header: "Projects" + "+ New Project" button
Table: Title | Category | Industry | Featured | Status | Actions

New/Edit Project page:
- Title + Slug
- Client name + Industry + Category
- Hero image upload
- Gallery images (multiple upload, reorderable)
- Tech Stack (tags input)
- Problem textarea
- Solution textarea
- Results textarea
- Featured toggle
- Status select
- Meta fields
```

### Services Manager (`/admin/services`) — Owner only

```
List of all 13 services
Click to edit:
  - Description
  - Starting price
  - Benefits (add/edit/remove)
  - What's Included (add/edit/remove)
  - FAQ (add/edit/remove)

Note: Cannot add/delete services (hardcoded slugs)
```

### Team Manager (`/admin/team`)

```
Grid of team member cards
"+ Add Member" button
Each card: Photo + Name + Designation + Edit/Delete buttons

Add/Edit modal:
- Name
- Designation
- Photo upload (Cloudinary, auto-crop to 1:1)
- LinkedIn URL
- Sort order
- Active toggle
```

### Inquiries (`/admin/inquiries`)

```
Table: Name | Email | Service | Budget | Status | Date
Filter: All | New | Contacted | Converted | Closed
Search by name/email
Click row → modal with full inquiry details
Status update dropdown
Export CSV button
```

### Newsletter (`/admin/newsletter`)

```
Total subscribers count
Table: Email | Subscribed Date | Status
Export CSV button
```
