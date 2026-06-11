'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';

const words = ['Need.', 'Trust.', 'Choose.'];

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preferences for reduced motion on client mount
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };

    checkReducedMotion();

    // Set up text cycling interval (every 2.5s)
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact';

  // Entrance variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-16 md:py-28 bg-transparent transition-colors duration-300">
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Blurry Glow Orbs */}
      <div className="glow-orb bg-brand-orange/10 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] -top-[10%] -left-[10%]" />
      <div className="glow-orb bg-brand-blue/10 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bottom-[10%] -right-[5%]" />

      {/* Floating Particles Background */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <div className="particle bg-brand-orange/20 w-3 h-3 rounded-full absolute top-[15%] left-[10%] animate-[float-slow_6s_infinite_ease-in-out]" />
          <div className="particle bg-brand-blue/25 w-4 h-4 rounded-full absolute top-[45%] left-[8%] animate-[float-medium_8s_infinite_ease-in-out_1s]" />
          <div className="particle bg-brand-orange/15 w-2 h-2 rounded-full absolute top-[70%] left-[15%] animate-[float-fast_5s_infinite_ease-in-out_0.5s]" />
          <div className="particle bg-brand-blue/20 w-2.5 h-2.5 rounded-full absolute top-[25%] right-[12%] animate-[float-slow_7s_infinite_ease-in-out_2s]" />
          <div className="particle bg-brand-orange/25 w-4 h-4 rounded-full absolute top-[60%] right-[10%] animate-[float-medium_9s_infinite_ease-in-out_1.5s]" />
          <div className="particle bg-brand-blue/15 w-3 h-3 rounded-full absolute top-[80%] right-[18%] animate-[float-fast_6s_infinite_ease-in-out_0.8s]" />
        </div>
      )}

      {/* Inline style for particle animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(15px) translateX(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(-5px); }
        }
      `}} />

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-semibold text-brand-orange mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            Now offering AI Automation & AI Ads
          </motion.div>

          {/* Heading (Poppins) */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-navy dark:text-white leading-[1.1] mb-6 max-w-2xl font-poppins"
          >
            The Last Tech Partner <br className="hidden sm:inline" />
            You&apos;ll Ever{' '}
            <span className="inline-block min-w-[150px] text-brand-orange">
              {prefersReducedMotion ? (
                words[0]
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[currentWordIndex]}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="inline-block"
                  >
                    {words[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              )}
            </span>
          </motion.h1>

          {/* Subtext (Space Grotesk) */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl font-medium text-brand-orange tracking-tight mb-4 font-space-grotesk"
          >
            Digital Growth Systems for Local Businesses & Beyond
          </motion.p>

          {/* Description Paragraph (Inter) */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-xl font-inter"
          >
            From high-converting websites to customized AI-powered automation — we build and optimize digital workflows that attract customers, streamline growth, and scale your revenues honestly.
          </motion.p>

          {/* CTA Buttons Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center"
          >
            <a
              href={calendlyUrl}
              target={calendlyUrl.startsWith('http') ? '_blank' : undefined}
              rel={calendlyUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(255,107,0,0.25)] orange-glow-hover hover:scale-[1.02] active:scale-[0.98] h-12 px-6 rounded-lg text-sm"
              >
                Get a Free Audit
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>

            <Link href="/services" className="w-full sm:w-auto">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto text-brand-navy border border-brand-navy/15 hover:bg-muted dark:text-white dark:border-white/10 dark:hover:bg-white/5 font-semibold h-12 px-6 rounded-lg text-sm"
              >
                View Services
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default HeroSection;
