export interface TiptapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  text?: string;
  marks?: Array<{
    type: string;
    attrs?: Record<string, unknown>;
  }>;
}

export interface BlogPost {
  title: string;
  slug: string;
  category: "AI & Tech" | "Web Dev" | "Marketing" | "Design" | "Company News";
  readingTime: string;
  publishedDate: string;
  coverGradient: string;
  summary: string;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  content: TiptapNode;
  language?: string;
  translations?: Array<{
    id: string;
    language: string;
    slug: string;
    title: string;
  }>;
}

export const blogPosts: BlogPost[] = [
  {
    title: "The Rise of AI Automation in Service Businesses",
    slug: "ai-automation-service-businesses",
    category: "AI & Tech",
    readingTime: "5 min read",
    publishedDate: "June 5, 2026",
    coverGradient: "/blog/ai-automation.jpg",
    summary:
      "How local and service-based businesses are cutting manual booking and follow-up times by 80% using custom AI integrations.",
    author: {
      name: "Rohan Sharma",
      role: "Head of Automation, Adruva",
      avatarInitials: "RS",
    },
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "In the fast-paced world of local services, response time is everything. Whether you run a plumbing service, a yoga studio, a clinic, or a real estate group, the speed at which you respond to an inquiry directly determines your conversion rate. Studies show that responding to a lead within ",
            },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: "5 minutes",
            },
            {
              type: "text",
              text: " makes you 21 times more likely to qualify them compared to responding after 30 minutes.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Yet, most small and medium business owners are too busy managing day-to-day operations to sit on their phones answering chats instantly. This is where ",
            },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: "AI Automation",
            },
            {
              type: "text",
              text: " steps in. By linking messaging platforms like WhatsApp, email, and website forms with smart AI systems, businesses can operate 24/7 without hiring extra staff.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "The Core Bottlenecks in Traditional Service Workflows",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Most service operations suffer from three primary administrative leaks:",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "Delayed Follow-ups: ",
                    },
                    {
                      type: "text",
                      text: "Leads coming in after business hours (especially between 7 PM and 9 AM) are left unanswered until the next day. By then, the client has often booked a competitor.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "Manual Data Entry: ",
                    },
                    {
                      type: "text",
                      text: "Staff spend hours copying contact info from WhatsApp or emails into spreadsheets or CRM boards, creating room for human error.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "No Appointment Reminders: ",
                    },
                    {
                      type: "text",
                      text: "High no-show rates for appointments due to a lack of automated WhatsApp or SMS reminders.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            { type: "text", text: "How Custom AI Workflows Solve This" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Modern AI systems like the OpenAI API integrated with workflow tools (such as n8n or Make) allow us to build systems that think and act like your top receptionist. Here is how a typical automated workflow operates:",
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "A user fills a form on your site → The lead is instantly parsed → An automated WhatsApp message greets them → If they have questions, a custom AI agent trained on your business guidelines responds to them → A Calendly link is shared for booking → Once booked, database records are automatically updated.",
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [
            { type: "text", text: "Real Impact: A Dehradun Case Study" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Consider our project with a local cafe and catering service. They were losing 20-30% of party catering inquiries because their owner was busy in the kitchen and could not answer WhatsApp calls. We set up an AI agent connected to the Meta WhatsApp Cloud API. Within 30 days, the AI resolved 85% of standard questions about menu availability, booked 42 consultations directly onto the owner's calendar, and synced all client records to their database.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Getting Started with Automation" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "You don't need a massive enterprise budget to begin automating. Starting with a simple Google Form to WhatsApp notification pipeline can save your team 5-10 hours a week. To learn how we build these systems at scale, check out our ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: { href: "/services/ai-automation" },
                },
              ],
              text: "AI Automation Services",
            },
            {
              type: "text",
              text: " page.",
            },
          ],
        },
      ],
    },
  },
  {
    title: "Why Headless Next.js Is Better for Your Business SEO",
    slug: "headless-nextjs-seo-benefits",
    category: "Web Dev",
    readingTime: "6 min read",
    publishedDate: "June 2, 2026",
    coverGradient: "/blog/headless-seo.jpg",
    summary:
      "An analysis of static-site loading speeds, Core Web Vitals, and why custom Next.js configurations win over traditional CMS tools.",
    author: {
      name: "Amit Negi",
      role: "Tech Lead, Adruva",
      avatarInitials: "AN",
    },
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "For years, WordPress has been the go-to platform for businesses looking to establish a web presence. However, as Google continues to prioritize search performance, speed, and mobile responsiveness under its ",
            },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: "Core Web Vitals",
            },
            {
              type: "text",
              text: " framework, traditional monolithic platforms are struggling to keep up. Modern development has shifted towards headless frameworks, with ",
            },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: "Next.js",
            },
            {
              type: "text",
              text: " leading the pack.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "What is Headless Architecture?" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "In traditional web architecture, the front-end (what the user sees) and the back-end (where data is stored) are tightly coupled. In a headless setup, the frontend is completely decoupled. It fetches data via APIs and renders page layouts ahead of time (Static Site Generation) or on-demand (Server-Side Rendering).",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            { type: "text", text: "Three Ways Next.js Boosts Search Ranking" },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [
            { type: "text", text: "1. Blazing Fast Page Load Speed (LCP)" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Google penalizes slow websites. Next.js compiles pages to static HTML and CSS files during build time. When a user visits, the server serves these files instantly from a Global CDN, eliminating database query times and server lag. This brings your Largest Contentful Paint (LCP) down to sub-second levels.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [
            { type: "text", text: "2. Dynamic Static Generation (ISR)" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Incremental Static Regeneration (ISR) allows you to update static pages in the background without rebuilds. You get the speed benefits of static sites combined with the live data capabilities of dynamic backends. Perfect for directories, blogs, and product listings.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [
            {
              type: "text",
              text: "3. Complete Control Over Meta Tags & Schema",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Next.js offers a robust Metadata API. You can generate custom page-level title tags, Open Graph (OG) social card definitions, and structured JSON-LD schema markup dynamically for every route. This allows search engines to read, parse, and rank your content efficiently.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "A Direct Performance Comparison" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Here is a breakdown of metrics for a typical service landing page built on WordPress vs Next.js:",
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "WordPress: Page Load Speed = 3.8s | Mobile Lighthouse Score = 42 | Custom Schema = Relies on heavy plugins.\nNext.js: Page Load Speed = 0.6s | Mobile Lighthouse Score = 98 | Custom Schema = Native and optimized.",
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Conclusion: The SEO Verdict" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "If your business relies on local search rankings, organic keywords, or landing page conversions from paid ads, speed is your primary growth lever. Investing in a Next.js frontend might require dev expertise, but the long-term ROI in search ranking and ad-spend optimization far outweighs setup hurdles. Read more on our ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: { href: "/services/web-development" },
                },
              ],
              text: "Web Development Services",
            },
            {
              type: "text",
              text: " page to get started.",
            },
          ],
        },
      ],
    },
  },
  {
    title: "Google Ads vs Meta Ads: Which Should You Choose?",
    slug: "google-ads-vs-meta-ads-comparison",
    category: "Marketing",
    readingTime: "4 min read",
    publishedDate: "May 28, 2026",
    coverGradient: "/blog/ads-spend.jpg",
    summary:
      "Understand the difference between search intent and social interest targeting, and learn how to allocate your digital ad budget for maximum ROI.",
    author: {
      name: "Rohan Sharma",
      role: "Growth Strategist, Adruva",
      avatarInitials: "RS",
    },
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: 'When local businesses decide to run paid digital ads, they almost always ask: "Should I invest in Google or Facebook ads first?" Both platforms are incredibly powerful, but they target users at completely different stages of the buying cycle. Understanding this difference is key to avoiding wasted ad budget.',
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            { type: "text", text: "The Core Difference: Intent vs. Interest" },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: "Google Ads (Search Intent)" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: 'Google is a search engine. When someone searches for "best yoga retreat in Dehradun" or "dental clinic near me," they are demonstrating high-intent. They already know what they want and are actively looking to hire or buy. Your ad simply intercepts them at the exact moment of decision.',
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [
            { type: "text", text: "Meta Ads (Interest & Demographics)" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Facebook and Instagram are social networks. Users do not go there to look for services. Instead, Meta ads target people based on their interests, demographic profiles, behaviors, and lookalike traits. You are interrupting their social scroll with a compelling visual hook to introduce your business.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            { type: "text", text: "Which Option Fits Your Business Type?" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Here is a quick decision matrix to guide your budget allocation:",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "Choose Google Ads if: ",
                    },
                    {
                      type: "text",
                      text: "Your service is urgent (e.g. emergency plumbing, clinical care, legal advice) or represents a specific product search. Users do not wait to see a Facebook ad when they have a leaky pipe.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "Choose Meta Ads if: ",
                    },
                    {
                      type: "text",
                      text: "Your product is highly visual (e.g. fashion retail, cafe menus, real estate walkthroughs) or you are running local events/workshops. Social media users convert when shown high-quality imagery or special discount offers.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "The Hybrid Strategy for Service Businesses",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "The most effective digital growth setups run both systems in tandem using a funnel structure:",
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Top of Funnel: Run Google search campaigns to capture high-intent buyers looking for local services.\nMiddle of Funnel: Install tracking pixels to retarget those visitors on Meta (Instagram/Facebook) with testimonial banners and visual showcases.",
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This combination builds trust, maintains top-of-mind awareness, and drives significantly higher close rates. To learn more about setting up campaigns that work, read our dedicated pages on ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: { href: "/services/google-ads" },
                },
              ],
              text: "Google Ads Management",
            },
            {
              type: "text",
              text: " and ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: { href: "/services/meta-ads" },
                },
              ],
              text: "Meta Ads Management",
            },
            {
              type: "text",
              text: ".",
            },
          ],
        },
      ],
    },
  },
  {
    title:
      "Decoupled Architectures: Scaling Enterprise Performance with Headless Next.js & NestJS",
    slug: "headless-nextjs-nestjs-enterprise-performance",
    category: "Web Dev",
    readingTime: "6 min read",
    publishedDate: "August 29, 2026",
    coverGradient: "/blog/headless-seo.jpg",
    summary:
      "Why global enterprises are abandoning monolithic content systems in favor of headless frontend layers and NestJS backends to achieve sub-100ms load times and infinite scale.",
    author: {
      name: "Deepu",
      role: "CEO, Adruva",
      avatarInitials: "D",
    },
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "As digital experiences grow more dynamic, traditional monolithic web systems like classic WordPress, Drupal, or Magento are struggling to meet the performance demands of modern users. Page load latency has a direct correlation with conversion rates; for every additional second your site takes to load, conversions drop by up to 20%. Today, global organizations are resolving this by moving towards ",
            },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: "decoupled (headless) architectures",
            },
            {
              type: "text",
              text: ".",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "By separating the client-side presentation layer from the database and business logic, you gain granular control over performance, scalability, and security. In this guide, we break down why a combination of Next.js and NestJS represents the ultimate tech stack for enterprise-scale platforms.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "The Next.js Edge: Sub-100ms Frontend Performance",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Next.js has become the gold standard for frontend engineering. Here is why it outclasses classic site builders for global reach:",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "Incremental Static Regeneration (ISR): ",
                    },
                    {
                      type: "text",
                      text: "Instead of building all pages on every update, Next.js rebuilds specific pages in the background as new requests come in. This keeps your server load near zero while keeping page speeds blazing fast.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "Edge Middleware: ",
                    },
                    {
                      type: "text",
                      text: "Run authentication checks, redirects, and localization rules at the CDN level, milliseconds away from your user, before the main application code even loads.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "The NestJS Core: Scalable Node.js Engineering",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "While Next.js excels at the user interface, it needs a robust, scalable backend to coordinate API queries, webhooks, and transactions. NestJS is the ideal solution because:",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "TypeScript by Default: ",
                    },
                    {
                      type: "text",
                      text: "Ensures type safety across the entire application development cycle, preventing critical runtime errors.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "Modular Architecture: ",
                    },
                    {
                      type: "text",
                      text: "Inspired by Angular, NestJS organizes code into cohesive modules, making it exceptionally easy for growing teams to expand features without creating spaghetti code.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "By decoupling the frontend (Next.js) from the backend (NestJS), you shield your database from direct traffic surges. Even if your website receives millions of hits, your API and database only handle the essential transactional queries, keeping infrastructure costs highly optimized.",
            },
          ],
        },
      ],
    },
  },
  {
    title:
      "The True Cost of a Slow Website: Why Modern Brands are Switching to Custom Next.js",
    slug: "true-cost-of-slow-website-custom-nextjs",
    category: "Web Dev",
    readingTime: "5 min read",
    publishedDate: "September 4, 2026",
    coverGradient: "/blog/web-design.jpg",
    summary:
      "How page load latency is silently draining your sales pipeline, and why switching from bloated WordPress templates to custom Next.js engineering can double your conversion rate.",
    author: {
      name: "Deepu",
      role: "CEO & Tech Lead, Adruva",
      avatarInitials: "D",
    },
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Every business owner knows that traffic is hard to get. You spend thousands on Google Ads, Meta campaigns, and SEO to bring potential clients to your site. But what happens if your website takes ",
            },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: "4 to 6 seconds to load",
            },
            {
              type: "text",
              text: "? The harsh reality is that most of those visitors leave before ever reading your headline.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Google's official consumer research shows that as page load time goes from ",
            },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: "1s to 3s, the probability of bounce increases by 32%",
            },
            {
              type: "text",
              text: ". If it takes 5 seconds, the bounce probability surges by 90%. A slow website isn't just a technical annoyance — it is an active leak in your business revenue.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "The Hidden Tax of Legacy WordPress & Template Builders",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Many businesses start with WordPress or page builders like Elementor or Wix. While easy to set up initially, they carry massive long-term technical debt:",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "Plugin Bloat: ",
                    },
                    {
                      type: "text",
                      text: "Every additional plugin injects extra CSS, JavaScript, and database calls, dragging mobile PageSpeed scores down to the red zone (under 40/100).",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "Security Vulnerabilities: ",
                    },
                    {
                      type: "text",
                      text: "Outdated plugins are the #1 attack vector for malware and spam injections, risking your domain reputation on Google.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "High Server Costs: ",
                    },
                    {
                      type: "text",
                      text: "Monolithic PHP engines generate every page dynamically from scratch on each visitor request, crashing whenever traffic spikes occur.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Why Custom Next.js Delivers 3x Higher Conversion",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "By rebuilding your web platform with modern React & Next.js, your pages are pre-compiled into static HTML and cached across global edge CDN networks. The results are immediate:",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "Instant Sub-1 Second Loads: ",
                    },
                    {
                      type: "text",
                      text: "Pages render instantaneously on mobile, reducing bounce rates and keeping prospective buyers engaged.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "Perfect 95+ Core Web Vitals: ",
                    },
                    {
                      type: "text",
                      text: "Google rewards lightning-fast websites with higher organic search rankings and lower Cost-Per-Click (CPC) on Google Search Ads.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [
            {
              type: "text",
              text: "Ready to Upgrade Your Website Performance?",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "At Adruva Solution, we engineer high-performance custom web platforms designed specifically to turn cold clicks into qualified inquiries. Explore our ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: { href: "/services/web-development" },
                },
              ],
              text: "Custom Web Development Services",
            },
            {
              type: "text",
              text: " or ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: { href: "/contact" },
                },
              ],
              text: "Book a Free 30-Minute Architecture Call",
            },
            {
              type: "text",
              text: " to audit your current website speed.",
            },
          ],
        },
      ],
    },
  },
  {
    title:
      "How Local Businesses in India Use WhatsApp Automation & AI to 3x Inbound Leads",
    slug: "whatsapp-automation-ai-leads-india",
    category: "AI & Tech",
    readingTime: "4 min read",
    publishedDate: "September 6, 2026",
    coverGradient: "/blog/ai-automation.jpg",
    summary:
      "A practical blueprint for service businesses to capture 100% of website inquiries, auto-qualify leads via WhatsApp, and schedule discovery calls automatically 24/7.",
    author: {
      name: "Rohan Sharma",
      role: "Head of Automation, Adruva",
      avatarInitials: "RS",
    },
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "In the Indian market, WhatsApp is not just a messaging app — it is the primary operating system for commerce. Over 80% of Indian consumers prefer chatting on WhatsApp over filling static web forms or answering cold phone calls.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Yet, most local businesses — from dental clinics and yoga teacher trainings to real estate brokers and travel agencies — lose thousands of high-value inquiries every month simply because they cannot reply fast enough outside business hours.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "The 5-Minute Lead Rule in India",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Data from Harvard Business Review demonstrates that reaching out to a prospective lead within ",
            },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: "5 minutes",
            },
            {
              type: "text",
              text: " increases your chance of converting them by ",
            },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: "2100%",
            },
            {
              type: "text",
              text: " compared to waiting 30 minutes. When a prospect is on your site, their buying intent is at its peak. If you take 4 hours to reply, they have already messaged three of your competitors.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "The 4-Step WhatsApp AI Automation Blueprint",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Here is the exact automated lead pipeline we deploy for Adruva clients:",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "1. Instant Trigger: ",
                    },
                    {
                      type: "text",
                      text: "The moment a user enters their details on your website form, a webhook fires into the Meta WhatsApp Cloud API within 3 seconds.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "2. Personalized Greeting: ",
                    },
                    {
                      type: "text",
                      text: "The user receives a verified WhatsApp greeting addressing them by name, along with key details about the service they inquired about.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "3. AI Lead Qualification: ",
                    },
                    {
                      type: "text",
                      text: "A custom LLM agent answers common questions (pricing, dates, location, prerequisites) instantly using your approved knowledge base.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "4. Automated Booking & CRM Sync: ",
                    },
                    {
                      type: "text",
                      text: "The bot shares a direct calendar booking link and logs the entire chat history into your team's PostgreSQL CRM dashboard.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [
            {
              type: "text",
              text: "Automate Your Inbound Sales Pipeline Today",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Stop letting qualified leads slip through the cracks. Learn more about our custom integrations on our ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: { href: "/services/ai-automation" },
                },
              ],
              text: "AI Automation Solutions page",
            },
            {
              type: "text",
              text: " or ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: { href: "/contact" },
                },
              ],
              text: "Contact Our Engineering Team",
            },
            {
              type: "text",
              text: " to schedule a customized live demonstration.",
            },
          ],
        },
      ],
    },
  },
];

