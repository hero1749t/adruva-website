"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Megaphone,
  Cpu,
  Search,
  Share2,
  Terminal,
  Target,
  Palette,
  Video,
  Mail,
  HelpCircle,
  LucideIcon,
  Sparkles,
  Layers,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  Megaphone,
  Cpu,
  Search,
  Share2,
  Terminal,
  Target,
  Palette,
  Video,
  Mail,
  HelpCircle,
};

const services = [
  {
    iconName: "Code2",
    name: "Web Development",
    department: "TECH & SOFTWARE",
    description:
      "High-performance enterprise websites, modern PWAs, and custom portals built with Next.js, TypeScript & headless CMS architectures.",
    price: "From ₹15,000",
    slug: "web-development",
    badge: "Enterprise Grade",
    accent: "blue",
  },
  {
    iconName: "Smartphone",
    name: "Mobile App Development",
    department: "TECH & SOFTWARE",
    description:
      "Cross-platform iOS & Android mobile applications built with React Native & Flutter with offline-first synchronization.",
    price: "From ₹30,000",
    slug: "mobile-app-development",
    badge: "iOS & Android",
    accent: "blue",
  },
  {
    iconName: "Terminal",
    name: "SaaS & Custom Software",
    department: "TECH & SOFTWARE",
    description:
      "Bespoke SaaS platforms, internal ERPs, billing pipelines, and custom microservice architectures engineered for scale.",
    price: "From ₹75,000",
    slug: "saas-custom-software",
    badge: "Full-Stack System",
    accent: "teal",
  },
  {
    iconName: "Cpu",
    name: "AI & Autonomous Systems",
    department: "AI & AUTOMATION",
    description:
      "Multi-agent workflows, custom LLM fine-tuning, RAG enterprise knowledge bases, and CRM automation pipelines.",
    price: "Custom Scoped",
    slug: "ai-automation",
    badge: "Multi-Agent AI",
    accent: "teal",
  },
  {
    iconName: "Search",
    name: "SEO & Growth Engine",
    department: "MARKETING & GROWTH",
    description:
      "Technical SEO audits, programmatic content architecture, Page 1 intent targeting, and high-converting inbound funnels.",
    price: "Outcome Driven",
    slug: "seo",
    badge: "Organic Dominance",
    accent: "blue",
  },
  {
    iconName: "Share2",
    name: "Brand & Creative Direction",
    department: "CREATIVE & MEDIA",
    description:
      "Identity design systems, UI/UX interaction models, 4K reel production, and full-funnel paid advertising creative.",
    price: "Value Packaged",
    slug: "social-media-management",
    badge: "High-Impact Assets",
    accent: "teal",
  },
];

interface ServiceCardProps {
  service: any;
  Icon: LucideIcon;
}

function ServiceCard({ service, Icon }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const xVal = e.clientX - left;
    const yVal = e.clientY - top;

    const xTilt = ((yVal - height / 2) / (height / 2)) * -5;
    const yTilt = ((xVal - width / 2) / (width / 2)) * 5;

    setCoords({ x: xVal, y: yVal });
    setTilt({ x: xTilt, y: yTilt });
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const isTeal = service.accent === "teal";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)`
          : "none",
        transition: hovered ? "none" : "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white/80 dark:bg-brand-navy/60 border border-slate-200/80 dark:border-brand-ice/10 backdrop-blur-xl transition-all duration-300 min-h-[320px] shadow-sm hover:shadow-2xl hover:border-brand-blue/30 dark:hover:border-brand-blue/30 overflow-hidden"
    >
      {/* Interactive Cursor Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(320px circle at ${coords.x}px ${coords.y}px, ${
            isTeal ? "rgba(1, 138, 136, 0.08)" : "rgba(0, 102, 255, 0.08)"
          }, transparent 80%)`,
        }}
      />

      {/* Top Border Line */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-[2px] transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-left",
          isTeal ? "bg-brand-teal" : "bg-brand-blue",
        )}
      />

      <div>
        {/* Header row: Department Tag & Badge */}
        <div
          className="flex items-center justify-between gap-2 mb-5"
          style={{ transform: "translateZ(20px)" }}
        >
          <div
            className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 border",
              isTeal
                ? "bg-brand-teal/10 text-brand-teal border-brand-teal/20"
                : "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-full border border-slate-200/60 dark:border-slate-700/40">
            {service.badge}
          </span>
        </div>

        {/* Service Name */}
        <h3
          style={{ transform: "translateZ(25px)" }}
          className="font-sora text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-200 group-hover:text-brand-blue"
        >
          {service.name}
        </h3>

        {/* Description */}
        <p
          style={{ transform: "translateZ(15px)" }}
          className="font-manrope text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6"
        >
          {service.description}
        </p>
      </div>

      {/* Card Footer: Pricing & Action */}
      <div
        style={{ transform: "translateZ(20px)" }}
        className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-brand-ice/5 w-full mt-auto"
      >
        <span className="font-space font-semibold text-xs text-brand-blue dark:text-brand-ice bg-brand-blue/5 dark:bg-brand-blue/15 px-3 py-1 rounded-md border border-brand-blue/10 dark:border-brand-blue/20">
          {service.price}
        </span>

        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 font-space text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-brand-blue dark:hover:text-brand-ice transition-colors group/link"
        >
          Scope Solution
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1 text-brand-blue" />
        </Link>
      </div>
    </div>
  );
}

interface ServicesPreviewProps {
  initialServices?: any[];
}

export function ServicesPreview({ initialServices }: ServicesPreviewProps) {
  return (
    <section className="relative w-full py-24 bg-slate-50/50 dark:bg-brand-navy/30 transition-colors duration-300 overflow-hidden border-y border-slate-200/60 dark:border-brand-ice/5">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-mono text-xs font-semibold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Full-Stack Capabilities</span>
            </div>
            <h2 className="font-sora text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Production-Grade Tech, AI &{" "}
              <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-blue bg-clip-text text-transparent">
                Growth Solutions
              </span>
            </h2>
            <p className="font-manrope text-base text-slate-600 dark:text-slate-300 mt-3 max-w-xl">
              From high-performance software architecture to autonomous AI
              workflows and full-funnel marketing campaigns—engineered with SLA
              guarantees.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-space text-sm font-bold text-brand-blue dark:text-brand-ice hover:underline group self-start md:self-end"
          >
            Explore All 14 Core Capabilities
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.iconName] || Code2;
            return (
              <ServiceCard key={service.slug} service={service} Icon={Icon} />
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ServicesPreview;
