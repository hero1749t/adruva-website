"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  ArrowRight,
  Calendar,
  Sparkle,
  // icons for benefits
  Rocket,
  Smartphone,
  Shield,
  Target,
  BarChart2,
  Settings,
  Zap,
  Bell,
  Link as LinkIcon,
  Store,
  Coins,
  RefreshCw,
  Clock,
  Cpu,
  Brain,
  Sparkles,
  Search,
  Megaphone,
  TrendingUp,
  Share2,
  Mail,
  Palette,
  Image,
  Video,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ServiceItem } from "@/lib/services-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/CTASection";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionTag } from "@/components/ui/section-tag";
import { cn } from "@/lib/utils";

const BenefitIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Rocket,
  Smartphone,
  Shield,
  Target,
  BarChart2,
  Settings,
  Zap,
  Bell,
  Link: LinkIcon,
  Store,
  Coins,
  RefreshCw,
  Clock,
  Cpu,
  Brain,
  Sparkles,
  Search,
  Megaphone,
  TrendingUp,
  Share2,
  Mail,
  Palette,
  Image,
  Video,
  AlertCircle,
};

const getProcessSteps = (slug: string) => {
  if (slug === "web-development") {
    return [
      {
        number: "01",
        title: "Discovery Call",
        desc: "Understand your business goals, target audience, and competitors.",
      },
      {
        number: "02",
        title: "Wireframe & Design",
        desc: "Design low-fi wireframes followed by high-fidelity Figma mockups for your approval.",
      },
      {
        number: "03",
        title: "Development",
        desc: "Build the actual responsive website from scratch, mobile-first.",
      },
      {
        number: "04",
        title: "Testing",
        desc: "Rigorous cross-browser, mobile compatibility, speed, and form submission testing.",
      },
      {
        number: "05",
        title: "Launch",
        desc: "Deploy files, configure domains, set up SSL, and go live 🚀.",
      },
    ];
  }
  if (slug === "mobile-app-development") {
    return [
      {
        number: "01",
        title: "Discovery",
        desc: "Understand target users, core features list, and map out user journeys.",
      },
      {
        number: "02",
        title: "Design",
        desc: "Wireframes + platform-specific visual UI design (iOS & Android guidelines).",
      },
      {
        number: "03",
        title: "Development",
        desc: "Build the mobile app frontend in React Native + configure backend APIs.",
      },
      {
        number: "04",
        title: "Testing",
        desc: "Active testing on physical devices (iOS + Android), checking performance & edge cases.",
      },
      {
        number: "05",
        title: "Launch",
        desc: "Coordinate full Apple App Store and Google Play Store submissions.",
      },
    ];
  }
  if (slug === "google-ads") {
    return [
      {
        number: "01",
        title: "Audit",
        desc: "Perform competitor analysis and audit existing ad account setup.",
      },
      {
        number: "02",
        title: "Strategy",
        desc: "Compile keyword maps, write bidding models, and structure budget plans.",
      },
      {
        number: "03",
        title: "Setup",
        desc: "Build ad campaigns, write targeted headlines, and configure conversion tracking.",
      },
      {
        number: "04",
        title: "Launch",
        desc: "Deploy campaigns live, monitoring initial budget flow and search terms.",
      },
      {
        number: "05",
        title: "Optimize",
        desc: "Perform weekly keyword optimizations, bid revisions, and send monthly reports.",
      },
    ];
  }
  // Generic fallback for other 11 services
  return [
    {
      number: "01",
      title: "Discovery & Audit",
      desc: "Understand your current workflows, goals, and target objectives.",
    },
    {
      number: "02",
      title: "Strategy & Design",
      desc: "Design plans and map out integrations or content visual drafts.",
    },
    {
      number: "03",
      title: "Implementation",
      desc: "Execute modifications, configure systems, or build content blocks.",
    },
    {
      number: "04",
      title: "Testing & Refine",
      desc: "Test automations, ad structures, or page layouts against goals.",
    },
    {
      number: "05",
      title: "Handoff & Monitor",
      desc: "Provide system walkthroughs and monitor performance metrics.",
    },
  ];
};
const mockProjects = [
  {
    title: "Bali Yoga Teacher Training",
    category: "build",
    industry: "Education",
    description:
      "A high-performance headless booking engine and CRM database built to manage yoga teacher training course enrollments and payments worldwide.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Tailwind CSS", "TanStack Query"],
    gradient: "from-orange-500/80 to-navy-950/80",
    slug: "bali-yoga-teacher-training",
  },
  {
    title: "Adruva Resto System",
    category: "build",
    industry: "Hospitality",
    description:
      "An advanced offline-first restaurant SaaS platform with contactless QR code menus, instant order dispatching, and live billing metrics.",
    tech: ["React", "Prisma", "Tailwind CSS", "Node.js", "WebSocket"],
    gradient: "from-teal-600/80 to-navy-900/80",
    slug: "adruva-resto-system",
  },
  {
    title: "Vintage Tours & Travels",
    category: "build",
    industry: "Travel",
    description:
      "A complete organic search optimization and custom package booking engine that positioned the brand on Page 1 for premium adventure tours.",
    tech: ["React", "Tailwind CSS", "Google Maps API", "SEO Optimization"],
    gradient: "from-blue-600/80 to-navy-900/80",
    slug: "vintage-tours-and-travels",
  },
  // Automate
  {
    title: "Lura Cafe Digital OS",
    category: "automate",
    industry: "F&B",
    description:
      "Automated order-taking, WhatsApp dispatching system, and real-time CRM updates.",
    tech: ["NestJS", "WhatsApp Cloud API", "PostgreSQL"],
    gradient: "from-blue-600/80 to-orange-600/80",
    slug: "lura-cafe",
  },
  {
    title: "Garhwal Real Estate Bot",
    category: "automate",
    industry: "Real Estate",
    description:
      "AI-powered WhatsApp lead qualifier and automated property catalog matching.",
    tech: ["Python", "OpenAI API", "n8n"],
    gradient: "from-purple-600/80 to-pink-600/80",
    slug: "real-estate-bot",
  },
  {
    title: "Auto-Invoicing Workflows",
    category: "automate",
    industry: "Finance",
    description:
      "Document extraction pipeline processing PDFs into accounting systems automatically.",
    tech: ["Python", "Make.com", "Google Drive API"],
    gradient: "from-teal-600/80 to-emerald-600/80",
    slug: "auto-invoicing",
  },
  // Grow
  {
    title: "Eco-Stay Resort Growth",
    category: "grow",
    industry: "Tourism",
    description:
      "Google and Meta ad systems driving 150+ direct booking inquiries monthly.",
    tech: ["Google Ads", "Meta Pixel", "Retargeting"],
    gradient: "from-green-600/80 to-navy-950/80",
    slug: "eco-stay-growth",
  },
  {
    title: "Local Gym Lead Funnel",
    category: "grow",
    industry: "Fitness",
    description:
      "Local Meta Ads campaign generating 300+ membership signups in 90 days.",
    tech: ["Meta Ads", "Lead Forms", "WhatsApp Flow"],
    gradient: "from-red-600/80 to-orange-600/80",
    slug: "gym-lead-funnel",
  },
  {
    title: "Dental Clinic SEO Campaign",
    category: "grow",
    industry: "Healthcare",
    description:
      "Ranking on Page 1 for local search terms, yielding a 200% increase in patient bookings.",
    tech: ["SEO Audit", "Keyword Strategy", "GMB"],
    gradient: "from-sky-600/80 to-indigo-900/80",
    slug: "clinic-seo",
  },
  // Design
  {
    title: "Doon Dairy Rebranding",
    category: "design",
    industry: "F&B",
    description:
      "Logo, typeface, and complete modern product packaging visual identities.",
    tech: ["Brand Identity", "Logo Design", "Vector Assets"],
    gradient: "from-yellow-500/80 to-orange-600/80",
    slug: "doon-dairy",
  },
  {
    title: "Adventure App UI/UX",
    category: "design",
    industry: "Travel",
    description:
      "High-fidelity Figma wireframes and prototypes for a trekking portal.",
    tech: ["Figma", "UI/UX Design", "User Personas"],
    gradient: "from-emerald-500/80 to-teal-900/80",
    slug: "trekking-ui",
  },
  {
    title: "SaaS Dashboard Design",
    category: "design",
    industry: "Tech",
    description:
      "A dark-mode analytics dashboard designed for developer tool readability.",
    tech: ["Figma", "Style System", "Dashboard UI"],
    gradient: "from-violet-600/80 to-navy-950/80",
    slug: "saas-dashboard-design",
  },
];

