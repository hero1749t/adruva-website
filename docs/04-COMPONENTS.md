# Adruva Solution Website — Components Spec

> All reusable components. Read before building any component.

---

## 1. Layout Components

### Navbar (`components/layout/Navbar.tsx`)

```tsx
Props: none (reads from context)

Behavior:
- Transparent when scrollY === 0
- bg-black/90 + backdrop-blur-xl when scrollY > 10
- Sticky, z-50

Children:
- NavLogo (left)
- NavLinks (center) — with ServicesDropdown on hover
- NavActions (right) — ThemeToggle + CTA button

Mobile (<768px):
- Hide NavLinks
- Show HamburgerButton
- MobileMenu overlay (AnimatePresence)
```

### MobileMenu (`components/layout/MobileMenu.tsx`)

```tsx
Props: { isOpen: boolean, onClose: () => void }

Full-screen overlay:
- bg-black, z-100
- All nav links vertical, large text
- "Book a Free Call" button at bottom
- Close (X) button top-right
- Framer Motion slide from right
```

### ServicesDropdown (`components/layout/ServicesDropdown.tsx`)

```tsx
4-column mega menu on hover:
Column titles: Build | Automate | Grow | Design
Each column: service links with icon + name

Framer Motion: fade + scale in
Dismiss on: click outside, escape key, mouse leave
```

### Footer (`components/layout/Footer.tsx`)

```tsx
4-column grid
NewsletterForm inline (handles its own submit state)
SocialLinks row
```

### FloatingWhatsApp (`components/layout/FloatingWhatsApp.tsx`)

```tsx
Props: { phoneNumber: string, message?: string }

Fixed bottom-right
Pulse CSS animation
Opens: `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
Default message: "Hi Adruva! I'd like to discuss a project."
```

### MobileBottomBar (`components/layout/MobileBottomBar.tsx`)

```tsx
Visible only on mobile (<768px)
Fixed bottom-0, full width
2 buttons: "Book a Free Call" (orange) + "WhatsApp" (green)
```

### PageTransition (`components/layout/PageTransition.tsx`)

```tsx
Wraps page content
Framer Motion fade in/out between routes
```

### CookieBanner (`components/layout/CookieBanner.tsx`)

```tsx
Bottom of screen, first visit only
localStorage key: 'cookie_consent'
Buttons: "Accept All" | "Manage Preferences"
"Manage Preferences" → modal with toggles (Analytics, Marketing)
```

### BackToTop (`components/layout/BackToTop.tsx`)

```tsx
Appears when scrollY > 500
Fixed bottom-right (above WhatsApp button)
Click → smooth scroll to top
```

---

## 2. Section Components (Home Page)

### HeroSection (`components/sections/HeroSection.tsx`)

```tsx
AnimatedWords: cycles through ['Need.', 'Trust.', 'Choose.']
ParticlesBackground: floating dots
CTAButtons: primary + ghost

Uses: Framer Motion AnimatePresence for word cycling
```

### StatsStrip (`components/sections/StatsStrip.tsx`)

```tsx
Props: stats: Array<{ number: number, suffix: string, label: string }>

