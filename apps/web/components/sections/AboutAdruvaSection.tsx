"use client";

import React from "react";
import { Container } from "@/components/layout/container";
import { Code2, Cpu, TrendingUp, Palette, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const departments = [
  {
    icon: Code2,
    number: "01",
    title: "Technology & Engineering",
    desc: "Websites, applications and platforms built to scale with high performance.",
    tag: "Next.js • React Native • SaaS",
    border: "border-brand-blue/30",
    badgeColor: "text-brand-blue",
    link: "/services/web-development",
  },
  {
    icon: Cpu,
    number: "02",
    title: "AI & Automation",
    desc: "Intelligent autonomous systems and workflows that eliminate manual work.",
    tag: "AI Agents • RAG • LLMs",
    border: "border-brand-teal/30",
    badgeColor: "text-brand-teal",
    link: "/services/custom-ai-solutions",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Marketing & Growth",
    desc: "Demand and search visibility engineered for qualified commercial conversion.",
    tag: "SEO • Paid Ads • CRM",
    border: "border-emerald-500/30",
    badgeColor: "text-emerald-500",
    link: "/services/seo",
  },
  {
    icon: Palette,
    number: "04",
    title: "Brand, Design & Creative",
    desc: "Visual identity and design systems built with strategic intent.",
    tag: "UI/UX • Identity • Motion",
    border: "border-brand-orange/30",
    badgeColor: "text-brand-orange",
    link: "/services/ui-ux-design",
  },
];

export function AboutAdruvaSection() {
  return (
    <section className="relative w-full py-20 bg-background-secondary/40 dark:bg-[#0A1224]/70 border-y border-border/60 transition-colors duration-300">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-xs font-semibold text-brand-blue font-space tracking-wide uppercase mb-4">
            Integrated Growth Partner
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-sora mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
              ADRUVA SOLUTION
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-manrope font-normal max-w-3xl mx-auto">
            Adruva Solution is a technology and digital growth partner for
            ambitious SMEs, startups and growing businesses that need
            professional digital capability without the complexity, cost or
            rigidity of a traditional agency.
          </p>
          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-manrope font-medium mt-4 max-w-3xl mx-auto">
            Rather than coordinating a web developer, a marketing agency, an
            automation consultant and an independent designer separately,
            businesses work with Adruva as a{" "}
            <span className="text-foreground font-bold">
              single accountable partner
            </span>{" "}
            — engineering, AI automation, marketing and creative brought
            together as one integrated system, built to help them perform,
            communicate and grow.
          </p>
        </div>

        {/* 4 Departments Grid from Brand Kit */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.number}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`group relative p-6 rounded-2xl bg-card/80 dark:bg-[#0D182E]/90 border ${dept.border} shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-muted-foreground/60">
                      {dept.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground font-sora mb-2 group-hover:text-brand-blue transition-colors">
                    {dept.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-manrope mb-4">
                    {dept.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-brand-blue font-semibold uppercase tracking-wider">
                    {dept.tag}
                  </span>
                  <Link
                    href={dept.link}
                    className="text-muted-foreground hover:text-brand-blue transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default AboutAdruvaSection;
