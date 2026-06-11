'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';

const posts = [
  {
    title: 'The Rise of AI Automation in Service Businesses',
    category: 'AI & Tech',
    date: 'June 01, 2026',
    description: 'How local and small businesses are cutting manual booking and follow-up time by 80% using custom AI integrations.',
    gradient: 'from-orange-500 to-amber-600',
    slug: 'ai-automation-service-businesses',
  },
  {
    title: 'Why Headless Next.js Is Better for Your Business SEO',
    category: 'Web Dev',
    date: 'May 24, 2026',
    description: 'An analysis of static-site loading speeds, Core Web Vitals, and why custom Next.js configurations win over Wordpress.',
    gradient: 'from-navy-800 to-indigo-900',
    slug: 'headless-nextjs-seo-benefits',
  },
  {
    title: 'Google Ads vs Meta Ads: Which Should You Choose?',
    category: 'Marketing',
    date: 'May 12, 2026',
    description: 'Compare search intent vs interest targeting and understand where to invest your initial digital ad budget for maximum ROI.',
    gradient: 'from-emerald-500 to-blue-600',
    slug: 'google-ads-vs-meta-ads-comparison',
  },
];

export function BlogPreview() {
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
              Insights
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
              From our desk
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-4" />
          </div>

          <Link
            href="/blog"
            className="group flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-hover transition-colors font-inter"
          >
            All articles
            <motion.span
              animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </Link>
        </div>

        {/* 3 Blog Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <motion.div
              key={post.slug}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              className={cn(
                'flex flex-col rounded-2xl border border-slate-200/80 dark:border-white/5 bg-card overflow-hidden transition-all duration-300 group',
                'hover:border-brand-orange/40 dark:hover:border-brand-orange/40 hover:shadow-[0_12px_30px_-10px_rgba(255,107,0,0.12)] dark:hover:shadow-[0_12px_30px_-10px_rgba(255,107,0,0.25)]'
              )}
            >
              {/* Cover Image Placeholder */}
              <div
                className={cn(
                  'h-40 w-full bg-gradient-to-br flex items-center justify-center relative overflow-hidden select-none',
                  post.gradient
                )}
              >
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                <span className="text-xs font-bold text-white/50 tracking-wider uppercase font-space-grotesk">
                  {post.category} Post
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  {/* Category and Date row */}
                  <div className="flex items-center gap-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3 font-inter">
                    <span className="text-brand-orange">{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm md:text-base font-bold text-brand-navy dark:text-white mb-2 leading-snug font-poppins group-hover:text-brand-orange transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 font-inter mb-4">
                    {post.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="border-t border-border/20 pt-4 mt-auto">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-brand-navy hover:text-brand-orange dark:text-white/80 dark:hover:text-brand-orange transition-colors flex items-center gap-1 font-inter"
                  >
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

export default BlogPreview;
