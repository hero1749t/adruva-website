# Adruva Solution Website — Database Seed Data

> Run these SQL statements after creating tables.
> This populates the initial data the website needs to function.

---

## 1. Seed Services (All 13)

```sql
-- Insert all 13 services
INSERT INTO website_services (name, slug, category, tagline, starting_price, sort_order, is_active) VALUES
-- BUILD
('Web Development', 'web-development', 'build', 'Websites that work as hard as you do', '₹15,000', 1, true),
('Mobile App Development', 'mobile-app-development', 'build', 'Apps your customers will actually use', '₹30,000', 2, true),
('SaaS / Custom Software', 'saas-custom-software', 'build', 'Build the software your business actually needs', '₹75,000', 3, true),
-- AUTOMATE
('AI Automation', 'ai-automation', 'automate', 'Stop doing manually what AI can do for you', 'Custom Quote', 4, true),
('AI Ads', 'ai-ads', 'automate', 'Ads that learn and optimize themselves', 'Custom Quote', 5, true),
('Custom AI Solutions', 'custom-ai-solutions', 'automate', 'AI built specifically for your industry', 'Custom Quote', 6, true),
-- GROW
('Google Ads', 'google-ads', 'grow', 'Show up when customers are searching for you', 'Custom Quote', 7, true),
('Meta Ads', 'meta-ads', 'grow', 'Find your customers where they spend their time', 'Custom Quote', 8, true),
('SEO', 'seo', 'grow', 'Rank higher. Get found. Convert better.', 'Custom Quote', 9, true),
('Social Media Management', 'social-media-management', 'grow', 'A professional social presence without the headache', 'Custom Quote', 10, true),
('Email Marketing', 'email-marketing', 'grow', 'The highest ROI marketing channel, done right', 'Custom Quote', 11, true),
-- DESIGN
('UI/UX Design', 'ui-ux-design', 'design', 'Design that users love and businesses need', 'Custom Quote', 12, true),
('Graphic Designing', 'graphic-designing', 'design', 'Visual identity that makes your brand unforgettable', 'Custom Quote', 13, true),
('Video Editing', 'video-editing', 'design', 'Raw footage to professional content, fast', 'Custom Quote', 14, true);
```

---

## 2. Seed Service Details (Benefits, Process, FAQ)

```sql
-- Web Development details
UPDATE website_services SET
  description = 'We build fast, scalable, and conversion-focused websites — from simple business landing pages to complex web applications. Every project starts with understanding your business goals.',
  benefits = '[
    {"icon": "rocket", "title": "Fast & SEO-Optimized", "description": "Built with Next.js for lightning-fast load times and better Google rankings"},
    {"icon": "mobile", "title": "Mobile-First Design", "description": "70% of your customers visit on mobile. We design for them first."},
    {"icon": "shield", "title": "Secure & Reliable", "description": "SSL, secure forms, regular updates — your site stays safe"},
    {"icon": "target", "title": "Conversion-Focused", "description": "Every element designed to turn visitors into customers"},
    {"icon": "chart", "title": "Analytics Ready", "description": "GA4, Search Console — know exactly how your site performs"},
    {"icon": "tool", "title": "Easy to Update", "description": "Admin panel so you can update content without a developer"}
  ]'::jsonb,
  whats_included = ARRAY[
    'Complete website design + development',
    'Mobile responsive (all screen sizes)',
    'Contact form with email + WhatsApp notification',
    'Basic SEO setup (meta tags, sitemap, robots.txt)',
    'Google Analytics integration',
    'SSL certificate setup',
    '1 round of revisions',
    '30 days post-launch support',
    'Hosting setup guidance'
  ],
  process_steps = '[
    {"step": 1, "title": "Discovery Call", "description": "Understand your business, goals, target audience, and competitors"},
    {"step": 2, "title": "Design", "description": "Wireframes + high-fi Figma designs → your approval before development"},
    {"step": 3, "title": "Development", "description": "Build the website, mobile-first, following approved designs"},
    {"step": 4, "title": "Testing", "description": "Cross-browser, mobile, speed, and form testing"},
    {"step": 5, "title": "Launch", "description": "Deploy, domain setup, go live and monitor"}
  ]'::jsonb,
  tech_stack = ARRAY['Next.js', 'React', 'Tailwind CSS', 'NestJS', 'PostgreSQL', 'Vercel'],
  faq = '[
    {"question": "Do I need to provide content?", "answer": "Yes, you provide the text and images. We give you a content template so you know exactly what to prepare."},
    {"question": "Will I own the website?", "answer": "100%. Code goes to your GitHub, hosting is under your name. You are never locked in with us."},
    {"question": "Can you redesign my existing website?", "answer": "Yes — we can redesign, rebuild, or add features to any existing website."},
    {"question": "What if I need changes after launch?", "answer": "Minor bug fixes are covered for 30 days. New features are quoted separately."},
    {"question": "Do you handle hosting?", "answer": "We set it up under your account. You pay hosting directly — typically ₹0–2,000/month."},
    {"question": "How long will it take?", "answer": "Landing page: 1–2 weeks. Business website: 2–4 weeks. Web app: 6–16 weeks."}
  ]'::jsonb
WHERE slug = 'web-development';

-- Mobile App Development details
UPDATE website_services SET
  description = 'We build iOS and Android mobile applications that are fast, intuitive, and built for real users. Whether you need a customer-facing app or an internal tool, we handle design, development, and deployment.',
  benefits = '[
    {"icon": "mobile", "title": "iOS + Android", "description": "One codebase, both platforms via React Native"},
    {"icon": "paint", "title": "Beautiful UI", "description": "Designed for real users, not just developers"},
    {"icon": "bolt", "title": "High Performance", "description": "Native-like speed without native costs"},
    {"icon": "bell", "title": "Push Notifications", "description": "Keep users engaged and coming back"},
    {"icon": "link", "title": "API Integration", "description": "Connect to payments, maps, your existing systems"},
    {"icon": "store", "title": "App Store Ready", "description": "We handle App Store + Play Store submission"}
  ]'::jsonb,
  whats_included = ARRAY[
    'Full mobile app (iOS + Android) via React Native',
    'UI/UX design (Figma)',
    'Backend API (NestJS + PostgreSQL)',
    'Push notifications setup',
    'Basic analytics (Firebase)',
    'App Store + Play Store submission',
    '30 days post-launch support'
  ],
  process_steps = '[
    {"step": 1, "title": "Discovery", "description": "Understand users, core features, and user journeys"},
    {"step": 2, "title": "Design", "description": "Wireframes + UI design, mobile-first, platform guidelines"},
    {"step": 3, "title": "Development", "description": "Frontend app + backend API built in parallel"},
    {"step": 4, "title": "Testing", "description": "Device testing on iOS + Android, performance, edge cases"},
    {"step": 5, "title": "Launch", "description": "App Store + Play Store submission and monitoring"}
  ]'::jsonb,
  tech_stack = ARRAY['React Native', 'Expo', 'NestJS', 'PostgreSQL', 'Firebase', 'Razorpay'],
  faq = '[
    {"question": "Do you build for both iOS and Android?", "answer": "Yes — React Native gives us one codebase for both platforms."},
    {"question": "How much does App Store publishing cost?", "answer": "Apple: $99/year developer account. Google: $25 one-time. These are paid by you directly."},
    {"question": "Can you add features to my existing app?", "answer": "Yes, if it is built in React Native. We will review the codebase first."},
    {"question": "Do I need a backend/server?", "answer": "Most apps need a backend. We build it as part of the project."}
  ]'::jsonb
WHERE slug = 'mobile-app-development';
```

