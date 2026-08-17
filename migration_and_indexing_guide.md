# Adruva Solutions - Domain Migration & SEO Indexing Guide

Yeh guide explain karti hai ki purani domain (`adruvasolution.online`) ki Domain Authority (DA) ko nai domain (`adruvasolution.com`) me kaise transfer karna hai aur `.com` website ko Google Search Console me kaise index karwana hai.

---

## 1. Domain Authority Transfer: Purani Domain (`.online`) se `.com` me Redirect

Aapne bataya ki `.online` domain par Instagram, WhatsApp aur purane links ki wajah se Domain Authority (DA) achhi ho gayi hai, par website ab open nahi ho rahi hai.

Is authority ko `.com` par shift karne ke liye **301 Permanent Redirect** setup karna zaroori hai. Isse Google ko pata chalta hai ki website permanently shift ho gayi hai aur wo purane links ka saara "SEO Link Juice" (Authority) `.com` domain ko pass kar deta hai.

### Setup Kaise Karein (Cloudflare/Hostinger/GoDaddy me):

1. **Cloudflare / Domain DNS Panel** me login karein jahan `adruvasolution.online` ka domain registered hai.
2. **Redirect Rule / Page Rule** section me jayein.
3. Ek naya rule banayein:
   - **Source URL (Match pattern):** `https://adruvasolution.online/*` aur `https://www.adruvasolution.online/*`
   - **Target URL (Redirect to):** `https://adruvasolution.com/$1` (Here, `$1` matches the subpages so `/about` redirects to `.com/about`).
   - **Redirect Type:** `301 (Permanent Redirect)`
4. Isse koi bhi user ya bot jab purane link par click karega, toh wo auto-redirect hokar `.com` par land karega, aur 2-4 weeks me Google `.com` ki DA automatically boost kar dega.

---

## 2. Dynamic Sitemap & Robots.txt Check (Code Verification)

Humne codebase me dono files verify kar li hain:

1. **Sitemap (`sitemap.ts`):** `https://adruvasolution.com/sitemap.xml` par dynamically generate ho raha hai. Isme `.online` ka koi mention nahi hai. Saari routes dynamically `.com` ke sath mapped hain.
2. **Robots.txt (`robots.ts`):** Dynamic robots metadata config fully ready hai aur Google bots ko pure domain ko crawl karne ki access deti hai, siwaye private panels ke:
   ```txt
   User-agent: *
   Allow: /
   Disallow: /admin/
   Disallow: /api/
   Sitemap: https://adruvasolution.com/sitemap.xml
   ```

---

## 3. Google Search Console (GSC) Integration Steps

Nai domain `.com` ko rank aur index karne ke liye ye steps follow karein:

### Step A: GSC me Domain Register Karein

1. [Google Search Console](https://search.google.com/search-console) par jayein.
2. **Add Property** par click karein.
3. **Domain Property** select karein aur enter karein: `adruvasolution.com`.

### Step B: DNS se Owner Verify Karein (Best Method)

1. GSC aapko ek **TXT Record** dega (e.g., `google-site-verification=xxxxxxxx`).
2. Apne `.com` domain provider (Hostinger/Cloudflare) ke DNS settings me jayein.
3. Add a new **TXT Record**:
   - **Host/Name:** `@`
   - **TXT Value:** Paste the google-site-verification code.
   - **TTL:** Default
4. Record save karne ke 5 mins baad GSC me **Verify** button par click karein.

### Step C: Sitemap Submit Karein

1. Verification success hone ke baad, left sidebar me **Sitemaps** par click karein.
2. **Add a new sitemap** input field me type karein: `sitemap.xml`.
3. **Submit** button par click karein.
4. Google ise read karke aapki website ke saare static aur dynamic pages (Services, Projects, Blogs) ko index karna shuru kar dega.
