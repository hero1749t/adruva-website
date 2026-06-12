export interface ProjectResult {
  metric: string;
  label: string;
}

export interface ProjectItem {
  title: string;
  slug: string;
  category: "build" | "automate" | "grow" | "design";
  industry: "technology" | "education" | "retail" | "healthcare";
  techStack: string[];
  heroGradient: string;
  isFeatured: boolean;
  problem: string;
  solution: string;
  results: ProjectResult[];
  gallery: string[];
  clientName: string;
  timeline: string;
  overview: string;
}

export const projects: ProjectItem[] = [
  {
    title: "Agency Management Platform",
    slug: "agency-management-platform",
    category: "build",
    industry: "technology",
    techStack: ["Next.js", "NestJS", "PostgreSQL"],
    heroGradient: "from-slate-900 to-blue-950",
    isFeatured: true,
    clientName: "Delhi-based Tech Startup",
    timeline: "8 weeks",
    overview:
      "A custom, scalable agency workflow operating tool designed to manage teams, leads, and invoicing with zero monthly per-seat fees.",
    problem:
      "Our client was managing projects and invoicing across five fragmented SaaS tools, resulting in disconnected client data and mounting subscription overhead. They needed a single, unified database system that could scale to hundreds of client processes without per-seat licensing penalties.",
    solution:
      "We designed and built a bespoke workflow operating system using Next.js and NestJS. The platform features role-based access control, a secure customer portal, drag-and-drop task boards, and automated invoice runs powered by PostgreSQL databases.",
    results: [
      { metric: "₹0", label: "Monthly SaaS Fees" },
      { metric: "40%", label: "Operational Efficiency" },
      { metric: "12,000+", label: "Active Projects Managed" },
    ],
    gallery: [
      "from-slate-800 to-slate-900",
      "from-blue-900/50 to-indigo-900/50",
      "from-emerald-950 to-teal-900",
    ],
  },
  {
    title: "Education Institute Growth",
    slug: "education-institute-growth",
    category: "grow",
    industry: "education",
    techStack: ["Google Ads", "Meta Ads", "SEO"],
    heroGradient: "from-orange-950 to-red-950",
    isFeatured: true,
    clientName: "Dehradun Coaching Academy",
    timeline: "12 weeks",
    overview:
      "A high-converting search and social advertising funnel coupled with local search optimizations to drive direct student admissions.",
    problem:
      "A local coaching academy relied purely on pamphlets and local word-of-mouth, failing to capture digital search intent in their area. They struggled to run ads that yielded high-intent enrollment leads, and their site ranked poorly for key terms.",
    solution:
      "We audited their site and performed on-page local SEO optimizations. Concurrently, we launched targeted search campaigns on Google Ads and demographic-filtered lead forms on Meta Ads, driving users to optimized landing page builders.",
    results: [
      { metric: "3.2x", label: "Increase in Enquiries" },
      { metric: "Page 1", label: "Google Local Map Pack" },
      { metric: "-45%", label: "Cost-Per-Lead Reduction" },
    ],
    gallery: [
      "from-yellow-950 to-amber-900",
      "from-orange-950 to-red-950",
      "from-stone-900 to-neutral-950",
    ],
  },
  {
    title: "AI-Powered CRM System",
    slug: "ai-powered-crm",
    category: "automate",
    industry: "technology",
    techStack: ["React", "Node.js", "OpenAI"],
    heroGradient: "from-emerald-950 to-teal-950",
    isFeatured: true,
    clientName: "Regional Real Estate Group",
    timeline: "6 weeks",
    overview:
      "An automated agent qualifying CRM integrated with OpenAI to score, route, and follow up with incoming properties requests 24/7.",
    problem:
      "Sales agents were spending 15+ hours weekly answering standard repetitive property questions and manually routing leads from Web portals. Inbound leads arriving outside business hours routinely went cold before follow-ups occurred.",
    solution:
      "We integrated n8n automations linking their listing portals with a private database and the OpenAI API. The AI assistant now qualifies user intent via WhatsApp instantly, catalogs preferences, and routes hot leads to agents with full chat summaries.",
    results: [
      { metric: "24/7", label: "Lead Response Coverage" },
      { metric: "18 hours", label: "Saved per Agent Weekly" },
      { metric: "82%", label: "WhatsApp Engagement Rate" },
    ],
    gallery: [
      "from-zinc-900 to-indigo-950",
      "from-indigo-900 to-purple-950",
      "from-cyan-950 to-blue-950",
    ],
  },
  {
    title: "E-commerce Mobile App",
    slug: "ecommerce-mobile-app",
    category: "build",
    industry: "retail",
    techStack: ["React Native", "Firebase"],
    heroGradient: "from-slate-900 to-blue-950",
    isFeatured: false,
    clientName: "Direct-to-Consumer Apparel Brand",
    timeline: "10 weeks",
    overview:
      "A clean, high-performance shopping app built in React Native with push notifications and custom checkouts.",
    problem:
      "An online clothing store noticed that over 80% of customer purchases were occurring on mobile browsers, but conversion rates were dropping due to friction during standard mobile browser checkouts.",
    solution:
      "We built a streamlined shopping application using React Native, implementing cross-platform payments (Stripe/Razorpay), Firebase push reminders for abandoned shopping carts, and biometric login parameters.",
    results: [
      { metric: "28%", label: "Increase in Checkout Conversions" },
      { metric: "4.8★", label: "App Store Rating" },
      { metric: "35%", label: "Repeat Customer Growth" },
    ],
    gallery: [
      "from-slate-800 to-slate-900",
      "from-blue-900/50 to-indigo-900/50",
      "from-emerald-950 to-teal-900",
    ],
  },
  {
    title: "Local Business SEO Campaign",
    slug: "local-business-seo",
    category: "grow",
    industry: "retail",
    techStack: ["SEO", "Content", "Analytics"],
    heroGradient: "from-orange-950 to-red-950",
    isFeatured: false,
    clientName: "Organic Food Retailer",
    timeline: "16 weeks",
    overview:
      "An organic content and structural search strategy that ranked their physical store top in local map results.",
    problem:
      "Our client operated a retail organic store but struggled to show up when travelers or local residents searched for organic products near them, losing business to large chains.",
    solution:
      "We overhauled their site hierarchy, optimized code speeds, mapped localized schema, and published highly targeted blog answers. We also configured and optimized their Google Business Profile listings.",
    results: [
      { metric: "+200%", label: "Organic Search Traffic" },
      { metric: "#1 Rank", label: "For Local Organic Groceries" },
      { metric: "150+", label: "Monthly Map Direction Clicks" },
    ],
    gallery: [
      "from-yellow-950 to-amber-900",
      "from-orange-950 to-red-950",
      "from-stone-900 to-neutral-950",
    ],
  },
  {
    title: "Brand Identity Package",
    slug: "brand-identity-package",
    category: "design",
    industry: "technology",
    techStack: ["Figma", "Illustrator"],
    heroGradient: "from-emerald-950 to-teal-950",
    isFeatured: false,
    clientName: "B2B Software Agency",
    timeline: "4 weeks",
    overview:
      "A complete typography, logo, and mock-up visual design package highlighting professional software engineering.",
    problem:
      "A newly launched tech provider had strong backend credentials but looked unprofessional to enterprise clients due to mismatched branding assets, inconsistent styles, and an outdated logo.",
    solution:
      "We researched competitor styles and designed three distinct logo directions in Figma. After refining, we built complete style specifications, business card vector layouts, and pitch deck templates.",
    results: [
      { metric: "100%", label: "Custom Vector Assets" },
      { metric: "20+", label: "Deliverable Style Templates" },
      { metric: "Consistent", label: "Brand Visual Alignment" },
    ],
    gallery: [
      "from-zinc-900 to-indigo-950",
      "from-indigo-900 to-purple-950",
      "from-cyan-950 to-blue-950",
    ],
  },
];

