"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { OrbitalServices } from "@/components/ui/OrbitalServices";
import Image from "next/image";

const words = ["Need.", "Trust.", "Choose."];

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    };

    checkReducedMotion();

    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { left, top } = heroRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
  };

  const calendlyUrl = "/contact";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden py-12 lg:py-16 bg-gradient-to-tr from-sky-50/50 via-white to-orange-50/30 dark:bg-none dark:bg-transparent transition-colors duration-300 group"
    >
      {/* Scope CSS animation variables for drifting background blobs */}
      <style>{`
        @keyframes bg-drift-1 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(50px, -40px) scale(1.15); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes bg-drift-2 {
          0% { transform: translate(0px, 0px) scale(1.1); }
          50% { transform: translate(-40px, 50px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1.1); }
        }
        .animate-bg-drift-1 {
          animation: bg-drift-1 22s infinite ease-in-out;
        }
        .animate-bg-drift-2 {
          animation: bg-drift-2 28s infinite ease-in-out;
        }
      `}</style>

      {/* Original Dark Mode Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none z-0 hidden dark:block" />

      {/* Radial fade to soften grid pattern around the center (light mode only) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,hsl(var(--background))/30%_100%)] pointer-events-none z-0 dark:hidden" />

      {/* Interactive Background Mouse Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,107,0,0.04), rgba(45,140,255,0.03), transparent 75%)`,
        }}
      />

      {/* Radial Glow Drifting Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-brand-orange/8 dark:bg-brand-orange/[0.04] blur-[90px] animate-bg-drift-1" />
        <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-brand-blue/8 dark:bg-brand-blue/[0.03] blur-[90px] animate-bg-drift-2" />
      </div>

      {/* Floating Particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <div className="particle bg-brand-orange/20 w-2 h-2 rounded-full absolute top-[15%] left-[8%] animate-float-slow" />
          <div className="particle bg-brand-blue/25 w-2.5 h-2.5 rounded-full absolute top-[45%] left-[6%] animate-float-medium" />
          <div className="particle bg-brand-orange/15 w-1.5 h-1.5 rounded-full absolute top-[70%] left-[12%] animate-float-fast" />
          <div className="particle bg-brand-blue/20 w-2 h-2 rounded-full absolute top-[25%] right-[10%] animate-float-slow" />
        </div>
      )}

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 shadow-[0_0_12px_rgba(255,107,0,0.15)] text-sm font-medium text-brand-orange mb-4"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
              </span>
              Now offering AI Automation & AI Ads
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12] sm:leading-[1.05] mb-4 font-poppins"
            >
              The Last Tech Partner <br className="hidden sm:inline" />
              You&apos;ll Ever{" "}
              <span className="inline-block min-w-[130px] text-brand-orange text-center lg:text-left">
                {prefersReducedMotion ? (
                  words[0]
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[currentWordIndex]}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="inline-block w-full"
                    >
                      {words[currentWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                )}
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl font-medium text-muted-foreground tracking-tight mb-3 font-space-grotesk"
            >
              Digital Growth Systems for Local Businesses & Beyond
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-[520px] font-inter"
            >
              From high-converting websites to customized AI-powered automation
              — we build and optimize digital workflows that attract customers,
              streamline growth, and scale your revenues honestly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-xs sm:max-w-none items-center justify-center lg:justify-start"
            >
              <a
                href={calendlyUrl}
                target={calendlyUrl.startsWith("http") ? "_blank" : undefined}
                rel={
                  calendlyUrl.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="group w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-white font-semibold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,107,0,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 h-12 px-7 rounded-full text-sm"
                >
                  Get a Free Audit
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>

              <Link href="/services" className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto text-foreground border border-border hover:border-brand-orange hover:text-brand-orange font-semibold h-12 px-7 rounded-full text-sm transition-all duration-200"
                >
                  View Services
                </Button>
              </Link>
            </motion.div>

            {/* Trusted By Section */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <div className="flex -space-x-3">
                {["dk", "lk", "nk", "sk"].map((avatar, i) => (
                  <div
                    key={avatar}
                    className="relative w-10 h-10 rounded-full border-2 border-background overflow-hidden"
                    style={{ zIndex: 10 - i }}
                  >
                    <Image
                      src={`/team/${avatar}.jpg`}
                      alt="Client Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="relative w-10 h-10 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-xs font-bold text-white z-0">
                  50+
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium font-inter">
                Trusted by{" "}
                <span className="text-foreground font-bold">
                  50+ Businesses
                </span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Orbital Services Graphic (Desktop Only) */}
          <div className="hidden lg:col-span-5 lg:flex relative h-[500px] items-center justify-center">
            <OrbitalServices />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
