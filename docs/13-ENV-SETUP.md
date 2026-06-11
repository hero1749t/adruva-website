# Adruva Solution Website — Environment Variables & Accounts Setup Guide

> Complete list of every account to create + where to get each key.
> Do this BEFORE starting development.

---

## ⚠️ IMPORTANT RULES

1. NEVER commit .env files to GitHub
2. .env is in .gitignore — verify before first commit
3. Use .env.example (with empty values) for documentation
4. Production keys go in Vercel/Railway environment settings — NOT in files

---

## Complete .env Files

### apps/web/.env.local (Next.js Frontend)

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=                          # generate: openssl rand -base64 32

# Google OAuth (for admin login)
GOOGLE_CLIENT_ID=                         # from Google Cloud Console
GOOGLE_CLIENT_SECRET=                     # from Google Cloud Console

# reCAPTCHA (public key goes in frontend)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=           # from Google reCAPTCHA console

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=            # G-XXXXXXXXXX format

# Calendly
NEXT_PUBLIC_CALENDLY_URL=                 # your Calendly scheduling URL

# Sentry (frontend)
NEXT_PUBLIC_SENTRY_DSN=                   # from Sentry project settings
```

### apps/api/.env (NestJS Backend)

```env
# App
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/adruvacms

# Google OAuth
GOOGLE_CLIENT_ID=                         # same as frontend
GOOGLE_CLIENT_SECRET=                     # same as frontend

# reCAPTCHA (secret key goes in backend)
RECAPTCHA_SECRET_KEY=                     # from Google reCAPTCHA console

# Cloudinary
CLOUDINARY_CLOUD_NAME=                    # from Cloudinary dashboard
CLOUDINARY_API_KEY=                       # from Cloudinary dashboard
CLOUDINARY_API_SECRET=                    # from Cloudinary dashboard

# Gmail SMTP
GMAIL_USER=                               # your Gmail address
GMAIL_APP_PASSWORD=                       # Gmail App Password (not regular password)
TEAM_EMAIL=                               # email to receive form notifications

# Meta WhatsApp
META_WHATSAPP_TOKEN=                      # from Meta Business Manager
META_PHONE_NUMBER_ID=                     # from Meta WhatsApp API settings
TEAM_WHATSAPP=                            # your WhatsApp number with country code (+91...)

# AdruvaCRM Webhook
ADRUVA_CRM_WEBHOOK_URL=                   # your AdruvaCRM webhook endpoint
ADRUVA_CRM_WEBHOOK_SECRET=                # shared secret for webhook verification

# Sentry (backend)
SENTRY_DSN=                               # from Sentry project settings
```

---

## Accounts to Create — Step by Step

### 1. Google Cloud Console (OAuth + reCAPTCHA)

**URL:** https://console.cloud.google.com

**Steps:**

```
OAuth Credentials:
1. Create new project: "adruva-website"
2. APIs & Services → Credentials → Create OAuth Client ID
3. Application type: Web application
4. Authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google (dev)
   - https://adruvaSolution.com/api/auth/callback/google (prod)
5. Copy: Client ID + Client Secret → GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET

reCAPTCHA v3:
1. Go to: https://www.google.com/recaptcha/admin
2. Register new site → reCAPTCHA v3
3. Domains: localhost, adruvaSolution.com
4. Copy: Site Key → NEXT_PUBLIC_RECAPTCHA_SITE_KEY
5. Copy: Secret Key → RECAPTCHA_SECRET_KEY
```

### 2. Google Analytics 4

**URL:** https://analytics.google.com

**Steps:**

```
1. Create account: "Adruva Solution"
2. Create property: "adruva-website"
3. Platform: Web
4. Website URL: adruvaSolution.com
5. Admin → Data Streams → Web stream
6. Copy: Measurement ID (G-XXXXXXXXXX) → NEXT_PUBLIC_GA_MEASUREMENT_ID
7. Submit sitemap after launch: https://search.google.com/search-console
```

### 3. Gmail App Password (for Nodemailer)

**URL:** https://myaccount.google.com/security

**Steps:**

```
1. Use: hello@adruvaSolution.com (or team Gmail)
2. Enable 2-Factor Authentication (required)
3. Security → 2-Step Verification → App passwords
4. App: Mail, Device: Other → "Adruva Website"
5. Copy 16-character password → GMAIL_APP_PASSWORD
6. GMAIL_USER = the Gmail address

Note: Regular Gmail password won't work — must be App Password
```

### 4. Cloudinary

**URL:** https://cloudinary.com

**Steps:**

```
1. Sign up free (free tier: 25GB storage, 25GB bandwidth/month)
2. Dashboard → Account Details
3. Copy:
   - Cloud Name → CLOUDINARY_CLOUD_NAME
   - API Key → CLOUDINARY_API_KEY
   - API Secret → CLOUDINARY_API_SECRET
