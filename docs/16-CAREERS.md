# Adruva Solution Website — Careers Module Spec

> Complete spec for /careers page + admin panel careers management.
> Read before building any careers-related feature.

---

## 1. Overview

**Purpose:** Attract talented developers, designers, marketers, and interns to join Adruva Solution.

**Key Feature:** 100% admin-controlled — job postings, hiring process, salary, everything managed from admin panel. Zero code changes needed to post/close jobs.

**Types of Opportunities:**
- Full-time jobs
- Internships (paid/unpaid, flexible duration)
- Freelance projects

---

## 2. Public Careers Page (`/careers`)

### Navigation
- **Navbar:** Add "Careers" link (between Blog and Contact)
- **Footer:** Add "Careers" under Company column
- **About page:** Mention "We're hiring!" with link in team section

### Page Sections (top to bottom)

#### Section 1: Hero
```
Tag: "JOIN OUR TEAM"
H1: "Where Your Career Meets Real Impact"
Subtext: "Build real products. Work with cutting-edge tech. Grow faster than anywhere else."
Stats row: [X] Open Positions | [X] Team Members | Hybrid Work | Real Projects
CTA: "View Open Positions →" (scrolls to listings)
Background: Dark navy with subtle orange particles
```

#### Section 2: Life at Adruva (Culture)
```
Tag: "OUR CULTURE"
Title: "Why people love working here"

7 culture cards (icon + title + 2-line desc):
1. 🏠 Work from Anywhere — Hybrid model, work from home or Dehradun office
2. 📚 Learning & Growth — Dedicated time + budget for learning new tech
3. 🏆 Real Ownership — You own your work, not just tickets in a queue
4. 🚀 Startup Speed — Ship fast, learn faster, grow your career at startup pace
5. 👥 Direct Mentorship — Learn directly from seniors, no corporate layers
6. 🎓 Certificate + LOR — For interns: formal certificate + Letter of Recommendation
7. 🤝 Friendly Culture — Small team, big impact, zero politics
```

#### Section 3: Benefits & Perks
```
Tag: "WHAT YOU GET"
Title: "Benefits that actually matter"

Grid of benefit cards:
Full-time:
  ✅ Competitive salary
  ✅ Hybrid work (remote + office)
  ✅ Fast career growth
  ✅ Real project ownership
  ✅ Learning budget
  ✅ Friendly team culture

Internships:
  ✅ Paid/Unpaid (role-specific)
  ✅ Flexible duration
  ✅ Certificate on completion
  ✅ Letter of Recommendation
  ✅ Real project experience
  ✅ Mentorship from seniors
```

#### Section 4: Hiring Process
```
Tag: "HOW WE HIRE"
Title: "Our hiring process"

NOTE: This section is DYNAMIC — each job listing has its own
custom process steps set by admin. This section shows DEFAULT
process as a general guide, but individual job pages show
their specific process.

Default display (can be overridden per job):
Step 1 → Apply Online
Step 2 → Resume Review (7 days)
Step 3 → Screening / Task
Step 4 → Interview
Step 5 → Offer 🎉

Timeline note: "We aim to respond within 7 business days"
```

#### Section 5: Job Listings
```
Tag: "OPEN POSITIONS"
Title: "Find your role at Adruva"

Filter bar:
  - Type: All | Full-time | Internship | Freelance
  - Department: All | Web Dev | Mobile | AI/ML | Design | Marketing | SEO | Social | Video | Sales | HR | Operations | [admin-added]
  - Location: All | Remote | Hybrid | On-site

Job cards grid (2-column):
Each card:
  - Job title (Poppins 600)
  - Type badge (Full-time/Intern/Freelance) + Department badge
  - Location badge (Remote/Hybrid/On-site)
  - Experience level
  - Salary/Stipend range (or "Competitive" if hidden)
  - Openings: "2 openings"
  - Deadline: "Apply by Jun 30"
  - 3-line description preview
  - "View & Apply →" button

Click → opens job detail page or modal
```

