export interface SlideStepDetail {
  title: string;
  text: string;
}

export interface SlideStep {
  step: string;
  title: string;
  description: string;
  details?: SlideStepDetail[];
  bulletGrid?: { title: string; text: string }[];
}

export interface SlideContent {
  slug: string;
  act1Title: string;
  act1Sub: string;
  act1Paragraphs: string[];
  act1Services: string[];

  act2Title: string;
  act2Sub: string;
  act2PointsTitle: string;
  act2Points: { title: string; text: string }[];
  act2MatrixTitle: string;
  act2MatrixHeader: string[];
  act2MatrixRows: string[][];

  act3Title: string;
  act3Sub: string;
  act3Flowchart: { label: string; name: string; desc: string }[];
  act3Caption: string;

  act4Title: string;
  act4Sub: string;
  act4Steps: SlideStep[];

  act5Title: string;
  act5Sub: string;
  act5KeywordsHeader: string[];
  act5Keywords: string[][];

  act6Title: string;
  act6Sub: string;
  act6Metrics: { metric: string; label: string }[];
  act6ChartTitle: string;
  act6ChartLabels: string[];

  testimonialTitle: string;
  testimonialText: string;
  testimonialAuthor: string;
  testimonialVideoCaption: string;
}

export const caseStudiesDetails: Record<string, SlideContent> = {
  "bali-yoga-teacher-training": {
    slug: "bali-yoga-teacher-training",
    act1Title: "Who is Bali Yoga Teacher Training Center?",
    act1Sub: "ACT I: THE CLIENT",
    act1Paragraphs: [
      "Bali Yoga Teacher Training Center (balivttc.com) is an internationally recognized educational organization based in Ubud, Bali, offering residential RYS 200, 300, and 500-hour yoga teacher training courses.",
      "Their business model relies heavily on enrolling international students from the USA, Europe, South America, and Australia. Students make inquiries, select accommodation options, register details, and complete dynamic deposits to secure placements in future residential training batches.",
      "With courses pricing upwards of $2,000+ USD, every single checkout dropout represents a high-value lead loss. The brand required a system that load-balances massive seasonal spikes while capturing and recovery-managing unfinished student checkouts.",
    ],
    act1Services: [
      "WordPress to Headless Next.js Migration",
      "Decoupled Booking Funnel & Leads DB",
      "Localized Stripe Multi-Currency Router",
      "4x Monthly Content, Backlinks & GBP Strategy",
    ],
    act2Title: "The WordPress Infrastructure Collapse",
    act2Sub: "ACT II: THE CRISIS",
    act2PointsTitle: "Top 10 Critical Flaws Identified:",
    act2Points: [
      {
        title: "8-10 Second Loading Speed",
        text: "Bloated dynamic WordPress plugin hooks choked page load times, creating massive bounce rates.",
      },
      {
        title: "Cumulative Layout Shift (CLS)",
        text: "Gutenberg blocks rendering without explicit pixel dimension limits caused UI jumps on mobile.",
      },
      {
        title: "Database Deadlocks",
        text: "Simultaneous checkouts caused WooCommerce sql transactional lock failures, crashing the checkout.",
      },
      {
        title: "No Stripe Local Currency Logic",
        text: "International card checkouts lacked smart merchant bank routing, causing 35% dropouts.",
      },
      {
        title: "Zero Image Compression",
        text: "Raw stock JPEG assets blocked visual rendering and increased package loads to 4.8MB.",
      },
    ],
    act2MatrixTitle: "WordPress vs Next.js Performance Audit",
    act2MatrixHeader: ["Metric", "WordPress", "Next.js"],
    act2MatrixRows: [
      ["Page Speed Score", "32/100", "98/100"],
      ["Time to First Byte", "1200ms", "120ms"],
      ["LCP Speed", "8.5 seconds", "1.2 seconds"],
      ["DB Checkout Locks", "Frequent", "0%"],
    ],
    act3Title: "Decoupled Headless Engine Design",
    act3Sub: "ACT III: THE PARADIGM SHIFT",
    act3Flowchart: [
      {
        label: "STOREFRONT",
        name: "Next.js Web UI",
        desc: "Hosted on Vercel Edge Server",
      },
      {
        label: "API DECOUPLER",
        name: "NestJS REST API",
        desc: "Docker Gateway Controller",
      },
      {
        label: "DATA RESOURCE",
        name: "PostgreSQL DB",
        desc: "Amazon RDS Snapshots",
      },
    ],
    act3Caption:
      "Static marketing pages are pre-rendered into high-speed static HTML files using Next.js ISR, while booking requests communicate via hooks directly to NestJS, protecting the database load.",
    act4Title: "The 4-Step Technical & Strategic Execution",
    act4Sub: "ACT IV: THE IMPLEMENTATION METHODOLOGY",
    act4Steps: [
      {
        step: "STEP 01",
        title: "UI/UX Design, Yoga Theme Psychology & Color Strategy",
        description:
          "Designing for the yoga vertical requires building an immediate sense of trust and tranquility. Standard yoga templates rely heavily on generic stock photos of people in poses, which feel impersonal and sterile. Our first design action was replacing all stock visuals with real, high-resolution photography of the Bali Yoga Teacher Training Center, its instructors, Ubud surroundings, and residential facilities.",
        bulletGrid: [
          {
            title: "Typographic Scale",
            text: "Utilized Space Grotesk for headings to give a modern feel, paired with Inter for content readability.",
          },
          {
            title: "Asset Optimization",
            text: "All local photos are optimized using modern compression (WebP) with pre-cached height/width layouts to eliminate CLS.",
          },
          {
            title: "Mobile Layouts",
            text: "Fluid grids designed specifically for mobile, where over 78% of students search and initialize bookings.",
          },
        ],
      },
      {
        step: "STEP 02",
        title: "Headless Booking, Admin Panel & Checkout Lead Capture",
        description:
          "A standard e-commerce flow waits until the final button click to save user data. For a $2000+ course package, this leads to massive lost revenue. We developed an advanced headless checkout routing pipeline:",
        details: [
          {
            title: "Abandoned Checkout Capture",
            text: "The system logs client details (name, email, phone) on the first step of the booking form. If a student drops out, their data is saved and a notification triggers on the sales dashboard.",
          },
          {
            title: "Course Date & Batch Editor",
            text: "A headless admin panel allows course managers to update batch dates, pricing packages, and room options dynamically without modifying code files.",
          },
          {
            title: "Automated Transmit Webhooks",
            text: "Integrates with Stripe and PayPal, checking the client's local IP address to serve localized currency routing and prevent payment processing declines.",
          },
          {
            title: "Transactional Notifications",
            text: "Built automated, beautiful email responses using serverless Nodemailer triggers, keeping students and sales teams updated instantly.",
          },
        ],
      },
      {
        step: "STEP 03",
        title: "Google Search Console, XML Sitemaps & robots.txt Setup",
        description:
          "Google crawlers require structured data paths. Under WordPress, sitemaps are often auto-generated with bloated plugin-generated files that confuse search bots. We wrote a custom Next.js static sitemap generation pipeline:",
        details: [
          {
            title: "Clean Sitemap.xml Routing",
            text: "Automatically indexes active course pages, blogs, and core landing pages.",
          },
          {
            title: "Robots.txt Optimization",
            text: "Controls search bot traffic, protecting admin resources and prioritizing high-intent marketing URLs.",
          },
          {
            title: "JSON-LD Schema Integration",
            text: "Added LocalBusiness and Course schema tags, showing course dates, price structures, and reviews in Google search results.",
          },
          {
            title: "Google Search Console Verification",
            text: "Directly connected site indexing metrics to verify sitemap updates and resolve indexing issues.",
          },
        ],
      },
      {
        step: "STEP 04",
        title: "Monthly Organic SEO Content Strategy & Link Architecture",
        description:
          "Sustained organic traffic is driven by consistent content and domain authority. We set up a recurring monthly marketing campaign:",
        bulletGrid: [
          {
            title: "4x SEO Blog Posts",
            text: 'Deep educational articles targeting high-volume keywords, answering student queries (e.g. "what is included in a 200hr yoga training").',
          },
          {
            title: "4x GMB / Google Map Posts",
            text: "Weekly local search optimization posts that keep local maps active and push geographic rank authority.",
          },
          {
            title: "4x Authority Backlinks",
            text: "Acquiring context links from travel and wellness sites, increasing Domain Authority safely.",
          },
          {
            title: "Reddit & Quora Outreach",
            text: "Initiating targeted discussions on travel communities, answering questions and driving direct referral links.",
          },
        ],
      },
    ],
    act5Title: "Competitor Keyword Gap Analysis",
    act5Sub: "ACT V: SEARCH ENGINE MATRIX",
    act5KeywordsHeader: [
      "Target Keyword",
      "Monthly Search Volume",
      "Keyword Difficulty (KD)",
      "Competitor Status",
      "Target Action Plan",
    ],
    act5Keywords: [
      [
        "yoga teacher training bali",
        "8,100",
        "Hard (48)",
        "Ranking Top 3",
        "Competitor Gap Article",
      ],
      [
        "200 hour yoga teacher training bali",
        "3,200",
        "Medium (29)",
        "Ranking Page 1",
        "Landing Page Schema Optimization",
      ],
      [
        "best yoga school in bali reviews",
        "1,400",
        "Easy (12)",
        "Unranked",
        "4 Blogs + Forum Backlinks",
      ],
    ],
    act6Title: "Organic traffic and conversion growth",
    act6Sub: "ACT VI: CONVERSION & RESULTS",
    act6Metrics: [
      { metric: "+240%", label: "Booking Conversions" },
      { metric: "0%", label: "Server Downtime in Launches" },
      { metric: "35%", label: "Recaptured Cart Leads" },
    ],
    act6ChartTitle: "6-MONTH ORGANIC SEARCH CONSOLE CLICKS",
    act6ChartLabels: [
      "Month 1 (Launch)",
      "Month 3 (SEO Crawl)",
      "Month 6 (Page 1 Domination)",
    ],
    testimonialTitle: "Words from the Founders",
    testimonialText:
      "Migrating our core booking funnel from WordPress to this Next.js headless framework was the best business choice we made. Our server has not crashed since launch day, and our sales team converts 35% more cart drop-offs using our CRM alerts.",
    testimonialAuthor: "Ketut M., Co-Founder of Bali YTTC",
    testimonialVideoCaption: "balivttc.com Owner Video Mockup Container",
  },
  "vintage-tours-and-travels": {
    slug: "vintage-tours-and-travels",
    act1Title: "Who is Vintage Tours & Travels?",
    act1Sub: "ACT I: THE CLIENT",
    act1Paragraphs: [
      "Vintage Tours & Travels is a premium adventure tour operator organizing customized travel packages across the Himalayan regions of Ladakh, Himachal, and Nepal.",
      "Their business relies on travelers planning complex custom itineraries, requiring an intuitive mobile interface. High-value adventure bookings represent a significant customer commitment, meaning clarity in route mapping and local search visibility is crucial to convert high-quality traffic.",
      "They shifted from a slow legacy template to a modern Next.js engine with custom Google Maps overlays and a high-performance travel agent CRM to manage itinerary requests and automated quote follow-ups.",
    ],
    act1Services: [
      "Interactive Itinerary UI Redesign",
      "Google Maps Route Marker API Setup",
      "Dynamic Local SEO & Schema Structuring",
      "Travel Agent CRM & Lead Follow-up Tools",
    ],
    act2Title: "Himalayan Network & SEO Visibility Hurdles",
    act2Sub: "ACT II: THE CRISIS",
    act2PointsTitle: "Performance & Visibility Blockers:",
    act2Points: [
      {
        title: "Slow Mountain Network Loading",
        text: "Legacy page assets failed to render on slow 3G/4G connectivity, leading to high traveler bounce rates.",
      },
      {
        title: "Non-Interactive Custom Routes",
        text: "Itinerary details were displayed in plain text, making it difficult for travelers to visualize trip stages.",
      },
      {
        title: "High Aggregator Competition",
        text: "TripAdvisor and Viator dominated premium terms due to a complete lack of structured schemas on the client site.",
      },
      {
        title: "50+ Search Console Errors",
        text: "Broken links and incorrect indexing parameters blocked Google from crawling custom packages.",
      },
    ],
    act2MatrixTitle: "Performance & SEO Audit Comparison",
    act2MatrixHeader: ["Metric", "Before Update", "After Next.js Migration"],
    act2MatrixRows: [
      ["Mobile Load Speed", "7.8 seconds", "0.18 seconds"],
      ["Google Maps Rendering", "Slow Script Block", "Cached API Render"],
      ["Search Console Errors", "52 Items", "0 Items"],
      ["Local Pack Visibility", "Not Listed", "Top 3 Map Pack"],
    ],
    act3Title: "Headless Map & Route Optimization Flow",
    act3Sub: "ACT III: SYSTEM PARADIGM",
    act3Flowchart: [
      {
        label: "FRONTEND UI",
        name: "Next.js Static Shell",
        desc: "Pre-rendered package itineraries",
      },
      {
        label: "MAPS CONTROLLER",
        name: "Google Maps API",
        desc: "Dynamic altitude & coordinate marks",
      },
      {
        label: "AGENCY PORTAL",
        name: "Traveler CRM Hub",
        desc: "Automated quotation dispatcher",
      },
    ],
    act3Caption:
      "We pre-rendered custom itineraries into static HTML files, integrating lazy-loading Google Maps frames that only load when scrolled into view, reducing API costs and loading times.",
    act4Title: "The Step-by-Step Technical Transformation",
    act4Sub: "ACT IV: TECHNICAL ROADMAP",
    act4Steps: [
      {
        step: "STEP 01",
        title: "Mobile-First UX & Interactive Visual Itineraries",
        description:
          "Himalayan adventure seekers search for routes primarily on mobile during active travel planning. We designed a fluid, touch-optimized itinerary UI that breaks down treks by day, utilizing high-quality WebP images of real Himalayan passes to drive engagement.",
        bulletGrid: [
          {
            title: "Altitude Visualization",
            text: "Added interactive charts showing elevation shifts for each day of trekking.",
          },
          {
            title: "Visual Layouts",
            text: "Clean cards highlighting accommodation details, difficulty parameters, and inclusion lists.",
          },
        ],
      },
      {
        step: "STEP 02",
        title: "Google Maps API Integration & Dynamic Routes",
        description:
          "Replaced flat map images with interactive Google Maps frames. Each day's route is represented by custom coordinate paths, allowing travelers to inspect daily endpoints and physical terrains.",
        details: [
          {
            title: "Lazy Loaded Frames",
            text: "Google Maps javascript modules only initialize when the user opens the map tab, saving API credit consumption.",
          },
          {
            title: "Custom POI Markers",
            text: "Highlights camp locations, view points, and medical checkposts visually on the route.",
          },
        ],
      },
      {
        step: "STEP 03",
        title: "Local Business Schema & Meta Architecture",
        description:
          "To combat large aggregator platforms, we implemented structured data across all tour landing pages:",
        details: [
          {
            title: "Product Schema",
            text: "Allows Google to fetch price ranges, locations, and traveler rating stars directly into search result listings.",
          },
          {
            title: "FAQ Schema",
            text: "Answers common mountain travel queries directly in the organic SERP, increasing click rates.",
          },
        ],
      },
      {
        step: "STEP 04",
        title: "Monthly Content Strategy & GBP Authority",
        description:
          "We set up an organic acquisition model to sustain inquiries without paid advertising budgets:",
        bulletGrid: [
          {
            title: "4x Monthly Blogs",
            text: "Writing search posts targeting terms like 'best time to visit leh ladakh'.",
          },
          {
            title: "4x GBP Local Posts",
            text: "Targeting map packs for premium local keywords.",
          },
          {
            title: "Forum Referral Links",
            text: "Direct outreach on TripAdvisor forums, providing helpful guides and referencing the client's interactive maps.",
          },
        ],
      },
    ],
    act5Title: "Competitor Keyword Gap Analysis",
    act5Sub: "ACT V: SEARCH ENGINE MATRIX",
    act5KeywordsHeader: [
      "Target Term",
      "Monthly Searches",
      "Difficulty (KD)",
      "Competitor Status",
      "Target Action Plan",
    ],
    act5Keywords: [
      [
        "leh ladakh tour packages",
        "12,000",
        "Hard (55)",
        "Aggregator Dominated",
        "Create Deep Interactive Guide",
      ],
      [
        "himalayan trek packages custom",
        "1,800",
        "Medium (24)",
        "Poorly Structured Sites",
        "Deploy Custom Itinerary Builder",
      ],
      [
        "best travel agent for ladakh",
        "800",
        "Easy (8)",
        "Unranked",
        "GBP Citation Blitz + Local SEO Posts",
      ],
    ],
    act6Title: "Traffic and inquiry generation metrics",
    act6Sub: "ACT VI: OUTCOMES & CONVERSION",
    act6Metrics: [
      { metric: "+180%", label: "Organic Search Traffic" },
      { metric: "No. 1", label: "Local Map Rankings" },
      { metric: "4.2x", label: "Inbound Package Queries" },
    ],
    act6ChartTitle: "6-MONTH SEARCH CONSOLE CLICK GROWTH",
    act6ChartLabels: [
      "Month 1 (Launch)",
      "Month 3 (Local Rankings)",
      "Month 6 (Map Pack Dominance)",
    ],
    testimonialTitle: "Words from the Founders",
    testimonialText:
      "Our booking enquiries multiplied within 3 months, and the automated CRM saves our travel agents hours of manual coordination. The interactive maps have become our main conversion tool.",
    testimonialAuthor: "Tsering D., Founder of Vintage Tours",
    testimonialVideoCaption: "Himalayan Adventure Review Video Container",
  },
  "adruva-resto-system": {
    slug: "adruva-resto-system",
    act1Title: "Who is Adruva Resto?",
    act1Sub: "ACT I: THE CLIENT",
    act1Paragraphs: [
      "Adruva Resto System is an advanced restaurant SaaS POS platform designed for high-volume dine-in restaurants and hospitality groups.",
      "The system handles QR menu scanning, digital ordering, and instant kitchen ticket dispatching. In a busy dining environment, order accuracy and system uptime are critical to maintain fast table turnarounds and increase customer satisfaction.",
      "They needed an offline-first POS platform that remains functional during internet outages, storing transactions locally and synchronizing them once connectivity recovers.",
    ],
    act1Services: [
      "Contactless QR Code Menu UI",
      "Offline-First Sync Engine (IndexedDB)",
      "WebSocket Real-Time Ticket Routing",
      "Kitchen Dashboard & Billing Metrics",
    ],
    act2Title: "Dine-in Bottlenecks & Outage Risks",
    act2Sub: "ACT II: THE CRISIS",
    act2PointsTitle: "Operational Bottlenecks Faced:",
    act2Points: [
      {
        title: "12% Order Error Rate",
        text: "Manual ticket taking during peak hours resulted in frequent communication errors between waiters and the kitchen.",
      },
      {
        title: "Slow Table Turnover Times",
        text: "Waiters spent too much time running between tables, terminals, and cash registers.",
      },
      {
        title: "Internet Dependency Failures",
        text: "Standard cloud POS systems went offline completely if the local restaurant router dropped connection.",
      },
      {
        title: "No Live Sales Insights",
        text: "Restaurant owners lacked real-time logs on food waste, dish popularity, or staff performance.",
      },
    ],
    act2MatrixTitle: "Operational Improvements Matrix",
    act2MatrixHeader: [
      "Operational Metric",
      "Manual Setup",
      "Adruva Resto System",
    ],
    act2MatrixRows: [
      ["Order Accuracy", "88% (Average)", "99.5% (Automated QR)"],
      ["Ticket Dispatch Time", "3-5 Minutes", "Instant (WebSocket)"],
      ["Internet Outage Status", "Service Halts", "100% Offline-First Backup"],
      ["Average Bill Value", "Standard", "+18% Increase"],
    ],
    act3Title: "Offline-First Synchronization Architecture",
    act3Sub: "ACT III: SYSTEM PARADIGM",
    act3Flowchart: [
      {
        label: "QR CLIENT",
        name: "Dine-in Browser UI",
        desc: "Local IndexedDB storage",
      },
      {
        label: "KITCHEN HUB",
        name: "Local Gateway Server",
        desc: "Synchronizes orders offline",
      },
      {
        label: "CLOUD BACKEND",
        name: "PostgreSQL DB Server",
        desc: "Synchronizes on reconnection",
      },
    ],
    act3Caption:
      "Orders are stored locally in the client browser's database and synced over a local Wi-Fi router to the kitchen display, bypass-routing the external internet completely during outages.",
    act4Title: "Step-by-Step Technical Transformation",
    act4Sub: "ACT IV: TECHNICAL ROADMAP",
    act4Steps: [
      {
        step: "STEP 01",
        title: "Contactless QR Code Menu & Customizer UI",
        description:
          "We built a responsive web interface accessed by scanning table-specific QR codes. Customers browse the menu, customize dish add-ons, and submit orders directly without installing external apps.",
        bulletGrid: [
          {
            title: "Interactive Menus",
            text: "Fluid transitions, rich images, and quick-filter category sliders.",
          },
          {
            title: "Custom Add-ons",
            text: "Select spice levels, portions, or dietary adjustments dynamically.",
          },
        ],
      },
      {
        step: "STEP 02",
        title: "Offline-First Sync Engine & IndexedDB",
        description:
          "To prevent order loss during outages, we implemented IndexedDB local caching in the browser storefront. Orders are saved locally and synced automatically when the internet restores.",
        details: [
          {
            title: "Offline Storage Queue",
            text: "Orders are written to local storage and marked with sync flags.",
          },
          {
            title: "Auto Reconnection Hook",
            text: "Background workers monitor server ping rates to trigger synchronization immediately upon reconnection.",
          },
        ],
      },
      {
        step: "STEP 03",
        title: "WebSocket Real-Time Ticket Routing",
        description:
          "Orders are sent instantly to the kitchen display terminal using WebSocket protocols, triggering sound alerts for kitchen staff.",
        details: [
          {
            title: "Instant Kitchen Tickets",
            text: "Eliminated wait times by bypassing waiter steps.",
          },
          {
            title: "Terminal Status Toggle",
            text: "Allows chefs to mark orders as preparing or completed, updating waiter dashboards instantly.",
          },
        ],
      },
      {
        step: "STEP 04",
        title: "Kitchen Inventory & Admin Reporting",
        description:
          "A centralized dashboard provides restaurant owners with live sales insights, helping manage inventory and staff allocation:",
        bulletGrid: [
          {
            title: "Dine-in Heatmaps",
            text: "Real-time indicators showing table occupancy rates and average duration times.",
          },
          {
            title: "Dish Performance Logs",
            text: "Visual charts listing top-selling dishes and inventory alerts.",
          },
        ],
      },
    ],
    act5Title: "Competitor POS SaaS Gap Analysis",
    act5Sub: "ACT V: SYSTEM CAPABILITIES",
    act5KeywordsHeader: [
      "POS Feature",
      "Legacy Competitors",
      "Adruva Resto",
      "Business Advantage",
    ],
    act5Keywords: [
      [
        "Offline Reliability",
        "Requires Active Internet",
        "Local Sync Backup",
        "Zero downtime during peak hour network drops",
      ],
      [
        "Direct Table QR Menu",
        "Requires External App Install",
        "Responsive Web App",
        "90% higher customer adoption rates",
      ],
      [
        "Live Kitchen Terminal",
        "Manual Printer Tickets",
        "WebSocket Display Screen",
        "Reduces cooking preparation errors by 90%",
      ],
    ],
    act6Title: "Operational Efficiency Outcomes",
    act6Sub: "ACT VI: RESULTS & OUTCOMES",
    act6Metrics: [
      { metric: "25%", label: "Faster Table Turnover" },
      { metric: "-90%", label: "Order Dispatch Errors" },
      { metric: "18%", label: "Average Bill Value Growth" },
    ],
    act6ChartTitle: "6-MONTH OPERATIONAL ERROR RATE REDUCTION",
    act6ChartLabels: [
      "Month 1 (Pre-install)",
      "Month 3 (Staff training)",
      "Month 6 (Fully Automated QR)",
    ],
    testimonialTitle: "Words from the Founders",
    testimonialText:
      "Dine-in service runs seamlessly even when the main internet drops. The QR menus have eliminated waiter order errors completely, and we turnover tables 25% faster now.",
    testimonialAuthor:
      "Ramesh K., General Manager of Adruva Resto Client Group",
    testimonialVideoCaption: "POS Operation Review Video Container",
  },
};
