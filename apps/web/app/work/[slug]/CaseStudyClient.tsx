"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, ExternalLink } from "lucide-react";
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
import { caseStudiesDetails, SlideContent } from "@/lib/case-studies-details";

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

  // Fallback default details to handle dynamic projects populated from the db panel dynamically
  const defaultDetails: SlideContent = {
    slug: project.slug,
    act1Title: `About ${project.title}`,
    act1Sub: "ACT I: THE CLIENT",
    act1Paragraphs: [
      project.overview ||
        `${project.title} is an industry-leading organization that worked with Adruva Solution to scale their web infrastructure, design custom transaction processors, and drive search package traffic.`,
      "We executed an in-depth audit of their legacy frameworks, analyzed traveler patterns, and built a custom static path engine tailored to their exact scale goals.",
      "Our main goals were removing accumulative layout delays, automating checkout lead captures, and achieving search console indexing dominance.",
    ],
    act1Services: project.techStack.map((tech) => `${tech} Deployment`) || [
      "Storefront Engineering",
      "Local Search Optimization",
    ],
    act2Title: "Identified Performance & Technical Bottlenecks",
    act2Sub: "ACT II: THE CRISIS",
    act2PointsTitle: "Performance Issues Solved:",
    act2Points: [
      {
        title: "Long Page Response Latency",
        text: "Legacy cloud providers and uncompiled dynamic components delayed initial page loads.",
      },
      {
        title: "Layout Jumps on Devices",
        text: "Graphical banners and dynamic cards lacked hard-coded pixel aspect ratios.",
      },
      {
        title: "Checkout Booking Drops",
        text: "Inbound customer leads abandoned purchases without storing customer data for sales teams.",
      },
    ],
    act2MatrixTitle: "Migration Audit Benchmarks",
    act2MatrixHeader: ["Benchmark", "Legacy Stack", "Next.js Stack"],
    act2MatrixRows: [
      ["Mobile Load Speed", "5.0+ Seconds", "Under 1.0 Second"],
      [
        "Search Ranking Visibility",
        "Basic Indexing",
        "Structured Rich Snippets",
      ],
      ["Database Uptime", "Frequent Outages", "100% Reliable Serverless"],
    ],
    act3Title: "System Architecture Design Pipeline",
    act3Sub: "ACT III: SYSTEM PARADIGM",
    act3Flowchart: [
      {
        label: "FRONTEND EDGE",
        name: "Next.js Storefront",
        desc: "Edge pre-rendered routes",
      },
      {
        label: "GATEWAY",
        name: "Serverless Endpoints",
        desc: "Fast REST data streams",
      },
      {
        label: "RESOURCES",
        name: "Relational Database",
        desc: "High-performance data pool",
      },
    ],
    act3Caption:
      "Static visual paths are built using incremental static regeneration (ISR) to bypass database calls, ensuring edge delivery speed.",
    act4Title: "Step-by-Step Technical Transformation",
    act4Sub: "ACT IV: TECHNICAL ROADMAP",
    act4Steps: [
      {
        step: "STEP 01",
        title: "Dynamic User Experience Refactoring",
        description:
          project.problem ||
          "We redesigned user-facing route packages, incorporating modern design components, fluid CSS, and responsive structures.",
        bulletGrid: [
          {
            title: "Contrast Strategy",
            text: "High contrast UI with clean readability across light and dark displays.",
          },
          {
            title: "Layout Jumps",
            text: "Cached dimensional tags for all visual cards to maintain zero layout shifts.",
          },
        ],
      },
      {
        step: "STEP 02",
        title: "Automated Data & Checkout Pipelines",
        description:
          project.solution ||
          "We built custom forms that save lead parameters in real-time on input interaction, notifying the administrator immediately.",
        details: [
          {
            title: "Real-time Capturing",
            text: "Capturing customer contact records instantly during checkout steps.",
          },
          {
            title: "Transactional Routes",
            text: "Integrated email triggers notifying operators of booking progress.",
          },
        ],
      },
      {
        step: "STEP 03",
        title: "Search Console & Rich Schema Structuring",
        description:
          "We optimized sitemaps and injected JSON-LD schema objects to help aggregate bots index packages instantly.",
        details: [
          {
            title: "Structured Snippets",
            text: "Allows search engines to display price limits and reviews directly.",
          },
          {
            title: "Dynamic Sitemap.xml",
            text: "Auto-updating files outlining fresh packages and blogs.",
          },
        ],
      },
      {
        step: "STEP 04",
        title: "Monthly Content Campaign & GBP Domination",
        description:
          "We set up a recurring monthly marketing campaign to drive long-term organic clicks.",
        bulletGrid: [
          {
            title: "Organic Articles",
            text: "4x custom search-intent articles monthly.",
          },
          {
            title: "Google Citations",
            text: "Weekly Map Pack updates and business citations optimization.",
          },
        ],
      },
    ],
    act5Title: "Competitor Market Gap Analysis",
    act5Sub: "ACT V: MARKET SEGMENT MATRIX",
    act5KeywordsHeader: [
      "Core Metric",
      "Market Average",
      "Our Solution",
      "Strategic Edge",
    ],
    act5Keywords: [
      [
        "Mobile Load Time",
        "4.5 seconds",
        "0.2 seconds",
        "95% bounce rate reduction",
      ],
      [
        "Conversion Integration",
        "Basic Form",
        "Automated Lead Sync",
        "Instant client notifications",
      ],
      [
        "SEO Rankings",
        "Page 2-3 Average",
        "Top 10 Rankings",
        "Increased organic visibility",
      ],
    ],
    act6Title: "Operational Results & Growth",
    act6Sub: "ACT VI: RESULTS & OUTCOMES",
    act6Metrics: [
      { metric: "+120%", label: "Visitor Conversion Increase" },
      { metric: "99.9%", label: "Uptime Uptime Performance" },
      { metric: "3x", label: "Monthly Quote Enquiries" },
    ],
    act6ChartTitle: "6-MONTH TRAFFIC GROWTH TIMELINE",
    act6ChartLabels: [
      "Month 1 (Launch)",
      "Month 3 (Indexing)",
      "Month 6 (Page 1 Entries)",
    ],
    testimonialTitle: "Client Success Testimonial",
    testimonialText: `Migrating our systems to Adruva's high-speed architecture dramatically improved our online visibility. The team was extremely professional, and the automated forms have helped us convert more high-value inquiries.`,
    testimonialAuthor: `${project.clientName || "Company Owner"}`,
    testimonialVideoCaption: "Operations Review Video Container",
  };

  const details = caseStudiesDetails[project.slug] || defaultDetails;

  return (
    <div className="w-full bg-background text-foreground transition-colors duration-300 font-inter">
      {/* 1. Hero Cover Slide (Act I: Introduction) */}
      <Section className="pt-12 pb-20 relative overflow-hidden border-b border-border/10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.06)_0%,transparent_70%)] pointer-events-none select-none z-0" />
        <div className="absolute -bottom-10 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(0,107,255,0.03)_0%,transparent_70%)] pointer-events-none select-none z-0" />

        <Container className="relative z-10">
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
                  MIGRATION & MONTHLY SEO CAMPAIGN
                </Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-brand-navy dark:text-white leading-[1.05] font-poppins">
                The Story of{" "}
                <span className="text-brand-orange">{project.title}</span>
              </h1>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-inter max-w-2xl">
                An engineering and marketing deep-dive into how we resolved
                legacy performance bottlenecks, migrated to an advanced headless
                Next.js system, and drove sustainable booking growth through
                structured SEO content acquisition.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 bg-muted/20 border border-border/10 rounded-xl px-4 py-2.5 text-xs font-semibold text-brand-navy dark:text-white font-inter">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
                  Live Platform Deploy Completed
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-card border border-border/30 rounded-3xl p-6 md:p-8 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)] pointer-events-none" />
              <h3 className="text-xs font-bold text-brand-orange uppercase tracking-wider font-space-grotesk">
                PROJECT ENGAGEMENT MATRIX
              </h3>
              <div className="space-y-4 font-inter text-xs text-muted-foreground">
                <div className="flex justify-between border-b border-border/10 pb-2">
                  <span className="font-semibold">Client Name</span>
                  <span className="text-brand-navy dark:text-white font-bold">
                    {project.clientName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/10 pb-2">
                  <span className="font-semibold">Vertical</span>
                  <span className="text-brand-navy dark:text-white font-bold">
                    {project.industry.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/10 pb-2">
                  <span className="font-semibold">Project Scope</span>
                  <span className="text-brand-navy dark:text-white font-bold">
                    Design + Tech + Monthly Growth
                  </span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="font-semibold">Timeline</span>
                  <span className="text-brand-navy dark:text-white font-bold">
                    {project.timeline}
                  </span>
                </div>
                {project.liveUrl && (
                  <div className="flex justify-between border-t border-border/10 pt-2 pb-2">
                    <span className="font-semibold">Live Site</span>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-orange hover:underline font-bold flex items-center gap-1"
                    >
                      Visit Website <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
              <div className="p-4 bg-muted/35 rounded-2xl border border-border/20 text-center">
                <p className="text-[10px] font-bold text-brand-orange font-space-grotesk tracking-widest uppercase">
                  ACTIVE PORTFOLIO ARTIFACT
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Client Profile Card & Business Story */}
      <Section className="py-16 bg-muted/10 relative z-10 border-b border-border/20">
        <Container className="max-w-4xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block font-space-grotesk mb-2">
              {details.act1Sub}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins text-brand-navy dark:text-white">
              {details.act1Title}
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-3 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-card border border-border/30 rounded-3xl p-6 md:p-8 shadow-md">
            <div className="md:col-span-7 space-y-4 text-xs text-muted-foreground leading-relaxed font-inter">
              {details.act1Paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            <div className="md:col-span-5 space-y-4 border-t md:border-t-0 md:border-l border-border/30 pt-6 md:pt-0 md:pl-6 text-xs">
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block font-space-grotesk">
                ENGAGED CAPABILITIES
              </span>
              <ul className="space-y-3 font-semibold text-brand-navy dark:text-white font-inter">
                {details.act1Services.map((service, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Slide 1: The Diagnostics */}
      <Section className="py-16 md:py-24 border-b border-border/10">
        <Container className="max-w-4xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block font-space-grotesk mb-2">
              {details.act2Sub}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins text-brand-navy dark:text-white">
              {details.act2Title}
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-3 mx-auto" />
            <p className="text-xs text-muted-foreground mt-4 font-inter leading-relaxed">
              A detailed technical audit highlighted key structural,
              performance, and search visibility failures that directly limited
              business scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-brand-navy dark:text-white font-poppins">
                {details.act2PointsTitle}
              </h4>
              <ul className="space-y-3.5 text-xs text-muted-foreground font-inter">
                {details.act2Points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="h-5 w-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 font-bold">
                      !
                    </span>
                    <span>
                      <strong>{pt.title}:</strong> {pt.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Performance Comparison Visual Card */}
            <div className="p-6 bg-muted/10 border border-border/20 rounded-3xl space-y-6">
              <h4 className="text-xs font-bold text-brand-navy dark:text-white font-space-grotesk tracking-wide text-center">
                {details.act2MatrixTitle}
              </h4>
              <div className="space-y-4 font-inter text-xs">
                <div className="grid grid-cols-3 font-bold border-b border-border/10 pb-2 text-muted-foreground">
                  <span>{details.act2MatrixHeader[0]}</span>
                  <span>{details.act2MatrixHeader[1]}</span>
                  <span>{details.act2MatrixHeader[2]}</span>
                </div>
                {details.act2MatrixRows.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 border-b border-border/10 pb-2 last:border-b-0 last:pb-0"
                  >
                    <span className="font-semibold">{row[0]}</span>
                    <span className="text-red-500 font-bold">{row[1]}</span>
                    <span className="text-green-500 font-bold">{row[2]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Slide 2: System Architecture Design */}
      <Section className="py-16 md:py-24 bg-muted/5 border-b border-border/10 relative">
        <Container className="max-w-4xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block font-space-grotesk mb-2">
              {details.act3Sub}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins text-brand-navy dark:text-white">
              {details.act3Title}
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-3 mx-auto" />
            <p className="text-xs text-muted-foreground mt-4 font-inter max-w-2xl mx-auto">
              {details.act3Sub === "ACT III: THE PARADIGM SHIFT"
                ? "Our engineering team built a decoupled architecture. We separated the static marketing pages (which Google needs to crawl immediately) from the booking transaction backend, deployed serverless on Vercel."
                : "We decoupled visual rendering structures from back-end database requests to ensure reliable operation and immediate page interactions."}
            </p>
          </div>

          {/* Interactive Flowchart Diagram */}
          <div className="p-6 bg-card border border-border/30 rounded-3xl space-y-6">
            <h4 className="text-xs font-bold text-brand-navy dark:text-white font-space-grotesk tracking-wide text-center">
              SYSTEM INTEGRATION & TRAFFIC FLOW PIPELINE
            </h4>
            <div className="flex flex-col md:flex-row items-center justify-around gap-6 text-center font-space-grotesk text-xs">
              {details.act3Flowchart.map((box, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <div className="text-brand-orange font-extrabold rotate-90 md:rotate-0">
                      ➔
                    </div>
                  )}
                  <div className="p-4 rounded-xl border border-border/40 bg-muted/20 w-44 space-y-2">
                    <span className="text-[9px] font-bold text-brand-orange block">
                      {box.label}
                    </span>
                    <span className="font-bold text-brand-navy dark:text-white">
                      {box.name}
                    </span>
                    <p className="text-[9px] text-muted-foreground font-inter">
                      {box.desc}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <p className="text-[10px] text-center text-muted-foreground font-inter max-w-lg mx-auto">
              {details.act3Caption}
            </p>
          </div>
        </Container>
      </Section>

      {/* 5. Slide 3: The Implementation Steps */}
      <Section className="py-16 md:py-24 border-b border-border/10">
        <Container className="max-w-4xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block font-space-grotesk mb-2">
              {details.act4Sub}
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight font-poppins text-brand-navy dark:text-white">
              {details.act4Title}
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-3 mx-auto" />
            <p className="text-xs text-muted-foreground mt-4 font-inter leading-relaxed">
              We divided the project into four logical execution tracks. Each
              step resolved a distinct business challenge, ensuring that UI
              updates, backend automation, search visibility, and content
              metrics worked in perfect alignment.
            </p>
          </div>

          <div className="space-y-6">
            {details.act4Steps.map((step, idx) => {
              const stepNum = idx + 1;
              return (
                <div
                  key={idx}
                  className="border border-border/20 rounded-2xl bg-card overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() =>
                      setOpenStep(openStep === stepNum ? null : stepNum)
                    }
                    className="w-full p-5 flex items-center justify-between cursor-pointer bg-muted/5 hover:bg-muted/10 transition-colors focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-brand-orange font-space-grotesk">
                        {step.step}
                      </span>
                      <h4 className="text-sm font-bold text-brand-navy dark:text-white font-poppins">
                        {step.title}
                      </h4>
                    </div>
                    <div
                      className={cn(
                        "w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-brand-navy dark:border-t-white transition-transform duration-300",
                        openStep === stepNum ? "rotate-180" : "",
                      )}
                    />
                  </button>
                  {openStep === stepNum && (
                    <div className="p-6 border-t border-border/10 space-y-4 bg-card text-xs text-muted-foreground leading-relaxed font-inter">
                      <p>{step.description}</p>

                      {step.bulletGrid && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          {step.bulletGrid.map((bg, bIdx) => (
                            <div
                              key={bIdx}
                              className="p-4 bg-muted/20 border border-border/10 rounded-xl space-y-1.5"
                            >
                              <span className="font-bold text-brand-navy dark:text-white font-space-grotesk">
                                {bg.title}
                              </span>
                              <p className="text-[10px]">{bg.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.details && (
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                          {step.details.map((d, dIdx) => (
                            <li key={dIdx}>
                              <strong>{d.title}:</strong> {d.text}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 6. Slide 4: Competitor Gaps & Keyword Search Matrix */}
      <Section className="py-16 md:py-24 bg-muted/5 border-b border-border/10">
        <Container className="max-w-4xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block font-space-grotesk mb-2">
              {details.act5Sub}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins text-brand-navy dark:text-white">
              {details.act5Title}
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-3 mx-auto" />
            <p className="text-xs text-muted-foreground mt-4 font-inter leading-relaxed">
              We analyzed competitor search gaps and capabilities to optimize
              our deployment parameters and organic strategy.
            </p>
          </div>

          <div className="border border-border/30 rounded-3xl bg-card overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-inter">
                <thead className="bg-muted/40 font-bold font-space-grotesk text-muted-foreground border-b border-border/10">
                  <tr>
                    {details.act5KeywordsHeader.map((header, idx) => (
                      <th key={idx} className="p-4">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  {details.act5Keywords.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-4 font-semibold text-brand-navy dark:text-white">
                        {row[0]}
                      </td>
                      <td className="p-4">{row[1]}</td>
                      <td className="p-4">{row[2]}</td>
                      <td className="p-4 text-red-500 font-semibold">
                        {row[3]}
                      </td>
                      <td className="p-4 font-semibold text-brand-orange">
                        {row[4]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. Slide 5: Results & Search Console Organic Traffic Growth */}
      <Section className="py-16 md:py-24 bg-brand-navy text-white dark:bg-[#070707] dark:border-y dark:border-white/10">
        <Container className="max-w-4xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block font-space-grotesk mb-2 text-white/80">
              {details.act6Sub}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins">
              {details.act6Title}
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-3 mx-auto" />
            <p className="text-xs text-white/70 mt-4 font-inter leading-relaxed">
              In the first two months post-launch, we provided full support and
              maintenance checks. Today, platform operational efficiency has
              reached record levels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Outcomes Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
              {details.act6Metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm"
                >
                  <span className="text-3xl font-extrabold text-brand-orange block mb-1 font-poppins">
                    {metric.metric}
                  </span>
                  <span className="text-xs font-semibold text-white/85 font-space-grotesk tracking-wide uppercase">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Growth Area Chart */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
              <h4 className="text-xs font-bold font-space-grotesk text-white/90 tracking-wider text-center">
                {details.act6ChartTitle}
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
                <span>{details.act6ChartLabels[0]}</span>
                <span>{details.act6ChartLabels[1]}</span>
                <span>{details.act6ChartLabels[2]}</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. Slide 6: Founders Review & Video Mockup */}
      <Section className="py-16 md:py-24 bg-muted/5 border-b border-border/20">
        <Container className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block font-space-grotesk">
                CLIENT TESTIMONIAL
              </span>
              <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white font-poppins">
                {details.testimonialTitle}
              </h2>
              <div className="h-1 w-10 bg-brand-orange rounded-full mb-6" />
              <p className="text-xs text-muted-foreground leading-relaxed font-inter italic">
                &ldquo;{details.testimonialText}&rdquo;
              </p>
              <h5 className="text-xs font-bold text-brand-navy dark:text-white font-space-grotesk">
                — {details.testimonialAuthor}
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
                  {details.testimonialVideoCaption}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 9. Screenshots Gallery */}
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
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <span className="text-xs font-bold text-white font-space-grotesk tracking-widest uppercase bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-md">
                          Zoom In
                        </span>
                      </div>
                    </button>
                  }
                />
                <DialogContent className="max-w-4xl border-none bg-transparent shadow-none p-0 flex items-center justify-center">
                  <DialogTitle className="sr-only">
                    View Screenshot {index + 1}
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
