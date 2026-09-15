"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Cpu,
  TrendingUp,
  Palette,
  Check,
  Sparkles,
  Layers,
  Terminal,
  Smartphone,
  Search,
  Share2,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const capabilityDivisions = [
  {
    id: "tech",
    num: "01",
    name: "Technology & Engineering",
    tagline:
      "Custom digital products engineered for zero latency and continuous scale.",
    icon: Code2,
    accent: "blue",
    services: [
      {
        title: "Web Development",
        slug: "web-development",
        desc: "High-performance enterprise websites built with Next.js, TypeScript, and headless CMS architectures.",
        stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
        price: "From ₹15,000",
      },
      {
        title: "Mobile App Development",
        slug: "mobile-app-development",
        desc: "Native & cross-platform iOS and Android applications built with React Native and offline sync.",
        stack: ["React Native", "Flutter", "Firebase", "REST APIs"],
        price: "From ₹30,000",
      },
      {
        title: "SaaS & Custom Software",
        slug: "saas-custom-software",
        desc: "Bespoke SaaS platforms, internal ERPs, customer portals, and microservices.",
        stack: ["NestJS", "PostgreSQL", "Prisma", "AWS / Docker"],
        price: "From ₹75,000",
      },
      {
        title: "CRM & Business Systems",
        slug: "saas-custom-software",
        desc: "Tailored databases, pipeline trackers, and automated client onboarding infrastructure.",
        stack: ["PostgreSQL", "Node.js", "Webhook APIs", "NextAuth"],
        price: "Custom Scoped",
      },
    ],
  },
  {
    id: "ai",
    num: "02",
    name: "AI & Automation",
    tagline:
      "Autonomous workflows and intelligent agents that eliminate manual operational drag.",
    icon: Cpu,
    accent: "teal",
    services: [
      {
        title: "AI Automation",
        slug: "ai-automation",
        desc: "End-to-end business workflow automation connecting CRMs, email, payment, and operations.",
        stack: ["Make.com", "n8n", "Zapier", "REST APIs"],
        price: "Custom Scoped",
      },
      {
        title: "AI Agents & Autonomous Workflows",
        slug: "ai-automation",
        desc: "24/7 intelligent WhatsApp and web chat qualification agents with natural conversation memory.",
        stack: ["LangChain", "OpenAI / Claude", "Vector DB", "WhatsApp API"],
        price: "Custom Scoped",
      },
      {
        title: "Custom AI & Enterprise RAG",
        slug: "custom-ai-solutions",
        desc: "Internal document intelligence systems and fine-tuned domain models.",
        stack: ["Pinecone", "LlamaIndex", "FastAPI", "Python"],
        price: "Custom Scoped",
      },
      {
        title: "AI Performance Ads",
        slug: "ai-ads",
        desc: "Algorithmic campaign optimization and dynamic creative testing pipelines.",
        stack: ["Meta CAPI", "Google GA4", "Predictive Analytics"],
        price: "Performance Based",
      },
    ],
  },
  {
    id: "growth",
    num: "03",
    name: "Marketing & Growth",
    tagline: "Data-engineered acquisition funnels and technical SEO dominance.",
    icon: TrendingUp,
    accent: "blue",
    services: [
      {
        title: "Technical SEO & Local Dominance",
        slug: "seo",
        desc: "On-page architecture, Core Web Vitals, Google Maps 3-Pack, and programmatic search funnels.",
        stack: ["Schema.org", "Next.js SSR", "Search Console", "Ahrefs"],
        price: "Monthly Retainer",
      },
      {
        title: "Google & Search Intent Ads",
        slug: "google-ads",
        desc: "High-ROAS search, display, and performance max campaigns capturing purchase intent.",
        stack: ["Google Ads", "Conversion Tracking", "Tag Manager"],
        price: "Ad Spend + Fee",
      },
      {
        title: "Meta & Social Performance Ads",
        slug: "meta-ads",
        desc: "Full-funnel creative testing and CAPI server-side tracking on Facebook and Instagram.",
        stack: ["Meta Ads Manager", "Server CAPI", "Attribution Models"],
        price: "Ad Spend + Fee",
      },
      {
        title: "Social Media & Retention",
        slug: "social-media-management",
        desc: "Organic thought-leadership, viral 4K reels, and automated Klaviyo email flows.",
        stack: ["Reels / Shorts", "Klaviyo CRM", "Automated Sequences"],
        price: "Monthly Package",
      },
    ],
  },
  {
    id: "creative",
    num: "04",
    name: "Brand, Design & Creative",
    tagline: "High-conversion UI/UX interaction systems and visual identities.",
    icon: Palette,
    accent: "teal",
    services: [
      {
        title: "UI/UX & Interaction Design",
        slug: "ui-ux-design",
        desc: "Figma design systems, tokenized UI libraries, and conversion-optimized prototypes.",
        stack: ["Figma", "Design Tokens", "Micro-interactions", "UX Audits"],
        price: "Project Scoped",
      },
      {
        title: "Brand Identity Systems",
        slug: "graphic-designing",
        desc: "Logo suites, typography guidelines, vector assets, and commercial brand kits.",
        stack: ["Adobe Illustrator", "Vector Graphics", "Brand Guidelines"],
        price: "Fixed Sprint",
      },
      {
        title: "Video & Motion Media",
        slug: "video-editing",
        desc: "Product explainer videos, SaaS demos, and high-impact kinetic motion graphics.",
        stack: ["Premiere Pro", "After Effects", "4K Production"],
        price: "Sprint Package",
      },
    ],
  },
];

