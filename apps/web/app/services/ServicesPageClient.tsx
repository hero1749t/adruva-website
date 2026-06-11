'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Smartphone, 
  Terminal, 
  Cpu, 
  Sparkles, 
  Brain, 
  Search, 
  Megaphone, 
  TrendingUp, 
  Share2, 
  Mail, 
  Palette, 
  Image, 
  Video, 
  ChevronRight, 
  ArrowRight,
  Sparkle
} from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { services } from '@/lib/services-data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Smartphone,
  Terminal,
  Cpu,
  Sparkles,
  Brain,
  Search,
  Megaphone,
  TrendingUp,
  Share2,
  Mail,
  Palette,
  Image,
  Video,
};

const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'build', label: 'Build' },
  { id: 'automate', label: 'Automate' },
  { id: 'grow', label: 'Grow' },
  { id: 'design', label: 'Design' }
];

export function ServicesPageClient() {
  const [activeTab, setActiveTab] = useState('all');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const filteredServices = activeTab === 'all'
    ? services
    : services.filter(service => service.category === activeTab);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact';

  return (
    <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Floating Particles in Hero area */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 h-[450px]">
          <div className="particle bg-brand-orange/15 w-2.5 h-2.5 rounded-full absolute top-[20%] left-[8%] animate-[float-slow_7s_infinite_ease-in-out]" />
          <div className="particle bg-brand-blue/20 w-3 h-3 rounded-full absolute top-[40%] right-[10%] animate-[float-medium_9s_infinite_ease-in-out_1s]" />
          <div className="particle bg-brand-orange/10 w-2 h-2 rounded-full absolute top-[70%] left-[12%] animate-[float-fast_5s_infinite_ease-in-out_0.5s]" />
        </div>
      )}

      {/* Hero Header Section */}
      <Section className="pt-12 pb-6 md:pt-16 md:pb-8 relative z-10">
        <Container>
          {/* Visual Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-8 font-inter">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <span className="text-foreground font-semibold">Services</span>
          </nav>

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-semibold text-brand-orange mb-5 font-space-grotesk">
              <Sparkle className="h-3 w-3 fill-brand-orange text-brand-orange animate-pulse" />
              OUR SERVICES
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy dark:text-white mb-6 font-poppins">
              Scale, Automate & Grow
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl font-inter">
              Everything you need to attract customers, build products, and grow your business — all under one roof. Let&apos;s build something great.
            </p>
          </div>
        </Container>
      </Section>

      {/* Interactive Tabs Filter */}
      <Section className="py-6 relative z-10">
        <Container>
          <div className="flex justify-center border-b border-border/40 pb-px mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 p-1.5 bg-slate-50/50 dark:bg-white/5 rounded-2xl border border-slate-200/80 dark:border-white/5 max-w-full overflow-x-auto">
              {categories.map((category) => {
                const isActive = activeTab === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={cn(
                      'relative px-4 py-2 text-xs font-bold transition-all duration-300 rounded-xl font-space-grotesk focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50',
                      isActive 
                        ? 'text-white' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                  >
                    <span className="relative z-10">{category.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryIndicator"
                        className="absolute inset-0 bg-brand-orange rounded-xl -z-0 shadow-[0_4px_12px_rgba(255,107,0,0.25)]"
                        transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeTab} // Force re-render/animate on tab change
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => {
                const Icon = IconMap[service.iconName] || Code2;
                return (
                  <motion.div
                    key={service.slug}
                    layout={!prefersReducedMotion}
                    variants={cardVariants}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
                    whileHover={prefersReducedMotion ? {} : { y: -4 }}
                    className={cn(
                      'flex flex-col justify-between p-6 rounded-2xl border border-slate-200/80 dark:border-white/5 bg-card transition-all duration-300 min-h-[240px] group relative overflow-hidden',
                      'hover:border-brand-orange/40 dark:hover:border-brand-orange/40 hover:shadow-[0_12px_30px_-10px_rgba(255,107,0,0.12)] dark:hover:shadow-[0_12px_30px_-10px_rgba(255,107,0,0.25)]'
                    )}
                  >
                    <div>
                      {/* Top Row: Category Badge + Icon */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="inline-flex p-2.5 rounded-xl bg-brand-orange/10 text-brand-orange group-hover:scale-105 transition-transform duration-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted/40 px-2.5 py-1 rounded-full font-space-grotesk">
                          {service.category}
                        </span>
                      </div>

                      {/* Service Name */}
                      <h3 className="text-base font-bold text-brand-navy dark:text-white mb-2 font-poppins group-hover:text-brand-orange transition-colors">
                        {service.name}
                      </h3>

                      {/* Service Tagline */}
                      <p className="text-xs font-semibold text-brand-navy/70 dark:text-white/60 mb-2 font-space-grotesk italic">
                        &ldquo;{service.tagline}&rdquo;
                      </p>

                      {/* Service Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-inter">
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom Row: Price + Learn More */}
                    <div className="flex items-center justify-between border-t border-border/20 pt-4 mt-auto">
                      <span className="text-[11px] font-semibold text-brand-orange uppercase tracking-wider font-space-grotesk bg-brand-orange/5 px-2 py-0.5 rounded">
                        {service.price}
                      </span>
                      
                      <Link 
                        href={`/services/${service.slug}`}
                        className="text-xs font-bold text-brand-navy hover:text-brand-orange dark:text-white/80 dark:hover:text-brand-orange transition-colors flex items-center gap-1 font-inter"
                      >
                        Learn More
                        <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Section>

      {/* Bottom CTA Block */}
      <Section className="py-16 md:py-24 relative z-10 border-t border-border/20 mt-12">
        <Container>
          <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12 text-center bg-gradient-to-br from-brand-navy/5 to-brand-orange/5 border border-brand-orange/10 shadow-2xl relative overflow-hidden dark:from-black dark:to-brand-navy/30">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full filter blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/10 rounded-full filter blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3.5 py-1.5 rounded-full font-space-grotesk inline-block mb-4">
                NEED ADVICE?
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy dark:text-white mb-4 font-poppins">
                Not sure which service you need?
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8 font-inter">
                Book a free consultation — we&apos;ll review your current systems and tell you exactly what your business needs to scale. No sales pitch, just value.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={calendlyUrl}
                  target={calendlyUrl.startsWith('http') ? '_blank' : undefined}
                  rel={calendlyUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white font-bold h-12 px-6 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(255,107,0,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Book a Free Call
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full sm:w-auto text-brand-navy border border-brand-navy/15 hover:bg-muted dark:text-white dark:border-white/10 dark:hover:bg-white/5 font-bold h-12 px-6 rounded-lg text-xs"
                  >
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
