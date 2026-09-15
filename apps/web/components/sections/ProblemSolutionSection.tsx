"use client";

import React from "react";
import { Container } from "@/components/layout/container";
import {
  XCircle,
  CheckCircle2,
  ArrowRight,
  Layers,
  Unplug,
  Zap,
} from "lucide-react";

export function ProblemSolutionSection() {
  return (
    <section className="relative w-full py-24 bg-slate-50/50 dark:bg-[#07090D] border-b border-border/60 transition-colors duration-300">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/20 mb-4 inline-block">
            THE ARCHITECTURAL PROBLEM
          </span>
          <h2 className="font-sora text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Your business doesn&apos;t need more tools.{" "}
            <span className="text-brand-blue">
              It needs the right systems working together.
            </span>
          </h2>
          <p className="font-manrope text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Most businesses accumulate 10+ disjointed software subscriptions,
            freelancers, and ad accounts that never talk to each other. The
            result is data loss, slow operations, and wasted capital.
          </p>
        </div>

        {/* Side-by-Side Comparison: Fragmented vs Connected */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Fragmented Disconnected Stack */}
          <div className="p-8 rounded-3xl bg-red-500/[0.03] dark:bg-red-950/[0.1] border border-red-500/20 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center font-bold">
                  <Unplug className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-red-500 uppercase">
                    FRAGMENTED TOOLS
                  </span>
                  <h3 className="font-sora text-lg font-bold text-slate-900 dark:text-white">
                    The Disconnected Stack
                  </h3>
                </div>
              </div>

              <ul className="space-y-4 font-manrope text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Static Website &ne; CRM:</strong> Leads get trapped
                    in web forms without instant notifications.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>WhatsApp &ne; Booking:</strong> Manual copy-pasting
                    customer details across spreadsheets.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Ads &ne; Conversion Data:</strong> Running ad
                    campaigns without server-side CAPI event feedback.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Multiple Freelancers:</strong> Nobody takes holistic
                    responsibility for system uptime and performance.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-red-500/20 font-mono text-xs text-red-500 font-semibold">
              RESULT: HIGH OVERHEAD &bull; SLOW GROWTH &bull; MISSED REVENUE
            </div>
          </div>

          {/* Connected Adruva System */}
          <div className="p-8 rounded-3xl bg-brand-blue/[0.04] dark:bg-[#111720] border-2 border-brand-blue/40 rounded-2xl flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-brand-blue uppercase">
                    THE ADRUVA ADVANTAGE
                  </span>
                  <h3 className="font-sora text-lg font-bold text-slate-900 dark:text-white">
                    Unified System Architecture
                  </h3>
                </div>
              </div>

              <ul className="space-y-4 font-manrope text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct Database Sync:</strong> Next.js frontend
                    directly pipes high-intent leads into automated workflows.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                  <span>
                    <strong>24/7 AI Qualification:</strong> WhatsApp agents
                    auto-qualify prospects & schedule calendar bookings.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                  <span>
                    <strong>Full Attribution:</strong> Meta & Google Ads
                    optimized on real revenue conversions via server APIs.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                  <span>
                    <strong>Single Engineering Partner:</strong> Guaranteed
                    SLAs, 30-day post-launch warranty, and zero finger-pointing.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-brand-blue/20 font-mono text-xs text-brand-blue font-semibold">
              RESULT: SCALABLE TECHNOLOGY &bull; AUTOMATED REVENUE &bull;
              CONFIDENCE
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProblemSolutionSection;