export function ServicesPreview() {
  const [activeTab, setActiveTab] = useState<string>("tech");

  const currentDivision = (capabilityDivisions.find(
    (d) => d.id === activeTab,
  ) ?? capabilityDivisions[0])!;

  return (
    <section className="relative w-full py-24 bg-background border-b border-border/60 transition-colors duration-300">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/20 mb-4 inline-block">
            CAPABILITY ARCHITECTURE
          </span>
          <h2 className="font-sora text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            What we actually build.
          </h2>
          <p className="font-manrope text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            We structure our capabilities across four integrated engineering
            divisions—providing end-to-end technical execution under a single
            SLA framework.
          </p>
        </div>

        {/* 4 Division Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {capabilityDivisions.map((div) => {
            const Icon = div.icon;
            const isActive = activeTab === div.id;
            return (
              <button
                key={div.id}
                onClick={() => setActiveTab(div.id)}
                className={`flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-200 border ${
                  isActive
                    ? "bg-brand-blue text-white border-brand-blue shadow-lg scale-[1.01]"
                    : "bg-slate-50 dark:bg-[#111720] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#202936] hover:border-slate-400 dark:hover:border-slate-600"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-brand-blue/10 text-brand-blue"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span
                    className={`block font-mono text-[9px] font-bold uppercase ${
                      isActive
                        ? "text-white/80"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    DIV {div.num}
                  </span>
                  <span className="block font-sora text-xs font-bold truncate">
                    {div.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Division Capability Matrix */}
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0D1118] border border-slate-200 dark:border-[#202936] shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-[#202936] mb-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase text-brand-blue">
                DIVISION {currentDivision.num} &bull;{" "}
                {currentDivision.name.toUpperCase()}
              </span>
              <p className="font-manrope text-sm text-slate-600 dark:text-slate-300 mt-1">
                {currentDivision.tagline}
              </p>
            </div>
            <Link href="/services">
              <Button
                variant="outline"
                size="sm"
                className="font-space text-xs border-brand-blue/40 text-brand-blue hover:bg-brand-blue hover:text-white"
              >
                View Full Service Specs &rarr;
              </Button>
            </Link>
          </div>

          {/* 4 Cards Grid for the Active Division */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentDivision.services.map((srv) => (
              <div
                key={srv.title}
                className="p-6 rounded-2xl bg-white dark:bg-[#111720] border border-slate-200/80 dark:border-[#202936] flex flex-col justify-between hover:border-brand-blue/40 hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="font-sora text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-blue transition-colors">
                      {srv.title}
                    </h3>
                    <span className="font-mono text-[10px] font-semibold text-brand-blue bg-brand-blue/10 px-2.5 py-0.5 rounded-full">
                      {srv.price}
                    </span>
                  </div>

                  <p className="font-manrope text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {srv.stack.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/services/${srv.slug}`}
                    className="inline-flex items-center gap-1 font-space text-xs font-bold text-brand-blue hover:underline"
                  >
                    Scope Service
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ServicesPreview;