---

## 3. Seed Admin User (Owner)

```sql
-- Create initial owner account
-- Password: change this immediately after first login!
-- Hash below = bcrypt hash of 'Adruva@2026' (change before production)

INSERT INTO website_admin_users (name, email, password_hash, role, is_active)
VALUES (
  'Admin',
  'admin@adruvaSolution.com',
  '$2b$12$CHANGE_THIS_TO_REAL_BCRYPT_HASH',  -- ← Generate with: bcrypt.hash('your_password', 12)
  'owner',
  true
);

-- How to generate password hash (run this in Node.js):
-- const bcrypt = require('bcryptjs')
-- const hash = await bcrypt.hash('YourPassword123!', 12)
-- console.log(hash)  ← paste this hash above
```

---

## 4. Seed System Settings

```sql
-- Initial system settings
INSERT INTO website_admin_users (name, email, password_hash, role)
-- (Already done above)

-- Note: Most settings are stored in .env
-- These are UI-editable settings stored in DB (future feature)
-- For now, settings are all in environment variables
```

---

## 5. Migration Order

Run these in exact order:

```sql
-- 1. Create tables (from docs/02-TRD.md)
-- Run all CREATE TABLE statements

-- 2. Create indexes
CREATE INDEX idx_blogs_slug ON website_blogs(slug);
CREATE INDEX idx_blogs_status ON website_blogs(status);
CREATE INDEX idx_blogs_category ON website_blogs(category);
CREATE INDEX idx_blogs_published ON website_blogs(published_at DESC);
CREATE INDEX idx_projects_slug ON website_projects(slug);
CREATE INDEX idx_projects_category ON website_projects(category);
CREATE INDEX idx_projects_featured ON website_projects(is_featured);
CREATE INDEX idx_services_slug ON website_services(slug);
CREATE INDEX idx_services_category ON website_services(category);
CREATE INDEX idx_inquiries_status ON website_inquiries(status);
CREATE INDEX idx_inquiries_created ON website_inquiries(created_at DESC);
CREATE INDEX idx_newsletter_email ON website_newsletter(email);
CREATE INDEX idx_team_active ON website_team(is_active, sort_order);

-- 3. Seed services (13 services)
-- (Run INSERT statements from Section 1 above)

-- 4. Seed service details
-- (Run UPDATE statements from Section 2 above)

-- 5. Create admin user
-- (Run INSERT from Section 3 above — with real password hash)
```

---

## 6. Useful Queries for Development

```sql
-- Check all services
SELECT slug, name, category, starting_price FROM website_services ORDER BY sort_order;

-- Check published blogs
SELECT title, slug, status, published_at FROM website_blogs WHERE deleted_at IS NULL ORDER BY created_at DESC;

-- Check recent inquiries
SELECT name, email, service_interested, status, created_at FROM website_inquiries ORDER BY created_at DESC LIMIT 10;

-- Check team members
SELECT name, designation, is_active, sort_order FROM website_team ORDER BY sort_order;

-- Newsletter count
SELECT COUNT(*) as total, status FROM website_newsletter GROUP BY status;

-- Reset admin password (emergency)
UPDATE website_admin_users
SET password_hash = '$2b$12$NEW_HASH_HERE'
WHERE email = 'admin@adruvaSolution.com';
```
