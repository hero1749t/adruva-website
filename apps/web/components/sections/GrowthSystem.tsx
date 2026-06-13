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
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto bg-[#050A15] text-white rounded-[32px] relative overflow-hidden py-16 md:py-20 border border-white/5 shadow-2xl">
        {/* Premium Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 rounded-[32px]">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <Container className="relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-xs font-semibold text-brand-orange tracking-wider uppercase">
                Our Methodology
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-poppins mb-4">
              The Adruva{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">
                Growth System
              </span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-inter max-w-2xl">
              A proven, predictable 5-step framework we apply to scale modern
              businesses efficiently.
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="relative max-w-6xl mx-auto">
            {/* Desktop Horizontal Line */}
            <div className="hidden lg:block absolute top-[32px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-brand-orange/0 via-brand-orange/30 to-brand-orange/0" />

            {/* Mobile Vertical Line */}
            <div className="block lg:hidden absolute top-[32px] bottom-[32px] left-[31px] w-[2px] bg-gradient-to-b from-brand-orange/50 via-brand-orange/20 to-transparent" />

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
                    <div className="relative z-10 flex-shrink-0 mb-0 lg:mb-4 mr-4 lg:mr-0">
                      <div className="w-16 h-16 rounded-full bg-[#0A1428] border-2 border-brand-orange/30 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all duration-500 group-hover:border-brand-orange group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] group-hover:scale-110">
                        <div
                          className="absolute inset-0 rounded-full bg-brand-orange/10 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ animationDuration: "3s" }}
                        />
                        <Icon className="w-6 h-6 text-brand-orange relative z-10 transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      {/* Step Number Badge */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-brand-orange to-amber-600 flex items-center justify-center text-white text-[10px] font-bold shadow-lg border-2 border-[#050A15]">
                        {idx + 1}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 lg:text-center w-full mt-1 lg:mt-0 relative">
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-brand-orange/30 group-hover:-translate-y-1 h-full">
                        <h3 className="text-lg font-bold text-white mb-2 font-poppins group-hover:text-brand-orange transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed font-inter">
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
      </div>
    </section>
  );
}

export default GrowthSystem;
