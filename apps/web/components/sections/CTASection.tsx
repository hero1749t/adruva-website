"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Phone,
  Mail,
} from "lucide-react";
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
  title = "Ready to Build Systems That Move Your Business Forward?",
  subtitle = "Book a 30-minute discovery session with our engineering leads. We define exact deliverables, architecture, and transparent fixed package pricing before any commitment is made.",
  primaryCTA = {
    text: "Scope Your Project",
    href: "/contact",
  },
  secondaryCTA = {
    text: "View 14 Services Catalog",
    href: "/services",
  },
}: CTASectionProps = {}) {
  return (
    <section className="relative w-full py-24 bg-[#081120] text-white overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#0D182E] to-[#081120] border border-brand-blue/30 p-8 md:p-14 text-center shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/40 text-xs font-semibold text-blue-400 font-space tracking-wide uppercase mb-6">
            {badge}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sora mb-6 leading-tight">
            {title.includes("Move Your Business") ? (
              <>
                Ready to Build Systems That{" "}
                <span className="bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
                  Move Your Business Forward?
                </span>
              </>
            ) : (
              title
            )}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-manrope max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link href={primaryCTA.href} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-bright text-white font-space font-semibold px-8 h-13 rounded-xl text-sm shadow-[0_4px_25px_rgba(0,102,255,0.4)]"
              >
                {primaryCTA.text}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link href={secondaryCTA.href} className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-white border-white/20 hover:border-brand-blue hover:bg-white/5 font-space font-semibold px-8 h-13 rounded-xl text-sm"
              >
                {secondaryCTA.text}
              </Button>
            </Link>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-manrope">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Fixed-Price Sprint Deliverables</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-blue" />
              <span>30-Day Post-Launch Bug Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-orange" />
              <span>No Hidden Fees • No Hourly Traps</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CTASection;
