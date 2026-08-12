"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ArrowRight,
  Sparkle,
  Building,
  Tag,
  Clock,
  Code2,
  ExternalLink,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects, ProjectItem } from "@/lib/work-data";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SectionTag } from "@/components/ui/section-tag";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CaseStudyClientProps {
  project: ProjectItem;
}

export function CaseStudyClient({ project }: CaseStudyClientProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [openStep, setOpenStep] = useState<number | null>(1);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  // Filter related projects (aim for same category, fallback to others to get exactly 3)
  let relatedProjects = projects.filter(
    (p) => p.category === project.category && p.slug !== project.slug,
  );
  if (relatedProjects.length < 3) {
    const otherProjects = projects.filter(
      (p) =>
        p.slug !== project.slug &&
        !relatedProjects.find((rp) => rp.slug === p.slug),
    );
    relatedProjects = [...relatedProjects, ...otherProjects].slice(0, 3);
  }

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
      {/* 1. Hero Cover Slide */}
      <Section className="pt-12 pb-20 relative overflow-hidden border-b border-border/10">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.06)_0%,transparent_70%)] pointer-events-none select-none z-0" />
        <div className="absolute -bottom-10 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(0,107,255,0.03)_0%,transparent_70%)] pointer-events-none select-none z-0" />

        <Container className="relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-12 font-inter">
            <Link
              href="/"
              className="hover:text-brand-orange transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <Link
              href="/work"
              className="hover:text-brand-orange transition-colors"
            >
              Our Work
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <span className="text-foreground font-semibold">
              {project.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Header copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-[10px] font-bold uppercase tracking-wider font-space-grotesk border-brand-orange/20 text-brand-orange bg-brand-orange/5 px-2.5 py-1"
                >
                  CASE STUDY
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-[10px] font-bold uppercase tracking-wider font-space-grotesk px-2.5 py-1"
                >
                  MIGRATION & GROWTH
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-brand-navy dark:text-white leading-[1.1] font-poppins">
                How We Built & Scaled the{" "}
                <span className="text-brand-orange">
                  Bali Yoga Teacher Training
                </span>{" "}
                Platform
              </h1>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-inter">
                Complete engineering breakdown of a legacy WordPress WooCommerce
                site migrated to a headless Next.js booking engine, combined
                with a highly structured local SEO content acquisition funnel.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 bg-muted/20 border border-border/10 rounded-xl px-4 py-2 text-xs font-semibold text-brand-navy dark:text-white font-inter">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
                  Live Website: balivttc.com
                </div>
              </div>
            </div>

            {/* Premium Stats Box */}
            <div className="lg:col-span-5 bg-card border border-border/30 rounded-3xl p-6 md:p-8 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)] pointer-events-none" />
              <h3 className="text-xs font-bold text-brand-orange uppercase tracking-wider font-space-grotesk">
                PROJECT PROFILE METRICS
              </h3>
              <div className="space-y-4 font-inter text-xs text-muted-foreground">
                <div className="flex justify-between border-b border-border/10 pb-2">
                  <span className="font-semibold">Client Name</span>
                  <span className="text-brand-navy dark:text-white font-bold">
                    {project.clientName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/10 pb-2">
                  <span className="font-semibold">Industry Vertical</span>
                  <span className="text-brand-navy dark:text-white font-bold">
                    {project.industry.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/10 pb-2">
                  <span className="font-semibold">Project Timeline</span>
                  <span className="text-brand-navy dark:text-white font-bold">
                    {project.timeline}
                  </span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="font-semibold">Primary Objective</span>
                  <span className="text-brand-navy dark:text-white font-bold">
                    100% Speed & Search Dominance
                  </span>
                </div>
              </div>
              <div className="p-4 bg-muted/35 rounded-2xl border border-border/20 text-center">
                <p className="text-[10px] font-bold text-brand-orange font-space-grotesk tracking-widest uppercase">
                  ACTIVE CASE STUDY ARTIFACT
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Slide 1: The Diagnostics (WordPress Collapse) */}
      <Section className="py-16 md:py-24 border-b border-border/10">
        <Container className="max-w-4xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block font-space-grotesk mb-2">
              PHASE 1: THE DIAGNOSTICS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins text-brand-navy dark:text-white">
              WordPress Architecture Deficiencies
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-3 mx-auto" />
            <p className="text-xs text-muted-foreground mt-4 font-inter">
              We identified 40+ structural and performance flaws on their legacy
              WooCommerce site that directly choked bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-brand-navy dark:text-white font-poppins">
                Critical Performance Bottlenecks:
              </h4>
              <ul className="space-y-3 text-xs text-muted-foreground font-inter">
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 font-bold">
                    !
                  </span>
                  <span>
                    <strong>8 to 10 Second Loading Times:</strong> High volume
                    of bloated WooCommerce plugins created critical server
                    response delays.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 font-bold">
                    !
                  </span>
                  <span>
                    <strong>Severe Layout Shifts (CLS):</strong> Images lacked
                    defined dimension markers, causing pages to jump when
                    rendering on mobile.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 font-bold">
                    !
                  </span>
                  <span>
                    <strong>International Card Failure Rate:</strong> No support
                    for localized payments caused 35% cart abandonment.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 font-bold">
                    !
                  </span>
                  <span>
                    <strong>Deadlock DB Errors:</strong> High traffic spikes
                    during launches caused WooCommerce database pools to lock
                    and crash.
                  </span>
                </li>
              </ul>
            </div>

            {/* Performance Comparison Visual Card */}
            <div className="p-6 bg-muted/10 border border-border/20 rounded-3xl space-y-6">
              <h4 className="text-xs font-bold text-brand-navy dark:text-white font-space-grotesk tracking-wide text-center">
                PERFORMANCE METRICS MATRIX
              </h4>
              <div className="space-y-4 font-inter text-xs">
                <div className="grid grid-cols-3 font-bold border-b border-border/10 pb-2 text-muted-foreground">
                  <span>Metric</span>
                  <span>WordPress</span>
                  <span>Next.js</span>
                </div>
                <div className="grid grid-cols-3 border-b border-border/10 pb-2">
                  <span className="font-semibold">Server Response</span>
                  <span className="text-red-500 font-bold">1200ms</span>
                  <span className="text-green-500 font-bold">120ms</span>
                </div>
                <div className="grid grid-cols-3 border-b border-border/10 pb-2">
                  <span className="font-semibold">LCP Speed</span>
                  <span className="text-red-500 font-bold">8.5s</span>
                  <span className="text-green-500 font-bold">1.2s</span>
                </div>
                <div className="grid grid-cols-3 border-b border-border/10 pb-2">
                  <span className="font-semibold">Page Size</span>
                  <span className="text-red-500 font-bold">4.8MB</span>
                  <span className="text-green-500 font-bold">0.6MB</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-semibold">SEO Indexing</span>
                  <span className="text-red-500 font-bold">Slow / Bloated</span>
                  <span className="text-green-500 font-bold">
                    Immediate / SSR
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Slide 2: Next.js System Architecture Design */}
      <Section className="py-16 md:py-24 bg-muted/5 border-b border-border/10 relative">
        <Container className="max-w-4xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block font-space-grotesk mb-2">
              PHASE 2: SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins text-brand-navy dark:text-white">
              Decoupled Headless Engine Design
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-3 mx-auto" />
            <p className="text-xs text-muted-foreground mt-4 font-inter">
              We decoupled the heavy visual backend from the user-facing
              storefront.
            </p>
          </div>

          {/* Interactive Flowchart Diagram */}
          <div className="p-6 bg-card border border-border/30 rounded-3xl space-y-6">
            <h4 className="text-xs font-bold text-brand-navy dark:text-white font-space-grotesk tracking-wide text-center">
              SYSTEM INTEGRATION & TRAFFIC FLOW PIPELINE
            </h4>
            <div className="flex flex-col md:flex-row items-center justify-around gap-6 text-center font-space-grotesk text-xs">
              {/* Box 1 */}
              <div className="p-4 rounded-xl border border-border/40 bg-muted/20 w-44 space-y-2">
                <span className="text-[9px] font-bold text-brand-orange block">
                  STOREFRONT
                </span>
                <span className="font-bold text-brand-navy dark:text-white">
                  Next.js Web UI
                </span>
                <p className="text-[9px] text-muted-foreground font-inter">
                  Hosted on Vercel Edge Server
                </p>
              </div>

              <div className="text-brand-orange font-extrabold rotate-90 md:rotate-0">
                ➔
              </div>

              {/* Box 2 */}
              <div className="p-4 rounded-xl border border-brand-orange/30 bg-brand-orange/5 w-44 space-y-2 relative">
                <span className="text-[9px] font-bold text-brand-orange block">
                  API DECOUPLER
                </span>
                <span className="font-bold text-brand-navy dark:text-white">
                  NestJS REST API
                </span>
                <p className="text-[9px] text-muted-foreground font-inter">
                  Docker Gateway Controller
                </p>
              </div>

              <div className="text-brand-orange font-extrabold rotate-90 md:rotate-0">
                ➔
              </div>

              {/* Box 3 */}
              <div className="p-4 rounded-xl border border-border/40 bg-muted/20 w-44 space-y-2">
                <span className="text-[9px] font-bold text-brand-orange block">
                  DATA RESOURCE
                </span>
                <span className="font-bold text-brand-navy dark:text-white">
                  PostgreSQL DB
                </span>
                <p className="text-[9px] text-muted-foreground font-inter">
                  Amazon RDS Snapshots
                </p>
              </div>
            </div>
            <p className="text-[10px] text-center text-muted-foreground font-inter max-w-lg mx-auto">
              Static marketing components are pre-rendered into high-speed
              static HTML files using Next.js ISR, while booking requests
              communicate via WebSocket hooks directly to NestJS, keeping the
              database load close to zero.
            </p>
          </div>
        </Container>
      </Section>

      {/* 4. Slide 3: The Implementation Steps (Accordion) */}
      <Section className="py-16 md:py-24 border-b border-border/10">
        <Container className="max-w-4xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block font-space-grotesk mb-2">
              PHASE 3: DETAILED BLUEPRINT
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins text-brand-navy dark:text-white">
              The Step-by-Step Blueprint
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-3 mx-auto" />
            <p className="text-xs text-muted-foreground mt-4 font-inter">
              Click on each step below to inspect the design psychology, search
              engine setup, and content roadmap.
            </p>
          </div>

          <div className="space-y-4">
            {/* Step 1 Accordion */}
            <div className="border border-border/20 rounded-2xl bg-card overflow-hidden transition-all duration-300 shadow-sm">
              <button
                onClick={() => setOpenStep(openStep === 1 ? null : 1)}
                className="w-full p-5 flex items-center justify-between cursor-pointer bg-muted/5 hover:bg-muted/10 transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-brand-orange font-space-grotesk">
                    STEP 01
                  </span>
                  <h4 className="text-sm font-bold text-brand-navy dark:text-white font-poppins">
                    UI/UX Design, Typography, & Layout Psychology
                  </h4>
                </div>
                <div
                  className={cn(
                    "w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-brand-navy dark:border-t-white transition-transform duration-300",
                    openStep === 1 ? "rotate-180" : "",
                  )}
                />
              </button>
              {openStep === 1 && (
                <div className="p-6 border-t border-border/10 space-y-4 bg-card text-xs text-muted-foreground leading-relaxed font-inter">
                  <p>
                    Designing for yoga training requires emotional connection.
                    We ditched generic stock imagery and implemented a custom
                    media system utilizing real photos of the Bali Yoga Teacher
                    Training Center, its instructors, and physical properties.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-3 bg-muted/20 border border-border/10 rounded-xl space-y-1">
                      <span className="font-bold text-brand-navy dark:text-white">
                        Color Strategy
                      </span>
                      <p className="text-[10px]">
                        Earthy orange gradients (#FF6B00) mixed with dark slate
                        colors to represent energy and calm balance.
                      </p>
                    </div>
                    <div className="p-3 bg-muted/20 border border-border/10 rounded-xl space-y-1">
                      <span className="font-bold text-brand-navy dark:text-white">
                        Image Lazy Load
                      </span>
                      <p className="text-[10px]">
                        All visual elements are compressed into WebP formats,
                        utilizing local dimensions to prevent cumulative layout
                        shifts.
                      </p>
                    </div>
                    <div className="p-3 bg-muted/20 border border-border/10 rounded-xl space-y-1">
                      <span className="font-bold text-brand-navy dark:text-white">
                        Booking Dashboard
                      </span>
                      <p className="text-[10px]">
                        Decoupled dates panel allowing administrators to modify
                        batch packages, discount prices, and schedules easily.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2 Accordion */}
            <div className="border border-border/20 rounded-2xl bg-card overflow-hidden transition-all duration-300 shadow-sm">
              <button
                onClick={() => setOpenStep(openStep === 2 ? null : 2)}
                className="w-full p-5 flex items-center justify-between cursor-pointer bg-muted/5 hover:bg-muted/10 transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-brand-orange font-space-grotesk">
                    STEP 02
                  </span>
                  <h4 className="text-sm font-bold text-brand-navy dark:text-white font-poppins">
                    Headless Booking Automation & Cart Recovery
                  </h4>
                </div>
                <div
                  className={cn(
                    "w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-brand-navy dark:border-t-white transition-transform duration-300",
                    openStep === 2 ? "rotate-180" : "",
                  )}
                />
              </button>
              {openStep === 2 && (
                <div className="p-6 border-t border-border/10 space-y-4 bg-card text-xs text-muted-foreground leading-relaxed font-inter">
                  <p>
                    We created a transaction funnel that minimizes cart drops.
                    When a potential client enters their details but abandons
                    checkout before inputting payment options, a recovery
                    pipeline triggers:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Real-time Leads Logger:</strong> Saves client
                      details immediately upon entering checkout, before
                      transaction completion.
                    </li>
                    <li>
                      <strong>CRM Integration Webhook:</strong> Dispatches
                      incomplete leads directly to the admin panel with
                      WhatsApp/Email trigger buttons.
                    </li>
                    <li>
                      <strong>Localized Stripe Flow:</strong> Detects user IP
                      country to route currencies, preventing authorization
                      drops.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Step 3 Accordion */}
            <div className="border border-border/20 rounded-2xl bg-card overflow-hidden transition-all duration-300 shadow-sm">
              <button
                onClick={() => setOpenStep(openStep === 3 ? null : 3)}
                className="w-full p-5 flex items-center justify-between cursor-pointer bg-muted/5 hover:bg-muted/10 transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-brand-orange font-space-grotesk">
                    STEP 03
                  </span>
                  <h4 className="text-sm font-bold text-brand-navy dark:text-white font-poppins">
                    Search Engine Optimization & Indexing Setup
                  </h4>
                </div>
                <div
                  className={cn(
                    "w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-brand-navy dark:border-t-white transition-transform duration-300",
                    openStep === 3 ? "rotate-180" : "",
                  )}
                />
              </button>
              {openStep === 3 && (
                <div className="p-6 border-t border-border/10 space-y-4 bg-card text-xs text-muted-foreground leading-relaxed font-inter">
                  <p>
                    A fast page is useless without traffic. We rebuilt the
                    organic indexing architecture to align with Google crawlers:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Clean Sitemap.xml:</strong> Dynamically updated
                      sitemap that lists active pages, blogs, and tour details
                      instantly.
                    </li>
                    <li>
                      <strong>SEO Meta Editor:</strong> An admin interface
                      allowing editors to rewrite meta descriptions, alt
                      attributes, and canonical links.
                    </li>
                    <li>
                      <strong>Structured Schema Markup:</strong> Added JSON-LD
                      schema tags for LocalBusiness and Course offerings,
                      helping Google display rich search snippets.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Step 4 Accordion */}
            <div className="border border-border/20 rounded-2xl bg-card overflow-hidden transition-all duration-300 shadow-sm">
              <button
                onClick={() => setOpenStep(openStep === 4 ? null : 4)}
                className="w-full p-5 flex items-center justify-between cursor-pointer bg-muted/5 hover:bg-muted/10 transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-brand-orange font-space-grotesk">
                    STEP 04
                  </span>
                  <h4 className="text-sm font-bold text-brand-navy dark:text-white font-poppins">
                    The Monthly Organic SEO Content Strategy
                  </h4>
                </div>
                <div
                  className={cn(
                    "w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-brand-navy dark:border-t-white transition-transform duration-300",
                    openStep === 4 ? "rotate-180" : "",
                  )}
                />
              </button>
              {openStep === 4 && (
                <div className="p-6 border-t border-border/10 space-y-4 bg-card text-xs text-muted-foreground leading-relaxed font-inter">
                  <p>
                    Rather than relying on short-term ads, we executed a
                    recurring monthly organic growth engine:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/20 border border-border/10 rounded-xl space-y-1">
                      <span className="font-bold text-brand-navy dark:text-white">
                        Content Pipeline
                      </span>
                      <p className="text-[10px]">
                        Publishing 4 target blog posts monthly focusing on
                        keyword search queries (e.g. "best yoga school in
                        bali").
                      </p>
                    </div>
                    <div className="p-3 bg-muted/20 border border-border/10 rounded-xl space-y-1">
                      <span className="font-bold text-brand-navy dark:text-white">
                        Local SEO Updates
                      </span>
                      <p className="text-[10px]">
                        4 weekly Google Business Profile posts and local
                        citations updates to dominate local search map packs.
                      </p>
                    </div>
                    <div className="p-3 bg-muted/20 border border-border/10 rounded-xl space-y-1">
                      <span className="font-bold text-brand-navy dark:text-white">
                        Backlink Building
                      </span>
                      <p className="text-[10px]">
                        Acquiring 4 high-authority niche edits/backlinks to
                        increase Domain Rating (DR) safely.
                      </p>
                    </div>
                    <div className="p-3 bg-muted/20 border border-border/10 rounded-xl space-y-1">
                      <span className="font-bold text-brand-navy dark:text-white">
                        Q&A & Referral Forums
                      </span>
                      <p className="text-[10px]">
                        Targeted marketing on Reddit, Quora, and travel forums
                        to redirect active travelers to balivttc.com.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Slide 4: Competitor Gaps & Keyword Search Matrix */}
      <Section className="py-16 md:py-24 bg-muted/5 border-b border-border/10">
        <Container className="max-w-4xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block font-space-grotesk mb-2">
              PHASE 4: MARKET ANALYTICS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins text-brand-navy dark:text-white">
              Competitor Gap & Keyword Matrix
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-3 mx-auto" />
            <p className="text-xs text-muted-foreground mt-4 font-inter">
              Detailed analysis of target keywords optimized for the monthly
              marketing engine.
            </p>
          </div>

          <div className="border border-border/30 rounded-3xl bg-card overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-inter">
                <thead className="bg-muted/40 font-bold font-space-grotesk text-muted-foreground border-b border-border/10">
                  <tr>
                    <th className="p-4">Target Keyword</th>
                    <th className="p-4">Monthly Volume</th>
                    <th className="p-4">Difficulty (KD)</th>
                    <th className="p-4">Competitor Status</th>
                    <th className="p-4 text-brand-orange">Our Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  <tr>
                    <td className="p-4 font-semibold text-brand-navy dark:text-white">
                      yoga teacher training bali
                    </td>
                    <td className="p-4">8,100</td>
                    <td className="p-4">Hard (48)</td>
                    <td className="p-4 text-red-500 font-semibold">
                      Ranking Top 3
                    </td>
                    <td className="p-4 font-semibold text-brand-orange">
                      Competitor Gap Article
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-brand-navy dark:text-white">
                      200 hour yoga teacher training bali
                    </td>
                    <td className="p-4">3,200</td>
                    <td className="p-4">Medium (29)</td>
                    <td className="p-4 text-yellow-600 font-semibold">
                      Ranking Page 1
                    </td>
                    <td className="p-4 font-semibold text-brand-orange">
                      Landing Page Schema Optimization
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-brand-navy dark:text-white">
                      best yoga school in bali reviews
                    </td>
                    <td className="p-4">1,400</td>
                    <td className="p-4">Easy (12)</td>
                    <td className="p-4 text-green-500 font-semibold">
                      Unranked
                    </td>
                    <td className="p-4 font-semibold text-brand-orange">
                      4 Blogs + Forum Backlinks
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Slide 5: Results & Search Console Organic Traffic Growth */}
      <Section className="py-16 md:py-24 bg-brand-navy text-white dark:bg-[#070707] dark:border-y dark:border-white/10">
        <Container className="max-w-4xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block font-space-grotesk mb-2 text-white/80">
              PHASE 5: RESULTS & OUTCOMES
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins">
              The Real Traffic Impact
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-3 mx-auto" />
            <p className="text-xs text-white/70 mt-4 font-inter">
              How the platform performed after launch, shifting from WordPress
              limits.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Outcomes Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
              <div className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
                <span className="text-3xl font-extrabold text-brand-orange block mb-1 font-poppins">
                  +240%
                </span>
                <span className="text-xs font-semibold text-white/80 font-space-grotesk tracking-wide uppercase">
                  Booking Conversions
                </span>
              </div>
              <div className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
                <span className="text-3xl font-extrabold text-brand-orange block mb-1 font-poppins">
                  0%
                </span>
                <span className="text-xs font-semibold text-white/80 font-space-grotesk tracking-wide uppercase">
                  Server Downtime in Launches
                </span>
              </div>
              <div className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
                <span className="text-3xl font-extrabold text-brand-orange block mb-1 font-poppins">
                  35%
                </span>
                <span className="text-xs font-semibold text-white/80 font-space-grotesk tracking-wide uppercase">
                  Recaptured Cart Leads
                </span>
              </div>
            </div>

            {/* Growth Area Chart */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
              <h4 className="text-xs font-bold font-space-grotesk text-white/90 tracking-wider text-center">
                6-MONTH ORGANIC SEARCH CONSOLE CLICKS
              </h4>
              <div className="w-full h-44 relative">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 300 120"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.4" />
                      <stop
                        offset="100%"
                        stopColor="#FF6B00"
                        stopOpacity="0.0"
                      />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line
                    x1="0"
                    y1="20"
                    x2="300"
                    y2="20"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="60"
                    x2="300"
                    y2="60"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="100"
                    x2="300"
                    y2="100"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                  {/* Chart Path */}
                  <path
                    d="M 0 110 Q 50 100 100 80 T 200 40 T 300 10 L 300 120 L 0 120 Z"
                    fill="url(#chartGrad)"
                  />
                  <path
                    d="M 0 110 Q 50 100 100 80 T 200 40 T 300 10"
                    fill="none"
                    stroke="#FF6B00"
                    strokeWidth="3"
                  />
                  {/* Nodes */}
                  <circle cx="100" cy="80" r="4" fill="#FF6B00" />
                  <circle cx="200" cy="40" r="4" fill="#FF6B00" />
                  <circle cx="300" cy="10" r="4" fill="#FF6B00" />
                </svg>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-white/50 font-space-grotesk">
                <span>Month 1 (Launch)</span>
                <span>Month 3 (SEO Crawl)</span>
                <span>Month 6 (Page 1 Domination)</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. Slide 6: Founders Review & Video Mockup */}
      <Section className="py-16 md:py-24 bg-muted/5 border-b border-border/10">
        <Container className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block font-space-grotesk">
                CLIENT TESTIMONIAL
              </span>
              <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white font-poppins">
                Founder Review Transcript
              </h2>
              <div className="h-1 w-10 bg-brand-orange rounded-full mb-6" />
              <p className="text-xs text-muted-foreground leading-relaxed font-inter italic">
                &ldquo;Migrating our core booking funnel from WordPress to this
                Next.js headless framework was the best business choice we made.
                Our server has not crashed since launch day, and our sales team
                converts 35% more cart drop-offs using our CRM alerts.&rdquo;
              </p>
              <h5 className="text-xs font-bold text-brand-navy dark:text-white font-space-grotesk">
                — Ketut M., Co-Founder of Bali YTTC
              </h5>
            </div>

            {/* Video Placeholder Container */}
            <div className="aspect-video w-full bg-slate-900 rounded-3xl border border-border/30 overflow-hidden relative shadow-lg group">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.1)_0%,transparent_75%)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/85 p-6 z-10 text-center">
                <div className="h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 mb-4 group-hover:bg-brand-orange group-hover:border-brand-orange">
                  <svg
                    className="w-6 h-6 fill-current text-white ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-widest font-space-grotesk text-white">
                  PLAY REVIEW VIDEO
                </span>
                <span className="text-[9px] font-bold text-white/50 tracking-wider uppercase font-inter mt-1.5">
                  balivttc.com Owner Video Mockup Container
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. Screenshots Gallery */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionTag className="justify-center">VISUAL WORK</SectionTag>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
              Interface screenshots & flows
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-4 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {project.gallery.map((gradient, index) => (
              <Dialog key={index}>
                <DialogTrigger
                  render={
                    <button className="h-48 w-full rounded-2xl flex items-center justify-center relative overflow-hidden group focus:outline-none shadow-md border border-border/20 cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]">
                      {gradient.startsWith("http") ||
                      gradient.startsWith("/") ? (
                        <Image
                          src={gradient}
                          alt={`Screenshot ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className={cn(
                            "absolute inset-0 bg-gradient-to-br",
                            gradient,
                          )}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                      <span className="text-[9px] font-bold text-white/90 tracking-wider uppercase font-space-grotesk relative z-20 bg-black/40 px-2.5 py-1 rounded backdrop-blur-sm">
                        Screenshot {index + 1}
                      </span>
                    </button>
                  }
                />
                <DialogContent className="max-w-3xl border-none p-0 overflow-hidden bg-transparent shadow-none flex items-center justify-center">
                  <DialogTitle className="sr-only">
                    Screenshot {index + 1} Lightbox Preview
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Case study screenshot preview mockup
                  </DialogDescription>
                  <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl relative border border-white/10">
                    {gradient.startsWith("http") || gradient.startsWith("/") ? (
                      <Image
                        src={gradient}
                        alt={`Screenshot ${index + 1} Full Preview`}
                        fill
                        className="object-contain bg-black/95"
                      />
                    ) : (
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br flex items-center justify-center text-white font-extrabold text-xl",
                          gradient,
                        )}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_85%)] mix-blend-overlay" />
                        <span className="font-space-grotesk tracking-widest text-white/50 text-xs uppercase">
                          SCREENSHOT {index + 1} FULL MOCKUP
                        </span>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </Container>
      </Section>

      {/* i) CTA: Let's Talk */}
      <Section className="bg-muted/10 border-y border-border/20 py-16 text-center">
        <Container>
          <div className="max-w-xl mx-auto">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-3 font-space-grotesk">
              COLLABORATION OPPORTUNITY
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-brand-navy dark:text-white mb-3 font-poppins">
              Have a similar project in mind?
            </h2>
            <p className="text-xs text-muted-foreground mb-8 font-inter">
              Get an honest technical scope check and estimated budget numbers
              for your company.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold h-12 px-6 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(255,107,0,0.3)] mx-auto"
              >
                Let&apos;s Talk
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* j) Related Projects Section */}
      {relatedProjects.length > 0 && (
        <Section className="py-16 md:py-24">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="flex flex-col items-start">
                <SectionTag>MORE SUCCESS STORIES</SectionTag>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
                  Related Case Studies
                </h2>
                <div className="h-1 w-12 bg-brand-orange rounded-full mt-4" />
              </div>
              <Link
                href="/work"
                className="group flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-hover transition-colors font-inter"
              >
                View all work
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((project) => (
                <div
                  key={project.slug}
                  className="flex flex-col rounded-2xl border border-border/40 bg-card overflow-hidden transition-all duration-300 group hover:border-brand-orange/30 hover:shadow-[0_4px_20px_rgba(255,107,0,0.06)]"
                >
                  {/* Image or Gradient Preview */}
                  <div className="h-40 w-full relative overflow-hidden select-none">
                    {project.heroGradient.startsWith("http") ||
                    project.heroGradient.startsWith("/") ? (
                      <Image
                        src={project.heroGradient}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br",
                          project.heroGradient,
                        )}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/15 z-10" />
                    <span className="absolute bottom-3 left-3 text-[9px] font-extrabold tracking-widest text-white/95 uppercase font-space-grotesk bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm z-20">
                      {project.industry} Case Study
                    </span>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-2 font-poppins group-hover:text-brand-orange transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 font-inter">
                        {project.overview}
                      </p>
                    </div>

                    <div className="mt-auto space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((t) => (
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
    </div>
  );
}
export default CaseStudyClient;
