# Adruva Solution Website — Deployment Checklist

> Step-by-step deployment guide. Follow exact order.

---

## Phase 1: Pre-Deployment (Before any deploy)

### Code Quality
- [ ] ESLint passes: `npm run lint` (0 errors)
- [ ] TypeScript compiles: `npm run build` (0 errors)
- [ ] All tests pass: `npm run test`
- [ ] No console.log() in production code
- [ ] No hardcoded secrets anywhere in codebase
- [ ] .env files in .gitignore — verified

### Content Ready
- [ ] All placeholder text replaced with real content
- [ ] Real team photos uploaded (Cloudinary)
- [ ] Real client logos for marquee
- [ ] At least 3 real testimonials
- [ ] At least 3 real case studies (published)
- [ ] At least 3 blog posts (published)
- [ ] All social media URLs correct
- [ ] Contact details correct (email, phone, address)
- [ ] Calendly URL configured + tested
- [ ] Google Maps embed URL correct

### SEO Ready
- [ ] All pages have unique meta titles
- [ ] All pages have meta descriptions (120–160 chars)
- [ ] OG images generated for all key pages
- [ ] Sitemap generates correctly: `/sitemap.xml`
- [ ] Robots.txt correct: `/robots.txt`
- [ ] Schema markup on home + service + blog pages
- [ ] Canonical URLs on all pages
- [ ] No broken internal links

### Performance
- [ ] Lighthouse score 90+ on all 4 categories
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
- [ ] All images using next/image
- [ ] Fonts using next/font (no external CDN)
- [ ] No unused dependencies

---

## Phase 2: Vercel Deployment (Frontend)

### Setup
```
1. Push code to GitHub main branch
2. Vercel → Import Project → Select repo
3. Framework: Next.js (auto-detected)
4. Root Directory: apps/web
5. Build Command: cd ../.. && npx turbo build --filter=web
6. Output Directory: .next
```

### Environment Variables (add in Vercel dashboard)
```
NEXT_PUBLIC_APP_URL=https://adruvaSolution.com
NEXT_PUBLIC_API_URL=https://api.adruvaSolution.com
NEXTAUTH_URL=https://adruvaSolution.com
NEXTAUTH_SECRET=[generate: openssl rand -base64 32]
GOOGLE_CLIENT_ID=[from Google Cloud Console]
GOOGLE_CLIENT_SECRET=[from Google Cloud Console]
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=[from Google reCAPTCHA]
NEXT_PUBLIC_GA_MEASUREMENT_ID=[G-XXXXXXXXXX]
NEXT_PUBLIC_CALENDLY_URL=[your Calendly URL]
NEXT_PUBLIC_SENTRY_DSN=[from Sentry]
```

### Post-Deploy
- [ ] Vercel URL works (xyz.vercel.app)
- [ ] All pages load without errors
- [ ] Dark/light toggle works
- [ ] No hydration errors in console

---

## Phase 3: Railway Deployment (Backend)

### PostgreSQL Setup
```
1. Railway → New Project → Add PostgreSQL
2. Copy DATABASE_URL from Railway dashboard
3. Connect to DB: psql $DATABASE_URL
4. Run all CREATE TABLE migrations (docs/02-TRD.md)
5. Run all indexes
6. Run seed data (docs/14-DB-SEED.md)
7. Verify: SELECT COUNT(*) FROM website_services; → should return 14
```

### NestJS API Setup
```
1. Railway → New Service → GitHub repo
2. Root directory: apps/api
3. Build command: npm run build
4. Start command: npm run start:prod
```

### Environment Variables (add in Railway dashboard)
```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://adruvaSolution.com
DATABASE_URL=[from Railway PostgreSQL]
GOOGLE_CLIENT_ID=[same as Vercel]
GOOGLE_CLIENT_SECRET=[same as Vercel]
RECAPTCHA_SECRET_KEY=[from Google reCAPTCHA]
CLOUDINARY_CLOUD_NAME=[from Cloudinary]
CLOUDINARY_API_KEY=[from Cloudinary]
CLOUDINARY_API_SECRET=[from Cloudinary]
GMAIL_USER=[your Gmail]
GMAIL_APP_PASSWORD=[Gmail App Password]
TEAM_EMAIL=[team notification email]
META_WHATSAPP_TOKEN=[from Meta]
META_PHONE_NUMBER_ID=[from Meta]
TEAM_WHATSAPP=[+91XXXXXXXXXX]
ADRUVA_CRM_WEBHOOK_URL=[AdruvaCRM webhook endpoint]
ADRUVA_CRM_WEBHOOK_SECRET=[shared secret]
SENTRY_DSN=[from Sentry]
```

