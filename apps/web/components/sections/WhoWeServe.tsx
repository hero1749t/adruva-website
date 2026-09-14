"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/container";
import {
  Building2,
  Compass,
  Laptop,
  Hospital,
  Briefcase,
  Factory,
  Home,
  Landmark,
  Utensils,
  ShoppingCart,
  Truck,
  Dumbbell,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const bands = [
  {
    title: "Band 1: Premium Priority Sectors",
    badge: "CORE FOCUS",
    sectors: [
      {
        name: "Hotels, Resorts & Luxury Stays",
        icon: Building2,
        desc: "Direct booking engines, zero OTA commission, guest WhatsApp CRM.",
      },
      {
        name: "Yoga, Retreats & Wellness Centers",
        icon: Compass,
        desc: "High-ticket retreat funnels, multi-currency checkout, serene UI.",
      },
      {
        name: "Technology, Startups & SaaS",
        icon: Laptop,
        desc: "Fast Next.js MVPs, full-stack React Native apps, scalable APIs.",
      },
      {
        name: "Real Estate & Property Developers",
        icon: Home,
        desc: "High-conversion lead capture funnels, virtual tours, automated routing.",
      },
    ],
  },
  {
    title: "Band 2: High Priority Enterprise Sectors",
    badge: "HIGH GROWTH",
    sectors: [
      {
        name: "Healthcare & Specialist Clinics",
        icon: Hospital,
        desc: "Patient appointment portals, HIPAA-conscious forms, local SEO 3-Pack.",
      },
      {
        name: "Professional Corporate B2B Services",
        icon: Briefcase,
        desc: "Authority branding, corporate Next.js platforms, client portals.",
      },
      {
        name: "Manufacturing & Industrial Trade",
        icon: Factory,
        desc: "B2B catalog systems, inquiry databases, international SEO.",
      },
      {
        name: "Finance, Insurance & Fintech",
        icon: Landmark,
        desc: "Secure portal architectures, compliance document AI, high trust.",
      },
    ],
  },
];

export function WhoWeServe() {
  const [activeBand, setActiveBand] = useState(0);

  return (
    <section className="relative w-full py-24 bg-background-secondary/30 dark:bg-[#060D1A] border-y border-border/60 transition-colors duration-300">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-xs font-semibold text-brand-blue font-space tracking-wide uppercase mb-4">
            Ideal Customer Profile &bull; 20 Strategic Verticals
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-sora mb-4">
            Tailored Engineering for{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
              High-Growth Industries.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-manrope">
            We partner with ambitious SMEs (5–150 employees) that value speed,
            certainty, and tangible commercial impact.
          </p>
        </div>

        {/* Priority Bands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bands.map((band) => (
            <div
              key={band.title}
              className="p-7 rounded-2xl bg-card dark:bg-[#0A1428] border border-border/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
                  <h3 className="text-lg font-bold text-foreground font-sora">
                    {band.title}
                  </h3>
                  <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded bg-brand-blue/10 border border-brand-blue/30 text-brand-blue">
                    {band.badge}
                  </span>
                </div>

                <div className="space-y-4">
                  {band.sectors.map((sec) => {
                    const Icon = sec.icon;
                    return (
                      <div
                        key={sec.name}
                        className="p-4 rounded-xl bg-background-secondary/40 dark:bg-[#0D1932] border border-border/40 flex items-start gap-3.5 hover:border-brand-blue/40 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-sora font-bold text-sm text-foreground">
                            {sec.name}
                          </div>
                          <div className="font-manrope text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {sec.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-manrope">
                  Full custom scoping available
                </span>
                <Link
                  href="/contact"
                  className="font-space text-xs font-semibold text-brand-blue flex items-center gap-1 hover:underline"
                >
                  Discuss Your Sector <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WhoWeServe;
