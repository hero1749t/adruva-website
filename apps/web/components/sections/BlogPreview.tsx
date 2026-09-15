"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredInsights = [
  {
    title:
      "Why Headless Next.js & NestJS Outperform Legacy WordPress for Enterprise Scale",
    slug: "headless-nextjs-nestjs-vs-wordpress-enterprise",
    category: "Technology",
    readTime: "6 min read",
    date: "Sep 2026",
    author: "Adruva Engineering",
    excerpt:
      "A deep dive into server-side rendering latency, security surface areas, and why modern architectures deliver <0.4s LCP scores.",
  },
  {
    title:
      "Autonomous WhatsApp CRM Qualification: Cutting 80% of Manual Sales Overhead",
    slug: "ai-automation",
    category: "AI Systems",
    readTime: "5 min read",
    date: "Aug 2026",
    author: "AI Lab",
    excerpt:
      "How vector-embedded LLM workflows auto-qualify inbound customer inquiries and book calendar meetings without human delays.",
  },
  {
    title:
      "The Death of Third-Party Cookies: Why Meta Server-Side CAPI is Mandatory in 2026",
    slug: "modern-web-design-trends-india-aggregators",
    category: "Growth",
    readTime: "7 min read",
    date: "Aug 2026",
    author: "Growth Team",
    excerpt:
      "Browser pixel tracking is losing over 35% of conversion events. Here is how server API gateways restore attribution fidelity.",
  },
];

export function BlogPreview({ initialPosts }: { initialPosts?: any[] }) {
  return (
    <section className="relative w-full py-24 bg-background border-b border-border/60 transition-colors duration-300">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/20 mb-4 inline-block">
              ADRUVA INSIGHTS
            </span>
            <h2 className="font-sora text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Technology, AI & growth architecture.
            </h2>
            <p className="font-manrope text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Technical breakdowns, engineering playbooks, and strategic
              frameworks published by our core team.
            </p>
          </div>

          <Link href="/blog" className="self-start md:self-end">
            <Button
              variant="outline"
              className="font-space text-xs font-semibold border-slate-300 dark:border-slate-700 hover:border-brand-blue hover:text-brand-blue"
            >
              Explore All Publications &rarr;
            </Button>
          </Link>
        </div>

        {/* 3 Publication Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredInsights.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group p-6 rounded-3xl bg-slate-50 dark:bg-[#111720] border border-slate-200 dark:border-[#202936] flex flex-col justify-between hover:border-brand-blue/50 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10px] font-bold text-brand-blue bg-brand-blue/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-sora text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-blue transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="font-manrope text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>{post.author}</span>
                <span className="text-brand-blue font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-space">
                  Read Article &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default BlogPreview;
