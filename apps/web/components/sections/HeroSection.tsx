"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { OrbitalServices } from "@/components/ui/OrbitalServices";
import Image from "next/image";

const phases = [
  { step: "01", title: "THINK", desc: "Understand the real business problem" },
  { step: "02", title: "BUILD", desc: "Create practical, scalable solutions" },
  {
    step: "03",
    title: "CONNECT",
    desc: "Bring tech, creativity & strategy together",
  },
  { step: "04", title: "GROW", desc: "Turn solutions into measurable ROI" },
];

export function HeroSection() {
  const [activePhase, setActivePhase] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    };

    checkReducedMotion();

    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % phases.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { left, top } = heroRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.09,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden py-12 lg:py-16 bg-gradient-to-b from-sky-50/40 via-background to-background dark:from-[#0B1F3A]/40 dark:via-background dark:to-background transition-colors duration-300 group"
    >
      {/* Background Ambience Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[8%] left-[10%] w-[500px] h-[500px] rounded-full bg-brand-blue/10 dark:bg-brand-blue/[0.08] blur-[120px]" />
        <div className="absolute bottom-[10%] right-[8%] w-[500px] h-[500px] rounded-full bg-brand-orange/10 dark:bg-brand-orange/[0.06] blur-[130px]" />
        <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full bg-brand-teal/10 dark:bg-brand-teal/[0.05] blur-[100px]" />
      </div>

      {/* Modern Engineering Dot Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Interactive Mouse Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 hidden lg:block"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,82,255,0.06), rgba(255,107,0,0.03), transparent 75%)`,
        }}
      />

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            {/* Value-Premium Eyebrow Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 shadow-[0_0_15px_rgba(0,82,255,0.15)] text-xs font-semibold text-brand-blue dark:text-blue-400 mb-5 font-space tracking-wide uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
              </span>
              <span>Value-Premium Technology &amp; AI Agency</span>
              <span className="text-muted-foreground/60 hidden sm:inline">
                &bull;
              </span>
              <span className="text-muted-foreground hidden sm:inline font-mono text-[10px]">
                AS-KB-001
              </span>
            </motion.div>

            {/* Main H1 Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-foreground leading-[1.12] mb-4 font-sora"
            >
              Engineered for Growth. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-blue via-[#2D8CFF] to-brand-teal bg-clip-text text-transparent">
                Scoped with Precision.
              </span>
            </motion.h1>

            {/* Subtext Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-[560px] font-manrope font-normal"
            >
              We empower modern businesses with high-velocity Next.js
              applications, custom AI automation agents, and direct booking
              systems that eliminate operational friction and scale revenues.
            </motion.p>

            {/* Interactive 4-Phase Growth Framework Strip (from Brand Kit) */}
            <motion.div
              variants={itemVariants}
              className="w-full mb-6 p-2.5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm shadow-sm"
            >
              <div className="flex items-center justify-between gap-1 sm:gap-2">
                {phases.map((p, idx) => {
                  const isActive = activePhase === idx;
                  return (
                    <button
                      key={p.step}
                      onClick={() => setActivePhase(idx)}
                      className={`flex-1 text-left px-2 sm:px-3 py-1.5 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                          : "hover:bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-mono font-bold ${
                            isActive ? "text-blue-100" : "text-brand-blue"
                          }`}
                        >
                          {p.step}
                        </span>
                        <span
                          className={`text-xs font-bold font-sora ${
                            isActive ? "text-white" : "text-foreground"
                          }`}
                        >
                          {p.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-2 pt-2 border-t border-border/40 px-2 flex items-center justify-between text-xs text-muted-foreground font-manrope">
                <span className="flex items-center gap-1.5 text-foreground/85 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                  {phases[activePhase]?.desc ??
                    "Understand the real business problem"}
                </span>
                <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground/70">
                  Step {(activePhase % phases.length) + 1} of 4
                </span>
              </div>
            </motion.div>

            {/* Dual CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto max-w-xs sm:max-w-none items-center justify-center lg:justify-start"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,107,0,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 h-12 px-7 rounded-xl text-sm font-space"
                >
                  Scope Your Project
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="/services" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-foreground border-border hover:border-brand-blue hover:text-brand-blue font-semibold h-12 px-7 rounded-xl text-sm transition-all duration-200 font-space bg-card/40 backdrop-blur-sm"
                >
                  Explore 14 Services
                </Button>
              </Link>
            </motion.div>

            {/* Live Trust & Verification Badges */}
            <motion.div
              variants={itemVariants}
              className="mt-7 pt-6 border-t border-border/50 w-full flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-muted-foreground font-manrope"
            >
              <div className="flex items-center gap-1.5 text-foreground font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Priced for Value &bull; Fixed Sprints</span>
              </div>
              <div className="flex items-center gap-1.5 text-foreground font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-blue shrink-0" />
                <span>30-Day Post-Launch Warranty</span>
              </div>
              <div className="flex items-center gap-1.5 text-foreground font-medium">
                <Zap className="w-4 h-4 text-brand-orange shrink-0" />
                <span>Zero Hidden Fees</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Orbital Services Graphic with Live Telemetry Cards */}
          <div className="hidden lg:col-span-5 lg:flex relative h-[520px] items-center justify-center">
            {/* Floating Top Telemetry Pill */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute top-2 right-4 z-20 bg-background/85 backdrop-blur-md border border-brand-blue/30 rounded-lg px-3 py-1.5 shadow-lg flex items-center gap-2 font-mono text-[11px]"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-foreground font-bold">
                SYSTEM SLA: 99.99%
              </span>
            </motion.div>

            {/* Floating Bottom Telemetry Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-4 left-4 z-20 bg-background/85 backdrop-blur-md border border-brand-orange/30 rounded-lg px-3 py-1.5 shadow-lg flex items-center gap-2 font-mono text-[11px]"
            >
              <span className="h-2 w-2 rounded-full bg-brand-orange animate-ping" />
              <span className="text-foreground font-bold">
                AVG LCP: &lt; 0.4s
              </span>
            </motion.div>

            {/* Central Orbital System */}
            <OrbitalServices />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