export const BLOG_SLUGS = blogPosts.map((p) => p.slug);

export function mapDbBlogToBlogPost(dbBlog: any): BlogPost {
  const initials = dbBlog.author?.name
    ? dbBlog.author.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AT";

  return {
    title: dbBlog.title,
    slug: dbBlog.slug,
    category: (dbBlog.category || "Company News") as any,
    readingTime: dbBlog.readingTimeMinutes
      ? `${dbBlog.readingTimeMinutes} min read`
      : "3 min read",
    publishedDate: dbBlog.publishedAt
      ? new Date(dbBlog.publishedAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : new Date(dbBlog.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
    coverGradient: dbBlog.coverImageUrl || "from-[#0b1f3a] to-[#2d8cff]",
    summary: dbBlog.metaDescription || dbBlog.title,
    author: {
      name: dbBlog.author?.name || "Adruva Team",
      role: dbBlog.author?.designation || "Adruva Lead",
      avatarInitials: initials,
    },
    content:
      typeof dbBlog.content === "string"
        ? JSON.parse(dbBlog.content)
        : dbBlog.content,
    language: dbBlog.language || "en",
    translations: dbBlog.translationOf
      ? [
          {
            id: dbBlog.translationOf.id,
            language: dbBlog.translationOf.language || "en",
            slug: dbBlog.translationOf.slug,
            title: dbBlog.translationOf.title,
          },
          ...(dbBlog.translationOf.translations || []).filter(
            (t: any) => t.id !== dbBlog.id,
          ),
        ]
      : dbBlog.translations || [],
  };
}