export const WORK_SLUGS = projects.map((p) => p.slug);
export const FEATURED_PROJECTS = projects.filter((p) => p.isFeatured);

export function mapDbProjectToProjectItem(dbProject: any): ProjectItem {
  let results: ProjectResult[] = [];
  if (Array.isArray(dbProject.results)) {
    results = dbProject.results as ProjectResult[];
  } else if (typeof dbProject.results === "string") {
    try {
      results = JSON.parse(dbProject.results);
    } catch {
      // ignore
    }
  }

  let gallery: string[] = [];
  if (Array.isArray(dbProject.galleryImages)) {
    gallery = dbProject.galleryImages as string[];
  } else if (typeof dbProject.galleryImages === "string") {
    try {
      gallery = JSON.parse(dbProject.galleryImages);
    } catch {
      // ignore
    }
  }

  return {
    title: dbProject.title,
    slug: dbProject.slug,
    category: (dbProject.category || "build") as any,
    industry: (dbProject.industry || "technology") as any,
    techStack: dbProject.techStack || [],
    heroGradient: dbProject.heroImageUrl || "from-slate-900 to-blue-950",
    isFeatured: dbProject.isFeatured || false,
    problem: dbProject.problem || "",
    solution: dbProject.solution || "",
    results:
      results.length > 0 ? results : [{ metric: "100%", label: "Success" }],
    gallery: gallery.length > 0 ? gallery : ["from-slate-800 to-slate-900"],
    clientName: dbProject.clientName || "Adruva Client",
    timeline: "Ongoing",
    overview: dbProject.metaDescription || dbProject.title,
  };
}
