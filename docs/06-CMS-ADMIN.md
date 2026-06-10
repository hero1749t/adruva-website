# Adruva Solution Website — Admin Panel (CMS) Spec

> Complete admin panel specification. Read before building admin features.

---

## 1. Authentication (NextAuth.js)

### Providers

```typescript
// pages/api/auth/[...nextauth].ts
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  CredentialsProvider({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      // Find user in website_admin_users
      // bcrypt.compare(password, hash)
      // Return user object or null
    },
  }),
];
```

### Session with Role

```typescript
callbacks: {
  async session({ session, token }) {
    session.user.role = token.role  // owner | manager | content_writer
    session.user.id = token.id
    return session
  },
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role
      token.id = user.id
    }
    return token
  }
}
```

### Route Protection

```typescript
// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/:path*"],
};
// Redirects to /admin/login if not authenticated
```

---

## 2. Role Permissions Matrix

| Action                  | Owner | Manager | Content Writer  |
| ----------------------- | ----- | ------- | --------------- |
| View dashboard          | ✅    | ✅      | ✅              |
| Create/edit blog        | ✅    | ✅      | ✅ (draft only) |
| Publish blog            | ✅    | ✅      | ❌              |
| Delete blog             | ✅    | ✅      | ❌              |
| Create/edit projects    | ✅    | ✅      | ❌              |
| Toggle featured project | ✅    | ❌      | ❌              |
| Edit services content   | ✅    | ❌      | ❌              |
| Manage team members     | ✅    | ✅      | ❌              |
| View inquiries          | ✅    | ✅      | ❌              |
| Update inquiry status   | ✅    | ✅      | ❌              |
| Export CSV              | ✅    | ✅      | ❌              |
| View newsletter         | ✅    | ✅      | ❌              |
| Add admin users         | ✅    | ❌      | ❌              |

---

## 3. Admin Sidebar Navigation

```
Logo + "Admin"
─────────────
📊 Dashboard
✍️  Blog Posts
💼 Projects
🛠️  Services (owner only)
👥 Team
📧 Inquiries
📩 Newsletter
─────────────
⚙️  Settings (owner only)
─────────────
[Avatar] Name | Role
[Logout button]
```

---

## 4. Blog Editor (Tiptap) Spec

### Toolbar Buttons

```
Bold | Italic | Strikethrough | —
H2 | H3 | —
Bullet List | Ordered List | —
Blockquote | Code | Code Block | —
Link | Image | —
Undo | Redo
```

### Editor Layout

```
Left (70%): Tiptap editor (white bg, full focus mode)
Right sidebar (30%):
  - Status: Draft / Published toggle
  - Publish date picker
  - Author select
  - Category select
  - Tags input (comma separated)
  - Cover image upload
  - Meta title input (auto from title)
  - Meta description textarea (SEO preview below)
  - "Save Draft" button
  - "Publish" button (if owner/manager)
```

### Auto-slug Generation

```typescript
// On title change: auto-generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
// Show slug field (editable after auto-generation)
// Check uniqueness on blur: GET /api/v1/blog/check-slug?slug=xxx
```

### Reading Time Calculation

```typescript
function calculateReadingTime(content: JSONContent): number {
  // Extract plain text from Tiptap JSON
  // Average 200 words per minute
  const wordCount = extractText(content).split(" ").length;
  return Math.ceil(wordCount / 200);
}
```

---

## 5. Image Upload Flow (Admin)

```
1. User drags image or clicks upload area
2. Client-side validation: type (jpg/png/webp), max 5MB
3. POST /api/v1/upload/image (multipart/form-data)
4. Backend: validate → upload to Cloudinary with transformations
5. Return: { url, public_id }
6. Component: show preview + store url in form state
7. On form submit: url saved to DB

Cloudinary transformations per folder:
- blogs: quality: auto, fetch_format: auto, width: 1200, crop: limit
- projects: quality: auto, width: 1200
- team: quality: auto, width: 400, height: 400, crop: fill, gravity: face
- og: quality: 90, width: 1200, height: 630
```

---

## 6. Inquiries Manager

### List View

```
Filters: Status | Service | Date range | Search (name/email)
Sort: newest first (default)

Table columns:
Name | Email | Service | Budget | Status | Date | Actions

Status badges:
🔵 New (default)
🟡 Contacted
🟢 Converted
⚫ Closed
```

### Inquiry Detail Modal

```
Full details:
  Name, Email, Phone, Company
  Service, Budget, Timeline
  Message (full text)
  Submitted: date + IP
  CRM Lead ID (link to AdruvaCRM if available)

Actions:
  - Update status dropdown
  - "Open in CRM" button (if crm_lead_id exists)
  - Notes textarea (internal, saved to DB)
```

---

## 7. Settings Page (Owner Only)

```
Tabs:
1. General: Site title, tagline, contact email, WhatsApp number
2. Social Links: LinkedIn, Instagram, Twitter, YouTube URLs
3. Team Email: Gmail for Nodemailer
4. WhatsApp: Meta phone number ID
5. reCAPTCHA: site key + secret key
6. Cloudinary: cloud name + API keys
7. Calendly: calendar URL
8. Google Maps: embed URL
9. Admin Users: list + add/deactivate admins
```

---

## 8. Services Content Editing (Owner Only)

```
Each service has these editable fields:
- Tagline (short, shown in hero)
- Description (1-2 paragraphs)
- Benefits (array — add/edit/remove items)
  Each: { icon_name, title, description }
- What's Included (string array — add/edit/remove)
- Process Steps (array — fixed 5 steps, edit labels only)
- Tech Stack (string array)
- Starting Price (string: "₹15,000" or "Custom Quote")
- FAQ (array — add/edit/remove)
  Each: { question, answer }

Note: Slug and category CANNOT be changed (breaks URLs)
```
