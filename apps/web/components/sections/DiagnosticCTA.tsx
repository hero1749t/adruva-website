"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function DiagnosticCTA() {
  return (
    <section className="relative w-full py-20 bg-background border-b border-border/60 transition-colors duration-300">
      <Container>
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-brand-blue/10 via-brand-teal/10 to-brand-blue/5 border border-brand-blue/20 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-brand-blue font-mono text-xs font-semibold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Not sure what to build?</span>
            </div>
            <h3 className="font-sora text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              You don&apos;t need to know what to build.
            </h3>
            <p className="font-manrope text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Tell us what isn&apos;t working in your current operations or
              marketing. We&apos;ll diagnose the bottleneck and architect the
              exact solution for you.
            </p>
          </div>

          <Link href="/contact" className="shrink-0 w-full md:w-auto">
            <Button
              size="lg"
              className="w-full md:w-auto bg-brand-blue hover:bg-brand-blue-dark text-white font-space font-semibold px-8 h-12 rounded-xl text-sm shadow-lg hover:scale-105 transition-all"
            >
              Talk to an Expert
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default DiagnosticCTA;
