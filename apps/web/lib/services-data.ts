export interface ServiceBenefit {
  icon: string;
  title: string;
  desc: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  name: string;
  slug: string;
  category: 'build' | 'automate' | 'grow' | 'design';
  tagline: string;
  price: string;
  description: string;
  iconName: string;
  benefits: ServiceBenefit[];
  whatsIncluded: string[];
  techStack?: string[];
  faq: ServiceFAQ[];
}

export const services: ServiceItem[] = [
  {
    name: 'Web Development',
    slug: 'web-development',
    category: 'build',
    tagline: 'Websites that work as hard as you do',
    price: 'Starting ₹15,000',
    description: 'We build fast, scalable, and conversion-focused websites — from simple business landing pages to complex web applications.',
    iconName: 'Code2',
    benefits: [
      { icon: 'Rocket', title: 'Fast & SEO-Optimized', desc: 'Built with Next.js for lightning-fast load times and high Google rankings.' },
      { icon: 'Smartphone', title: 'Mobile-First Design', desc: 'Over 70% of visitors browse on mobile. We design for their screen sizes first.' },
      { icon: 'Shield', title: 'Secure & Reliable', desc: 'SSL encryption, secure contact forms, and regular packages updates.' },
      { icon: 'Target', title: 'Conversion-Focused', desc: 'Every element and CTA button is structured to turn passive traffic into leads.' },
      { icon: 'BarChart2', title: 'Analytics Ready', desc: 'Integrated with Google Analytics 4, Search Console, and user tracking.' },
      { icon: 'Settings', title: 'Easy to Update', desc: 'Structured layout setup and CMS integration so you can update text easily.' }
    ],
    whatsIncluded: [
      'Complete website design & development',
      'Fully mobile responsive design (all breakpoints)',
      'Contact forms with email & WhatsApp notifications',
      'On-page SEO setup (meta tags, sitemap, robots.txt)',
      'Google Analytics 4 integration',
      'Cloudflare SSL setup and security config',
      '30 days of post-launch technical support',
      'Hosting deployment setup (Vercel/Cloudflare)'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'NestJS', 'PostgreSQL'],
    faq: [
      { question: 'Do I need to provide content (text and images)?', answer: 'Yes, you provide the copy and brand assets. We give you a template to make it easy. Copywriting help is available for an additional fee.' },
      { question: 'Will I own the website after delivery?', answer: '100%. The code is pushed to your GitHub account and hosting is set up under your credentials. You own everything.' },
      { question: 'Can you redesign my existing website?', answer: 'Yes, we can redesign and rebuild outdated websites using modern tech stacks for better speed and conversions.' },
      { question: 'Do you handle hosting?', answer: 'We configure the hosting under your account (usually Vercel or Netlify). Free-tier hosting is often sufficient for small-to-medium sites.' },
      { question: 'How long will it take?', answer: 'Landing pages take 1–2 weeks, complete business websites take 2–4 weeks, and custom web applications take 6–16 weeks.' }
    ]
  },
  {
    name: 'Mobile App Development',
    slug: 'mobile-app-development',
    category: 'build',
    tagline: 'Apps your customers will actually use',
    price: 'Starting ₹30,000',
    description: 'We build iOS and Android mobile applications that are fast, intuitive, and built for real users using React Native.',
    iconName: 'Smartphone',
    benefits: [
      { icon: 'Smartphone', title: 'iOS & Android Support', desc: 'Single React Native codebase to deploy on both major mobile app stores.' },
      { icon: 'Palette', title: 'Premium UI/UX Design', desc: 'Engineered for real users with intuitive navigation and pixel-perfect layouts.' },
      { icon: 'Zap', title: 'Native-like Speed', desc: 'Highly optimized animations and component renderings for fluid usage.' },
      { icon: 'Bell', title: 'Push Notifications', desc: 'Keep your users engaged and coming back with custom notification setups.' },
      { icon: 'Link', title: 'Robust API Integration', desc: 'Connect seamlessly with backend systems, payment gateways, and third-party APIs.' },
      { icon: 'Store', title: 'App Store Submission', desc: 'We handle the complete setup and submissions for both App Store and Play Store.' }
    ],
    whatsIncluded: [
      'iOS & Android applications (React Native)',
      'Full UI/UX layout design in Figma',
      'Secure backend API setup (NestJS + PostgreSQL)',
      'Push notification alerts configuration',
      'Basic analytics dashboard (Firebase)',
      'Google Play and Apple App Store submissions',
      '30 days of active post-launch support'
    ],
    techStack: ['React Native', 'Expo', 'NestJS', 'PostgreSQL', 'Firebase', 'Tailwind CSS'],
    faq: [
      { question: 'Do you build for both iOS and Android?', answer: 'Yes, we use React Native so your application works natively on both iOS and Android platforms.' },
      { question: 'How much does it cost to publish on the App Stores?', answer: 'Apple charges $99/year for a developer account. Google Play charges a $25 one-time developer fee. These are paid directly to them.' },
      { question: 'Can you add features to my existing application?', answer: 'Yes, if it is built in React Native. We will conduct a code audit first to review its architecture.' },
      { question: 'Will the application work offline?', answer: 'Basic offline caching can be configured. Full offline sync requires more planning and will be scoped during discovery.' },
      { question: 'Do I need a backend/server?', answer: 'Most applications need a server to manage databases, users, and transactions. We build and deploy it as part of the project.' }
    ]
  },
  {
    name: 'SaaS & Custom Software',
    slug: 'saas-custom-software',
    category: 'build',
    tagline: 'Build the software your business actually needs',
    price: 'Starting ₹75,000',
    description: 'We build custom SaaS products and internal tools tailored exactly to your business — with no per-seat pricing.',
    iconName: 'Terminal',
    benefits: [
      { icon: 'Target', title: 'Tailored to Your Flow', desc: 'Designed exactly for your unique business processes, unlike generic tools.' },
      { icon: 'TrendingUp', title: 'Scales Instantly', desc: 'Architected to scale smoothly from 10 to 10,000+ active users.' },
      { icon: 'Link', title: 'Seamless Integrations', desc: 'Integrate with custom tools, databases, and third-party SaaS tools.' },
      { icon: 'Shield', title: 'Data Sovereignty', desc: 'Your database and your users — complete control of private datasets.' },
      { icon: 'Coins', title: 'Zero Seat Restrictions', desc: 'No monthly fee per user; grow your team without mounting software bills.' },
      { icon: 'Settings', title: 'Maintained by Experts', desc: 'Ongoing maintenance agreements to launch new features as you scale.' }
    ],
    whatsIncluded: [
      'Product UX/UI wireframes & designs in Figma',
      'Scalable Next.js frontend',
      'Secure NestJS API with database modeling',
      'Role-based user authentication & permissions',
      'Custom management admin dashboard',
      'Payment gateway billing (Stripe/Razorpay)',
      '3 months of included post-launch support'
    ],
    techStack: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS'],
    faq: [
      { question: 'How is custom software better than off-the-shelf SaaS?', answer: 'Custom software fits your workflow exactly, meaning zero compromises, and eliminates user-based subscription fees.' },
      { question: 'Can you build a platform like [specific software]?', answer: 'Yes! Send us your requirements and we will scope it out and provide an estimate.' },
      { question: 'Do you offer monthly maintenance retainers?', answer: 'Yes, we provide ongoing maintenance retainers for support, updates, and feature upgrades.' }
    ]
  },
  {
    name: 'AI Automation',
    slug: 'ai-automation',
    category: 'automate',
    tagline: 'Stop doing manually what AI can do for you',
    price: 'Custom Quote',
    description: 'We identify repetitive tasks in your business and build AI systems to handle them, saving you 10+ hours per week.',
    iconName: 'Cpu',
    benefits: [
      { icon: 'Clock', title: 'Save Hours Weekly', desc: 'Automate data entries, document sorting, and customer follow-up structures.' },
      { icon: 'Cpu', title: '24/7 Virtual Support', desc: 'AI chatbots handle inquiries instantly, even outside business hours.' },
      { icon: 'Shield', title: 'Error Elimination', desc: 'Deterministic pipelines that do not make data-entry typos or skip steps.' },
      { icon: 'BarChart2', title: 'Structured Logging', desc: 'Log and analyze every customer interaction automatically.' },
      { icon: 'Coins', title: 'Lower Overhead', desc: 'Keep your team lean while increasing transactional throughput.' },
      { icon: 'Zap', title: 'Instant Responses', desc: 'Automations answer customer questions and send quotes in seconds.' }
    ],
    whatsIncluded: [
      'Business workflow audit to find automation potentials',
      'Custom automation roadmap & designs',
      'Integrations with WhatsApp, Email, CRM, & spreadsheets',
      'Rigorous edge-case testing & optimization',
      'Team training and detailed handoff manuals',
      '30-day active monitoring & adjustments'
    ],
    techStack: ['Python', 'OpenAI API', 'n8n', 'Make.com', 'Zapier', 'WhatsApp Cloud API'],
    faq: [
      { question: 'What kind of business tasks can be automated?', answer: 'Lead workflows, follow-up messages, invoicing, social media scheduling, database entries, and email onboarding flows can all be automated.' },
      { question: 'Do I need technical skills to manage this?', answer: 'No. We configure everything to run silently in the background, and train your team on basic triggers.' }
    ]
  },
  {
    name: 'AI Ads',
    slug: 'ai-ads',
    category: 'automate',
    tagline: 'Ads that learn and optimize themselves',
    price: 'Custom Quote',
    description: 'We build AI-powered advertising systems that automatically optimize your Google and Meta ad campaigns.',
    iconName: 'Sparkles',
    benefits: [
      { icon: 'TrendingUp', title: 'Optimized ROI', desc: 'AI engines analyze performance metrics to structure campaigns efficiently.' },
      { icon: 'Target', title: 'High-Intent Targeting', desc: 'Automatically finds your ideal demographic profiles by behavioral logs.' },
      { icon: 'Zap', title: 'Around-the-Clock Bid Modifiers', desc: 'Adjusts ad bids 24/7 to avoid wasting ad spend.' },
      { icon: 'Sparkles', title: 'A/B Creative Optimization', desc: 'A/B tests copy and creative combos to discover best-performing layouts.' },
      { icon: 'Coins', title: 'Wasted Budget Reduction', desc: 'Cuts off poor performing ads before they drain budgets.' },
      { icon: 'BarChart2', title: 'Clean Reports', desc: 'Simple, direct dashboard summaries showing sales and ROAS.' }
    ],
    whatsIncluded: [
      'Ad account audit and setup optimization',
      'AI-driven bidding strategy configuration',
      'Custom & lookalike audience mappings',
      'Dynamic creative A/B testing framework',
      'Weekly performance notifications',
      'Monthly strategic campaign check-in'
    ],
    techStack: ['Python', 'Meta Ads API', 'Google Ads API', 'OpenAI API'],
    faq: [
      { question: 'How is AI-driven ad management better?', answer: 'It responds to performance fluctuations instantly, running bidding and audience optimizations much faster than a human manager.' },
      { question: 'Do you design the ad graphics?', answer: 'Yes, we provide standard ad copy and graphic templates. Custom video ads are quoted separately.' }
    ]
  },
  {
    name: 'Custom AI Solutions',
    slug: 'custom-ai-solutions',
    category: 'automate',
    tagline: 'AI built specifically for your industry and workflow',
    price: 'Custom Quote',
    description: 'When off-the-shelf AI tools don\'t fit, we build custom AI solutions trained on your private data.',
    iconName: 'Brain',
    benefits: [
      { icon: 'Target', title: 'Trained on Private Data', desc: 'Custom models trained strictly on your documentation and FAQ histories.' },
      { icon: 'Shield', title: 'Secure & Private', desc: 'Your private data is never used to train public GPT models.' },
      { icon: 'Link', title: 'Deep Workflow Linkage', desc: 'Embed models inside your internal databases, CRMs, and chat structures.' },
      { icon: 'TrendingUp', title: 'Self-Optimizing', desc: 'Uses feedback loops to improve response quality over time.' },
      { icon: 'Palette', title: 'Branded Experience', desc: 'White-label bots that match your brand tone and visual layout guidelines.' },
      { icon: 'Settings', title: 'Completely Customizable', desc: 'Modify system prompts, model behaviors, and limits at any time.' }
    ],
    whatsIncluded: [
      'Custom LLM configuration (RAG pipeline setup)',
      'Vector database configuration (Pinecone/PGVector)',
      'Dynamic UI dashboard interface (Next.js)',
      'Secure enterprise data isolation configs',
      'Full API setup for third-party embeds',
      '30-day data tuning and prompt optimization'
    ],
    techStack: ['Python', 'LangChain', 'OpenAI API', 'Pinecone', 'Next.js', 'PostgreSQL'],
    faq: [
      { question: 'Can you build a chatbot that knows our company data?', answer: 'Yes, we build Retrieval-Augmented Generation (RAG) models that answer queries using your specific company knowledge bases.' },
      { question: 'Is our corporate data safe?', answer: 'Yes, your data is securely stored in isolated vector databases, and APIs are set to private mode so they are never used to train public foundation models.' }
    ]
  },
  {
    name: 'Google Ads',
    slug: 'google-ads',
    category: 'grow',
    tagline: 'Show up exactly when customers are searching for you',
    price: 'Custom Quote',
    description: 'We manage Google Ads campaigns that put your business in front of people actively searching for your products.',
    iconName: 'Search',
    benefits: [
      { icon: 'Target', title: 'Intent-Based Targeting', desc: 'Reach customers at the exact moment they search for your service.' },
      { icon: 'Coins', title: 'Transparent Ad Spend', desc: 'Direct access to billing; view exactly where every rupee goes.' },
      { icon: 'TrendingUp', title: 'Trackable Lead ROI', desc: 'Monitor calls, contact forms, and sales back to specific keywords.' },
      { icon: 'Zap', title: 'Fast Lead Generation', desc: 'Get immediate website visitors from day one of launch.' },
      { icon: 'RefreshCw', title: 'Continuous Bid Tuning', desc: 'Regular keyword, copy, and bid updates to lower cost-per-lead.' },
      { icon: 'BarChart2', title: 'Transparent Reports', desc: 'Clear, readable performance summaries delivered monthly.' }
    ],
    whatsIncluded: [
      'Google Ads account audit & strategy build',
      'Keyword research & competitor ad analysis',
      'High-converting ad copy & extensions writing',
      'Call & conversion tracking configuration',
      'Landing page UX recommendations',
      'Ongoing keyword negative-matching optimizations',
      'Monthly performance check-in calls'
    ],
    faq: [
      { question: 'What is the recommended minimum ad budget?', answer: 'We suggest at least ₹15,000–₹20,000/month in direct ad spend (separate from our fee) to ensure search platforms have enough data to optimize.' },
      { question: 'How long until we see conversion results?', answer: 'Initial traffic arrives instantly. However, campaign data optimization usually takes 4–8 weeks to reach peak conversion efficiency.' },
      { question: 'Do you charge a setup fee?', answer: 'We include account setups in our monthly retainers. One-off setups can be quoted separately.' }
    ]
  },
  {
    name: 'Meta Ads',
    slug: 'meta-ads',
    category: 'grow',
    tagline: 'Find your customers where they spend their time',
    price: 'Custom Quote',
    description: 'We run Facebook and Instagram ad campaigns that build awareness, generate leads, and drive sales.',
    iconName: 'Megaphone',
    benefits: [
      { icon: 'Share2', title: 'Massive Social Reach', desc: 'Reach potential customers on Facebook, Instagram, and Messenger.' },
      { icon: 'Target', title: 'Behavioral Mappings', desc: 'Target customers by interests, ages, locations, and lookalike profiles.' },
      { icon: 'Palette', title: 'Creative Layouts', desc: 'High-converting graphics and copywriting that grab user attention.' },
      { icon: 'Link', title: 'Meta Pixel Mappings', desc: 'Track landing page events to optimize cost-per-acquisition.' },
      { icon: 'RefreshCw', title: 'Custom Re-targeting', desc: 'Show ads to people who visited your site but did not contact you yet.' },
      { icon: 'Coins', title: 'Low Cost Mappings', desc: 'Great for building awareness and cost-effective social leads.' }
    ],
    whatsIncluded: [
      'Meta Business Suite & Pixel configuration',
      'Target audience setup & custom lookalikes',
      'Graphic asset design & copy templates',
      'Meta conversion tracking event config',
      'Continuous A/B testing configurations',
      'Detailed monthly reporting & optimizations'
    ],
    faq: [
      { question: 'Does Meta work for B2B leads?', answer: 'Yes, when coupled with highly targeted interest filtering and retargeting ads, Instagram and Facebook can drive high-quality business leads.' },
      { question: 'Do you create video ads?', answer: 'We edit short-form reels/video ads from your raw footage. Custom script-writing and shoots are quoted separately.' }
    ]
  },
  {
    name: 'SEO',
    slug: 'seo',
    category: 'grow',
    tagline: 'Rank higher. Get found. Convert better.',
    price: 'Custom Quote',
    description: 'We improve your search engine rankings so customers find you organically — without paying for every click.',
    iconName: 'TrendingUp',
    benefits: [
      { icon: 'Coins', title: 'Free Organic Leads', desc: 'Stop paying Google for every single visitor. Organic traffic is free.' },
      { icon: 'TrendingUp', title: 'Compounding ROI', desc: 'Rankings compound over time, remaining stable long after paid ads stop.' },
      { icon: 'Target', title: 'High intent Traffic', desc: 'Attract visitors who are actively searching for what you do.' },
      { icon: 'Shield', title: 'Brand Trust', desc: 'Appearing high on Google results builds instant market credibility.' },
      { icon: 'BarChart2', title: 'Visible Ranking Logs', desc: 'Track keyword position changes with transparent monthly reports.' },
      { icon: 'Settings', title: 'Technical & Content SEO', desc: 'We resolve code speeds, tags, and write targeted articles.' }
    ],
    whatsIncluded: [
      'Technical site audits (fixing speed, metadata, links)',
      'In-depth keyword research & opportunity map',
      'On-page content optimization (headings, tags, links)',
      'Google Search Console and Analytics setup',
      'SEO blog posts targeting buyer keywords',
      'White-hat backlink building strategies',
      'Monthly rank tracking and speed checks'
    ],
    faq: [
      { question: 'How long does SEO take to show page 1 rankings?', answer: 'Usually 3–6 months for local keywords, and longer for national/competitive terms. SEO is a long-term strategy, not a quick fix.' },
      { question: 'Do I need to keep paying for SEO forever?', answer: 'Search engines change algorithms and competitors continually optimize. We recommend at least 6 months of continuous campaign work to solidify rankings.' }
    ]
  },
  {
    name: 'Social Media Management',
    slug: 'social-media-management',
    category: 'grow',
    tagline: 'A consistent, professional social presence without the headache',
    price: 'Custom Quote',
    description: 'We handle your social media completely — content creation, scheduling, engagement, and monthly growth.',
    iconName: 'Share2',
    benefits: [
      { icon: 'Clock', title: 'Save Hours of Work', desc: 'No more brainstorming content or manual scheduling.' },
      { icon: 'Palette', title: 'Branded Layout Grid', desc: 'Professional post designs that match your corporate style guide.' },
      { icon: 'Share2', title: 'Multi-platform Sync', desc: 'Consistent posting schedule across Instagram, LinkedIn, and Facebook.' },
      { icon: 'Mail', title: 'DM & Comments Care', desc: 'Replies to standard inquiries and leads to drive conversions.' },
      { icon: 'TrendingUp', title: 'Organic Growth Mappings', desc: 'Optimize reels and hashtag strategies to reach new followers.' },
      { icon: 'BarChart2', title: 'Follower Growth Reports', desc: 'Track user reach, engagement, and profile click metrics.' }
    ],
    whatsIncluded: [
      'Custom content calendar built monthly',
      'Graphic designs for posts, stories, and covers',
      'Targeted caption writing & hashtag optimization',
      'Scheduled posting and timing optimization',
      'Comments & basic DM lead filter management',
      'Monthly social growth review reports'
    ],
    faq: [
      { question: 'Which platforms do you manage?', answer: 'We cover Instagram, Facebook, and LinkedIn. Setup/management on X (Twitter) or YouTube is quoted separately.' },
      { question: 'Do you create video reels?', answer: 'Yes, we edit short-form reels and shorts from video files you provide to help drive engagement.' }
    ]
  },
  {
    name: 'Email Marketing',
    slug: 'email-marketing',
    category: 'grow',
    tagline: 'The highest ROI marketing channel, done right',
    price: 'Custom Quote',
    description: 'We set up automated email sequences and campaigns that nurture leads, retain customers, and drive sales.',
    iconName: 'Mail',
    benefits: [
      { icon: 'Coins', title: 'Highest Marketing ROI', desc: 'Email consistently returns high dollar value for every rupee spent.' },
      { icon: 'Zap', title: 'Automated Campaigns', desc: 'Welcome sequences and customer onboarding run on autopilot.' },
      { icon: 'Target', title: 'Targeted Segmentation', desc: 'Send customized messages to specific customer groups.' },
      { icon: 'BarChart2', title: 'Measurable Clicks', desc: 'Track exact open rates, click-through rates, and landing page conversions.' },
      { icon: 'Shield', title: 'List Security', desc: 'Your subscriber list is a proprietary asset that you own entirely.' },
      { icon: 'RefreshCw', title: '24/7 Nurturing', desc: 'Nurture cold leads into inquiries while you focus on operations.' }
    ],
    whatsIncluded: [
      'Email marketing platform configuration (Brevo/Mailchimp)',
      'Subscriber segmentation strategy configuration',
      'Welcome sequence copy & setup (5-7 emails)',
      'Monthly newsletters templates design',
      'Trigger-based campaign automations',
      'Monthly click & open analytics reports'
    ],
    faq: [
      { question: 'Do you write the emails?', answer: 'Yes, our copywriting team designs the email flows, subject lines, and calls-to-action.' },
      { question: 'Which email platform is best?', answer: 'For B2B services, Brevo or MailerLite are great. For eCommerce, Klaviyo is the industry standard.' }
    ]
  },
  {
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    category: 'design',
    tagline: 'Design that users love and businesses need',
    price: 'Custom Quote',
    description: 'We design digital experiences that are beautiful, intuitive, and conversion-focused for real users.',
    iconName: 'Palette',
    benefits: [
      { icon: 'Search', title: 'User Research Mappings', desc: 'We analyze target audiences before drawing a single wireframe.' },
      { icon: 'Target', title: 'Conversion Principles', desc: 'UI placements backed by UX guidelines and interface data.' },
      { icon: 'Smartphone', title: 'Responsive Mappings', desc: 'Layouts that adapt to mobile, tablet, and desktop screens.' },
      { icon: 'RefreshCw', title: 'Iterative Reviews', desc: 'Multiple prototype drafts to guarantee user requirements are met.' },
      { icon: 'Settings', title: 'Developer-Ready FIGs', desc: 'Figma mockups formatted with components and style guides.' },
      { icon: 'Zap', title: 'Usability Prototypes', desc: 'Clickable layouts to test customer interaction flows early.' }
    ],
    whatsIncluded: [
      'User personas and visual journey mapping',
      'Sitemaps and navigation flow structuring',
      'Low-fidelity wireframe drafts for feedback',
      'High-fidelity UI designs in Figma',
      'Clickable user prototype for interface testing',
      'Comprehensive design system handoff guidelines',
      'Direct developer briefing and handoff sessions'
    ],
    faq: [
      { question: 'Do you write the code for the designs?', answer: 'This service is for layout design and Figma handoff only. We can code the design under our Web Development services.' },
      { question: 'What software do you use?', answer: 'We design entirely in Figma, which allows for collaborative real-time mockups and comments.' }
    ]
  },
  {
    name: 'Graphic Designing',
    slug: 'graphic-designing',
    category: 'design',
    tagline: 'Visual identity that makes your brand unforgettable',
    price: 'Custom Quote',
    description: 'From logos and brand identities to marketing materials and social media graphics — we create visuals that speak.',
    iconName: 'Image',
    benefits: [
      { icon: 'Palette', title: 'Custom Brand Guidelines', desc: 'Consistent typography, color palettes, and logo uses.' },
      { icon: 'Target', title: 'Visual Copy Mappings', desc: 'Visuals engineered to communicate corporate messages clearly.' },
      { icon: 'Share2', title: 'Social Media Templates', desc: 'Customizable templates for Instagram, LinkedIn, and Meta.' },
      { icon: 'Settings', title: 'Ready to Print Mockups', desc: 'Business cards, flyers, and banners formatted for physical printers.' },
      { icon: 'Shield', title: 'Vector Asset Mappings', desc: 'High-res SVG/AI vector files that scale to any size.' },
      { icon: 'Zap', title: 'Fast Deliveries', desc: 'Quick concept iterations to deliver finalized branding kits.' }
    ],
    whatsIncluded: [
      'Logo design concepts (3 unique visual paths)',
      'Branding kit guidelines (colors, typefaces, usage rules)',
      'Business card layout designs',
      'Social media post grid templates (Figma/Canva)',
      'Flyer or brochure visual layouts',
      'Clean editable vector output (AI, PDF, SVG, PNG)'
    ],
    faq: [
      { question: 'Will I get the raw design files?', answer: 'Yes, we deliver editable vector files (Illustrator AI, SVG, PDF) upon final payment.' },
      { question: 'How many revisions are included?', answer: 'We include 2 rounds of tweaks on the chosen brand path.' }
    ]
  },
  {
    name: 'Video Editing',
    slug: 'video-editing',
    category: 'design',
    tagline: 'Raw footage to professional content, fast',
    price: 'Custom Quote',
    description: 'We edit your raw video footage into professional content for social media, ads, or YouTube, fast.',
    iconName: 'Video',
    benefits: [
      { icon: 'Video', title: 'Color Mappings & Cuts', desc: 'Clean audio sync, cuts, and color adjustments.' },
      { icon: 'Sparkles', title: 'Motion Text Layers', desc: 'Pop-up graphic subtitles, captions, and title transitions.' },
      { icon: 'Link', title: 'Audio Licensing Mappings', desc: 'Royalty-free background tracks synced to your footage.' },
      { icon: 'Target', title: 'Retention Editing', desc: 'High-energy edits designed to maximize user watch time.' },
      { icon: 'Smartphone', title: 'Mobile Social Formatting', desc: 'Formatted for Reels, TikTok, and YouTube Shorts.' },
      { icon: 'Clock', title: 'Swift Processing', desc: 'Prompt video deliveries (usually 2–5 business days).' }
    ],
    whatsIncluded: [
      'Video editing cuts, pacing, and color balance',
      'Motion text titles and graphics styling',
      'Opening hooks and closing call-to-actions',
      'Royalty-free audio track matching',
      'Automated synced user captions',
      'Vertical/Horizontal formatting render options'
    ],
    faq: [
      { question: 'How do I share the raw footage files?', answer: 'You can upload them to Google Drive, Dropbox, or WeTransfer and share the link with us.' },
      { question: 'What is the standard turnaround time?', answer: 'Most short-form social reels are delivered in 2–3 business days. Long-form video takes 5–7 business days.' }
    ]
  }
];

export const SERVICE_SLUGS = services.map((s) => s.slug);

export const SERVICES_BY_CATEGORY = {
  build: services.filter((s) => s.category === 'build'),
  automate: services.filter((s) => s.category === 'automate'),
  grow: services.filter((s) => s.category === 'grow'),
  design: services.filter((s) => s.category === 'design'),
};
