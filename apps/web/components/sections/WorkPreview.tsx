'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';

const projects = [
  {
    title: 'Dehradun Yoga Shala Platform',
    category: 'Build',
    industry: 'Wellness',
    description: 'Booking engine and headless website integration for Dehraduns premium yoga studio.',
    tech: ['Next.js', 'Framer Motion', 'Tailwind'],
    gradient: 'from-[#0d1b2e] via-[#0f2549] to-[#162b4a]',
    slug: 'yoga-shala',
  },
  {
    title: 'Lura Cafe Digital OS',
    category: 'Automate',
    industry: 'F&B',
    description: 'Automated order-taking, WhatsApp dispatching system, and real-time CRM updates.',
    tech: ['NestJS', 'WhatsApp Cloud API', 'PostgreSQL'],
    gradient: 'from-[#1a0800] via-[#2d1200] to-[#3d1a00]',
    slug: 'lura-cafe',
  },
  {
    title: 'Adruva Resto System',
    category: 'Build',
    industry: 'Hospitality',
    description: 'A custom POS and billing interface for local restaurants with safe offline sync.',
    tech: ['React', 'Prisma', 'Tailwind CSS'],
    gradient: 'from-[#081a0e] via-[#0d2b16] to-[#123320]',
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
        staggerChildren: 0.08,
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
    <section className="w-full py-20 bg-transparent transition-colors duration-300">
      <Container>
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col items-start">
            <span className="section-tag mb-3">Our Work</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-poppins">
              Projects we&apos;re proud of
            </h2>
          </div>

          <Link
            href="/work"
            className="group flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-brand-orange border-b border-border hover:border-brand-orange pb-0.5 transition-all duration-200 self-start"
          >
            View all projects
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* 3 Project Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              variants={itemVariants}
              className={cn(
                'flex flex-col rounded-[16px] border border-border bg-card overflow-hidden transition-all duration-250 group',
                'hover:border-brand-orange/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1.5'
              )}
            >
              {/* Image/Visual Area (top, height: 200px) */}
              <div
                className={cn(
                  'h-50 w-full bg-gradient-to-br flex items-center justify-center p-6 relative overflow-hidden select-none',
                  project.gradient
                )}
              >
                {/* Pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />
                
                {/* Industry label in bottom-left */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/70 bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-md font-inter border border-white/10">
                    {project.industry} Case Study
                  </span>
                </div>
              </div>

              {/* Content Area (bottom) */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  {/* Category & Industry Badges Row */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span 
                      className={cn(
                        'text-xs font-semibold px-2.5 py-0.5 rounded-full border',
                        project.category === 'Build' && 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                        project.category === 'Automate' && 'bg-purple-500/10 text-purple-400 border-purple-500/20',
                        project.category === 'Grow' && 'bg-green-500/10 text-green-400 border-green-500/20',
                        project.category === 'Design' && 'bg-pink-500/10 text-pink-400 border-pink-500/20'
                      )}
                    >
                      {project.category}
                    </span>
                    <span className="text-xs font-medium bg-muted text-muted-foreground border border-border/40 rounded-full px-2.5 py-0.5">
                      {project.industry}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-foreground mb-2 font-poppins group-hover:text-brand-orange transition-colors duration-150">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-inter line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack & Action */}
                <div className="mt-auto space-y-4">
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-muted text-muted-foreground border border-border/60 text-[10px] font-medium px-2 py-0.5 rounded-md font-inter"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Case study link */}
                  <div className="border-t border-border/40 pt-4 flex items-center justify-between">
                    <Link
                      href={`/work/${project.slug}`}
                      className="text-sm font-semibold text-brand-orange hover:text-brand-orange-hover transition-colors flex items-center gap-1 font-inter"
                    >
                      View Case Study
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default WorkPreview;
