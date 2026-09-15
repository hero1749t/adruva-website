"use client";

import React from "react";
import { Container } from "@/components/layout/container";
import {
  Search,
  Stethoscope,
  Compass,
  Cpu,
  CheckCircle2,
  Rocket,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const methodologySteps = [
  {
    num: "01",
    title: "Understand",
    sub: "Business goals & economics",
    desc: "We analyze your business model, customer journey, revenue bottlenecks, and exact conversion goals before writing a single line of code.",
    icon: Search,
  },
  {
    num: "02",
    title: "Diagnose",
    sub: "Existing system friction",
    desc: "We audit current workflows, website performance, CRM drop-offs, and advertising conversion data to pinpoint exact failure points.",
    icon: Stethoscope,
  },
  {
    num: "03",
    title: "Architect",
    sub: "Bespoke solution design",
    desc: "We design complete database schemas, user experience wireframes, API integrations, and tech stack blueprints tailored for scale.",
    icon: Compass,
  },
  {
    num: "04",
    title: "Build",
    sub: "Type-safe engineering",
    desc: "We develop production-ready code with Next.js, TypeScript, NestJS, and custom AI agents following strict enterprise standards.",
    icon: Cpu,
  },
  {
    num: "05",
    title: "Test",
    sub: "Rigorous QA & audits",
    desc: "Full cross-browser testing, mobile responsiveness checks, load testing, and Core Web Vitals optimizations (<0.4s LCP).",
    icon: CheckCircle2,
  },
  {
    num: "06",
    title: "Launch",
    sub: "Zero-downtime deployment",
    desc: "Seamless DNS cutover, CDN edge caching setup, automated backup pipelines, and live production verification.",
    icon: Rocket,
  },
  {
    num: "07",
    title: "Improve",
    sub: "Data-driven iteration",
    desc: "Continuous conversion rate optimization, SLA monitoring, feature sprints, and 30-day post-launch warranty support.",
    icon: RefreshCw,
  },
];

export function HowWeThinkSection() {
  return (
    <section className="relative w-full py-24 bg-background border-b border-border/60 transition-colors duration-300">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/20 mb-4 inline-block">
            DELIVERY METHODOLOGY
          </span>
          <h2 className="font-sora text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Technology starts with the problem.
          </h2>
          <p className="font-manrope text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            We don&apos;t jump straight to templates or buzzwords. Every
            solution follows a disciplined, 7-step engineering framework
            designed for predictable outcomes.
          </p>
        </div>

        {/* 7-Step Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {methodologySteps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === methodologySteps.length - 1;
            return (
              <div
                key={step.num}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  isLast
                    ? "bg-brand-blue/10 border-brand-blue/40 md:col-span-2 lg:col-span-3 xl:col-span-1"
                    : "bg-slate-50 dark:bg-[#111720] border-slate-200 dark:border-[#202936]"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-brand-blue bg-brand-blue/15 px-2.5 py-0.5 rounded-full">
                    {step.num}
                  </span>
                  <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>

                <h3 className="font-sora text-base font-bold text-slate-900 dark:text-white mb-1">
                  {step.title}
                </h3>
                <span className="block font-mono text-xs text-brand-blue font-semibold mb-3">
                  {step.sub}
                </span>

                <p className="font-manrope text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Consultation Callout */}
        <div className="max-w-2xl mx-auto text-center p-8 rounded-3xl bg-slate-50 dark:bg-[#111720] border border-slate-200 dark:border-[#202936]">
          <h4 className="font-sora text-lg font-bold text-slate-900 dark:text-white mb-2">
            Have a technical or business problem to solve?
          </h4>
          <p className="font-manrope text-sm text-slate-600 dark:text-slate-300 mb-6">
            Book a discovery call to get a clear technical roadmap and
            fixed-price scope.
          </p>
          <Link href="/contact">
            <Button className="bg-brand-blue hover:bg-brand-blue-dark text-white font-space font-semibold px-6 rounded-xl">
              Discuss Your Project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default HowWeThinkSection;
