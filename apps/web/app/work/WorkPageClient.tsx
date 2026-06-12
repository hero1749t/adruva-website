'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, Sparkle } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { CTASection } from '@/components/sections/CTASection';
import { projects } from '@/lib/work-data';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'All Categories' },
  { id: 'build', label: 'Build' },
  { id: 'automate', label: 'Automate' },
  { id: 'grow', label: 'Grow' },
  { id: 'design', label: 'Design' }
];

const industries = [
  { id: 'all', label: 'All Industries' },
  { id: 'technology', label: 'Technology' },
  { id: 'education', label: 'Education' },
  { id: 'retail', label: 'Retail' },
  { id: 'healthcare', label: 'Healthcare' }
];

export function WorkPageClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesIndustry = activeIndustry === 'all' || project.industry === activeIndustry;
    return matchesCategory && matchesIndustry;
  });

  const fadeInUp = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* a) Hero Section */}
      <Section className="pt-12 pb-6 md:pt-16 md:pb-8 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.04)_0%,transparent_70%)] pointer-events-none select-none z-0" />
        
        <Container className="relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-8 font-inter">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <span className="text-foreground font-semibold">Our Work</span>
          </nav>

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-semibold text-brand-orange mb-5 font-space-grotesk">
              <Sparkle className="h-3 w-3 fill-brand-orange text-brand-orange animate-pulse" />
              PORTFOLIO
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy dark:text-white mb-6 font-poppins">
              Our Work
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl font-inter">
              Real projects, real results. See how we have engineered custom systems, automated client pipelines, and driven local business growth.
            </p>
          </div>
        </Container>
      </Section>

      {/* b) Combined Filter Bar */}
      <Section className="py-6 relative z-10">
        <Container>
          <div className="flex flex-col gap-6 p-6 rounded-2xl border border-slate-200/80 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 max-w-4xl mx-auto mb-12">
            
            {/* Category Filter */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-space-grotesk">
                Filter by Category
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        'relative px-3 py-1.5 text-xs font-semibold rounded-lg font-space-grotesk transition-colors duration-300 focus:outline-none',
                        isActive 
                          ? 'text-white bg-brand-orange shadow-[0_2px_8px_rgba(255,107,0,0.2)]' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Industry Filter */}
            <div className="flex flex-col gap-2 border-t border-border/20 pt-4">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-space-grotesk">
                Filter by Industry
              </span>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => {
                  const isActive = activeIndustry === industry.id;
                  return (
                    <button
                      key={industry.id}
                      onClick={() => setActiveIndustry(industry.id)}
                      className={cn(
                        'relative px-3 py-1.5 text-xs font-semibold rounded-lg font-space-grotesk transition-colors duration-300 focus:outline-none',
                        isActive 
                          ? 'text-white bg-brand-orange shadow-[0_2px_8px_rgba(255,107,0,0.2)]' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      {industry.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* c) 3-column project grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`${activeCategory}-${activeIndustry}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.slug}
                  layout={!prefersReducedMotion}
                  variants={fadeInUp}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                  className="flex flex-col rounded-2xl border border-slate-200/80 dark:border-white/5 bg-card overflow-hidden transition-all duration-300 group hover:border-brand-orange/40 dark:hover:border-brand-orange/40 hover:shadow-[0_12px_30px_-10px_rgba(255,107,0,0.12)] dark:hover:shadow-[0_12px_30px_-10px_rgba(255,107,0,0.25)]"
                >
                  {/* Gradient banner area */}
                  <div className={cn(
                    'h-48 w-full bg-gradient-to-br flex items-center justify-center p-6 relative overflow-hidden select-none',
                    project.heroGradient
                  )}>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,transparent_80%)] mix-blend-overlay" />
                    
                    <span className="text-[10px] font-extrabold tracking-widest text-white/50 uppercase font-space-grotesk">
                      {project.industry} Case Study
                    </span>

                    {/* Category tag */}
                    <div className="absolute bottom-4 left-4 flex gap-1.5">
                      <span className="text-[10px] font-bold text-white bg-brand-orange px-2.5 py-1 rounded-full uppercase tracking-wider font-space-grotesk shadow-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-brand-navy dark:text-white mb-2 font-poppins leading-snug group-hover:text-brand-orange transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-inter">
                        {project.overview}
                      </p>
                    </div>

                    {/* Tech & Actions */}
                    <div className="mt-auto space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span 
                            key={tech} 
                            className="bg-muted text-muted-foreground text-xs font-semibold px-2.5 py-0.5 rounded-full border border-border/10 font-inter"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="border-t border-border/20 pt-4 flex items-center justify-between">
                        <Link
                          href={`/work/${project.slug}`}
                          className="text-xs font-bold text-brand-navy hover:text-brand-orange dark:text-white/80 dark:hover:text-brand-orange transition-colors flex items-center gap-1 font-inter"
                        >
                          View Case Study
                          <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16 p-6 rounded-2xl border border-dashed border-border/60 bg-muted/5 max-w-md mx-auto mt-6">
              <span className="text-xs font-semibold text-muted-foreground font-inter">
                No case studies match the combined filters. Try selecting other combinations.
              </span>
            </div>
          )}
        </Container>
      </Section>

      {/* d) Bottom CTA Section */}
      <CTASection 
        title="Have a project in mind?"
        subtitle="Let&apos;s build it. Book a free 30-minute call to scope out your engineering, automation, or growth requirements."
        primaryCTA={{
          text: 'Book a Free Call',
          href: '/contact'
        }}
        secondaryCTA={{
          text: 'See Our Services',
          href: '/services'
        }}
      />

    </div>
  );
}
export default WorkPageClient;
