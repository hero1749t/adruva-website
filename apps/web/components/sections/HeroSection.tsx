"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Cpu,
  TrendingUp,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

const systemNodes = [
  {
    id: "tech",
    title: "TECHNOLOGY",
    badge: "ENGINEERING",
    icon: Code2,
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-brand-blue/30 group-hover:border-brand-blue",
    text: "text-brand-blue",
    capabilities: [
      "Websites & PWAs",
      "Mobile Apps (iOS/Android)",
      "SaaS & Custom Software",
      "APIs & Core Integrations",
    ],
    metric: "0.4s Median LCP",
  },
  {
    id: "ai",
    title: "AI & AUTOMATION",
    badge: "INTELLIGENCE",
    icon: Cpu,
    color: "from-teal-500/20 to-teal-600/10",
    border: "border-brand-teal/30 group-hover:border-brand-teal",
    text: "text-brand-teal",
    capabilities: [
      "Autonomous AI Agents",
      "WhatsApp CRM Automation",
      "Enterprise RAG & LLMs",
      "Workflow Orchestration",
    ],
    metric: "80%+ Ops Automated",
  },
  {
    id: "growth",
    title: "GROWTH & CREATIVE",
    badge: "SCALE & BRAND",
    icon: TrendingUp,
    color: "from-indigo-500/20 to-indigo-600/10",
    border: "border-indigo-500/30 group-hover:border-indigo-500",
    text: "text-indigo-400",
    capabilities: [
      "Technical SEO & Local 3-Pack",
      "CAPI Performance Ads",
      "UI/UX Design Systems",
      "Creative Conversion Media",
    ],
    metric: "3.2x Average ROI",
  },
];

export function HeroSection() {
  const [activeNode, setActiveNode] = useState<string>("tech");

  const selectedNode =
    systemNodes.find((n) => n.id === activeNode) || systemNodes[0];

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 bg-background text-foreground transition-colors duration-300">
      {/* Precision Engineering Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0878F9_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] dark:opacity-[0.08] pointer-events-none" />

      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-blue/5 dark:bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 w-full">
        {/* Top Text Group */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 lg:mb-16">
          {/* Positioning Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-[#111720] border border-slate-200 dark:border-[#202936] text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span>Technology &bull; AI Systems &bull; Digital Growth</span>
          </motion.div>

          {/* Flagship Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sora text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
          >
            We Build the Systems Behind{" "}
            <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-blue bg-clip-text text-transparent">
              Growing Businesses.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-manrope text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8"
          >
            Digital products, custom software, AI, automation, growth and
            creative—connected around the way your business actually works.
          </motion.p>

          {/* Dual Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-dark text-white font-space font-semibold px-8 h-12 rounded-xl text-sm shadow-[0_4px_20px_rgba(8,120,249,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link href="/work" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-space font-semibold px-8 h-12 rounded-xl text-sm border-slate-300 dark:border-slate-700 hover:border-brand-blue hover:bg-slate-100 dark:hover:bg-[#111720] transition-colors"
              >
                Explore Our Work
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Dynamic Adruva System Map / Interactive Architecture Visual */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto rounded-3xl bg-slate-50/80 dark:bg-[#0D1118]/80 border border-slate-200/80 dark:border-[#202936] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {/* Interactive Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-[#202936] text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>ADRUVA SYSTEM ARCHITECTURE // CONNECTED CORE</span>
            </div>
            <span className="text-[11px] text-brand-blue font-semibold uppercase">
              Hover / Select Nodes to Inspect Capabilities
            </span>
          </div>

          {/* Node Map Layout */}
          <div className="py-8">
            {/* Top Node: Business Core */}
            <div className="flex justify-center mb-6">
              <div className="px-6 py-3 rounded-2xl bg-white dark:bg-[#111720] border-2 border-brand-blue/40 dark:border-brand-blue/50 text-center shadow-md">
                <span className="block text-[10px] font-mono uppercase font-bold text-brand-blue">
                  ORIGIN
                </span>
                <span className="font-sora font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  AMBITIOUS BUSINESS GOALS & OPERATIONS
                </span>
              </div>
            </div>

            {/* Connecting Vertical Stem */}
            <div className="w-0.5 h-6 bg-gradient-to-b from-brand-blue to-slate-400 dark:to-slate-600 mx-auto" />

            {/* 3 Interactive Connected Division Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              {systemNodes.map((node) => {
                const Icon = node.icon;
                const isSelected = activeNode === node.id;
                return (
                  <button
                    key={node.id}
                    onMouseEnter={() => setActiveNode(node.id)}
                    onClick={() => setActiveNode(node.id)}
                    className={`group relative p-5 rounded-2xl text-left transition-all duration-300 border backdrop-blur-md ${
                      isSelected
                        ? "bg-white dark:bg-[#111720] border-brand-blue shadow-lg scale-[1.02]"
                        : "bg-slate-100/70 dark:bg-[#0D1118]/60 border-slate-200 dark:border-[#202936] hover:border-slate-400 dark:hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${node.color} ${node.text}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {node.badge}
                      </span>
                    </div>

                    <h3 className="font-sora text-sm font-bold text-slate-900 dark:text-white mb-2">
                      {node.title}
                    </h3>

                    <ul className="space-y-1.5 mb-4">
                      {node.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-manrope"
                        >
                          <span className="w-1 h-1 rounded-full bg-brand-blue" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-500">Benchmark</span>
                      <span className="font-bold text-brand-blue">
                        {node.metric}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Connecting Vertical Stem */}
            <div className="w-0.5 h-6 bg-gradient-to-b from-slate-400 dark:from-slate-600 to-emerald-500 mx-auto" />

            {/* Bottom Node: Outcomes */}
            <div className="flex justify-center mt-2">
              <div className="px-6 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <div className="text-left">
                  <span className="block text-[10px] font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400">
                    VERIFIED DELIVERABLES
                  </span>
                  <span className="font-sora font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    High-Converting Revenue Infrastructure &bull; Zero
                    Operational Overhead
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default HeroSection;
