"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/container";
import {
  BrainCircuit,
  Hammer,
  Network,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    phase: "THINK",
    icon: BrainCircuit,
    title: "Understand the Real Problem",
    desc: "We diagnose operational bottlenecks, revenue leaks, and user friction before writing a single line of code. We scope with precision.",
    color: "text-brand-blue",
    border: "border-brand-blue/30",
  },
  {
    number: "02",
    phase: "BUILD",
    icon: Hammer,
    title: "Create Scalable Solutions",
    desc: "We engineer production-grade Next.js web applications, mobile apps, and custom AI systems designed to perform without technical debt.",
    color: "text-brand-teal",
    border: "border-brand-teal/30",
  },
  {
    number: "03",
    phase: "CONNECT",
    icon: Network,
    title: "Unify Tech, Creative & Strategy",
    desc: "We integrate payment gateways, WhatsApp CRM automations, and tracking pipelines so your entire digital ecosystem works as one unified engine.",
    color: "text-brand-blue-bright",
    border: "border-blue-400/30",
  },
  {
    number: "04",
    phase: "GROW",
    icon: TrendingUp,
    title: "Deliver Meaningful ROI",
    desc: "We turn technology into commercial pipeline. Technical SEO, high-converting checkout funnels, and continuous conversion optimization.",
    color: "text-brand-blue",
    border: "border-brand-blue/30",
  },
];

export function GrowthSystem() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative w-full py-24 bg-background-secondary/30 dark:bg-[#060D1A] border-y border-border/60 transition-colors duration-300">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-xs font-semibold text-brand-blue font-space tracking-wide uppercase mb-4">
            The Thinking Behind Adruva
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-sora mb-4">
            We believe growth is{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
              engineered — not delivered.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-manrope">
            Through the right combination of Technology, Creativity &amp;
            Strategy.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="relative p-6 rounded-2xl bg-card dark:bg-[#0A1428] border border-border/70 hover:border-brand-blue/40 shadow-sm hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-extrabold text-muted-foreground tracking-widest">
                      {step.number} — {step.phase}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 dark:bg-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-foreground font-sora mb-2 group-hover:text-brand-blue transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-manrope">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-border/40 flex items-center justify-between font-mono text-[11px] text-brand-blue">
                  <span>Phase {step.number}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Brand Kit Bottom Slogan Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-brand-blue/15 via-brand-teal/10 to-brand-blue/15 border border-brand-blue/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <Sparkles className="w-6 h-6 text-brand-blue shrink-0 hidden sm:block" />
            <div>
              <div className="text-base sm:text-lg font-bold text-foreground font-sora">
                We build systems that move businesses forward.
              </div>
              <div className="text-xs text-muted-foreground font-manrope">
                From high-converting web apps to autonomous AI agents and CRM
                pipelines.
              </div>
            </div>
          </div>
          <Link href="/contact" className="shrink-0 w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-bright text-white font-space font-semibold px-6 h-11 rounded-xl text-sm">
              Scope Your Solution
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default GrowthSystem;
