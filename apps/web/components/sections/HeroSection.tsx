"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Cpu,
  TrendingUp,
  Palette,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Activity,
  Terminal,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import Image from "next/image";

const departmentTabs = [
  {
    id: "tech",
    num: "01",
    label: "Technology",
    icon: Code2,
    title: "Custom Next.js & SaaS Platforms",
    desc: "Typed SSR/SSG architectures, mobile apps (React Native), and custom database-driven portals built for zero latency.",
    metrics: [
      { label: "LCP PageSpeed", val: "< 0.4s" },
      { label: "SLA Uptime", val: "99.99%" },
      { label: "Stack", val: "Next.js 14 / NestJS" },
    ],
    tags: ["Web Apps", "Mobile", "SaaS", "E-Commerce"],
  },
  {
    id: "ai",
    num: "02",
    label: "AI Automation",
    icon: Cpu,
    title: "Autonomous Agents & Enterprise RAG",
    desc: "24/7 intelligent customer workflows, WhatsApp CRM auto-qualification, and document intelligence systems.",
    metrics: [
      { label: "Task Automation", val: "80%+" },
      { label: "Response Time", val: "< 2.0s" },
      { label: "Model Stack", val: "LangChain / RAG" },
    ],
    tags: ["AI Agents", "WhatsApp CRM", "Document AI", "Workflows"],
  },
  {
    id: "growth",
    num: "03",
    label: "Marketing",
    icon: TrendingUp,
    title: "Technical SEO & Performance Pipelines",
    desc: "Google Maps 3-Pack domination, programmatic organic search scaling, and CAPI server-side performance ads.",
    metrics: [
      { label: "Pipeline ROI", val: "+340%" },
      { label: "Local Rank", val: "Top 3 Pack" },
      { label: "Analytics", val: "GA4 / CAPI Sync" },
    ],
    tags: ["Local SEO", "Google Ads", "Meta Ads", "Klaviyo CRM"],
  },
  {
    id: "design",
    num: "04",
    label: "Creative",
    icon: Palette,
    title: "High-Conversion UI/UX & Identity",
    desc: "Visual identity systems, Figma design-to-code components, investor pitch decks, and kinetic SaaS motion videos.",
    metrics: [
      { label: "Design Quality", val: "Awwwards Std" },
      { label: "Conversion Lift", val: "3.2x Avg" },
      { label: "Deliverables", val: "Figma + Tokens" },
    ],
    tags: ["UI/UX", "Brand Systems", "Motion Video", "Pitch Decks"],
  },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden py-16 lg:py-24 bg-[#081120] text-white transition-colors duration-300">
      {/* Brand Kit Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-brand-blue/15 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[550px] h-[550px] rounded-full bg-brand-teal/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[35%] w-[350px] h-[350px] rounded-full bg-brand-orange/5 blur-[120px]" />
      </div>

      {/* Engineering Precision Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <Container className="relative z-10 w-full">
        {/* Top Header Group */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 lg:mb-16">
          {/* Official Value-Premium Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/40 shadow-[0_0_20px_rgba(0,102,255,0.25)] text-xs font-semibold text-blue-400 mb-6 font-space tracking-wider uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
            </span>
            <span>Technology &amp; Digital Growth Partner</span>
            <span className="text-white/30">&bull;</span>
            <span className="text-white/70 font-mono text-[10px]">
              AS-KB-001
            </span>
          </motion.div>

          {/* Grand H1 Headline in Sora */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight text-white leading-[1.08] mb-6 font-sora"
          >
            Engineered for Growth. <br />
            <span className="bg-gradient-to-r from-brand-blue via-blue-400 to-brand-teal bg-clip-text text-transparent">
              Scoped with Precision.
            </span>
          </motion.h1>

          {/* Subtext Description in Manrope */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-manrope font-normal mb-8"
          >
            Adruva Solution is a single accountable partner for ambitious
            businesses — combining{" "}
            <span className="text-white font-semibold">
              Engineering, AI Automation, Marketing, and Creative
            </span>{" "}
            as one integrated system built to scale revenues.
          </motion.p>

          {/* Dual Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center"
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-bright text-white font-semibold flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(0,102,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 h-13 px-8 rounded-xl text-sm font-space"
              >
                Scope Your Project
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/services" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-white border-white/20 hover:border-brand-blue hover:bg-white/5 font-semibold h-13 px-8 rounded-xl text-sm transition-all duration-200 font-space backdrop-blur-md"
              >
                Explore 14 Services
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* BESPOKE DEVICE & INTERACTIVE SYSTEM SHOWCASE (Mockup) */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative max-w-5xl mx-auto rounded-2xl border border-white/10 bg-[#0B172C]/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Window Title Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#081120]/80">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="font-mono text-xs text-slate-400 ml-2 hidden sm:inline">
                adruvasolution.com // ENTERPRISE SYSTEM HUB
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SLA: 99.99% ONLINE</span>
            </div>
          </div>

          {/* 4 Interactive Department Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10 bg-[#070D1A]/60">
            {departmentTabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2.5 px-4 py-3.5 text-left transition-all duration-200 border-r border-white/5 last:border-r-0 ${
                    isActive
                      ? "bg-brand-blue/20 text-white border-b-2 border-b-brand-blue"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${isActive ? "text-brand-blue" : "text-slate-400"}`}
                  />
                  <div>
                    <span className="block font-mono text-[9px] text-brand-blue font-bold">
                      {tab.num}
                    </span>
                    <span className="block font-sora text-xs font-bold truncate">
                      {tab.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Department Detail Display */}
          <div className="p-6 md:p-8">
            {(() => {
              const currentDept = (departmentTabs[activeTab] ??
                departmentTabs[0])!;
              return (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDept.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                  >
                    <div className="lg:col-span-7">
                      <div className="inline-flex items-center gap-2 font-mono text-xs text-brand-blue font-bold uppercase mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>DIVISION {currentDept.num} ACTIVE</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-sora text-white mb-3">
                        {currentDept.title}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed font-manrope mb-6">
                        {currentDept.desc}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {currentDept.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                      {currentDept.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between"
                        >
                          <span className="text-xs text-slate-400 font-manrope">
                            {m.label}
                          </span>
                          <span className="font-mono text-sm font-bold text-brand-blue">
                            {m.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              );
            })()}
          </div>

          {/* Live System Footer */}
          <div className="px-6 py-3.5 border-t border-white/10 bg-[#060B14] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-manrope">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Transparent Package Pricing (AS-KB-001)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-blue" />
              <span>30-Day Post-Launch Warranty Included</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-brand-orange">
              <span>ZERO COMMODITY SPAGHETTI CODE</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default HeroSection;
