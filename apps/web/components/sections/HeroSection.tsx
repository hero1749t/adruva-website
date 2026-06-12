'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, TrendingUp, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';

const words = ['Need.', 'Trust.', 'Choose.'];

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };

    checkReducedMotion();

    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact';

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
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden py-12 lg:py-16 bg-transparent transition-colors duration-300">
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Radial Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(255,107,0,0.06)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-[5%] right-[5%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(45,140,255,0.04)_0%,transparent_70%)] blur-3xl" />
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
              You&apos;ll Ever{' '}
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
                      transition={{ duration: 0.3, ease: 'easeOut' }}
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
              From high-converting websites to customized AI-powered automation — we build and optimize digital workflows that attract customers, streamline growth, and scale your revenues honestly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-xs sm:max-w-none items-center justify-center lg:justify-start"
            >
              <a
                href={calendlyUrl}
                target={calendlyUrl.startsWith('http') ? '_blank' : undefined}
                rel={calendlyUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
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
          </motion.div>

          {/* Right Column: Floating Dashboard Cards (Desktop Only) */}
          <div className="hidden lg:col-span-5 lg:flex relative h-[380px] items-center justify-center">
            
            {/* Background blob for mockups */}
            <div className="absolute w-[320px] h-[320px] rounded-full bg-brand-orange/5 blur-3xl z-0" />
            
            {/* Card 1: 15+ Projects */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute top-2 left-2 w-44 p-3.5 rounded-2xl bg-card border border-border shadow-lg flex items-center gap-3 z-10 hover:border-brand-orange/40 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-2 rounded-xl bg-green-500/10 text-green-500 shrink-0">
                <CheckCircle2 className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-foreground font-poppins">15+</span>
                <span className="text-[10px] text-muted-foreground font-inter">Projects Delivered</span>
              </div>
            </motion.div>

            {/* Card 2: 100% On-time */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute top-28 right-0 w-48 p-3.5 rounded-2xl bg-card border border-border shadow-lg flex flex-col gap-1.5 z-20 hover:border-brand-orange/40 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue shrink-0">
                  <TrendingUp className="h-4.5 w-4.5" />
                </div>
                <span className="text-[9px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-full font-inter">+24% MoM</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-foreground font-poppins">100%</span>
                <span className="text-[10px] text-muted-foreground font-inter">On-Time Delivery</span>
              </div>
            </motion.div>

            {/* Card 3: AI Automation */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute bottom-2 left-6 w-48 p-3.5 rounded-2xl bg-card border border-border shadow-lg flex items-center gap-3 z-30 hover:border-brand-orange/40 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-2 rounded-xl bg-brand-orange/10 text-brand-orange shrink-0">
                <Cpu className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground font-poppins">AI Automation</span>
                <span className="text-[10px] text-muted-foreground font-inter">Systems Integrated</span>
              </div>
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
