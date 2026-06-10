'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'Dehradun Yoga Shala Platform',
    category: 'Build',
    industry: 'Wellness',
    description: 'Booking engine and headless website integration for Dehraduns premium yoga studio.',
    tech: ['Next.js', 'Framer Motion', 'Tailwind'],
    gradient: 'from-orange-500/80 to-navy-950/80',
    slug: 'yoga-shala',
  },
  {
    title: 'Lura Cafe Digital OS',
    category: 'Automate',
    industry: 'F&B',
    description: 'Automated order-taking, WhatsApp dispatching system, and real-time CRM updates.',
    tech: ['NestJS', 'WhatsApp Cloud API', 'PostgreSQL'],
    gradient: 'from-blue-600/80 to-orange-600/80',
    slug: 'lura-cafe',
  },
  {
    title: 'Adruva Resto System',
    category: 'Build & Automate',
    industry: 'Hospitality',
    description: 'A custom POS and billing interface for local restaurants with safe offline sync.',
    tech: ['React', 'Prisma', 'Tailwind CSS'],
    gradient: 'from-teal-600/80 to-navy-900/80',
    slug: 'adruva-resto',
  },
];

export function WorkPreview() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <Section className="bg-background">
      <Container>
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col items-start">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-orange mb-3 font-inter">
              Our Work
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
              Projects we&apos;re proud of
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-4" />
          </div>

          <Link
            href="/work"
            className="group flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-hover transition-colors font-inter"
          >
            View all projects
            <motion.span
              animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </Link>
        </div>

        {/* 3 Project Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              className={cn(
                'flex flex-col rounded-2xl border border-border/40 bg-card overflow-hidden transition-all duration-300 group',
                'hover:border-brand-orange/30 hover:shadow-[0_4px_20px_rgba(255,107,0,0.06)]'
              )}
            >
              {/* Image Gradient Placeholder */}
              <div
                className={cn(
                  'h-48 w-full bg-gradient-to-br flex items-center justify-center p-6 relative overflow-hidden select-none',
                  project.gradient
                )}
              >
                {/* Decorative mesh effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_80%)] mix-blend-overlay" />
                <span className="text-xs font-extrabold tracking-widest text-white/50 uppercase font-space-grotesk">
                  {project.industry} Case Study
                </span>
                
                {/* Category overlays */}
                <div className="absolute bottom-4 left-4 flex gap-1.5">
                  <span className="text-[10px] font-bold text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm uppercase tracking-wider font-inter">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-brand-navy dark:text-white mb-2 font-poppins leading-tight group-hover:text-brand-orange transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-inter">
                    {project.description}
                  </p>
                </div>

                {/* Tech stack & Action link */}
                <div className="mt-auto space-y-4">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge 
                        key={t} 
                        variant="secondary"
                        className="bg-muted hover:bg-muted text-[10px] text-muted-foreground font-semibold px-2 py-0.5 border border-border/10 rounded-sm font-inter"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>

                  {/* Case study link */}
                  <div className="border-t border-border/20 pt-4 flex items-center justify-between">
                    <Link
                      href={`/work/${project.slug}`}
                      className="text-xs font-bold text-brand-navy hover:text-brand-orange dark:text-white/80 dark:hover:text-brand-orange transition-colors flex items-center gap-1 font-inter"
                    >
                      View Case Study
                      <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

export default WorkPreview;
