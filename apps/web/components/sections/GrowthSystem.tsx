"use client";

import React, { useState, useEffect } from "react";
import {
  Target,
  MousePointerClick,
  Layers,
  Cpu,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Attract",
    description: "Targeted Google Ads, Meta Ads & data-driven SEO strategies.",
  },
  {
    number: "02",
    icon: MousePointerClick,
    title: "Convert",
    description:
      "High-performance websites and landing pages built to convert.",
  },
  {
    number: "03",
    icon: Layers,
    title: "Manage",
    description:
      "Custom CRM integrations to manage and organize inbound leads.",
  },
  {
    number: "04",
    icon: Cpu,
    title: "Automate",
    description: "AI-driven automated email/WhatsApp follow-ups and bookings.",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Scale",
    description:
      "Continuous optimization and campaigns built for compounding growth.",
  },
];

export function GrowthSystem() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-transparent transition-colors duration-300 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-orange/5 dark:bg-brand-orange/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/5 dark:bg-brand-blue/5 rounded-full blur-[120px]" />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-xs font-semibold text-brand-orange tracking-wider uppercase">
              Our Methodology
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-poppins mb-6 transition-colors">
            The Adruva{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">
              Growth System
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 font-inter max-w-2xl transition-colors">
            A proven, predictable 5-step framework we apply to scale modern
            businesses efficiently.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Horizontal Line */}
          <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-brand-orange/0 via-brand-orange/20 dark:via-brand-orange/30 to-brand-orange/0 transition-colors" />

          {/* Mobile Vertical Line */}
          <div className="block lg:hidden absolute top-[40px] bottom-[40px] left-[39px] w-[2px] bg-gradient-to-b from-brand-orange/30 dark:from-brand-orange/50 via-brand-orange/10 dark:via-brand-orange/20 to-transparent transition-colors" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6 relative"
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  className="relative flex flex-row lg:flex-col items-start lg:items-center group"
                >
                  {/* Glowing Node */}
                  <div className="relative z-10 flex-shrink-0 mb-0 lg:mb-6 mr-6 lg:mr-0">
                    <div className="w-20 h-20 rounded-full bg-white dark:bg-[#0A1428] border-2 border-slate-200 dark:border-brand-orange/30 flex items-center justify-center shadow-xl shadow-slate-200/50 dark:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all duration-500 group-hover:border-brand-orange group-hover:shadow-2xl group-hover:shadow-brand-orange/20 dark:group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] group-hover:scale-110">
                      <div
                        className="absolute inset-0 rounded-full bg-brand-orange/5 dark:bg-brand-orange/10 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ animationDuration: "3s" }}
                      />
                      <Icon className="w-8 h-8 text-slate-400 dark:text-brand-orange relative z-10 transition-colors duration-500 group-hover:text-brand-orange" />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-amber-600 flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white dark:border-[#050A15] transition-colors">
                      {idx + 1}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 lg:text-center w-full mt-2 lg:mt-0 relative">
                    <div
                      className={cn(
                        "p-6 rounded-3xl transition-all duration-500 h-full",
                        "bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] shadow-lg shadow-slate-200/30 dark:shadow-none",
                        "group-hover:bg-white dark:group-hover:bg-white/[0.04] group-hover:border-brand-orange/30 group-hover:shadow-xl group-hover:-translate-y-2",
                      )}
                    >
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-poppins group-hover:text-brand-orange transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed font-inter transition-colors">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default GrowthSystem;
