"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Layers, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const featuredProjects = [
  {
    title: "Adruva Resto System",
    category: "OFFLINE-FIRST RESTAURANT SAAS",
    slug: "adruva-resto-system",
    problem:
      "Frequent internet dropouts in hospitality venues caused POS crashes, missed orders, and billing delays.",
    solution:
      "Engineered an offline-first PWA with local SQLite sync, QR digital ordering, kitchen display dispatch, and live analytics.",
    result: "100% Zero-downtime billing & 3.4x faster order dispatch.",
    tech: ["Next.js", "React Native", "PostgreSQL", "Tailwind CSS", "Prisma"],
  },
  {
    title: "Bali Yoga Teacher Training",
    category: "GLOBAL ENROLMENT & CRM ENGINE",
    slug: "bali-yoga-teacher-training",
    problem:
      "Fragmented lead capture across social ads led to high bounce rates and manual international currency collection.",
    solution:
      "Developed an international course booking portal with automated WhatsApp lead qualification, Stripe payments, and student CRM.",
    result: "420% Increase in international bookings & sub-second page loads.",
    tech: [
      "Next.js SSR",
      "TypeScript",
      "Stripe API",
      "WhatsApp CRM",
      "GA4 CAPI",
    ],
  },
  {
    title: "AI-Powered CRM System",
    category: "AUTONOMOUS SALES PIPELINE",
    slug: "ai-automation",
    problem:
      "Sales reps spent 15+ hours weekly answering repetitive inquiries and manually entering data into spreadsheets.",
    solution:
      "Deployed autonomous RAG conversational agents that qualify leads 24/7, route warm prospects to calendar booking, and sync CRM.",
    result: "85% Operational time saved & under 2.0s response latency.",
    tech: [
      "LangChain",
      "OpenAI API",
      "Vector DB",
      "FastAPI",
      "Webhook Automation",
    ],
  },
  {
    title: "Vintage Tours & Travels",
    category: "DYNAMIC TOUR BOOKING ENGINE",
    slug: "vintage-tours-and-travels",
    problem:
      "Static brochure website failed to rank for local keywords and required manual quote generation for tour packages.",
    solution:
      "Engineered a dynamic itinerary builder with automated PDF quotes, multi-currency pricing, and programmatic local SEO.",
    result: "#1 Rank for 18+ high-intent keywords & 280% inquiry lift.",
    tech: ["Next.js", "Node.js", "Schema SEO", "Tailwind CSS", "PostgreSQL"],
  },
];

export function WorkPreview({ initialProjects }: { initialProjects?: any[] }) {
  return (
    <section className="relative w-full py-24 bg-slate-50/50 dark:bg-[#07090D] border-b border-border/60 transition-colors duration-300">
      <Container>
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/20 mb-4 inline-block">
              ENGINEERING PORTFOLIO
            </span>
            <h2 className="font-sora text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Built for real problems.
            </h2>
            <p className="font-manrope text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              A selection of systems we&apos;ve designed, engineered and
              deployed for ambitious businesses.
            </p>
          </div>

          <Link href="/work" className="self-start md:self-end">
            <Button
              variant="outline"
              className="font-space text-xs font-semibold border-slate-300 dark:border-slate-700 hover:border-brand-blue hover:text-brand-blue"
            >
              View All Case Studies &rarr;
            </Button>
          </Link>
        </div>

        {/* 2x2 Large Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((proj) => (
            <div
              key={proj.slug}
              className="p-8 rounded-3xl bg-white dark:bg-[#111720] border border-slate-200 dark:border-[#202936] hover:border-brand-blue/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10px] font-bold text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {proj.category}
                  </span>
                  <Link
                    href={`/work/${proj.slug}`}
                    className="text-slate-400 group-hover:text-brand-blue transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <h3 className="font-sora text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-brand-blue transition-colors">
                  {proj.title}
                </h3>

                <div className="space-y-3 mb-6 font-manrope text-xs leading-relaxed">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0D1118] border border-slate-200/60 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-white block font-semibold mb-0.5">
                      The Challenge:
                    </strong>
                    <span className="text-slate-600 dark:text-slate-400">
                      {proj.problem}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0D1118] border border-slate-200/60 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-white block font-semibold mb-0.5">
                      The Solution:
                    </strong>
                    <span className="text-slate-600 dark:text-slate-400">
                      {proj.solution}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                {/* Result Highlight */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-6">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{proj.result}</span>
                </div>

                {/* Tech Stack Pills & Link */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/work/${proj.slug}`}
                    className="font-space text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
                  >
                    Read Breakdown
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WorkPreview;
