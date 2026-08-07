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
    title: "Bali Yoga Teacher Training",
    slug: "bali-yoga-teacher-training",
    category: "build",
    industry: "education",
    techStack: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Tailwind CSS",
      "TanStack Query",
    ],
    heroGradient: "from-orange-600 to-amber-950",
    isFeatured: true,
    clientName: "Bali Yoga Teacher Training Center",
    timeline: "10 weeks",
    overview:
      "A high-performance headless booking engine and CRM database built to manage yoga teacher training course enrollments and payments worldwide.",
    problem:
      "The school relied on a slow WordPress installation that crashed during high-traffic batch announcements. Students faced transaction failures on overseas credit cards, and the sales team struggled to track abandoned registrations.",
    solution:
      "We decoupled the system into a headless Next.js frontend and a NestJS backend. We integrated dynamic internationalization (i18n), secure multi-currency payment pipelines (Stripe/PayPal), and custom abandoned-cart logs that alert the sales team via instant dashboards.",
    results: [
      { metric: "240%", label: "Increase in Booking Conversion" },
      { metric: "0%", label: "Server Downtime in Launches" },
      { metric: "35%", label: "Recaptured Cart Leads" },
    ],
    gallery: [
      "from-orange-800 to-amber-900",
      "from-rose-900/50 to-orange-950",
      "from-amber-950 to-yellow-900",
    ],
  },
  {
    title: "Vintage Tours & Travels",
    slug: "vintage-tours-and-travels",
    category: "grow",
    industry: "retail",
    techStack: ["React", "Tailwind CSS", "Google Maps API", "SEO Optimization"],
    heroGradient: "from-cyan-900 to-emerald-950",
    isFeatured: true,
    clientName: "Vintage Tours & Travels India",
    timeline: "8 weeks",
    overview:
      "A complete organic search optimization and custom package booking engine that positioned the brand on Page 1 for premium adventure tours.",
    problem:
      "The agency was losing organic traffic to massive aggregators. Their site had poor mobile UX, slow load times, and no clear booking flow for international customers seeking custom Himalayan itineraries.",
    solution:
      "We rebuilt the customer journey with a mobile-first catalog, integrated a dynamic travel package planner, structured schema tags for local search relevance, and optimized media rendering to achieve 98+ PageSpeed scores.",
    results: [
      { metric: "+180%", label: "Organic Search Traffic" },
      { metric: "No. 1", label: "Local Map Rankings" },
      { metric: "4.2x", label: "Inbound Package Queries" },
    ],
    gallery: [
      "from-cyan-950 to-emerald-950",
      "from-teal-900 to-green-950",
      "from-emerald-900 to-cyan-900",
    ],
  },
  {
    title: "Adruva Resto System",
    slug: "adruva-resto-system",
    category: "automate",
    industry: "technology",
    techStack: ["React", "Prisma", "Tailwind CSS", "Node.js", "WebSocket"],
    heroGradient: "from-rose-950 to-orange-950",
    isFeatured: true,
    clientName: "Adruva Hospitality Group",
    timeline: "6 weeks",
    overview:
      "An advanced offline-first restaurant SaaS platform with contactless QR code menus, instant order dispatching, and live billing metrics.",
    problem:
      "Restaurants suffered high cart abandonment on tables during rush hours. Waiters spent too much time writing manual tickets, leading to dispatch errors and lost analytics data.",
    solution:
      "We designed a localized QR-menu browser app that requires zero app installs. Customers scan, order, and pay directly. The system syncs in real-time with the kitchen dashboard via WebSockets and features local backup database sync in case of Internet dropouts.",
    results: [
      { metric: "25%", label: "Faster Table Turnover" },
      { metric: "-90%", label: "Order Dispatch Errors" },
      { metric: "18%", label: "Average Bill Value Growth" },
    ],
    gallery: [
      "from-rose-950 to-orange-950",
      "from-red-900 to-amber-950",
      "from-orange-900/60 to-rose-950",
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
