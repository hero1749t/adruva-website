"use client";

import React from "react";
import { Container } from "@/components/layout/container";

const trustedBrands = [
  "Lura Cafe",
  "Dehradun Yoga Shala",
  "Adruva Resto System",
  "Charm Engine",
  "TT Retreats",
  "Vintage Tours & Travels",
  "Bali Yoga Institute",
  "Himalayan Wellness Co.",
];

export function LogoMarquee() {
  return (
    <section className="relative w-full py-12 bg-background border-b border-border/60 transition-colors duration-300">
      <Container>
        <div className="text-center mb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Trusted by businesses building what&apos;s next
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {trustedBrands.map((brand) => (
            <div
              key={brand}
              className="flex items-center gap-2 font-space text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl bg-slate-50 dark:bg-[#111720] border border-slate-200/60 dark:border-[#202936]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{brand}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default LogoMarquee;