interface ServicePageClientProps {
  service: ServiceItem;
}

export function ServicePageClient({ service }: ServicePageClientProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  const calendlyUrl = "/contact";
  const processSteps = getProcessSteps(service.slug);

  // Filter related projects based on matching category
  const relatedProjects = mockProjects
    .filter((p) => p.category.toLowerCase() === service.category.toLowerCase())
    .slice(0, 3);

  // Animation variants
  const fadeInUp = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  return (
    <div className="w-full bg-background text-foreground transition-colors duration-300">
      {/* a) & b) Breadcrumbs & Hero Area */}
      <Section className="pt-10 pb-16 md:pt-12 md:pb-24 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.05)_0%,transparent_70%)] pointer-events-none select-none z-0" />

        <Container className="relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-8 font-inter">
            <Link
              href="/"
              className="hover:text-brand-orange transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <Link
              href="/services"
              className="hover:text-brand-orange transition-colors"
            >
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <span className="text-foreground font-semibold">
              {service.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col items-start">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-semibold text-brand-orange mb-6 font-space-grotesk uppercase tracking-wider">
                <Sparkle className="h-3 w-3 fill-brand-orange text-brand-orange" />
                {service.category}
              </div>

              {/* Service Name Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy dark:text-white leading-[1.15] mb-4 font-poppins">
                {service.name}
              </h1>

              {/* Tagline */}
              <p className="text-lg md:text-xl font-bold text-brand-orange tracking-tight mb-6 font-space-grotesk">
                &ldquo;{service.tagline}&rdquo;
              </p>

              {/* Description */}
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mb-8 font-inter">
                {service.description}
              </p>

              {/* Action button */}
              <a
                href={calendlyUrl}
                target={calendlyUrl.startsWith("http") ? "_blank" : undefined}
                rel={
                  calendlyUrl.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                <Button
                  size="lg"
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold h-12 px-6 rounded-lg text-xs flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(255,107,0,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calendar className="h-4 w-4" />
                  Book a Free Call
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>

            {/* Price tag quick info card */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="p-6 rounded-2xl border border-brand-orange/20 bg-gradient-to-br from-brand-orange/5 to-transparent shadow-xl relative overflow-hidden backdrop-blur-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 font-space-grotesk">
                  PRICING STRUCTURE
                </h3>
                <span className="text-2xl md:text-3xl font-extrabold text-brand-navy dark:text-white block mb-2 font-poppins">
                  {service.price}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-inter">
                  Transparent, value-driven rates tailored for local business
                  scaling. No hidden management charges.
                </p>
                <div className="border-t border-border/20 pt-4">
                  <span className="text-[10px] font-bold text-brand-orange flex items-center gap-1.5 uppercase tracking-wider font-space-grotesk">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-ping" />
                    Custom quote scope check
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* c) Benefits Section */}
      <Section className="bg-muted/10 border-y border-border/20">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionTag className="justify-center">
              WHY CHOOSE THIS SERVICE
            </SectionTag>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
              Key outcomes & benefits
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-4 mx-auto" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {service.benefits.map((benefit, index) => {
              const Icon = BenefitIconMap[benefit.icon] || Rocket;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                  className="flex gap-4 p-5 rounded-2xl border border-border/40 bg-card hover:border-brand-orange/20 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex-shrink-0">
                    <div className="p-2.5 rounded-xl bg-brand-orange/10 text-brand-orange">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-1.5 font-poppins">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-inter">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* d) What's Included */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col items-start">
              <SectionTag>COMPREHENSIVE DELIVERY</SectionTag>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white mb-6 font-poppins">
                What is included in the project?
              </h2>
              <div className="h-1 w-12 bg-brand-orange rounded-full mb-6" />
              <p className="text-xs text-muted-foreground leading-relaxed font-inter max-w-md">
                We manage everything end-to-end so you do not have to juggle
                multiple vendors. From planning to final launches and
                post-deployment configurations, we cover the full cycle.
              </p>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {service.whatsIncluded.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-border/20 bg-card hover:bg-muted/10 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold leading-snug font-inter text-brand-navy/90 dark:text-white/90">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* e) Our Process Section */}
      <Section className="bg-muted/10 border-y border-border/20 overflow-hidden">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionTag className="justify-center">HOW WE WORK</SectionTag>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
              Our step-by-step process
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-4 mx-auto" />
          </div>

          {/* Timeline Wrapper */}
          <div className="relative w-full">
            {/* Horizontal Line Connector (Desktop only) */}
            <div className="hidden md:block absolute top-[44px] left-[5%] right-[5%] h-0.5 bg-border/40 -z-10" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10"
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex flex-col items-center md:items-start text-center md:text-left group"
                >
                  {/* Step bubble */}
                  <div className="h-20 w-20 rounded-full border-2 border-border bg-card text-brand-navy dark:text-white dark:border-white/10 flex items-center justify-center font-bold text-lg mb-6 group-hover:border-brand-orange group-hover:text-brand-orange transition-colors duration-300 relative shadow-md">
                    <span className="font-space-grotesk">{step.number}</span>

                    {/* Vertical connecting line (Mobile only) */}
                    {index < processSteps.length - 1 && (
                      <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 border-l border-dashed border-border" />
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-2 font-poppins">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-xs font-inter">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* f) Tech Stack Section (Build and Automate only) */}
      {(service.category === "build" || service.category === "automate") &&
        service.techStack && (
          <Section>
            <Container>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <SectionTag className="justify-center">
                  OUR ENGINEERING STACK
                </SectionTag>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
                  Modern tools we build with
                </h2>
                <div className="h-1 w-12 bg-brand-orange rounded-full mt-4 mx-auto" />
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-wrap items-center justify-center gap-3.5 max-w-2xl mx-auto"
              >
                {service.techStack.map((tech) => (
                  <motion.div
                    key={tech}
                    variants={fadeInUp}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    className="px-4 py-2 rounded-xl border border-border/40 bg-card hover:border-brand-orange/30 shadow-sm transition-all duration-300"
                  >
                    <span className="text-xs font-bold text-brand-navy/90 dark:text-white/95 font-space-grotesk">
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </Container>
          </Section>
        )}

      {/* g) Pricing Block Section */}
      <Section className="bg-muted/10 border-y border-border/20">
        <Container>
          <div className="max-w-xl mx-auto p-8 rounded-3xl border border-brand-orange/20 bg-card shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full filter blur-xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full font-space-grotesk inline-block mb-4">
              INVESTMENT ESTIMATE
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-brand-navy dark:text-white mb-2 font-poppins">
              Start building your growth setup
            </h2>
            <span className="text-3xl md:text-4xl font-extrabold text-brand-orange block my-6 font-poppins">
              {service.price}
            </span>

            <p className="text-xs text-muted-foreground leading-relaxed mb-8 font-inter">
              All quotes are project-based and clear. We structure milestones so
              you only pay for completed deliverables. Inquire now to map your
              scope.
            </p>

            <a
              href={calendlyUrl}
              target={calendlyUrl.startsWith("http") ? "_blank" : undefined}
              rel={
                calendlyUrl.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="inline-block w-full"
            >
              <Button
                size="lg"
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold h-12 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(255,107,0,0.3)] transition-transform"
              >
                Inquire & Get Free Roadmap
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </Container>
      </Section>

      {/* h) Related Case Studies */}
      {relatedProjects.length > 0 && (
        <Section>
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="flex flex-col items-start">
                <SectionTag>SUCCESS CASES</SectionTag>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
                  Related client work
                </h2>
                <div className="h-1 w-12 bg-brand-orange rounded-full mt-4" />
              </div>
              <Link
                href="/work"
                className="group flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-hover transition-colors font-inter"
              >
                View all case studies
                <motion.span
                  animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {relatedProjects.map((project) => (
                <div
                  key={project.slug}
                  className="flex flex-col rounded-2xl border border-border/40 bg-card overflow-hidden transition-all duration-300 group hover:border-brand-orange/30 hover:shadow-[0_4px_20px_rgba(255,107,0,0.06)]"
                >
                  {/* Image Gradient Placeholder */}
                  <div
                    className={cn(
                      "h-40 w-full bg-gradient-to-br flex items-center justify-center p-6 relative overflow-hidden select-none",
                      project.gradient,
                    )}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,transparent_80%)] mix-blend-overlay" />
                    <span className="text-[10px] font-extrabold tracking-widest text-white/50 uppercase font-space-grotesk">
                      {project.industry} Case Study
                    </span>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-2 font-poppins group-hover:text-brand-orange transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 font-inter">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-auto space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="bg-muted hover:bg-muted text-[9px] text-muted-foreground font-semibold px-2 py-0.5 rounded-sm border border-border/10 font-inter"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <div className="border-t border-border/10 pt-3">
                        <Link
                          href={`/work/${project.slug}`}
                          className="text-xs font-bold text-brand-navy hover:text-brand-orange dark:text-white/80 dark:hover:text-brand-orange transition-colors flex items-center gap-1 font-inter"
                        >
                          View Case Study
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* i) FAQ Accordion */}
      {service.faq && service.faq.length > 0 && (
        <Section className="bg-muted/10 border-t border-border/20">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <SectionTag className="justify-center">
                COMMON INQUIRIES
              </SectionTag>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
                Frequently asked questions
              </h2>
              <div className="h-1 w-12 bg-brand-orange rounded-full mt-4 mx-auto" />
            </div>

            <div className="max-w-2xl mx-auto p-4 md:p-6 rounded-2xl border border-border/30 bg-card shadow-sm">
              <Accordion>
                {service.faq.map((item, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="font-poppins text-brand-navy dark:text-white font-semibold">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-inter text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </Section>
      )}

      {/* j) Final CTA */}
      <CTASection />
    </div>
  );
}