#### Section 6: Job Detail Page (`/careers/[slug]`)
```
Full job detail:
1. Header: Title + Type + Department + Location badges
2. Quick info bar: Experience | Openings | Deadline | Stipend/Salary
3. About the role (full description)
4. What you'll do (responsibilities list)
5. What we're looking for (requirements list)
6. Skills required (tag pills)
7. Our process (custom steps set by admin for this job)
8. Perks for this role
9. Application form (inline on same page)
```

#### Section 7: Application Form (per job)
```
Fields:
- Full Name *
- Email Address *
- Phone Number *
- Current Location *
- Highest Qualification * (dropdown)
- Experience Level * (fresher/1-2yr/3-5yr/5+yr)
- Resume * (PDF upload, max 5MB → Cloudinary)
- Portfolio URL (optional — for design/dev roles)
- LinkedIn URL (optional)
- Cover Letter * (textarea, min 100 chars)
- "Why do you want to join Adruva?" * (textarea)
- How did you hear about us? (dropdown)
- reCAPTCHA v3 (invisible)

Submit button: "Submit Application →"

On submit:
1. Toast: "Application submitted! We'll review and respond within 7 business days."
2. Auto-reply email to candidate (with culture info + what to expect)
3. Email notification to team (careers@adruvaSolution.com)
4. WhatsApp notification to hiring manager
5. Application saved in DB → visible in admin panel
6. AdruvaCRM webhook (optional — create lead)
```

---

## 3. Auto-Reply Email to Candidate

```
Subject: "Application received — [Job Title] at Adruva Solution 🚀"

Hi [Name],

Thanks for applying for [Job Title] at Adruva Solution!

We've received your application and our team will review it within 7 business days.

What happens next:
1. Our team reviews your application
2. If shortlisted, we'll reach out for a screening call
3. Role-specific task/assignment (if applicable)
4. Final interview
5. Offer 🎉

While you wait, learn more about us:
→ Our Work: [website/work]
→ Our Blog: [website/blog]
→ Follow us on LinkedIn: [linkedin]

Best regards,
Team Adruva Solution
hello@adruvaSolution.com
```

---

## 4. Database Schema

```sql
-- Job Listings
CREATE TABLE website_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL,        -- full_time | internship | freelance
  department VARCHAR(100) NOT NULL,
  location_type VARCHAR(50),        -- remote | hybrid | onsite
  experience_level VARCHAR(50),     -- fresher | 0-1yr | 1-3yr | 3-5yr | 5+yr
  description TEXT,
  responsibilities TEXT[],
  requirements TEXT[],
  skills_required TEXT[],
  salary_min INT,                   -- monthly in INR (null = not disclosed)
  salary_max INT,
  salary_label VARCHAR(100),        -- "₹15,000 – ₹25,000/month" or "Competitive"
  is_paid BOOLEAN DEFAULT true,     -- for internships
  duration VARCHAR(100),            -- "3 months" or "Flexible"
  openings_count INT DEFAULT 1,
  application_deadline DATE,
  process_steps JSONB,              -- [{step: 1, title: "Apply", description: "..."}]
  perks TEXT[],
  status VARCHAR(20) DEFAULT 'draft', -- draft | active | closed | paused
  created_by UUID REFERENCES website_admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Job Applications
CREATE TABLE website_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES website_jobs(id),
  job_title VARCHAR(255),           -- denormalized for history
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  current_location VARCHAR(100),
  qualification VARCHAR(100),
  experience_level VARCHAR(50),
  resume_url TEXT,                  -- Cloudinary URL
  resume_cloudinary_id TEXT,
  portfolio_url TEXT,
  linkedin_url TEXT,
  cover_letter TEXT,
  why_join TEXT,
  referral_source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new', -- new | reviewed | shortlisted | task_sent | interview_scheduled | selected | rejected
  internal_rating INT,              -- 1-5 stars (set by admin)
  admin_notes TEXT,
  reviewed_by UUID REFERENCES website_admin_users(id),
  crm_lead_id VARCHAR(255),
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_jobs_status ON website_jobs(status);
CREATE INDEX idx_jobs_type ON website_jobs(type);
CREATE INDEX idx_jobs_department ON website_jobs(department);
CREATE INDEX idx_applications_job ON website_applications(job_id);
CREATE INDEX idx_applications_status ON website_applications(status);
CREATE INDEX idx_applications_created ON website_applications(created_at DESC);
```

