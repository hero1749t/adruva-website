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
    description:
      "High-performance websites built with Next.js, React & modern headless frameworks.",
    price: "Starting ₹15,000",
    slug: "web-development",
    theme: "blue",
  },
  {
    iconName: "Smartphone",
    name: "Mobile App Development",
    description:
      "Native & cross-platform iOS & Android mobile apps built with React Native.",
    price: "Starting ₹30,000",
    slug: "mobile-app-development",
    theme: "blue",
  },
  {
    iconName: "Terminal",
    name: "SaaS / Custom Software",
    description:
      "Tailor-made software solutions, APIs, and client portals built to scale your business operations.",
    price: "Starting ₹75,000",
    slug: "saas-custom-software",
    theme: "blue",
  },
  {
    iconName: "Cpu",
    name: "AI Automation",
    description:
      "Streamline operations, lead capture & bookings with custom AI workflows & integrations.",
    price: "Custom Quote",
    slug: "ai-automation",
    theme: "purple",
  },
  {
    iconName: "Search",
    name: "SEO Services",
    description:
      "On-page, technical & content strategies to rank on Page 1 and capture search intent.",
    price: "Custom Quote",
    slug: "seo",
    theme: "orange",
  },
  {
    iconName: "Share2",
    name: "Social Media Management",
    description:
      "End-to-end creative management, reels editing & strategic content for socials.",
    price: "Custom Quote",
    slug: "social-media-management",
    theme: "orange",
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

    // Smooth 3D Tilt calculations
    const xTilt = ((yVal - height / 2) / (height / 2)) * -6;
    const yTilt = ((xVal - width / 2) / (width / 2)) * 6;

    setCoords({ x: xVal, y: yVal });
    setTilt({ x: xTilt, y: yTilt });
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Render a clean service wireframe graphic in the background
  const renderBackgroundGraphic = (slug: string) => {
    const defaultClass =
      "absolute right-3 bottom-3 w-28 h-28 text-zinc-400 dark:text-white pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity duration-500";
    switch (slug) {
      case "web-development":
        return (
          <svg
            className={defaultClass}
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          >
            <rect x="5" y="12" width="90" height="76" rx="6" />
            <line x1="5" y1="26" x2="95" y2="26" />
            <circle cx="14" cy="19" r="2" fill="currentColor" />
            <circle cx="21" cy="19" r="2" fill="currentColor" />
            <circle cx="28" cy="19" r="2" fill="currentColor" />
            <path d="M 38 48 L 28 58 L 38 68" />
            <path d="M 62 48 L 72 58 L 62 68" />
            <line x1="53" y1="44" x2="47" y2="72" />
          </svg>
        );
      case "mobile-app-development":
        return (
          <svg
            className={defaultClass}
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          >
            <rect x="26" y="6" width="48" height="88" rx="8" />
            <line x1="26" y1="16" x2="74" y2="16" />
            <line x1="26" y1="84" x2="74" y2="84" />
            <circle cx="50" cy="89" r="2" />
            <path
              d="M 38 34 H 62 M 38 44 H 62 M 42 54 H 58"
              strokeDasharray="3 3"
            />
          </svg>
        );
      case "saas-custom-software":
        return (
          <svg
            className={defaultClass}
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          >
            <rect x="10" y="10" width="80" height="60" rx="4" />
            <rect x="35" y="70" width="30" height="20" />
            <line x1="10" y1="58" x2="90" y2="58" />
            <path d="M 25 30 H 75 M 25 42 H 55" />
          </svg>
        );
      case "ai-automation":
        return (
          <svg
            className={defaultClass}
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          >
            <circle cx="18" cy="50" r="4" fill="currentColor" />
            <circle cx="50" cy="22" r="4" fill="currentColor" />
            <circle cx="50" cy="78" r="4" fill="currentColor" />
            <circle cx="82" cy="50" r="4" fill="currentColor" />
            <line x1="22" y1="48" x2="46" y2="26" />
            <line x1="22" y1="52" x2="46" y2="74" />
            <line x1="54" y1="26" x2="78" y2="48" />
            <line x1="54" y1="74" x2="78" y2="52" />
            <line x1="50" y1="26" x2="50" y2="74" />
            <circle cx="50" cy="50" r="6" strokeWidth="1.2" />
          </svg>
        );
      case "seo":
        return (
          <svg
            className={defaultClass}
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          >
            <circle cx="42" cy="42" r="18" />
            <line x1="55" y1="55" x2="84" y2="84" strokeWidth="2.2" />
            <path d="M 16 16 L 32 22 L 48 16" />
            <path d="M 58 20 Q 72 26 80 42" strokeDasharray="3 3" />
          </svg>
        );
      case "social-media-management":
        return (
          <svg
            className={defaultClass}
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          >
            <path d="M12 22 H88 V68 H42 L22 84 V68 H12 Z" />
            <circle cx="32" cy="45" r="3" fill="currentColor" />
            <circle cx="50" cy="45" r="3" fill="currentColor" />
            <circle cx="68" cy="45" r="3" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

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
      className={cn(
        "flex flex-col items-start p-6 rounded-[16px] bg-white/70 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-white/5 transition-all duration-300 min-h-[280px] group relative overflow-hidden backdrop-blur-md shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]",
        service.theme === "blue" &&
          "hover:border-blue-500/30 hover:shadow-[0_15px_30px_rgba(45,140,255,0.08)]",
        service.theme === "orange" &&
          "hover:border-brand-orange/30 hover:shadow-[0_15px_30px_rgba(255,107,0,0.08)]",
        service.theme === "purple" &&
          "hover:border-purple-500/30 hover:shadow-[0_15px_30px_rgba(168,85,247,0.08)]",
      )}
    >
      {/* Interactive Cursor Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[16px]"
        style={{
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, ${
            service.theme === "blue"
              ? "rgba(45, 140, 255, 0.08)"
              : service.theme === "orange"
                ? "rgba(255, 107, 0, 0.08)"
                : "rgba(168, 85, 247, 0.08)"
          }, transparent 80%)`,
        }}
      />

      {/* Subtle border glow on hover */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-[2px] transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-center",
          service.theme === "blue" && "bg-blue-500",
          service.theme === "orange" && "bg-brand-orange",
          service.theme === "purple" && "bg-purple-500",
        )}
      />

      {/* Thematic Background Vector Art */}
      {renderBackgroundGraphic(service.slug)}

      {/* Floating Icon Box (3D pop out) */}
      <div
        style={{ transform: "translateZ(30px)" }}
        className={cn(
          "h-12 w-12 rounded-[14px] flex items-center justify-center mb-4.5 transition-all duration-300 group-hover:scale-105 shadow-md border",
          service.theme === "blue" &&
            "bg-blue-500/5 text-blue-600 border-blue-500/20 group-hover:bg-blue-500/10 dark:bg-blue-500/10 dark:text-blue-400 dark:group-hover:bg-blue-500/20",
          service.theme === "orange" &&
            "bg-brand-orange/5 text-brand-orange border-brand-orange/20 group-hover:bg-brand-orange/10 dark:bg-brand-orange/10 dark:text-brand-orange dark:group-hover:bg-brand-orange/20",
          service.theme === "purple" &&
            "bg-purple-500/5 text-purple-600 border-purple-500/20 group-hover:bg-purple-500/10 dark:bg-purple-500/10 dark:text-purple-400 dark:group-hover:bg-purple-500/20",
        )}
      >
        <Icon className="h-5.5 w-5.5" />
      </div>

      {/* Service Name */}
      <h3
        style={{ transform: "translateZ(25px)" }}
        className={cn(
          "text-lg font-bold text-zinc-900 dark:text-white mb-2 font-poppins transition-colors duration-200",
          service.theme === "blue" &&
            "group-hover:text-blue-600 dark:group-hover:text-blue-400",
          service.theme === "orange" && "group-hover:text-brand-orange",
          service.theme === "purple" &&
            "group-hover:text-purple-600 dark:group-hover:text-purple-400",
        )}
      >
        {service.name}
      </h3>

      {/* Description */}
      <p
        style={{ transform: "translateZ(20px)" }}
        className="text-sm text-zinc-600 dark:text-zinc-400 leading-[1.6] mb-5 font-inter"
      >
        {service.description}
      </p>

      {/* Card Footer details: Price Badge + Learn More */}
      <div
        style={{ transform: "translateZ(15px)" }}
        className="flex flex-col gap-3.5 w-full mt-auto pt-4 border-t border-zinc-200/60 dark:border-white/5"
      >
        <div
          className={cn(
            "inline-block self-start border rounded-full px-3 py-0.5 text-xs font-semibold font-space-grotesk",
            service.theme === "blue" &&
              "bg-blue-500/5 border-blue-500/20 text-blue-600 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-400",
            service.theme === "orange" &&
              "bg-brand-orange/5 border-brand-orange/20 text-brand-orange dark:bg-brand-orange/10 dark:border-brand-orange/30 dark:text-brand-orange",
            service.theme === "purple" &&
              "bg-purple-500/5 border-purple-500/20 text-purple-600 dark:bg-purple-500/10 dark:border-purple-500/30 dark:text-purple-400",
          )}
        >
          {service.price}
        </div>

        <Link
          href={`/services/${service.slug}`}
          className={cn(
            "text-sm font-semibold transition-all flex items-center gap-1 font-inter self-start group/link mt-1",
            service.theme === "blue" &&
              "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
            service.theme === "orange" &&
              "text-brand-orange hover:text-brand-orange-hover dark:text-brand-orange dark:hover:text-brand-orange/80",
            service.theme === "purple" &&
              "text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300",
          )}
        >
          Learn More
          <ArrowRight className="h-3.5 w-3.5 translate-x-0 group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
}

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
                className="transform-style-3d"
              >
                <ServiceCard service={service} Icon={Icon} />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

export default ServicesPreview;
