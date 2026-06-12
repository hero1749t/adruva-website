"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
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
    icon: Code2,
    name: "Web Development",
    description:
      "High-performance websites built with Next.js, React & modern headless frameworks.",
    price: "Starting ₹15,000",
    slug: "web-development",
    theme: "blue",
  },
  {
    icon: Smartphone,
    name: "Mobile App Development",
    description:
      "Native & cross-platform iOS & Android mobile apps built with React Native.",
    price: "Starting ₹30,000",
    slug: "mobile-app-development",
    theme: "blue",
  },
  {
    icon: Megaphone,
    name: "Google & Meta Ads",
    description:
      "High-ROI campaigns targeting the right keywords and audiences to drive inquiries.",
    price: "Custom Quote",
    slug: "google-ads",
    theme: "orange",
  },
  {
    icon: Cpu,
    name: "AI Automation",
    description:
      "Streamline operations, lead capture & bookings with custom AI workflows & integrations.",
    price: "Custom Quote",
    slug: "ai-automation",
    theme: "purple",
  },
  {
    icon: Search,
    name: "SEO Services",
    description:
      "On-page, technical & content strategies to rank on Page 1 and capture search intent.",
    price: "Custom Quote",
    slug: "seo",
    theme: "orange",
  },
  {
    icon: Share2,
    name: "Social Media Management",
    description:
      "End-to-end creative management, reels editing & strategic content for socials.",
    price: "Custom Quote",
    slug: "social-media-management",
    theme: "orange",
  },
];

interface ServicesPreviewProps {
  initialServices?: any[];
}

export function ServicesPreview({ initialServices }: ServicesPreviewProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  const displayServices = (
    initialServices && initialServices.length > 0 ? initialServices : services
  ).map((s) => {
    // Map theme dynamically based on category
    let theme: "blue" | "orange" | "purple" = "blue";
    const category = s.category?.toLowerCase() || "build";
    if (category === "automate") theme = "purple";
    else if (category === "grow" || category === "design") theme = "orange";

    return {
      name: s.name,
      slug: s.slug,
      description: s.description,
      price: s.price,
      theme,
      iconName: s.iconName || "Code2",
    };
  });

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
    <section className="relative w-full py-20 bg-transparent transition-colors duration-300 overflow-hidden">
      {/* Background Radial Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 dark:bg-brand-blue/3 rounded-full blur-[100px] pointer-events-none select-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-orange/5 dark:bg-brand-orange/3 rounded-full blur-[100px] pointer-events-none select-none z-0" />

      <Container className="relative z-10">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 relative z-10">
          <div className="flex flex-col items-start">
            <span className="section-tag mb-3">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-poppins">
              Full-spectrum{" "}
              <span className="bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">
                digital services
              </span>
            </h2>
          </div>

          <Link
            href="/services"
            className="group flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-brand-orange border-b border-border hover:border-brand-orange pb-0.5 transition-all duration-200 self-start"
          >
            View all services
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* 3x2 Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {displayServices.map((service) => {
            const Icon = iconMap[service.iconName] || Code2;
            return (
              <motion.div
                key={service.slug}
                variants={itemVariants}
                className={cn(
                  "flex flex-col items-start p-6 rounded-[14px] bg-card border border-border transition-all duration-300 min-h-[270px] group relative overflow-hidden",
                  "hover:-translate-y-1.5 bg-gradient-to-b from-card to-card/98",
                  service.theme === "blue" &&
                    "hover:border-blue-500/30 hover:shadow-[0_20px_40px_rgba(45,140,255,0.06),0_4_12px_rgba(45,140,255,0.03)]",
                  service.theme === "orange" &&
                    "hover:border-brand-orange/30 hover:shadow-[0_20px_40px_rgba(255,107,0,0.06),0_4_12px_rgba(255,107,0,0.03)]",
                  service.theme === "purple" &&
                    "hover:border-purple-500/30 hover:shadow-[0_20px_40px_rgba(168,85,247,0.06),0_4_12px_rgba(168,85,247,0.03)]",
                )}
              >
                {/* Hover Top Color Bar */}
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-[3px] transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-center",
                    service.theme === "blue" && "bg-blue-500",
                    service.theme === "orange" && "bg-brand-orange",
                    service.theme === "purple" && "bg-purple-500",
                  )}
                />

                {/* Spotlight Background Glow */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-[14px]",
                    service.theme === "blue" &&
                      "bg-[radial-gradient(circle_at_center,rgba(45,140,255,0.18)_0%,transparent_60%)]",
                    service.theme === "orange" &&
                      "bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.18)_0%,transparent_60%)]",
                    service.theme === "purple" &&
                      "bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18)_0%,transparent_60%)]",
                  )}
                />

                {/* Icon Box (Floating Gem) */}
                <div
                  className={cn(
                    "h-11 w-11 rounded-[12px] flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110",
                    service.theme === "blue" &&
                      "bg-blue-500/8 text-blue-500 dark:bg-blue-500/12 border border-blue-500/20 group-hover:bg-blue-500/18 shadow-[0_4px_12px_rgba(45,140,255,0.1)]",
                    service.theme === "orange" &&
                      "bg-brand-orange/8 text-brand-orange dark:bg-brand-orange/12 border border-brand-orange/20 group-hover:bg-brand-orange/18 shadow-[0_4px_12px_rgba(255,107,0,0.1)]",
                    service.theme === "purple" &&
                      "bg-purple-500/8 text-purple-500 dark:bg-purple-500/12 border border-purple-500/20 group-hover:bg-purple-500/18 shadow-[0_4px_12px_rgba(168,85,247,0.1)]",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* Service Name */}
                <h3
                  className={cn(
                    "text-lg font-semibold text-foreground mb-2 font-poppins transition-colors duration-200",
                    service.theme === "blue" &&
                      "group-hover:text-blue-500 dark:group-hover:text-blue-400",
                    service.theme === "orange" &&
                      "group-hover:text-brand-orange",
                    service.theme === "purple" &&
                      "group-hover:text-purple-500 dark:group-hover:text-purple-400",
                  )}
                >
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-[1.65] mb-4 font-inter">
                  {service.description}
                </p>

                {/* Footer details: Price Badge + Learn More */}
                <div className="flex flex-col gap-3.5 w-full mt-auto pt-4 border-t border-border/40">
                  <div
                    className={cn(
                      "inline-block self-start border rounded-full px-3 py-0.5 text-xs font-semibold font-space-grotesk",
                      service.theme === "blue" &&
                        "bg-blue-500/[0.06] border-blue-500/20 text-blue-500 dark:text-blue-400",
                      service.theme === "orange" &&
                        "bg-brand-orange/[0.06] border-brand-orange/20 text-brand-orange",
                      service.theme === "purple" &&
                        "bg-purple-500/[0.06] border-purple-500/20 text-purple-500 dark:text-purple-400",
                    )}
                  >
                    {service.price}
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className={cn(
                      "text-sm font-semibold transition-all flex items-center gap-1 font-inter self-start group/link mt-1",
                      service.theme === "blue" &&
                        "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300",
                      service.theme === "orange" &&
                        "text-brand-orange hover:text-brand-orange-hover",
                      service.theme === "purple" &&
                        "text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300",
                    )}
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 translate-x-0 group-hover:translate-x-1 group-hover/link:translate-x-1.5 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

export default ServicesPreview;
