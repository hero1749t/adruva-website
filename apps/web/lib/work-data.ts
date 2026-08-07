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
      "The Bali Yoga Teacher Training Center was using a legacy WordPress and WooCommerce setup that struggled to handle traffic surges. Whenever new batches or seasonal discounts were announced, server response times spiked to over 15 seconds, frequently causing complete site crashes. This bottleneck directly led to lost bookings during peak sales windows.\n\nFurthermore, students enrolling from various parts of the world—including Europe, the USA, and South America—faced constant payment transaction failures. The legacy plugin stack lacked localized currency support and intelligent routing for international credit cards, causing frustrated customers to abandon their carts. The sales team had no visibility into these dropped registrations, with no way to follow up or recover high-value leads.",
    solution:
      "To address these infrastructure and conversion challenges, we built a modern headless booking ecosystem from the ground up.\n\nWe separated the user experience by building a high-speed Next.js frontend deployed on Vercel. For the backend, we developed a robust, highly performant NestJS API running on a scalable Docker instance. This decoupled architecture brought server response times down to under 150ms and completely eliminated launch-day server crashes.\n\nTo optimize the global booking flow, we implemented dynamic internationalization (i18n) and integrated a smart payment router using Stripe and PayPal. The system automatically detects the student's country, displays localized pricing, and handles multi-currency transactions smoothly. We also built a custom database logging pipeline that captures incomplete registrations. When a student abandons their checkout, the sales team receives a real-time notification on a custom-designed dashboard, enabling them to reach out and recover sales immediately.",
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
      "Vintage Tours & Travels was losing significant organic search traffic to massive aggregator platforms. Their legacy site suffered from poor mobile optimization, slow load times on slow 3G/4G networks, and lacked a structured layout for displaying complex custom travel itineraries. This made it difficult for adventure travelers to explore packages and make direct queries.\n\nAdditionally, search engines could not properly index their high-quality Himalayan itineraries because the website lacked structured schema markup. Without local search relevance, the brand was virtually invisible on search result pages, even when potential clients searched for premium adventure tours in their target geographic regions.",
    solution:
      "We implemented a comprehensive digital transformation strategy focusing on mobile-first user experience and advanced search engine optimization (SEO).\n\nFirst, we redesigned and rebuilt the client interface using React and Tailwind CSS, focusing on micro-interactions and smooth navigation. We implemented a dynamic custom package planner that allows users to visualize and customize their itineraries interactively, integrated with the Google Maps API for visual route mapping. Every image and asset was optimized, bringing their Google PageSpeed score from 40 to 98+.\n\nTo drive organic growth, we structured detailed schema tags (local business, product, and breadcrumb schemas) across the entire platform. This optimization allowed search engines to index and feature their tours directly in search snippets. Within three months, the site ranked on Page 1 of Google for premium adventure travel keywords, bringing in a massive surge of organic inquiries without paid ad spend.",
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
      "Traditional restaurants face a major operational bottleneck during rush hours. Waiters spend a significant portion of their shifts running back and forth between tables, cash registers, and the kitchen, leading to order dispatch delays and frequent kitchen communication errors.\n\nManual billing and ticket writing resulted in an average order error rate of 12%, causing food waste and customer dissatisfaction. Furthermore, restaurant owners had no real-time data on table turnover rates, peak sales hours, or dish popularity, making inventory management and staffing decisions highly inefficient.",
    solution:
      "We engineered 'Adruva Resto', an offline-first restaurant automation SaaS platform designed to streamline operations from ordering to billing.\n\nWe created a web application that works by scanning table-specific QR codes. Customers can browse the rich, visual menu, customize orders (such as selecting spice levels or add-ons), and send orders directly to the kitchen without needing to install any app. The orders are dispatched instantly to a tablet-based kitchen dashboard via WebSockets.\n\nTo ensure uninterrupted operations during internet outages, we implemented a local backup synchronization system. Orders are stored locally in the browser's IndexedDB database and synchronized with a local kitchen server, then pushed to the cloud once the connection is restored. The backend dashboard provides owners with real-time billing metrics, daily revenue charts, table turnover statistics, and live inventory alerts, reducing order dispatch errors by 90% and increasing table turnover speed by 25%.",
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
