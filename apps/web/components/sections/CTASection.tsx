"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, Zap } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export interface CTASectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export function CTASection({
  badge = "Priced for Value • Delivered Without Surprises",
  title = "LET'S BUILD SOMETHING THAT MATTERS.",
  subtitle = "From initial architecture to full-scale deployment, let's turn your business objectives into production-grade systems with transparent pricing and SLA guarantees.",
  primaryCTA = {
    text: "Start a Project",
    href: "/contact",
  },
  secondaryCTA = {
    text: "View 14 Services",
    href: "/services",
  },
}: CTASectionProps = {}) {
  return (
    <section className="relative w-full py-24 bg-background border-b border-border/60 transition-colors duration-300 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 dark:bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-50 dark:bg-[#111720] border-2 border-brand-blue/30 p-8 md:p-14 text-center shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-xs font-semibold text-brand-blue font-space tracking-wide uppercase mb-6">
            {badge}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sora mb-6 leading-tight text-slate-900 dark:text-white">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-manrope max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link href={primaryCTA.href} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-dark text-white font-space font-semibold px-8 h-12 rounded-xl text-sm shadow-[0_4px_20px_rgba(8,120,249,0.35)]"
              >
                {primaryCTA.text}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link href={secondaryCTA.href} className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-slate-300 dark:border-slate-700 hover:border-brand-blue font-space font-semibold px-8 h-12 rounded-xl text-sm"
              >
                {secondaryCTA.text}
              </Button>
            </Link>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-manrope">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Fixed-Price Sprint Deliverables</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-blue" />
              <span>30-Day Post-Launch Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-blue" />
              <span>No Hidden Fees &bull; No Hourly Traps</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CTASection;