### Post-Deploy
- [ ] API health check: GET https://api.adruvaSolution.com/health → `{ status: "ok" }`
- [ ] Services endpoint: GET https://api.adruvaSolution.com/api/v1/services → returns 14 services
- [ ] CORS working (no CORS errors from frontend)

---

## Phase 4: Cloudflare Setup

### DNS Configuration
```
1. Login to Cloudflare → Add site: adruvaSolution.com
2. Change nameservers at domain registrar to Cloudflare's
3. Wait for propagation (check: whatsmydns.net)

DNS Records to add:
Type  | Name | Value                          | Proxy
CNAME | @    | cname.vercel-dns.com           | ✅ Proxied
CNAME | www  | cname.vercel-dns.com           | ✅ Proxied
CNAME | api  | your-app.railway.app           | ✅ Proxied
TXT   | @    | [Google Search Console verify] | ❌ DNS only
```

### SSL/TLS Settings
```
SSL/TLS → Overview → Full (strict)
SSL/TLS → Edge Certificates → Always Use HTTPS: ON
SSL/TLS → Edge Certificates → Min TLS Version: TLS 1.2
```

### Performance Settings
```
Speed → Optimization → Auto Minify: JS ✅, CSS ✅, HTML ✅
Caching → Configuration → Cache Level: Standard
Caching → Browser Cache TTL: 4 hours
```

### Security Settings
```
Security → Settings → Security Level: Medium
Security → Settings → Bot Fight Mode: ON
Firewall → Tools → Block: nothing (allow all for now)
```

---

## Phase 5: Custom Domain (Vercel)

```
1. Vercel → Project → Settings → Domains
2. Add domain: adruvaSolution.com
3. Add domain: www.adruvaSolution.com
4. Vercel will verify via Cloudflare DNS records
5. SSL auto-provisioned by Vercel (via Let's Encrypt)
```

---

## Phase 6: Final Testing (Production)

### Functional Testing
- [ ] Home page loads correctly
- [ ] All 6 main pages load
- [ ] All 13 service pages load (/services/[slug])
- [ ] Our Work page + case studies load
- [ ] Blog listing + blog post loads
- [ ] Contact form submits → toast shows
- [ ] Contact form → email received by team
- [ ] Contact form → WhatsApp notification received
- [ ] Contact form → lead appears in AdruvaCRM
- [ ] Newsletter signup works
- [ ] Admin login works (email + Google)
- [ ] Admin: create blog post → published → visible on blog page
- [ ] Admin: add project → visible on work page
- [ ] Dark/light mode toggle works
- [ ] Floating WhatsApp button → opens WhatsApp
- [ ] "Book a Free Call" → Calendly embed loads
- [ ] All social media links open correctly
- [ ] Mobile bottom bar appears on mobile

### Cross-Browser Testing
- [ ] Chrome (desktop + mobile)
- [ ] Firefox (desktop)
- [ ] Safari (desktop + iOS)
- [ ] Edge (desktop)

### Performance Audit (Production)
```
Run Lighthouse on:
- / (Home)
- /services/web-development
- /blog/[any post]
- /contact

Target: Performance 90+, SEO 100, Accessibility 90+, Best Practices 90+
```

---

## Phase 7: Post-Launch

### Day 1
- [ ] Google Search Console → verify domain
- [ ] Submit sitemap: https://adruvaSolution.com/sitemap.xml
- [ ] GA4 → verify real-time traffic works
- [ ] Sentry → verify error tracking active
- [ ] Monitor Sentry for any production errors (first 24 hours)

### Week 1
- [ ] Check GA4 for traffic + bounce rate
- [ ] Check Search Console for indexing status
- [ ] Check Sentry for any errors
- [ ] Test contact form again (ensure CRM webhook working)
- [ ] Verify all WhatsApp notifications still working

### Month 1
- [ ] First blog post audit (traffic, rankings)
- [ ] Review contact form submissions quality
- [ ] Check Cloudinary storage usage
- [ ] Railway costs review
- [ ] Any performance regressions → fix

---

## Rollback Plan

If something breaks after deploy:

```
Vercel rollback:
1. Vercel dashboard → Deployments
2. Find last working deployment
3. Click "..." → Promote to Production
(instant rollback, < 30 seconds)

Railway rollback:
1. Railway dashboard → Deployments
2. Find last working deployment
3. Redeploy
```