---

## 5. API Routes

```
Public:
GET  /api/v1/careers                    → List active jobs (with filters)
GET  /api/v1/careers/:slug              → Single job detail
POST /api/v1/careers/:jobId/apply       → Submit application

Admin:
GET  /api/v1/admin/careers              → List all jobs (all statuses)
POST /api/v1/admin/careers              → Create job
PATCH /api/v1/admin/careers/:id         → Update job
PATCH /api/v1/admin/careers/:id/status  → Toggle active/closed/paused
DELETE /api/v1/admin/careers/:id        → Soft delete

GET  /api/v1/admin/applications                    → List all applications
GET  /api/v1/admin/applications/:id                → Single application detail
PATCH /api/v1/admin/applications/:id/status        → Update status
PATCH /api/v1/admin/applications/:id/rating        → Set internal rating
PATCH /api/v1/admin/applications/:id/notes         → Add internal notes
POST /api/v1/admin/applications/:id/email          → Email candidate directly
GET  /api/v1/admin/applications/export             → Export CSV
GET  /api/v1/admin/careers/analytics               → Hiring analytics data
```

### GET /api/v1/careers Query Params
```
?type=internship&department=web-development&location=remote&status=active
```

---

## 6. Admin Panel — Careers Module

### Access Control
| Role | Permissions |
|---|---|
| owner | Full access — create/edit/delete jobs + manage applications |
| manager | Create/edit jobs + manage applications (no delete) |
| content_writer | View only |
| HR (future role) | Full careers access |

### Admin Sidebar (add after Newsletter)
```
📋 Careers
  ├── Job Listings
  └── Applications
```

### Job Listings Page (`/admin/careers`)
```
Header: "Job Listings" + "+ Post New Job" button
Stats row: Active Jobs | Total Applications | This Week | Avg per Job

Filter tabs: All | Active | Draft | Closed | Paused

Table columns:
Title | Type | Department | Applications | Status | Deadline | Actions

Actions per row:
- Edit
- Toggle Active/Closed (quick toggle)
- View Applications
- Duplicate
- Delete
```

### Create/Edit Job Page (`/admin/careers/new`)
```
Form sections:

Basic Info:
  - Job Title *
  - Slug (auto-generated, editable)
  - Type * (Full-time / Internship / Freelance)
  - Department * (dropdown + "Add new department" option)
  - Location Type * (Remote / Hybrid / On-site)
  - Experience Level * (Fresher / 0-1yr / 1-3yr / 3-5yr / 5+yr)
  - Number of Openings *
  - Application Deadline (date picker)
  - Status (Draft / Active / Closed / Paused)

Compensation:
  - Is Paid? (toggle — for internships)
  - Salary/Stipend Min (₹)
  - Salary/Stipend Max (₹)
  - Display Label (e.g. "₹15,000–25,000/month" or "Competitive")
  - Duration (for internships — text field e.g. "3 months" or "Flexible")

Job Details:
  - About this role (rich textarea)
  - What you'll do (bullet list editor — add/remove items)
  - What we're looking for (bullet list editor)
  - Skills Required (tag input — type + Enter)
  - Perks for this role (tag input)

Hiring Process:
  - Custom steps (dynamic add/remove):
    Each step: Step number (auto) + Title + Description
    Default pre-filled: Apply → Review → Interview → Offer
    Admin can add/remove/reorder steps

SEO:
  - Meta title (auto from job title)
  - Meta description

Buttons: "Save Draft" | "Publish Job"
```