AnimatedCounter per stat (counts up on viewport enter)
useInView from Framer Motion
```

### GrowthSystem (`components/sections/GrowthSystem.tsx`)

```tsx
5-step grid
Stagger reveal on scroll
Active step highlight on hover
```

### LogoMarquee (`components/sections/LogoMarquee.tsx`)

```tsx
Props: clients: string[]
CSS animation marquee (duplicate array for seamless loop)
Pause on hover
```

### ServicesPreview (`components/sections/ServicesPreview.tsx`)

```tsx
Props: services: Service[] (6 featured)
Stagger card reveal
```

### WhoWeServe (`components/sections/WhoWeServe.tsx`)

```tsx
Static industry tags array
Hover effect on each tag
CTA box at bottom
```

### WorkPreview (`components/sections/WorkPreview.tsx`)

```tsx
Props: projects: Project[] (3 featured)
Fetched server-side (ISR)
```

### ReviewsBadge (`components/sections/ReviewsBadge.tsx`)

```tsx
Static: rating + count
Link to Google Business Profile
```

### TestimonialsSection (`components/sections/TestimonialsSection.tsx`)

```tsx
Props: testimonials: Testimonial[]
Desktop: 3-column grid
Mobile: swipeable carousel (Framer Motion drag)
```

### BlogPreview (`components/sections/BlogPreview.tsx`)

```tsx
Props: posts: BlogPost[] (3 latest)
Fetched server-side (ISR)
```

### CTASection (`components/sections/CTASection.tsx`)

```tsx
Props: title, subtitle, primaryCTA, secondaryCTA
Reusable across pages
Orange glow effect (CSS radial gradient)
```

---

## 3. Card Components

### ServiceCard (`components/cards/ServiceCard.tsx`)

```tsx
Props: {
  icon: string,
  name: string,
  description: string,
  startingPrice: string,
  slug: string
}
```

### ProjectCard (`components/cards/ProjectCard.tsx`)

```tsx
Props: {
  title: string,
  slug: string,
  image: string,
  category: string,
  industry: string,
  techStack: string[]
}
```

### BlogCard (`components/cards/BlogCard.tsx`)

```tsx
Props: {
  title: string,
  slug: string,
  coverImage: string,
  category: string,
  readingTime: number,
  publishedAt: string
}
```

### TestimonialCard (`components/cards/TestimonialCard.tsx`)

```tsx
Props: {
  text: string,
  authorName: string,
  authorRole: string,
  authorPhoto?: string
}
```

### TeamCard (`components/cards/TeamCard.tsx`)

```tsx
Props: {
  name: string,
  designation: string,
  photo?: string,
  linkedinUrl?: string
}
```

---

## 4. Form Components

### ContactForm (`components/forms/ContactForm.tsx`)

```tsx
Uses: react-hook-form + Zod validation
reCAPTCHA v3 hook
Submit: POST /api/v1/inquiries
States: idle | loading | success | error
Success: toast + form reset
Error: toast + show WhatsApp fallback
```

### NewsletterForm (`components/forms/NewsletterForm.tsx`)

```tsx
Single email input + submit button
Submit: POST /api/v1/newsletter/subscribe
Success: "You're subscribed! 🎉"
```

---

## 5. UI Primitives (Shadcn/ui + custom)

```
Button — primary (orange) | ghost | outline
Badge — orange | blue | green | gray
Card — with hover state
Input — with label + error state
Textarea — with label + error state
Select — custom styled
Accordion — for FAQ sections
Dialog — for image lightbox
Toast — for notifications
Skeleton — for loading states
Separator
Tabs — for service categories
```

---

## 6. Admin Components

### AdminLayout (`components/admin/AdminLayout.tsx`)

```tsx
Sidebar (240px) + Main content area
Sidebar: logo + nav links + user info + logout
Top bar: page title + user avatar
Mobile: collapsible sidebar
```

### TiptapEditor (`components/admin/TiptapEditor.tsx`)

```tsx
Full Tiptap setup:
Extensions: StarterKit, Image, Link, Placeholder, CodeBlock, Blockquote
Toolbar: Bold | Italic | H2 | H3 | BulletList | OrderedList | BlockQuote | CodeBlock | Link | Image
Image upload: drag & drop or toolbar button → Cloudinary
Output: JSON (stored in DB)
```

### ImageUpload (`components/admin/ImageUpload.tsx`)

```tsx
Props: { onUpload: (url: string, publicId: string) => void, folder: string }
Drag & drop zone
Preview + remove button
Upload: POST /api/v1/upload/image
Show upload progress
```

### DataTable (`components/admin/DataTable.tsx`)

```tsx
Props: { columns, data, pagination, onPageChange, filters?, bulkActions? }
Reusable table for blogs, projects, inquiries, team
```

### StatusBadge (`components/admin/StatusBadge.tsx`)

```tsx
Props: { status: 'new'|'contacted'|'converted'|'closed'|'draft'|'published' }
Color-coded badge
```

---

## 7. SEO Components

### JsonLd (`components/seo/JsonLd.tsx`)

```tsx
Props: { data: object }
Renders <script type="application/ld+json">
Used on: home (Organization), services (Service), blog (BlogPosting), all pages (BreadcrumbList)
```

### Breadcrumb (`components/seo/Breadcrumb.tsx`)

```tsx
Props: { items: Array<{ name: string, href?: string }> }
Visual breadcrumb + JSON-LD BreadcrumbList schema
```
