export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface JobListing {
  id: string;
  title: string;
  slug: string;
  type: 'full_time' | 'internship' | 'freelance';
  department: string;
  location_type: 'remote' | 'hybrid' | 'onsite';
  experience_level: 'fresher' | '0-1yr' | '1-3yr' | '3-5yr' | '5+yr';
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills_required: string[];
  salary_min: number | null;
  salary_max: number | null;
  salary_label: string;
  is_paid: boolean;
  duration?: string;
  openings_count: number;
  application_deadline: string;
  process_steps: ProcessStep[];
  perks: string[];
  status: 'draft' | 'active' | 'closed' | 'paused';
}

export const DEPARTMENTS = [
  'Web Dev',
  'Mobile',
  'AI/ML',
  'Design',
  'Marketing',
  'SEO',
  'Social',
  'Video',
  'Sales',
  'HR',
  'Operations',
] as const;

export const JOB_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'full_time', label: 'Full-Time' },
  { value: 'internship', label: 'Internship' },
  { value: 'freelance', label: 'Freelance' },
] as const;

export const LOCATIONS = [
  { value: 'all', label: 'All Locations' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid (Dehradun)' },
  { value: 'onsite', label: 'On-site (Dehradun)' },
] as const;

export const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  { step: 1, title: 'Apply Online', description: 'Submit your resume and cover letter answering our core questions.' },
  { step: 2, title: 'Resume Review', description: 'Our hiring manager reviews your portfolio and experience within 7 business days.' },
  { step: 3, title: 'Practical Screening', description: 'A short, role-specific task to assess your real-world problem-solving skills.' },
  { step: 4, title: 'Technical Interview', description: 'A 45-minute video call discussing your task solution and technical choices.' },
  { step: 5, title: 'Hiring Offer', description: 'Welcome to the team! We roll out formal offers with complete milestone benefits.' },
];

