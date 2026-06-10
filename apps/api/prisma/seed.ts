import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const services = [
  {
    name: 'Web Development',
    slug: 'web-development',
    category: 'build',
    tagline: 'Websites that work as hard as you do',
    startingPrice: '₹15,000',
    description: 'We build fast, scalable, and conversion-focused websites — from simple business landing pages to complex web applications. Every project starts with understanding your business goals, not just your design preferences.',
    benefits: [
      { icon: 'rocket', title: 'Fast & SEO-Optimized', description: 'Built with Next.js for lightning-fast load times and Google rankings' },
      { icon: 'mobile', title: 'Mobile-First Design', description: '70% of your customers visit on mobile. We design for them first.' },
      { icon: 'shield', title: 'Secure & Reliable', description: 'SSL, secure forms, regular updates — your site stays safe' },
      { icon: 'target', title: 'Conversion-Focused', description: 'Every element designed to turn visitors into customers' },
      { icon: 'chart', title: 'Analytics Ready', description: 'GA4, Search Console — know exactly how your site performs' },
      { icon: 'tool', title: 'Easy to Update', description: 'Admin panel so you can update content without a developer' }
    ],
    whatsIncluded: [
      'Complete website design + development',
      'Mobile responsive (all screen sizes)',
      'Contact form with email + WhatsApp notification',
      'Basic SEO setup (meta tags, sitemap, robots.txt)',
      'Google Analytics integration',
      'SSL certificate setup',
      '1 round of revisions',
      '30 days post-launch support',
      'Hosting setup guidance'
    ],
    processSteps: [
      { step: 1, title: 'Discovery Call', description: 'Understand your business, goals, target audience, and competitors' },
      { step: 2, title: 'Design', description: 'Wireframes + high-fi Figma designs → your approval before development' },
      { step: 3, title: 'Development', description: 'Build the website, mobile-first, following approved designs' },
      { step: 4, title: 'Testing', description: 'Cross-browser, mobile, speed, and form testing' },
      { step: 5, title: 'Launch', description: 'Deploy, domain setup, go live and monitor' }
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'NestJS', 'PostgreSQL', 'Vercel'],
    faq: [
      { question: 'Do I need to provide content?', answer: 'Yes, you provide the text and images. We give you a content template so you know exactly what to prepare.' },
      { question: 'Will I own the website?', answer: '100%. Code goes to your GitHub, hosting is under your name. You are never locked in with us.' },
      { question: 'Can you redesign my existing website?', answer: 'Yes — we can redesign, rebuild, or add features to any existing website.' },
      { question: 'What if I need changes after launch?', answer: 'Minor bug fixes are covered for 30 days. New features are quoted separately.' },
      { question: 'Do you handle hosting?', answer: 'We set it up under your account. You pay hosting directly — typically ₹0–2,000/month.' },
      { question: 'How long will it take?', answer: 'Landing page: 1–2 weeks. Business website: 2–4 weeks. Web app: 6–16 weeks.' }
    ],
    metaTitle: 'Web Development Services | Adruva Solution',
    metaDescription: 'We build fast, scalable, and conversion-focused websites — from simple business landing pages to complex web applications.',
    sortOrder: 1,
    isActive: true
  },
  {
    name: 'Mobile App Development',
    slug: 'mobile-app-development',
    category: 'build',
    tagline: 'Apps your customers will actually use',
    startingPrice: '₹30,000',
    description: 'We build iOS and Android mobile applications that are fast, intuitive, and built for real users. Whether you need a customer-facing app or an internal tool, we handle design, development, and deployment.',
    benefits: [
      { icon: 'mobile', title: 'iOS + Android', description: 'One codebase, both platforms via React Native' },
      { icon: 'paint', title: 'Beautiful UI', description: 'Designed for real users, not just developers' },
      { icon: 'bolt', title: 'High Performance', description: 'Native-like speed without native costs' },
      { icon: 'bell', title: 'Push Notifications', description: 'Keep users engaged and coming back' },
      { icon: 'link', title: 'API Integration', description: 'Connect to payments, maps, your existing systems' },
      { icon: 'store', title: 'App Store Ready', description: 'We handle App Store + Play Store submission' }
    ],
    whatsIncluded: [
      'Full mobile app (iOS + Android) via React Native',
      'UI/UX design (Figma)',
      'Backend API (NestJS + PostgreSQL)',
      'Push notifications setup',
      'Basic analytics (Firebase)',
      'App Store + Play Store submission',
      '30 days post-launch support'
    ],
    processSteps: [
      { step: 1, title: 'Discovery', description: 'Understand users, core features, and user journeys' },
      { step: 2, title: 'Design', description: 'Wireframes + UI design, mobile-first, platform guidelines' },
      { step: 3, title: 'Development', description: 'Frontend app + backend API built in parallel' },
      { step: 4, title: 'Testing', description: 'Device testing on iOS + Android, performance, edge cases' },
      { step: 5, title: 'Launch', description: 'App Store + Play Store submission and monitoring' }
    ],
    techStack: ['React Native', 'Expo', 'NestJS', 'PostgreSQL', 'Firebase', 'Razorpay'],
    faq: [
      { question: 'Do you build for both iOS and Android?', answer: 'Yes — React Native gives us one codebase for both platforms.' },
      { question: 'How much does App Store publishing cost?', answer: 'Apple: $99/year developer account. Google: $25 one-time. These are paid by you directly.' },
      { question: 'Can you add features to my existing app?', answer: 'Yes, if it is built in React Native. We will review the codebase first.' },
      { question: 'Do I need a backend/server?', answer: 'Most apps need a backend. We build it as part of the project.' }
    ],
    metaTitle: 'Mobile App Development Services | Adruva Solution',
    metaDescription: 'We build fast, intuitive iOS and Android mobile applications. Full design, development, and App Store / Play Store deployment.',
    sortOrder: 2,
    isActive: true
  },
  {
    name: 'SaaS / Custom Software',
    slug: 'saas-custom-software',
    category: 'build',
    tagline: 'Build the software your business actually needs',
    startingPrice: '₹75,000',
    description: 'Off-the-shelf software rarely fits perfectly. We build custom SaaS products and internal tools tailored exactly to your business — whether it\'s a client management system, booking platform, or industry-specific tool.',
    benefits: [
      { icon: 'target', title: 'Built for YOUR workflow', description: 'Not a generic tool adapted for you' },
      { icon: 'chart', title: 'Scales with your business', description: 'Architecture designed to grow from 10 to 10,000 users' },
      { icon: 'link', title: 'Integrates with everything', description: 'Connect to any third-party tool via API' },
      { icon: 'lock', title: 'Your data, your control', description: 'No data sharing with third parties' },
      { icon: 'coins', title: 'No per-seat pricing', description: 'Own it outright, no monthly SaaS fees forever' },
      { icon: 'tool', title: 'We maintain it', description: 'Ongoing support and feature additions as you grow' }
    ],
    whatsIncluded: [
      'Full product design (UX/UI)',
      'Frontend (Next.js)',
      'Backend API (NestJS + PostgreSQL)',
      'User authentication + role-based access',
      'Admin dashboard',
      'Basic reporting/analytics',
      'Deployment setup',
      '3 months post-launch support'
    ],
    processSteps: [
      { step: 1, title: 'Discovery + Requirements', description: 'Deep dive into your workflow, users, and pain points' },
      { step: 2, title: 'Architecture', description: 'Database design, API design, tech decisions' },
      { step: 3, title: 'Design', description: 'Full UX/UI design in Figma' },
      { step: 4, title: 'Development', description: 'Phased development with regular demos' },
      { step: 5, title: 'Testing + Launch', description: 'QA, UAT, and deployment' }
    ],
    techStack: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Cloudinary', 'Razorpay'],
    faq: [
      { question: 'How is this different from buying existing SaaS?', answer: 'Custom software fits your exact workflow with no workarounds or per-seat pricing.' },
      { question: 'Do you offer ongoing maintenance?', answer: 'Yes — we offer monthly maintenance retainers after project delivery.' }
    ],
    metaTitle: 'SaaS & Custom Software Development | Adruva Solution',
    metaDescription: 'Custom software built for your exact business workflow. Zero licensing fees, highly scalable, and fully integrated.',
    sortOrder: 3,
    isActive: true
  },
  {
    name: 'AI Automation',
    slug: 'ai-automation',
    category: 'automate',
    tagline: 'Stop doing manually what AI can do for you',
    startingPrice: 'Custom Quote',
    description: 'We identify repetitive tasks in your business and build AI systems to handle them — from automated customer follow-ups and WhatsApp bots to document processing and workflow automation.',
    benefits: [
      { icon: 'clock', title: 'Save 10+ hours/week', description: 'Automate repetitive tasks that eat your time' },
      { icon: 'bot', title: '24/7 Response', description: 'AI handles enquiries even at 2am' },
      { icon: 'shield', title: 'Eliminate Human Error', description: 'Automated processes don\'t make mistakes' },
      { icon: 'chart', title: 'Better Data', description: 'Every interaction tracked and analyzed automatically' },
      { icon: 'coins', title: 'Lower Operating Costs', description: 'Do more with the same or smaller team' },
      { icon: 'rocket', title: 'Faster Response Times', description: 'Instant replies vs. hours of waiting' }
    ],
    whatsIncluded: [
      'Business process audit (identify automation opportunities)',
      'Custom AI workflow design',
      'Integration with your existing tools (WhatsApp, email, CRM, etc.)',
      'Testing + fine-tuning',
      'Team training',
      '30-day monitoring period'
    ],
    processSteps: [
      { step: 1, title: 'Audit', description: 'Map your current workflows, find automation opportunities' },
      { step: 2, title: 'Design', description: 'Design the automation flow (what triggers what)' },
      { step: 3, title: 'Build', description: 'Build and integrate the automation' },
      { step: 4, title: 'Test', description: 'Test with real scenarios, edge cases' },
      { step: 5, title: 'Train + Monitor', description: 'Train your team, monitor for 30 days' }
    ],
    techStack: ['Python', 'OpenAI API', 'n8n', 'Make.com', 'WhatsApp API', 'Zapier'],
    faq: [
      { question: 'What can be automated?', answer: 'Lead follow-ups, appointment reminders, customer onboarding, data entry, reports, etc.' },
      { question: 'Do I need technical knowledge?', answer: 'No, we build it so your team can easily use it.' }
    ],
    metaTitle: 'AI Workflow Automation Services | Adruva Solution',
    metaDescription: 'Automate repetitive tasks, lead follow-ups, and customer communications using AI. Integrations for WhatsApp, CRM, and email.',
    sortOrder: 4,
    isActive: true
  },
  {
    name: 'AI Ads',
    slug: 'ai-ads',
    category: 'automate',
    tagline: 'Ads that learn and optimize themselves',
    startingPrice: 'Custom Quote',
    description: 'We build AI-powered advertising systems that automatically optimize your Google and Meta ad campaigns — adjusting bids, audiences, and creatives based on real performance data, not guesswork.',
    benefits: [
      { icon: 'chart', title: 'Higher ROI', description: 'AI finds the best-performing combinations faster than any human' },
      { icon: 'target', title: 'Smarter Targeting', description: 'Finds your ideal customer based on behavior, not just demographics' },
      { icon: 'zap', title: 'Real-Time Optimization', description: 'Adjusts campaigns 24/7, not just during office hours' },
      { icon: 'flask', title: 'Continuous Testing', description: 'Automatically tests ad variations to find winners' },
      { icon: 'coins', title: 'Reduced Wasted Spend', description: 'AI cuts off underperforming ads before they drain budget' },
      { icon: 'report', title: 'Clear Reporting', description: 'Know exactly what\'s working and why' }
    ],
    whatsIncluded: [
      'Ad account audit + setup',
      'AI bidding strategy configuration',
      'Audience building (custom + lookalike)',
      'Creative testing framework',
      'Weekly performance reports',
      'Monthly strategy review'
    ],
    processSteps: [
      { step: 1, title: 'Audit', description: 'Review existing ad accounts, identify waste and opportunities' },
      { step: 2, title: 'Strategy', description: 'Define objectives, audiences, budget allocation' },
      { step: 3, title: 'Setup', description: 'Configure AI bidding, build audiences, set up tracking' },
      { step: 4, title: 'Launch', description: 'Go live with initial campaigns' },
      { step: 5, title: 'Optimize', description: 'Continuous AI optimization + monthly human review' }
    ],
    techStack: ['Google Ads API', 'Meta Ads API', 'OpenAI', 'Python', 'Analytics'],
    faq: [
      { question: 'What is the role of AI in advertising?', answer: 'AI analyzes multi-dimensional data in real-time to adjust bids and shift budgets to best performing segments.' },
      { question: 'Do you write ad copy?', answer: 'Yes, we design visuals and write ad copy using conversion frameworks optimized by AI.' }
    ],
    metaTitle: 'AI-Powered Digital Advertising | Adruva Solution',
    metaDescription: 'Supercharge your ROI with AI-optimized ad campaigns. Smart bidding, auto-audience generation, and real-time budget routing.',
    sortOrder: 5,
    isActive: true
  },
  {
    name: 'Custom AI Solutions',
    slug: 'custom-ai-solutions',
    category: 'automate',
    tagline: 'AI built specifically for your industry and workflow',
    startingPrice: 'Custom Quote',
    description: 'When off-the-shelf AI tools don\'t fit, we build custom AI solutions — chatbots trained on your data, recommendation engines, document analysis tools, and more.',
    benefits: [
      { icon: 'target', title: 'Trained on YOUR data', description: 'Not generic AI, but AI that knows your business' },
      { icon: 'lock', title: 'Private + Secure', description: 'Your data is never used to train public models' },
      { icon: 'link', title: 'Fully Integrated', description: 'Works within your existing tools and workflow' },
      { icon: 'chart', title: 'Improves Over Time', description: 'Learns from usage, gets smarter with use' },
      { icon: 'award', title: 'Branded Experience', description: 'Customers interact with YOUR AI, not a third-party tool' },
      { icon: 'tool', title: 'Fully Customizable', description: 'Change behavior, tone, capabilities anytime' }
    ],
    whatsIncluded: [
      'AI solution discovery & design',
      'Custom data integration & ingestion pipeline',
      'Fine-tuned LLM model setup',
      'API wrapper development',
      'Frontend integration',
      'Security and audit reports'
    ],
    processSteps: [
      { step: 1, title: 'Discovery', description: 'Map requirements, data sources, and desired outcomes' },
      { step: 2, title: 'Prototyping', description: 'Build a proof-of-concept AI agent with sample data' },
      { step: 3, title: 'Model Fine-Tuning', description: 'Train models on company data, define guardrails' },
      { step: 4, title: 'Integration', description: 'Embed AI client in website/app/CRM workflow' },
      { step: 5, title: 'Launch & Refine', description: 'Deploy and continuously audit query performance' }
    ],
    techStack: ['Python', 'LangChain', 'OpenAI API', 'Pinecone', 'PostgreSQL', 'Next.js'],
    faq: [
      { question: 'Can you build a chatbot for my website?', answer: 'Yes — trained on your FAQs, products, and services. Answers customer questions 24/7.' },
      { question: 'Is my data safe?', answer: 'Yes — we build private AI systems. Your data is never used to train public models.' }
    ],
    metaTitle: 'Custom AI Solutions & LLM Development | Adruva Solution',
    metaDescription: 'We build custom AI chatbots, RAG applications, and semantic search engines trained on your corporate data. Private, secure, and integrated.',
    sortOrder: 6,
    isActive: true
  },
  {
    name: 'Google Ads',
    slug: 'google-ads',
    category: 'grow',
    tagline: 'Show up exactly when customers are searching for you',
    startingPrice: 'Custom Quote',
    description: 'We manage Google Ads campaigns that put your business in front of people actively searching for your products or services — with full transparency on spend and results.',
    benefits: [
      { icon: 'target', title: 'Intent-Based Targeting', description: 'Reach people actively searching for what you sell' },
      { icon: 'chart', title: 'Full Spend Transparency', description: 'See every rupee spent and what it generated' },
      { icon: 'shield', title: 'Measurable ROI', description: 'Track calls, forms, and sales directly from ads' },
      { icon: 'rocket', title: 'Immediate Results', description: 'Unlike SEO, ads can drive traffic from day 1' },
      { icon: 'tool', title: 'Continuous Optimization', description: 'Regular bid + keyword + ad copy optimization' },
      { icon: 'report', title: 'Monthly Reports', description: 'Clear, jargon-free performance reports' }
    ],
    whatsIncluded: [
      'Google Ads account setup/audit',
      'Keyword research + competitor analysis',
      'Campaign structure + ad copy writing',
      'Conversion tracking setup (calls, forms, purchases)',
      'Landing page recommendations',
      'Monthly optimization + reporting',
      'Dedicated account manager'
    ],
    processSteps: [
      { step: 1, title: 'Audit', description: 'Review existing account or research competitors' },
      { step: 2, title: 'Strategy', description: 'Keywords, bidding strategy, budget allocation' },
      { step: 3, title: 'Setup', description: 'Campaign build, ad copy, tracking' },
      { step: 4, title: 'Launch', description: 'Go live + initial monitoring' },
      { step: 5, title: 'Optimize', description: 'Weekly optimizations + monthly reporting' }
    ],
    techStack: ['Google Ads', 'Google Tag Manager', 'Google Analytics 4', 'Keyword Planner'],
    faq: [
      { question: 'What\'s the minimum budget?', answer: 'We recommend minimum ₹15,000–20,000/month ad spend (separate from our management fee).' },
      { question: 'How long until I see results?', answer: 'Usually 2–4 weeks to gather data, 4–8 weeks to see meaningful optimization.' }
    ],
    metaTitle: 'Google Ads Management Services | Adruva Solution',
    metaDescription: 'Drive conversions with expert Google Ads management. Search ads, display campaigns, and conversion tracking configurations.',
    sortOrder: 7,
    isActive: true
  },
  {
    name: 'Meta Ads',
    slug: 'meta-ads',
    category: 'grow',
    tagline: 'Find your customers where they spend their time',
    startingPrice: 'Custom Quote',
    description: 'We run Facebook and Instagram ad campaigns that build awareness, generate leads, and drive sales — using creative that stops the scroll and targeting that reaches the right people.',
    benefits: [
      { icon: 'users', title: 'Massive Reach', description: '400M+ Indians use Facebook/Instagram' },
      { icon: 'target', title: 'Precise Targeting', description: 'Age, location, interests, behavior, lookalikes' },
      { icon: 'paint', title: 'Creative That Converts', description: 'Scroll-stopping visuals + copy designed to perform' },
      { icon: 'chart', title: 'Pixel Tracking', description: 'Track every action from ad click to purchase' },
      { icon: 'refresh', title: 'Retargeting', description: 'Re-engage people who visited your website but didn\'t convert' },
      { icon: 'coins', title: 'Cost-Effective', description: 'Often lower cost-per-lead than Google for awareness campaigns' }
    ],
    whatsIncluded: [
      'Meta Business Manager setup',
      'Pixel installation + event tracking',
      'Campaign strategy + audience building',
      'Ad creative (static images + copy; video extra)',
      'A/B testing framework',
      'Monthly optimization + reporting'
    ],
    processSteps: [
      { step: 1, title: 'Strategy', description: 'Map audiences, campaign funnels, and core offers' },
      { step: 2, title: 'Asset Creation', description: 'Design graphics, write ad copy, configure pixel events' },
      { step: 3, title: 'Setup & Launch', description: 'Build and launch ad groups inside Meta Manager' },
      { step: 4, title: 'A/B Testing', description: 'Test different hook variations, creatives, and target pools' },
      { step: 5, title: 'Scaling', description: 'Allocate budget to winning sets, scale overall volume' }
    ],
    techStack: ['Meta Ads Manager', 'Facebook Pixel', 'Meta Conversions API', 'Canva', 'Figma'],
    faq: [
      { question: 'What assets do I need to provide?', answer: 'We handle ad copy and standard graphic creatives. If you have video assets of your products or team, that helps significantly!' },
      { question: 'How long should we run ads to see results?', answer: 'Meta Ads optimization takes about 2 to 3 weeks for the algorithm to exit the learning phase.' }
    ],
    metaTitle: 'Facebook & Instagram Ads Management | Adruva Solution',
    metaDescription: 'Convert social scrolls into paid customers. Professional Meta Ads management with custom pixel setup and retargeting campaigns.',
    sortOrder: 8,
    isActive: true
  },
  {
    name: 'SEO',
    slug: 'seo',
    category: 'grow',
    tagline: 'Rank higher. Get found. Convert better.',
    startingPrice: 'Custom Quote',
    description: 'We improve your search engine rankings so customers find you organically — without paying for every click. Our SEO combines technical optimization, content strategy, and link building.',
    benefits: [
      { icon: 'gift', title: 'Free Traffic', description: 'Once ranked, organic visitors cost nothing per click' },
      { icon: 'award', title: 'Long-Term Results', description: 'Rankings compound over time (unlike paid ads)' },
      { icon: 'target', title: 'High-Intent Visitors', description: 'People searching for your service are ready to buy' },
      { icon: 'chart', title: 'Authority Building', description: 'Google rankings build trust with potential customers' },
      { icon: 'report', title: 'Full Transparency', description: 'Monthly ranking reports + traffic analytics' },
      { icon: 'tool', title: 'Technical + Content', description: 'We handle both sides of SEO' }
    ],
    whatsIncluded: [
      'Technical SEO audit + fixes (site speed, mobile, structure)',
      'Keyword research + content strategy',
      'On-page optimization (meta tags, headers, content)',
      'Google Search Console + Analytics setup',
      'Monthly content pieces (blog posts targeting keywords)',
      'Link building outreach',
      'Monthly ranking + traffic report'
    ],
    processSteps: [
      { step: 1, title: 'Audit & Research', description: 'Comprehensive website audit, competitor mapping, keyword opportunities' },
      { step: 2, title: 'Technical Fixes', description: 'Improve page load speeds, fix crawl errors, set canonical tags' },
      { step: 3, title: 'On-Page Optimization', description: 'Rewrite meta descriptions, heading structures, and body content' },
      { step: 4, title: 'Content Production', description: 'Publish high-quality blog posts targeting target search queries' },
      { step: 5, title: 'Authority & Backlinks', description: 'Outreach campaigns to build links from authority sites' }
    ],
    techStack: ['Google Search Console', 'Ahrefs', 'SEMrush', 'Screaming Frog', 'Google Analytics'],
    faq: [
      { question: 'How long until I rank on page 1?', answer: 'Usually 3–6 months for competitive keywords, sometimes faster for local/niche terms. SEO is a long-term investment.' },
      { question: 'Do I need to keep paying monthly?', answer: 'SEO is ongoing — algorithms change, competitors optimize. We recommend at least 6 months to see real results.' }
    ],
    metaTitle: 'SEO & Organic Growth Services | Adruva Solution',
    metaDescription: 'Rank high on Google. Technical SEO, on-page optimization, content writing, and quality backlink generation.',
    sortOrder: 9,
    isActive: true
  },
  {
    name: 'Social Media Management',
    slug: 'social-media-management',
    category: 'grow',
    tagline: 'A consistent, professional social presence without the headache',
    startingPrice: 'Custom Quote',
    description: 'We handle your social media completely — content creation, scheduling, engagement, and growth. You focus on your business, we handle your Instagram, Facebook, and LinkedIn.',
    benefits: [
      { icon: 'calendar', title: 'Consistent Posting', description: 'Never miss a post or run out of content ideas' },
      { icon: 'paint', title: 'Professional Content', description: 'Designed graphics, captions, hashtags done right' },
      { icon: 'chat', title: 'Engagement Management', description: 'Replies to comments and DMs' },
      { icon: 'chart', title: 'Growth Tracking', description: 'Monthly follower + engagement analytics' },
      { icon: 'target', title: 'Platform-Specific Strategy', description: 'Different content approach per platform' },
      { icon: 'clock', title: 'Save 10+ hours/week', description: 'No more stressing about what to post' }
    ],
    whatsIncluded: [
      'Content calendar (monthly)',
      'Graphic design (posts, stories, reels covers)',
      'Caption writing + hashtag research',
      'Posting + scheduling',
      'Comment + DM management',
      'Monthly analytics report'
    ],
    processSteps: [
      { step: 1, title: 'Audit & Identity', description: 'Understand brand voice, colors, and content pillars' },
      { step: 2, title: 'Calendar Creation', description: 'Draft content ideas and themes for the upcoming month' },
      { step: 3, title: 'Production', description: 'Design graphics, edit shorts/reels, write captions' },
      { step: 4, title: 'Scheduling & Engagement', description: 'Post at optimal times, monitor comments and responses' },
      { step: 5, title: 'Analytics', description: 'Analyze follower growth and post engagements' }
    ],
    techStack: ['Buffer', 'Meta Business Suite', 'Canva', 'Figma', 'CapCut'],
    faq: [
      { question: 'Which platforms should I focus on?', answer: 'Depends on your business. Local services do great on Instagram/Facebook. B2B businesses benefit most from LinkedIn.' },
      { question: 'How many posts are included?', answer: 'Typically 3 posts per week (12 per month), plus stories. We customize packages based on your requirements.' }
    ],
    metaTitle: 'Social Media Management Services | Adruva Solution',
    metaDescription: 'Complete social media management for Instagram, Facebook, and LinkedIn. Branding, caption writing, graphic design, and analytics.',
    sortOrder: 10,
    isActive: true
  },
  {
    name: 'Email Marketing',
    slug: 'email-marketing',
    category: 'grow',
    tagline: 'The highest ROI marketing channel, done right',
    startingPrice: 'Custom Quote',
    description: 'Email marketing delivers ₹42 for every ₹1 spent (on average). We set up automated email sequences and campaigns that nurture leads, retain customers, and drive repeat sales.',
    benefits: [
      { icon: 'coins', title: 'Highest Marketing ROI', description: 'Email consistently outperforms every other channel' },
      { icon: 'bot', title: 'Automated Sequences', description: 'Welcome series, follow-ups, abandoned cart — all automatic' },
      { icon: 'target', title: 'Highly Personalized', description: 'Right message to the right person at the right time' },
      { icon: 'chart', title: 'Measurable', description: 'Open rates, click rates, conversions — everything tracked' },
      { icon: 'lock', title: 'You Own Your List', description: 'Unlike social media, your email list is yours forever' },
      { icon: 'refresh', title: 'Works 24/7', description: 'Automated emails go out even when you\'re sleeping' }
    ],
    whatsIncluded: [
      'Email platform setup (Mailchimp/Brevo/Klaviyo)',
      'List segmentation strategy',
      'Welcome sequence (5–7 emails)',
      'Monthly newsletters (2–4/month)',
      'Automation workflow setup',
      'Monthly performance report'
    ],
    processSteps: [
      { step: 1, title: 'Setup', description: 'Configure domain SPF/DKIM records, import clean lists' },
      { step: 2, title: 'Strategy', description: 'Plan segmentation criteria and campaign content calendar' },
      { step: 3, title: 'Design & Copywriting', description: 'Design templates, write copy, set up personalization tokens' },
      { step: 4, title: 'Automation Build', description: 'Configure triggers and logic flows for automated responses' },
      { step: 5, title: 'Nurture & Analyze', description: 'Dispatch campaigns, review open rates, optimize email templates' }
    ],
    techStack: ['Klaviyo', 'Mailchimp', 'Brevo', 'ActiveCampaign'],
    faq: [
      { question: 'How do you prevent emails from going to spam?', answer: 'We configure domain security authentication (SPF, DKIM, DMARC), warm up your sending IP, and clean inactive contacts.' },
      { question: 'What if I do not have an email list?', answer: 'We set up email capture forms on your website to build your audience organically.' }
    ],
    metaTitle: 'Email Marketing & CRM Automation | Adruva Solution',
    metaDescription: 'Nurture leads and drive sales with professional email marketing campaigns. Automation, list building, and responsive email designs.',
    sortOrder: 11,
    isActive: true
  },
  {
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    category: 'design',
    tagline: 'Design that users love and businesses need',
    startingPrice: 'Custom Quote',
    description: 'We design digital experiences that are beautiful, intuitive, and conversion-focused. From user research to final Figma files — we make sure your product works for real users.',
    benefits: [
      { icon: 'search', title: 'User Research First', description: 'We understand your users before designing anything' },
      { icon: 'target', title: 'Conversion-Focused', description: 'Design decisions backed by UX principles and data' },
      { icon: 'mobile', title: 'Mobile-First', description: 'Every design works perfectly on all screen sizes' },
      { icon: 'refresh', title: 'Iterative Process', description: 'Multiple feedback rounds, nothing final until you\'re happy' },
      { icon: 'folder', title: 'Developer-Ready Files', description: 'Clean Figma files with design system, ready to hand off' },
      { icon: 'flask', title: 'Tested Designs', description: 'Usability testing before development saves costly mistakes' }
    ],
    whatsIncluded: [
      'User research (interviews or surveys)',
      'User personas + user journey maps',
      'Information architecture',
      'Wireframes (low-fidelity)',
      'High-fidelity UI designs (Figma)',
      'Interactive prototype',
      'Design system (colors, fonts, components)',
      'Developer handoff (Figma with specs)',
      '2 rounds of revisions'
    ],
    processSteps: [
      { step: 1, title: 'Research', description: 'User interviews, competitor analysis, heuristic evaluation' },
      { step: 2, title: 'Architecture', description: 'Sitemap, user flows, information hierarchy' },
      { step: 3, title: 'Wireframes', description: 'Low-fidelity layouts, feedback round' },
      { step: 4, title: 'Visual Design', description: 'High-fidelity UI, brand application' },
      { step: 5, title: 'Prototype + Handoff', description: 'Interactive prototype + developer-ready Figma' }
    ],
    techStack: ['Figma', 'Adobe XD', 'Miro', 'Zeplin'],
    faq: [
      { question: 'What deliverables do I get?', answer: 'You receive interactive Figma prototypes, developer-ready design tokens, sitemaps, and component guides.' },
      { question: 'How long does a typical project take?', answer: 'A website design takes about 2 to 4 weeks. A complex SaaS/mobile app dashboard takes 6 to 10 weeks.' }
    ],
    metaTitle: 'UI/UX Design Services | Adruva Solution',
    metaDescription: 'Intelligent digital experiences designed to convert. Mobile app wireframing, SaaS product dashboards, and complete Figma developer handoffs.',
    sortOrder: 12,
    isActive: true
  },
  {
    name: 'Graphic Designing',
    slug: 'graphic-designing',
    category: 'design',
    tagline: 'Visual identity that makes your brand unforgettable',
    startingPrice: 'Custom Quote',
    description: 'From logos and brand identities to marketing materials and social media graphics — we create visuals that communicate your brand\'s personality and professionalism.',
    benefits: [
      { icon: 'award', title: 'Unique Brand Identity', description: 'Visual systems that make your business stand out' },
      { icon: 'paint', title: 'Cohesive Design', description: 'Consistency across print, digital, and packaging' },
      { icon: 'target', title: 'Targeted Layouts', description: 'Designs crafted specifically for your demographic' },
      { icon: 'folder', title: 'Print-Ready Files', description: 'All formats provided, high resolution vector assets' }
    ],
    whatsIncluded: [
      'Logo design (3 concepts, 2 revision rounds)',
      'Brand identity kit (colors, fonts, usage guidelines)',
      'Business card design',
      'Social media templates (Instagram, Facebook)',
      'Brochure / flyer design',
      'Presentation templates',
      'Banner ads'
    ],
    processSteps: [
      { step: 1, title: 'Brief', description: 'Understand brand personality, target audience, preferences' },
      { step: 2, title: 'Concepts', description: '3 initial design directions' },
      { step: 3, title: 'Refinement', description: 'Choose direction, refine' },
      { step: 4, title: 'Delivery', description: 'Final files (AI, PNG, PDF, SVG)' }
    ],
    techStack: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'InDesign'],
    faq: [
      { question: 'Do I get the source files?', answer: 'Yes — we deliver print-ready PDFs and original editable vector source files (AI/EPS).' },
      { question: 'Can you help print brochures?', answer: 'We handle design only. We provide files optimized for printers and can co-ordinate details with your printer.' }
    ],
    metaTitle: 'Graphic Design & Brand Identity | Adruva Solution',
    metaDescription: 'Professional branding, logo designs, business cards, and marketing flyer graphics. Creative visuals that make your business stand out.',
    sortOrder: 13,
    isActive: true
  },
  {
    name: 'Video Editing',
    slug: 'video-editing',
    category: 'design',
    tagline: 'Raw footage to professional content, fast',
    startingPrice: 'Custom Quote',
    description: 'We edit your raw video footage into professional content for social media, ads, YouTube, or presentations — with graphics, music, captions, and your brand identity.',
    benefits: [
      { icon: 'video', title: 'Professional Cuts', description: 'Seamless edits, pacing, and multi-cam alignments' },
      { icon: 'star', title: 'Motion Graphics', description: 'Engaging transitions, text popups, and lower thirds' },
      { icon: 'music', title: 'Sound Engineering', description: 'Licensed background music, sound effects, audio cleanup' },
      { icon: 'bell', title: 'Subtitles & Captions', description: 'Animated captions to capture mobile audiences without sound' }
    ],
    whatsIncluded: [
      'Video editing (cuts, transitions, color grading)',
      'Motion graphics + text overlays',
      'Brand intro/outro',
      'Background music (licensed)',
      'Subtitles/captions',
      'Export in required formats (Reels, YouTube, ads)'
    ],
    processSteps: [
      { step: 1, title: 'Footage Upload', description: 'Share raw files via cloud storage with detailed instructions' },
      { step: 2, title: 'Draft Cut', description: 'Assemble raw story, select background audio tracks' },
      { step: 3, title: 'Color & Audio', description: 'Perform color grading, audio leveling, and subtitle alignment' },
      { step: 4, title: 'Effects & Graphics', description: 'Add motion graphics, zoom cues, sound effects' },
      { step: 5, title: 'Final Review', description: 'Deliver in vertical (9:16) and horizontal (16:9) formats' }
    ],
    techStack: ['Adobe Premiere Pro', 'DaVinci Resolve', 'After Effects', 'CapCut Pro'],
    faq: [
      { question: 'What format should I send raw footage in?', answer: 'Any format works — MP4, MOV, AVI. Higher quality = better output.' },
      { question: 'Do you shoot video too?', answer: 'Currently editing only. For shooting, we can recommend local videographers.' }
    ],
    metaTitle: 'Professional Video Editing Services | Adruva Solution',
    metaDescription: 'Convert raw footage into high-converting video ads, YouTube clips, and Instagram reels. Caption editing and color grading included.',
    sortOrder: 14,
    isActive: true
  }
];

async function main() {
  console.log('Start seeding services...');
  for (const s of services) {
    const service = await prisma.websiteService.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        category: s.category,
        tagline: s.tagline,
        startingPrice: s.startingPrice,
        description: s.description,
        benefits: s.benefits,
        whatsIncluded: s.whatsIncluded,
        processSteps: s.processSteps,
        techStack: s.techStack,
        faq: s.faq,
        metaTitle: s.metaTitle,
        metaDescription: s.metaDescription,
        sortOrder: s.sortOrder,
        isActive: s.isActive,
      },
      create: {
        name: s.name,
        slug: s.slug,
        category: s.category,
        tagline: s.tagline,
        startingPrice: s.startingPrice,
        description: s.description,
        benefits: s.benefits,
        whatsIncluded: s.whatsIncluded,
        processSteps: s.processSteps,
        techStack: s.techStack,
        faq: s.faq,
        metaTitle: s.metaTitle,
        metaDescription: s.metaDescription,
        sortOrder: s.sortOrder,
        isActive: s.isActive,
      },
    });
    console.log(`Seeded service: ${service.slug}`);
  }
  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