4. Settings → Upload → Add upload preset (optional for direct uploads)
5. Create folders: adruva-website/blogs, adruva-website/projects, adruva-website/team
```

### 5. Meta WhatsApp Business API

**URL:** https://developers.facebook.com

**Steps:**

```
1. Create Meta Developer account
2. Create App → Business type
3. Add WhatsApp product to app
4. WhatsApp → Getting Started
5. Get: Phone Number ID → META_PHONE_NUMBER_ID
6. Generate permanent token → META_WHATSAPP_TOKEN
   (System User token recommended for production)
7. Create + submit message template:
   Template name: new_website_lead
   Category: UTILITY
   Language: English
   Body: "New lead from website! 🚀 Name: {{1}}, Service: {{2}}, Phone: {{3}}. Check AdruvaCRM for details."
8. Wait for Meta approval (usually 24-48 hours)
9. Add your phone number as test recipient during development
```

### 6. Calendly

**URL:** https://calendly.com

**Steps:**

```
1. Sign up (free plan works)
2. Create event: "Free Discovery Call - 30 min"
3. Set availability
4. Connect Google Calendar (for automatic scheduling)
5. Copy your scheduling URL → NEXT_PUBLIC_CALENDLY_URL
   Example: https://calendly.com/adruva/discovery-call
6. Customize: brand color = #FF6B00, hide GDPR banner via URL param
```

### 7. Sentry

**URL:** https://sentry.io

**Steps:**

```
1. Create account
2. Create project: "adruva-website-frontend" (Next.js)
3. Create project: "adruva-website-backend" (Node.js)
4. Copy DSN for each:
   Frontend DSN → NEXT_PUBLIC_SENTRY_DSN
   Backend DSN → SENTRY_DSN
5. Free tier: 5,000 errors/month (plenty for start)
```

### 8. Vercel (Frontend Hosting)

**URL:** https://vercel.com

**Steps:**

```
1. Sign up with GitHub
2. Import repository
3. Framework: Next.js (auto-detected)
4. Root directory: apps/web
5. Add all NEXT_PUBLIC_* environment variables
6. Deploy
7. Custom domain: add adruvaSolution.com when ready
8. Enable: Vercel Analytics (free)
```

### 9. Railway (Backend Hosting)

**URL:** https://railway.app

**Steps:**

```
1. Sign up with GitHub
2. New Project → Deploy from GitHub
3. Select repo, set root directory: apps/api
4. Add all backend environment variables
5. Add PostgreSQL service:
   - New → Database → PostgreSQL
   - Copy DATABASE_URL → environment variable
6. Custom domain (optional): api.adruvaSolution.com
```

### 10. Cloudflare (CDN + SSL + DNS)

**URL:** https://cloudflare.com

**Steps:**

```
1. Add site: adruvaSolution.com
2. Change nameservers at domain registrar to Cloudflare's
3. Wait for propagation (up to 24 hours)
4. SSL/TLS: Full (strict)
5. Speed → Optimization → Auto Minify (JS, CSS, HTML)
6. Caching → Configuration → Cache Level: Standard
7. Page Rules or Workers: none needed for basic setup
8. Vercel: set SSL to "Flexible" when using Cloudflare proxy
```

### 11. Google Search Console

**URL:** https://search.google.com/search-console

**Steps (after launch):**

```
1. Add property: adruvaSolution.com
2. Verify via: DNS TXT record (add in Cloudflare)
3. Submit sitemap: https://adruvaSolution.com/sitemap.xml
4. Monitor: indexing status, search performance, errors
```

---

## Development vs Production Values

| Variable            | Development           | Production                     |
| ------------------- | --------------------- | ------------------------------ |
| NEXT_PUBLIC_APP_URL | http://localhost:3000 | https://adruvaSolution.com     |
| NEXT_PUBLIC_API_URL | http://localhost:3001 | https://api.adruvaSolution.com |
| NEXTAUTH_URL        | http://localhost:3000 | https://adruvaSolution.com     |
| NODE_ENV            | development           | production                     |
| DATABASE_URL        | local PostgreSQL      | Railway PostgreSQL             |

---

## Pre-Launch Checklist — All Accounts

- [ ] Google Cloud Console — OAuth + reCAPTCHA configured
- [ ] GA4 property created — Measurement ID copied
- [ ] Gmail App Password generated
- [ ] Cloudinary account created — folders set up
- [ ] Meta WhatsApp API — template approved
- [ ] Calendly — discovery call event created
- [ ] Sentry — 2 projects created (frontend + backend)
- [ ] Vercel — connected to GitHub repo
- [ ] Railway — PostgreSQL + API deployed
- [ ] Cloudflare — DNS configured, SSL active
- [ ] Google Search Console — verified + sitemap submitted
- [ ] All .env.production values set in Vercel + Railway dashboards
- [ ] .env files NOT in GitHub (verify .gitignore)