export const mockJobs: JobListing[] = [
  {
    id: 'f9b7c89a-0e9e-4e4e-8622-c3a8e7e1f40b',
    title: 'Full Stack Developer',
    slug: 'full-stack-developer',
    type: 'full_time',
    department: 'Web Dev',
    location_type: 'hybrid',
    experience_level: '1-3yr',
    description: 'We are looking for a Full Stack Developer to join our growing engineering team in Dehradun. You will own client projects end-to-end, writing clean code in Next.js and NestJS, optimizing PostgreSQL databases, and collaborating directly with product managers.',
    responsibilities: [
      'Build and maintain highly responsive web applications using Next.js 14 and React.',
      'Design, implement, and document secure RESTful APIs using NestJS and TypeScript.',
      'Optimize relational databases (PostgreSQL) and write clean Prisma schemas.',
      'Collaborate with UI/UX designers to translate Figma visual assets into fluid, high-performing components.',
      'Participate in quick, agile sprints and perform peer code reviews to maintain code quality.',
    ],
    requirements: [
      '1–3 years of professional software development experience with JavaScript/TypeScript.',
      'Strong hands-on experience with Next.js (App Router), React, and Tailwind CSS.',
      'Solid understanding of backend engineering with Node.js/NestJS/Express.',
      'Familiarity with PostgreSQL database schema design and Prisma ORM.',
      'Ability to write structured, readable, and clean code with strict type-safety.',
      'Based in or willing to relocate to Dehradun (hybrid work environment).',
    ],
    skills_required: ['Next.js', 'NestJS', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Prisma'],
    salary_min: 35000,
    salary_max: 55000,
    salary_label: '₹35,000 – ₹55,000 / month',
    is_paid: true,
    openings_count: 2,
    application_deadline: '2026-06-30',
    process_steps: DEFAULT_PROCESS_STEPS,
    perks: [
      'Competitive monthly salary with scheduled performance bonuses.',
      'Hybrid work model (3 days office, 2 days remote).',
      'Dedicated monthly learning budget and tech courses.',
      'Ergonomic workstation setup at our Dehradun office.',
      'Regular team lunches, outings, and zero-politics startup culture.',
    ],
    status: 'active',
  },
  {
    id: 'a3d8f1e0-4c2f-48d8-912a-04b7dbd8a1e2',
    title: 'AI Automation Engineer',
    slug: 'ai-automation-engineer',
    type: 'full_time',
    department: 'AI/ML',
    location_type: 'remote',
    experience_level: '3-5yr',
    description: 'We are seeking an experienced AI Automation Engineer to design, build, and deploy intelligent system workflows for our enterprise clients. You will integrate Large Language Models (LLMs), build autonomous agents, connect custom CRM webhooks, and automate complex business operations.',
    responsibilities: [
      'Architect and deploy automated LLM agents and workflows using OpenAI API, LangChain, or n8n.',
      'Build custom API integrations and data-sync pipelines connecting client CRMs and messaging systems (WhatsApp, Slack, Email).',
      'Optimize AI prompts and context windows to ensure cost-efficiency and high-accuracy responses.',
      'Develop backend service modules in NestJS/Node.js to support internal automation platforms.',
      'Conduct rigorous performance evaluations and safety testings on deployed AI models.',
    ],
    requirements: [
      '3+ years of professional development experience, with at least 1 year dedicated to AI or workflow automations.',
      'Proficiency in Node.js/TypeScript and Python.',
      'Hands-on experience integrating OpenAI, Claude, or local LLM APIs.',
      'Familiarity with automation builders like n8n, Make, or custom automation scripting.',
      'Strong knowledge of Webhooks, REST APIs, and serverless architectures.',
      'Self-motivated, proactive, and capable of working in an isolated remote team.',
    ],
    skills_required: ['OpenAI API', 'n8n', 'Node.js', 'Python', 'TypeScript', 'Webhooks', 'LangChain'],
    salary_min: 60000,
    salary_max: 90000,
    salary_label: '₹60,000 – ₹90,000 / month',
    is_paid: true,
    openings_count: 1,
    application_deadline: '2026-06-25',
    process_steps: [
      { step: 1, title: 'Online Application', description: 'Submit your profile, GitHub repositories, and brief descriptions of AI tools you have built.' },
      { step: 2, title: 'Technical Review', description: 'Our lead architect evaluates your projects and code structure.' },
      { step: 3, title: 'AI Engineering Task', description: 'Build a mini-agent that qualifies inbound requests (completed in 48 hours).' },
      { step: 4, title: 'Architecture Interview', description: 'A deep-dive video session walking through your task and explaining system scale solutions.' },
      { step: 5, title: 'Offer & Onboarding', description: 'Formal salary and benefit proposal rolled out.' },
    ],
    perks: [
      '100% remote job alignment (work from anywhere in India).',
      'Premium learning courses, books, and conference budget allocations.',
      'Hardware allowance for workstation upgrades.',
      'Flexible working hours with clear milestone outcomes.',
      'High-impact roles working with cutting-edge OpenAI/Anthropic APIs.',
    ],
    status: 'active',
  },
  {
    id: 'b1e0d3c5-924f-4d8e-be89-a3d8f1e04c2f',
    title: 'UI/UX Designer Intern',
    slug: 'ui-ux-designer-intern',
    type: 'internship',
    department: 'Design',
    location_type: 'remote',
    experience_level: 'fresher',
    description: 'Adruva Solution is looking for a passionate UI/UX Design Intern. You will work directly with our design lead and engineering team to construct wireframes, design intuitive client dashboard layouts, map user flows, and compile complete Figma design systems for real-world products.',
    responsibilities: [
      'Create high-fidelity landing page layouts and web app dashboard designs in Figma.',
      'Conduct basic competitor reviews and map out responsive visual user journeys.',
      'Collaborate with developers to explain interaction details and review implemented UI styling.',
      'Help maintain and expand our shared UI library and typography components.',
      'Incorporate structured feedback from client reviews into designs.',
    ],
    requirements: [
      'Strong portfolio displaying visual design skills and understanding of web grids/typography (Figma).',
      'Basic knowledge of responsive design principles (desktop, tablet, mobile).',
      'A keen eye for layout harmony, harmonious color palettes, and clean aesthetics.',
      'Excellent communication skills to articulate design decisions.',
      'Available for a full-time, 6-month remote internship.',
    ],
    skills_required: ['Figma', 'UI Design', 'Wireframing', 'Responsive Design', 'User Flows'],
    salary_min: 8000,
    salary_max: 15000,
    salary_label: '₹8,000 – ₹15,000 / month',
    is_paid: true,
    duration: '6 months',
    openings_count: 1,
    application_deadline: '2026-06-20',
    process_steps: [
      { step: 1, title: 'Portfolio Submission', description: 'Share your Behance, Dribbble, or custom Figma links showcasing web/mobile layouts.' },
      { step: 2, title: 'Practical Challenge', description: 'Design a 3-page web flow based on a brief (expected time: 4-6 hours).' },
      { step: 3, title: 'Design Interview', description: 'Walk through your designs and discuss style components and user decisions.' },
      { step: 4, title: 'Offer Letter', description: 'Onboard as a paid intern with formal LOR and potential PPO options.' },
    ],
    perks: [
      'Paid monthly stipend.',
      'Formal Internship Certificate on completion.',
      'Letter of Recommendation (LOR) from the founders.',
      'Direct mentorship from a senior UI/UX designer.',
      'Pre-Placement Offer (PPO) potential based on performance.',
    ],
    status: 'active',
  },
  {
    id: 'c5b1e0d3-be89-4d8e-924f-a3d8f1e04c2f',
    title: 'SEO & Content Specialist Intern',
    slug: 'seo-content-intern',
    type: 'internship',
    department: 'SEO',
    location_type: 'hybrid',
    experience_level: 'fresher',
    description: 'We are seeking a high-energy SEO and Content Writing Intern based in Dehradun. You will learn the mechanics of search engine rankings, write search-intent blog content, analyze keywords, perform on-page SEO audits, and help grow organic traffic for Adruva and its clients.',
    responsibilities: [
      'Write highly readable, SEO-optimized articles, service headers, and landing page content.',
      'Perform detailed keyword research and competitor content gap analysis.',
      'Audit website meta tags, headings, internal link graphs, and image alt text parameters.',
      'Learn and compile backlinks outreach plans under senior marketing guidance.',
      'Track search rankings and core web impressions using Google Search Console and GA4.',
    ],
    requirements: [
      'Flawless written and spoken English with strong proofreading skills.',
      'Basic understanding of how search engines work and what SEO means.',
      'Eagerness to research complex topics and write clear, informative explanations.',
      'Familiarity with tools like Google Docs, Sheets, and basic internet search functions.',
      'Available for a 3-month hybrid internship at our Dehradun office.',
    ],
    skills_required: ['Content Writing', 'SEO Basics', 'Keyword Research', 'On-Page Audits', 'Google Search Console'],
    salary_min: 6000,
    salary_max: 10000,
    salary_label: '₹6,000 – ₹10,000 / month',
    is_paid: true,
    duration: '3 months',
    openings_count: 2,
    application_deadline: '2026-06-25',
    process_steps: [
      { step: 1, title: 'Writing Samples Review', description: 'Submit 2-3 links or files of your written articles, academic drafts, or reviews.' },
      { step: 2, title: 'Content Task', description: 'Write a 600-word informative guide based on an assigned keyword brief.' },
      { step: 3, title: 'Review Interview', description: 'A short chat at our office discussing content angles, structure, and career plans.' },
      { step: 4, title: 'Stipend Onboarding', description: 'Offer letter signoff for the 3-month internship.' },
    ],
    perks: [
      'Paid monthly stipend.',
      'Formal Internship Certificate.',
      'Letter of Recommendation (LOR) for future placements.',
      'Practical training in premium industry tools (Ahrefs, Semrush, Screaming Frog).',
      'Daily mentorship from our senior digital marketers.',
    ],
    status: 'active',
  },
];
