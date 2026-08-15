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
    heroGradient: "/work/bali-yoga.jpg",
    isFeatured: true,
    clientName: "Bali Yoga Teacher Training Center",
    timeline: "10 weeks",
    overview:
      "A high-performance headless booking engine and CRM database built to manage yoga teacher training course enrollments and payments worldwide. Developed to replace a legacy WooCommerce store, this system features a decoupled architecture that separates the static marketing pages from the dynamic booking funnel.",
    problem:
      "The Bali Yoga Teacher Training Center was using a legacy WordPress and WooCommerce setup that struggled to handle traffic surges. Whenever new batches or seasonal discounts were announced, server response times spiked to over 15 seconds, frequently causing complete site crashes. This bottleneck directly led to lost bookings during peak sales windows.\n\nFurthermore, students enrolling from various parts of the world—including Europe, the USA, and South America—faced constant payment transaction failures. The legacy plugin stack lacked localized currency support and intelligent routing for international credit cards, causing frustrated customers to abandon their carts. The sales team had no visibility into these dropped registrations, with no way to follow up or recover high-value leads.\n\nIn addition, the content editors found it extremely difficult to update course dates, pricing, and accommodation packages dynamically. The legacy Gutenberg page builder was slow and bloated, making it impossible to scale the business to multiple locations across Bali.",
    solution:
      "To address these infrastructure and conversion challenges, we built a modern headless booking ecosystem from the ground up.\n\nWe separated the user experience by building a high-speed Next.js frontend deployed on Vercel. For the backend, we developed a robust, highly performant NestJS API running on a scalable Docker instance. This decoupled architecture brought server response times down to under 150ms and completely eliminated launch-day server crashes.\n\nTo optimize the global booking flow, we implemented dynamic internationalization (i18n) and integrated a smart payment router using Stripe and PayPal. The system automatically detects the student's country, displays localized pricing, and handles multi-currency transactions smoothly. We also built a custom database logging pipeline that captures incomplete registrations. When a student abandons their checkout, the sales team receives a real-time notification on a custom-designed dashboard, enabling them to reach out and recover sales immediately.\n\nFor security, we configured CSRF protection, strict CORS origins, and encrypted database connections. The entire system is built to comply with PCI-DSS standards for cardholder data safety. An automated backup cron job runs every 6 hours, storing encrypted database snapshots in AWS S3 buckets to ensure zero data loss.",
    results: [
      { metric: "240%", label: "Increase in Booking Conversion" },
      { metric: "0%", label: "Server Downtime in Launches" },
      { metric: "35%", label: "Recaptured Cart Leads" },
    ],
    gallery: [
      "/work/bali-yoga.jpg",
      "/work/vintage-tours.jpg",
      "/work/adruva-resto.jpg",
    ],
  },
  {
    title: "Vintage Tours & Travels",
    slug: "vintage-tours-and-travels",
    category: "grow",
    industry: "retail",
    techStack: ["React", "Tailwind CSS", "Google Maps API", "SEO Optimization"],
    heroGradient: "/work/vintage-tours.jpg",
    isFeatured: true,
    clientName: "Vintage Tours & Travels India",
    timeline: "8 weeks",
    overview:
      "A complete organic search optimization and custom package booking engine that positioned the brand on Page 1 for premium adventure tours. Redesigned to support complex custom itineraries and local SEO rankings across the Himalayan region.",
    problem:
      "Vintage Tours & Travels was losing significant organic search traffic to massive aggregator platforms. Their legacy site suffered from poor mobile optimization, slow load times on slow 3G/4G networks, and lacked a structured layout for displaying complex custom travel itineraries. This made it difficult for adventure travelers to explore packages and make direct queries.\n\nAdditionally, search engines could not properly index their high-quality Himalayan itineraries because the website lacked structured schema markup. Without local search relevance, the brand was virtually invisible on search result pages, even when potential clients searched for premium adventure tours in their target geographic regions.\n\nFurthermore, the agency had no centralized dashboard to manage client enquiries, track booking stages, or update package itineraries dynamically, leading to human errors and missed emails.",
    solution:
      "We implemented a comprehensive digital transformation strategy focusing on mobile-first user experience and advanced search engine optimization (SEO).\n\nFirst, we redesigned and rebuilt the client interface using React and Tailwind CSS, focusing on micro-interactions and smooth navigation. We implemented a dynamic custom package planner that allows users to visualize and customize their itineraries interactively, integrated with the Google Maps API for visual route mapping. Every image and asset was optimized, bringing their Google PageSpeed score from 40 to 98+.\n\nTo drive organic growth, we structured detailed schema tags (local business, product, and breadcrumb schemas) across the entire platform. This optimization allowed search engines to index and feature their tours directly in search snippets. Within three months, the site ranked on Page 1 of Google for premium adventure travel keywords, bringing in a massive surge of organic inquiries without paid ad spend.\n\nTo streamline back-office operations, we developed a customized CRM dashboard for the travel agents. The dashboard centralizes all booking inquiries, tracks client preferences, sends automated email quotes, and allows administrators to publish new tour itineraries with a single click, completely replacing legacy spreadsheets.",
    results: [
      { metric: "+180%", label: "Organic Search Traffic" },
      { metric: "No. 1", label: "Local Map Rankings" },
      { metric: "4.2x", label: "Inbound Package Queries" },
    ],
    gallery: [
      "/work/vintage-tours.jpg",
      "/work/bali-yoga.jpg",
      "/work/ecommerce-app.jpg",
    ],
  },
  {
    title: "Adruva Resto System",
    slug: "adruva-resto-system",
    category: "automate",
    industry: "technology",
    techStack: ["React", "Prisma", "Tailwind CSS", "Node.js", "WebSocket"],
    heroGradient: "/work/adruva-resto.jpg",
    isFeatured: true,
    clientName: "Adruva Hospitality Group",
    timeline: "6 weeks",
    overview:
      "An advanced offline-first restaurant SaaS platform with contactless QR code menus, instant order dispatching, and live billing metrics. Engineered to handle high-traffic dine-in restaurants without internet dependencies.",
    problem:
      "Traditional restaurants face a major operational bottleneck during rush hours. Waiters spend a significant portion of their shifts running back and forth between tables, cash registers, and the kitchen, leading to order dispatch delays and frequent kitchen communication errors.\n\nManual billing and ticket writing resulted in an average order error rate of 12%, causing food waste and customer dissatisfaction. Furthermore, restaurant owners had no real-time data on table turnover rates, peak sales hours, or dish popularity, making inventory management and staffing decisions highly inefficient.\n\nA major concern for restaurant owners was internet reliability. If the cloud connection dropped during a busy dinner service, standard web-based POS systems would crash, halting all order entries and causing massive dining room chaos.",
    solution:
      "We engineered 'Adruva Resto', an offline-first restaurant automation SaaS platform designed to streamline operations from ordering to billing.\n\nWe created a web application that works by scanning table-specific QR codes. Customers can browse the rich, visual menu, customize orders (such as selecting spice levels or add-ons), and send orders directly to the kitchen without needing to install any app. The orders are dispatched instantly to a tablet-based kitchen dashboard via WebSockets.\n\nTo ensure uninterrupted operations during internet outages, we implemented a local backup synchronization system. Orders are stored locally in the browser's IndexedDB database and synchronized with a local kitchen server, then pushed to the cloud once the connection is restored. The backend dashboard provides owners with real-time billing metrics, daily revenue charts, table turnover statistics, and live inventory alerts, reducing order dispatch errors by 90% and increasing table turnover speed by 25%.",
    results: [
      { metric: "25%", label: "Faster Table Turnover" },
      { metric: "-90%", label: "Order Dispatch Errors" },
      { metric: "18%", label: "Average Bill Value Growth" },
    ],
    gallery: [
      "/work/adruva-resto.jpg",
      "/work/ecommerce-app.jpg",
      "/work/local-seo.jpg",
    ],
  },
  {
    title: "E-commerce Mobile App",
    slug: "ecommerce-mobile-app",
    category: "build",
    industry: "retail",
    techStack: ["React Native", "Firebase"],
    heroGradient: "/work/ecommerce-app.jpg",
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
      "/work/ecommerce-app.jpg",
      "/work/adruva-resto.jpg",
      "/work/brand-identity.jpg",
    ],
  },
  {
    title: "Local Business SEO Campaign",
    slug: "local-business-seo",
    category: "grow",
    industry: "retail",
    techStack: ["SEO", "Content", "Analytics"],
    heroGradient: "/work/local-seo.jpg",
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
      "/work/local-seo.jpg",
      "/work/brand-identity.jpg",
      "/work/bali-yoga.jpg",
    ],
  },
  {
    title: "Brand Identity Package",
    slug: "brand-identity-package",
    category: "design",
    industry: "technology",
    techStack: ["Figma", "Illustrator"],
    heroGradient: "/work/brand-identity.jpg",
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
      "/work/brand-identity.jpg",
      "/work/local-seo.jpg",
      "/work/vintage-tours.jpg",
    ],
  },
  {
    title: "Hotel Arti Cottage",
    slug: "hotel-arti-cottage",
    category: "build",
    industry: "retail",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "Vercel",
      "Framer Motion",
      "SEO Optimization",
    ],
    heroGradient: "/work/hotel-arti-cottage.jpg",
    isFeatured: true,
    clientName: "Hotel Arti Cottage Rishikesh",
    timeline: "6 weeks",
    overview:
      "A high-converting, fully customized hospitality showcase website and room pricing calculator engine for Hotel Arti Cottage in Tapovan, Rishikesh. Rebuilt from the ground up using Next.js to provide a fast mobile booking funnel and locally-focused search engine optimization (SEO).",
    problem:
      "Hotel Arti Cottage in Rishikesh was struggling to capture direct digital bookings, relying heavily on high-commission OTA aggregators. Their previous website was slow, not mobile-responsive, and had no interactive tools to calculate rooms and seasonal rates dynamically for travelers.\n\nWithout a structured local search layout, the hotel was invisible to the surge of domestic and international travelers searching for quiet, clean boutique cottages near Tapovan. This absence of organic visibility and high cart friction prevented them from scaling direct customer bookings.",
    solution:
      "We engineered a custom guest acquisition website using Next.js and Tailwind CSS.\n\nWe implemented a dynamic, interactive Room Rate & Budget Calculator that allows prospective guests to select room types (Deluxe, Super Deluxe, Luxury Family Suite), input dates, and view transparent pricing instantly, with a one-click CTA to WhatsApp the host. We also integrated local schema tags, Google Maps APIs, and structured local SEO parameters to position them at the top of local Rishikesh travel searches.\n\nTo increase trust, we built an integrated Travel Blog and Rishikesh Guide showcase to answer common traveler search queries like Ganga Aarti and White-Water Rafting timings directly, converting blog readers into direct room leads.",
    results: [
      { metric: "+140%", label: "Direct Booking Growth" },
      { metric: "No. 3", label: "Rank on Local Searches" },
      { metric: "-100%", label: "OTA Commission Dependency" },
    ],
    gallery: [
      "/work/hotel-arti-cottage.jpg",
      "/work/vintage-tours.jpg",
      "/work/bali-yoga.jpg",
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
