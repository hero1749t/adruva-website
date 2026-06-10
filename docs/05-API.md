# Adruva Solution Website — API Routes

> Every endpoint. All routes prefixed with /api/v1/

---

## Blog Routes (`/api/v1/blog`)

| Method | Endpoint            | Auth                         | Description                      |
| ------ | ------------------- | ---------------------------- | -------------------------------- |
| GET    | `/blog`             | None                         | List published blogs (paginated) |
| GET    | `/blog/:slug`       | None                         | Single blog post by slug         |
| POST   | `/blog`             | Admin                        | Create blog post                 |
| PATCH  | `/blog/:id`         | Admin (owner/manager/writer) | Update blog post                 |
| DELETE | `/blog/:id`         | Admin (owner/manager)        | Soft delete blog post            |
| PATCH  | `/blog/:id/publish` | Admin (owner/manager)        | Publish/unpublish                |

### GET /blog Query Params

```
?page=1&limit=9&category=ai-tech&status=published&search=keyword
```

### Blog Response

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "...",
      "slug": "...",
      "cover_image_url": "https://res.cloudinary.com/...",
      "category": "ai-tech",
      "tags": ["AI", "automation"],
      "reading_time_minutes": 5,
      "published_at": "2026-05-01T00:00:00Z",
      "author": { "name": "...", "photo_url": "..." }
    }
  ],
  "pagination": { "page": 1, "limit": 9, "total": 24, "totalPages": 3 }
}
```

---

## Projects Routes (`/api/v1/projects`)

| Method | Endpoint                 | Auth                  | Description                   |
| ------ | ------------------------ | --------------------- | ----------------------------- |
| GET    | `/projects`              | None                  | List published projects       |
| GET    | `/projects/featured`     | None                  | Get featured projects (max 3) |
| GET    | `/projects/:slug`        | None                  | Single project by slug        |
| POST   | `/projects`              | Admin (owner/manager) | Create project                |
| PATCH  | `/projects/:id`          | Admin (owner/manager) | Update project                |
| DELETE | `/projects/:id`          | Admin (owner/manager) | Soft delete                   |
| PATCH  | `/projects/:id/featured` | Admin (owner)         | Toggle featured               |

### GET /projects Query Params

```
?category=build&industry=education&status=published
```

---

## Services Routes (`/api/v1/services`)

| Method | Endpoint          | Auth               | Description              |
| ------ | ----------------- | ------------------ | ------------------------ |
| GET    | `/services`       | None               | List all active services |
| GET    | `/services/:slug` | None               | Single service by slug   |
| PATCH  | `/services/:id`   | Admin (owner only) | Update service content   |

---

## Inquiries Routes (`/api/v1/inquiries`)

| Method | Endpoint                | Auth                  | Description         |
| ------ | ----------------------- | --------------------- | ------------------- |
| POST   | `/inquiries`            | None (+ reCAPTCHA)    | Submit contact form |
| GET    | `/inquiries`            | Admin                 | List all inquiries  |
| GET    | `/inquiries/:id`        | Admin                 | Single inquiry      |
| PATCH  | `/inquiries/:id/status` | Admin                 | Update status       |
| GET    | `/inquiries/export`     | Admin (owner/manager) | Export CSV          |

### POST /inquiries Request Body

```json
{
  "name": "Rahul Kumar",
  "email": "rahul@example.com",
  "phone": "+91 98765 43210",
  "company_name": "My Business",
  "service_interested": "web-development",
  "budget_range": "50k-2l",
  "timeline": "1-3-months",
  "message": "I need a website for my restaurant...",
  "recaptcha_token": "03AGdBq..."
}
```

### POST /inquiries Response

```json
{
  "success": true,
  "message": "Your message has been sent! We'll get back within 24 hours.",
  "data": { "inquiry_id": "uuid" }
}
```

### POST /inquiries Internal Flow

```
1. Validate reCAPTCHA token (score >= 0.5)
2. Validate request body (Zod schema)
3. Save to website_inquiries table
4. Parallel execution:
   a. emailService.sendConfirmation(to: user_email)
   b. emailService.sendNotification(to: team_email)
   c. whatsappService.sendTemplate(to: team_whatsapp, 'new_website_lead', [name, service, phone])
   d. crmWebhookService.pushLead(inquiry)
5. Update website_inquiries.crm_lead_id with CRM response
6. Return success response
```

---

## Newsletter Routes (`/api/v1/newsletter`)

| Method | Endpoint                  | Auth          | Description      |
| ------ | ------------------------- | ------------- | ---------------- |
| POST   | `/newsletter/subscribe`   | None          | Subscribe email  |
| GET    | `/newsletter/subscribers` | Admin         | List subscribers |
| GET    | `/newsletter/export`      | Admin (owner) | Export CSV       |

### POST /newsletter/subscribe

```json
{ "email": "user@example.com" }
```

- Check if already subscribed (return success silently if yes)
- Insert to website_newsletter table
- Send welcome email

---

## Team Routes (`/api/v1/team`)

| Method | Endpoint    | Auth                  | Description              |
| ------ | ----------- | --------------------- | ------------------------ |
| GET    | `/team`     | None                  | List active team members |
| POST   | `/team`     | Admin (owner/manager) | Add member               |
| PATCH  | `/team/:id` | Admin (owner/manager) | Update member            |
| DELETE | `/team/:id` | Admin (owner)         | Delete member            |

---

## Upload Routes (`/api/v1/upload`)

| Method | Endpoint                  | Auth  | Description                |
| ------ | ------------------------- | ----- | -------------------------- |
| POST   | `/upload/image`           | Admin | Upload image to Cloudinary |
| DELETE | `/upload/image/:publicId` | Admin | Delete from Cloudinary     |

### POST /upload/image

```
Content-Type: multipart/form-data
Fields: file (image), folder (blogs|projects|team|og)

Response: { url: "https://res.cloudinary.com/...", public_id: "..." }
```

---

## Admin Auth Routes (`/api/v1/auth`)

Handled by NextAuth.js:

```
GET  /api/auth/session       — Get current session
POST /api/auth/signin        — Sign in
POST /api/auth/signout       — Sign out
GET  /api/auth/providers     — List providers
GET  /api/auth/callback/google — Google OAuth callback
```

---

## Health Route

| Method | Endpoint  | Auth | Description      |
| ------ | --------- | ---- | ---------------- |
| GET    | `/health` | None | API health check |

```json
{ "status": "ok", "timestamp": "2026-05-01T00:00:00Z" }
```

---

## Rate Limits

| Endpoint                   | Limit                   |
| -------------------------- | ----------------------- |
| POST /inquiries            | 5 per IP per 15 minutes |
| POST /newsletter/subscribe | 3 per IP per hour       |
| POST /upload/image         | 20 per admin per minute |
| GET /\* (public)           | 100 per IP per minute   |
| Admin routes               | 60 per admin per minute |
