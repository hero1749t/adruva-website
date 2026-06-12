"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

const posts = [
  {
    title: "The Rise of AI Automation in Service Businesses",
    category: "AI & Tech",
    date: "June 01, 2026",
    readTime: "5 min read",
    description:
      "How local and small businesses are cutting manual booking and follow-up time by 80% using custom AI integrations.",
    gradient: "from-[#0f1a2e] to-[#1a2d4a]",
    slug: "ai-automation-service-businesses",
  },
  {
    title: "Why Headless Next.js Is Better for Your Business SEO",
    category: "Web Dev",
    date: "May 24, 2026",
    readTime: "4 min read",
    description:
      "An analysis of static-site loading speeds, Core Web Vitals, and why custom Next.js configurations win over Wordpress.",
    gradient: "from-[#0d1f12] to-[#162f1c]",
    slug: "headless-nextjs-seo-benefits",
  },
  {
    title: "Google Ads vs Meta Ads: Which Should You Choose?",
    category: "Marketing",
    date: "May 12, 2026",
    readTime: "6 min read",
    description:
      "Compare search intent vs interest targeting and understand where to invest your initial digital ad budget for maximum ROI.",
    gradient: "from-[#1f0d07] to-[#2d1408]",
    slug: "google-ads-vs-meta-ads-comparison",
  },
];

interface BlogPreviewProps {
  initialPosts?: any[];
}

export function BlogPreview({ initialPosts }: BlogPreviewProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  const displayPosts = (
    initialPosts && initialPosts.length > 0 ? initialPosts : posts
  ).map((p) => ({
    title: p.title,
    slug: p.slug,
    category: p.category,
    date: p.date || p.publishedDate || "June 01, 2026",
    readTime: p.readTime || p.readingTime || "5 min read",
    description: p.description || p.summary || "",
    gradient: p.gradient || p.coverGradient || "from-[#0b1f3a] to-[#2d8cff]",
  }));

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
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full py-20 bg-transparent transition-colors duration-300">
      <Container>
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col items-start">
            <span className="section-tag mb-3">Insights</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-poppins">
              From our desk
            </h2>
          </div>

          <Link
            href="/blog"
            className="group flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-brand-orange border-b border-border hover:border-brand-orange pb-0.5 transition-all duration-200 self-start"
          >
            All articles
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* 3 Blog Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {displayPosts.map((post) => (
            <motion.div
              key={post.slug}
              variants={itemVariants}
              className={cn(
                "flex flex-col rounded-[14px] border border-border bg-card overflow-hidden transition-all duration-250 group",
                "hover:border-brand-orange/40 hover:-translate-y-1",
              )}
            >
              {/* Cover image area (top, 160px) */}
              <div
                className={cn(
                  "h-40 w-full bg-gradient-to-br flex items-center justify-center relative overflow-hidden select-none",
                  post.gradient,
                )}
              >
                <span className="text-xs font-bold uppercase tracking-widest text-white/30 font-space-grotesk">
                  {post.category} Post
                </span>

                {/* Reading time badge (top-right) */}
                <div className="absolute top-3 right-3 bg-black/40 text-white/70 text-xs px-2.5 py-0.5 rounded backdrop-blur-md border border-white/5 font-inter">
                  {post.readTime}
                </div>
              </div>

              {/* Content area */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  {/* Meta row */}
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase mb-3 font-inter">
                    <span className="text-brand-orange font-semibold">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-foreground mb-2 leading-snug font-poppins group-hover:text-brand-orange transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed font-inter mb-4 line-clamp-3">
                    {post.description}
                  </p>
                </div>

                {/* Read Article Link */}
                <div className="border-t border-border/40 pt-4 mt-auto">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold text-brand-orange hover:text-brand-orange-hover transition-colors flex items-center gap-1 font-inter"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default BlogPreview;