### Applications Manager (`/admin/applications`)
```
Filter: All | Job title | Status | Date range | Department
Search: by name, email

Table:
Candidate | Job Applied | Status | Rating | Applied Date | Actions

Status pipeline (color coded):
🔵 New
👁️ Reviewed
⭐ Shortlisted
📝 Task Sent
📅 Interview Scheduled
✅ Selected
❌ Rejected
```

### Application Detail View (Modal/Page)
```
Left panel:
  - Candidate info (name, email, phone, location)
  - Qualification + Experience level
  - Applied for: [Job Title]
  - Applied on: [date]
  - Referral source

Center panel:
  - Cover Letter (full text)
  - Why Join Adruva (full text)
  - Internal Notes (editable textarea)

Right panel:
  - Resume (PDF preview + Download button)
  - Portfolio URL (opens in new tab)
  - LinkedIn URL (opens in new tab)
  - Internal Rating (1–5 stars, click to set)
  - Status (dropdown)
  - "Email Candidate" button (opens compose modal)
  - "Move to CRM" button (creates lead in AdruvaCRM)
```

### Email Candidate (from Admin)
```
Compose modal:
  - To: [candidate email] (pre-filled, locked)
  - Subject: (pre-filled based on status, editable)
  - Body: (textarea with template suggestions)

Templates:
  - "Application Received" (auto-sent on apply)
  - "We'd like to schedule a call" (shortlist)
  - "Task Assignment" (send task)
  - "Interview Invitation"
  - "Congratulations! You're Selected"
  - "Application Update" (polite rejection)

Sent from: hello@adruvaSolution.com
Logged in application history
```

### Hiring Analytics Dashboard
```
Stats cards:
  - Total Applications (all time)
  - Applications This Month
  - Active Job Openings
  - Avg Applications per Job
  - Conversion Rate (Applied → Shortlisted)
  - Avg Time to Hire

Charts:
  - Applications over time (line chart, last 90 days)
  - Department-wise breakdown (bar chart)
  - Status distribution (donut chart)
  - Top performing job listings (table)
  - Source breakdown (how did they hear about us)

Export: "Export All Applications CSV" button
```

---

## 7. Navbar + Footer Updates

### Navbar (update)
```
Links order: Home | About | Services | Our Work | Blog | Careers | Contact
```

### Footer (update Company column)
```
Company links:
About Us
Our Work
Blog
Careers  ← ADD THIS
Contact
Privacy Policy
Terms
```

### About Page (add in team section)
```
Below team grid, add banner:
"We're growing! 🚀 Check out our open positions →"
Link to /careers
```

---

## 8. Build Order for Careers Module

```
Phase 4 (add to existing Phase 4):

Step A: DB tables
  - CREATE TABLE website_jobs
  - CREATE TABLE website_applications
  - Add indexes

Step B: API routes
  - Public careers endpoints
  - Admin careers + applications endpoints

Step C: /careers public page
  - All sections (hero, culture, benefits, process, listings)
  - Job detail page /careers/[slug]
  - Application form + submission flow
  - Auto-reply email

Step D: Admin panel
  - Careers sidebar item
  - Job listings page + create/edit form
  - Applications manager
  - Application detail view
  - Email candidate feature
  - Analytics dashboard

Step E: Navbar + Footer update
  - Add Careers to navbar
  - Add Careers to footer
  - Add hiring banner on About page
```

---

## 9. Update CLAUDE.md

Add to Pages Overview:
```
| Careers Listing | /careers | Public |
| Job Detail | /careers/[slug] | Public |
| Admin Jobs | /admin/careers | Protected |
| Admin Applications | /admin/applications | Protected |
```

Add to Admin Sidebar:
```
📋 Careers (owner + manager + HR)
```

Add to Service Categories note:
```
Departments (dynamic, admin-managed):
Web Development, Mobile, AI/ML, UI/UX Design, Digital Marketing,
SEO, Social Media, Video Editing, Graphic Design, Sales, HR, Operations
+ any custom department admin adds
```
