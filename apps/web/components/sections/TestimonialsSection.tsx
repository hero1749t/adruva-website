"use client";

import React from "react";
import { Container } from "@/components/layout/container";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const clientTestimonials = [
  {
    quote:
      "Building our online platform and booking engine with Adruva was transparent, fast, and completely painless. They don't just deliver code—they understand our business economics.",
    name: "Stephanie",
    role: "Founder",
    company: "Dehradun Yoga Shala",
    project: "Global Booking Engine & Local SEO",
    result: "4.2x Online Inquiries",
  },
  {
    quote:
      "The offline-first restaurant system designed by Adruva eliminated our daily billing headaches during peak hours. Zero downtime and seamless kitchen dispatch.",
    name: "Vivek Negi",
    role: "Managing Director",
    company: "Lura Cafe",
    project: "Adruva Resto Custom SaaS",
    result: "100% Billing Uptime",
  },
  {
    quote:
      "From technical search ranking to dynamic itinerary generation, Adruva transformed our tour business into a continuous inbound lead machine.",
    name: "Dinesh Singh",
    role: "Director",
    company: "Vintage Tours & Travels",
    project: "Dynamic Travel Portal & Ads",
    result: "#1 Google Ranking",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative w-full py-24 bg-slate-50/50 dark:bg-[#07090D] border-b border-border/60 transition-colors duration-300">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/20 mb-4 inline-block">
            VERIFIED PROOF
          </span>
          <h2 className="font-sora text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Client partnerships that scale.
          </h2>
          <p className="font-manrope text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            Here is what founders and enterprise operators say about engineering
            their digital products with Adruva Solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {clientTestimonials.map((t) => (
            <div
              key={t.name}
              className="p-8 rounded-3xl bg-white dark:bg-[#111720] border border-slate-200 dark:border-[#202936] flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>

                <p className="font-manrope text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div>
                <div className="p-3 rounded-xl bg-brand-blue/5 dark:bg-[#0D1118] border border-brand-blue/15 text-xs font-mono mb-4 flex items-center justify-between">
                  <span className="text-slate-500">{t.project}</span>
                  <span className="font-bold text-brand-blue">{t.result}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 text-brand-blue font-sora font-bold flex items-center justify-center text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-sora text-sm font-bold text-slate-900 dark:text-white">
                      {t.name}
                    </h4>
                    <span className="text-xs text-slate-500 font-manrope">
                      {t.role}, {t.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TestimonialsSection;
