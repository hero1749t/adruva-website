"use client";

import React from "react";
import { Container } from "@/components/layout/container";
import { ShieldCheck, Cpu, Zap, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Radical Clarity",
    desc: "No ambiguity, no hidden scope, and no surprise invoices. We define deliverables, timelines, and fixed costs upfront before any commitment is made.",
    badge: "01 CLARITY",
  },
  {
    icon: Cpu,
    title: "Technical Excellence",
    desc: "We build systems properly, not merely quickly. Modern typed architectures (Next.js, NestJS, Prisma), secure databases, and sub-second page performance.",
    badge: "02 QUALITY",
  },
  {
    icon: Zap,
    title: "Intelligent Growth",
    desc: "Technology must serve a tangible commercial outcome. We engineer systems with behavioral psychology and conversion data to drive real pipeline revenue.",
    badge: "03 OUTCOME",
  },
  {
    icon: Users,
    title: "Responsible Partnership",
    desc: "Clients are long-term relationships, not one-off transactions. We protect client interests, provide 30-day post-launch warranty, and own solutions end-to-end.",
    badge: "04 OWNERSHIP",
  },
];

export function BrandPositioningSection() {
  return (
    <section className="relative w-full py-24 bg-background dark:bg-[#081120] transition-colors duration-300 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-xs font-semibold text-brand-blue font-space tracking-wide uppercase mb-4">
              Strategic Market Position
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-sora mb-6 leading-tight">
              Closing the Gap Between Freelancers &amp; Bloated Agencies.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed font-manrope mb-6">
              Adruva originated from a straightforward observation: growing
              businesses kept facing the same impossible choice — inconsistent,
              fragmented providers on one side, slow and bureaucratic agencies
              on the other.
            </p>
            <p className="text-base text-foreground/90 font-medium leading-relaxed font-manrope">
              Adruva was built to close that gap: to make{" "}
              <span className="text-brand-blue font-bold">
                enterprise-grade technology, AI automation and growth capability
              </span>{" "}
              accessible to businesses that are too ambitious for the first
              option, and too early for the second.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link href="/contact">
                <Button className="bg-brand-blue hover:bg-brand-blue-bright text-white font-space font-semibold px-6 h-11 rounded-xl text-sm">
                  Work With Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="font-space font-semibold px-6 h-11 rounded-xl text-sm border-border hover:border-brand-blue"
                >
                  Our Philosophy
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-5 rounded-2xl bg-card/60 dark:bg-[#0D182E]/80 border border-border/80 hover:border-brand-blue/40 shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[9.5px] font-bold text-brand-blue">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground font-sora mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-manrope">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BrandPositioningSection;
