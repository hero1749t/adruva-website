# Adruva Solution Website — Integrations

> CRM Webhook, Email, WhatsApp, GA4, Cloudinary, Calendly, reCAPTCHA.

---

## 1. Contact Form → AdruvaCRM Webhook (MOST IMPORTANT)

### Flow
```
User fills contact form
  → reCAPTCHA v3 token generated (frontend)
  → POST /api/v1/inquiries (with recaptcha token)
  → Backend verifies reCAPTCHA score
  → Save inquiry to website_inquiries table
  → Trigger 4 parallel actions:
      1. Send confirmation email to user
      2. Send notification email to team
      3. Send WhatsApp to team
      4. POST webhook to AdruvaCRM
```

### CRM Webhook Payload
```typescript
// POST to: process.env.ADRUVA_CRM_WEBHOOK_URL
// Headers: { 'x-webhook-secret': process.env.ADRUVA_CRM_WEBHOOK_SECRET }

{
  source: 'website_contact_form',
  lead: {
    name: string,
    email: string,
    phone: string,
    company: string,
    service: string,
    budget: string,
    timeline: string,
    message: string,
    created_at: ISO8601 string,
    ip_address: string
  }
}

// On success: store crm_lead_id from response in website_inquiries
// On failure: log error + Sentry, don't fail the form submission
```

### CRM Webhook Service
```typescript
// common/crm-webhook/crm-webhook.service.ts
async pushLeadToCRM(inquiry: InquiryDto): Promise<string | null> {
  try {
    const response = await fetch(process.env.ADRUVA_CRM_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': process.env.ADRUVA_CRM_WEBHOOK_SECRET
      },
      body: JSON.stringify({ source: 'website_contact_form', lead: inquiry })
    })
    const data = await response.json()
    return data.lead_id || null
  } catch (err) {
    Sentry.captureException(err)
    logger.error('CRM webhook failed', { err: err.message })
    return null  // Don't fail form submission if CRM webhook fails
  }
}
```

---

## 2. Email Service (Nodemailer + Gmail SMTP)

### Setup
```typescript
// common/email/email.service.ts
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})
```

### Email Templates

#### Template 1: User Confirmation Email
```
Subject: "We got your message, [Name]! 🚀"
From: Adruva Solution <hello@adruvaSolution.com>
To: [user email]

Body:
Hi [Name],

Thank you for reaching out to Adruva Solution!

We've received your inquiry about [Service] and will get back to you within 24 hours.

Your submission details:
- Service: [service]
- Budget: [budget]
- Timeline: [timeline]

In the meantime, feel free to check out our work: [website/work]

Best regards,
Team Adruva Solution
```

#### Template 2: Team Notification Email
```
Subject: "🔔 New Lead: [Name] — [Service]"
From: Adruva Website <hello@adruvaSolution.com>
To: [team email]

New contact form submission:

Name: [name]
Email: [email]
Phone: [phone]
Company: [company]
Service: [service]
Budget: [budget]
Timeline: [timeline]
Message: [message]

View in CRM: [crm link]
```

#### Template 3: Newsletter Welcome Email
```
Subject: "Welcome to Adruva Insights! 🎉"
To: [subscriber email]

Thanks for subscribing!
You'll receive our latest articles on tech, AI, and digital growth.
```

---

## 3. WhatsApp Notification (Meta Cloud API)

### Setup
```typescript
// common/whatsapp/whatsapp.service.ts
const META_API = 'https://graph.facebook.com/v18.0'

async sendTemplate(to: string, templateName: string, params: string[]) {
  await fetch(`${META_API}/${process.env.META_PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.META_WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: { code: 'en' },
        components: [{ type: 'body', parameters: params.map(p => ({ type: 'text', text: p })) }]
      }
    })
  })
}
```

### WhatsApp Templates (Pre-approve with Meta)

| Template | Trigger | Parameters |
|---|---|---|
| `new_website_lead` | Contact form submit | [name, service, phone] |

```
Template: new_website_lead
Message: "New lead from website! 🚀 Name: {{1}}, Service: {{2}}, Phone: {{3}}. Check CRM for details."
```

---

## 4. Google Analytics 4

```typescript
// lib/gtag.ts
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const pageview = (url: string) => {
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url })
}

export const event = (action: string, params: object) => {
  window.gtag('event', action, params)
}

// Events to track:
// 'contact_form_submit' — form submitted
// 'book_free_call_click' — CTA button clicked
// 'whatsapp_click' — WhatsApp button clicked
// 'service_page_view' — individual service page viewed
// 'blog_post_read' — blog post scroll depth > 80%
```

---

## 5. Cloudinary

```typescript
// common/cloudinary/cloudinary.service.ts
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Upload helper
async upload(buffer: Buffer, folder: string, publicId?: string) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `adruva-website/${folder}`,
        public_id: publicId,
        overwrite: true,
        transformation: [{ quality: 'auto', fetch_format: 'auto' }]
      },
      (error, result) => error ? reject(error) : resolve(result)
    )
    uploadStream.end(buffer)
  })
}

// Delete helper
async delete(publicId: string) {
  return cloudinary.uploader.destroy(publicId)
}
```

---

## 6. Calendly Embed (Contact Page)

```tsx
// components/sections/CalendlyEmbed.tsx
// Embed Calendly inline widget on contact page

useEffect(() => {
  const script = document.createElement('script')
  script.src = 'https://assets.calendly.com/assets/external/widget.js'
  document.body.appendChild(script)
}, [])

return (
  <div
    className="calendly-inline-widget"
    data-url={`${process.env.NEXT_PUBLIC_CALENDLY_URL}?hide_gdpr_banner=1&primary_color=FF6B00`}
    style={{ minWidth: '320px', height: '700px' }}
  />
)
```

---

## 7. Sentry Error Tracking

```typescript
// sentry.client.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
})

// sentry.server.config.ts
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
})

// Capture in all catch blocks:
try {
  // ...
} catch (err) {
  Sentry.captureException(err)
  throw err
}
```

---

## 8. Cookie Consent Banner

```tsx
// components/layout/CookieBanner.tsx
// Show on first visit, save preference in localStorage

// On "Accept All": enable GA4 tracking
// On "Manage Preferences": show categories (Analytics, Marketing)
// On "Reject": disable GA4, keep only essential cookies

// GDPR compliant — required because targeting international clients
```
