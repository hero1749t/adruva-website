"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import {
  ChevronDown,
  Menu,
  Calendar,
  Code2,
  Smartphone,
  Terminal,
  Cpu,
  Megaphone,
  Zap,
  Target,
  Share2,
  Search,
  Mail,
  Layout,
  Palette,
  Video,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileMenu } from "./MobileMenu";
import Image from "next/image";

const serviceCategories = [
  {
    name: "01 Technology & Engineering",
    icon: Code2,
    services: [
      { name: "Web Development", slug: "web-development", icon: Code2 },
      {
        name: "Mobile App Development",
        slug: "mobile-app-development",
        icon: Smartphone,
      },
      {
        name: "SaaS & Custom Software",
        slug: "saas-custom-software",
        icon: Terminal,
      },
    ],
  },
  {
    name: "02 AI & Automation",
    icon: Cpu,
    services: [
      { name: "AI Automation", slug: "ai-automation", icon: Cpu },
      { name: "AI Ads & Workflows", slug: "ai-ads", icon: Megaphone },
      { name: "Custom AI Systems", slug: "custom-ai-solutions", icon: Zap },
    ],
  },
  {
    name: "03 Marketing & Growth",
    icon: Target,
    services: [
      { name: "Technical SEO", slug: "seo", icon: Search },
      { name: "Google & Search Ads", slug: "google-ads", icon: Target },
      { name: "Meta & Social Ads", slug: "meta-ads", icon: Share2 },
      {
        name: "Social Media Growth",
        slug: "social-media-management",
        icon: Share2,
      },
    ],
  },
  {
    name: "04 Brand & Creative",
    icon: Palette,
    services: [
      { name: "UI/UX & Product Design", slug: "ui-ux-design", icon: Layout },
      { name: "Brand Identity", slug: "graphic-designing", icon: Palette },
      { name: "Video & Motion Media", slug: "video-editing", icon: Video },
    ],
  },
];

export function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);

  const pathname = usePathname();
  const { data: settingsData } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      apiFetch<{ success: boolean; data: Record<string, string> }>("/settings"),
  });
  const settings = settingsData?.data || {};
  const calendlyUrl = "/contact";
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSupportsHover(window.matchMedia("(hover: hover)").matches);

    // Initialize Google Translate Element Widget
    if (typeof window !== "undefined") {
      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,id,de,ko,ja,zh-CN,nl,ru,it,es,fr",
            layout: (window as any).google.translate.TranslateElement
              .InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element",
        );
      };
    }

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setScrollY(entry.isIntersecting ? 0 : 100);
        }
      },
      {
        root: null, // viewport
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.unobserve(sentinel);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesDropdownOpen(false);
      }
    };
    if (isServicesDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServicesDropdownOpen]);

  const navLinks = [
    { name: "Services", href: "/services", isDropdown: true },
    { name: "Work", href: "/work" },
    { name: "Approach", href: "/about#process" },
    { name: "Industries", href: "/#industries" },
    { name: "Insights", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  const isScrolled = scrollY > 20;

  return (
    <>
      <div
        ref={sentinelRef}
        id="nav-sentinel"
        className="absolute top-0 left-0 h-px w-px pointer-events-none"
      />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 h-16 flex items-center",
          isScrolled
            ? "bg-white/95 dark:bg-[#07090D]/95 border-b border-border shadow-[0_1px_20px_rgba(0,0,0,0.06)] backdrop-blur-md"
            : "bg-white/50 dark:bg-transparent backdrop-blur-[6px] dark:backdrop-blur-0 border-b border-border/10 dark:border-transparent",
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 focus:outline-none group"
          >
            <div className="h-8 w-[40px] relative shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo-symbol-light.png"
                alt="Adruva Solution Logo | Technology & AI Agency"
                fill
                sizes="40px"
                className="object-contain hidden dark:block"
                priority
              />
              <Image
                src="/logo-symbol-dark.png"
                alt="Adruva Solution Logo | Technology & AI Agency"
                fill
                sizes="40px"
                className="object-contain block dark:hidden"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-[800] tracking-tight text-foreground transition-colors font-sora leading-none">
                ADRUVA
              </span>
              <span className="text-[7.5px] font-bold tracking-[0.22em] text-brand-blue uppercase font-space mt-0.5">
                SOLUTION
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 h-16">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.isDropdown && pathname.startsWith("/services"));

              if (link.isDropdown) {
                return (
                  <div
                    key={link.name}
                    ref={dropdownRef}
                    className="relative flex items-center h-full"
                    onMouseEnter={() => {
                      if (supportsHover) setIsServicesDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      if (supportsHover) setIsServicesDropdownOpen(false);
                    }}
                  >
                    <Link
                      href="/services"
                      onClick={(e) => {
                        if (!supportsHover) {
                          e.preventDefault();
                          setIsServicesDropdownOpen(!isServicesDropdownOpen);
                        }
                      }}
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand-blue text-foreground/75 hover:text-foreground dark:text-muted-foreground dark:hover:text-white font-manrope",
                        isActive &&
                          "text-foreground dark:text-white font-semibold",
                      )}
                    >
                      {link.name}
                      <ChevronDown className="h-4 w-4" />
                    </Link>

                    {/* Services Mega Menu Dropdown */}
                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="fixed left-0 right-0 top-16 w-full bg-card border-b border-border shadow-2xl rounded-b-2xl z-50 overflow-hidden"
                          onMouseEnter={() => {
                            if (supportsHover) setIsServicesDropdownOpen(true);
                          }}
                          onMouseLeave={() => {
                            if (supportsHover) setIsServicesDropdownOpen(false);
                          }}
                        >
                          <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 px-8 py-8">
                            {serviceCategories.map((category) => (
                              <div
                                key={category.name}
                                className="flex flex-col space-y-4"
                              >
                                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-blue font-space">
                                  {category.name}
                                </h4>
                                <ul className="flex flex-col space-y-2">
                                  {category.services.map((service) => {
                                    const ServiceIcon = service.icon;
                                    return (
                                      <li key={service.slug}>
                                        <Link
                                          href={`/services/${service.slug}`}
                                          className="flex items-center gap-2.5 py-1 px-2 -mx-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-brand-card-dark border-l-2 border-transparent hover:border-brand-blue transition-all duration-200"
                                          onClick={() =>
                                            setIsServicesDropdownOpen(false)
                                          }
                                        >
                                          <ServiceIcon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-brand-blue" />
                                          <span className="font-medium font-manrope">
                                            {service.name}
                                          </span>
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* Dropdown footer banner */}
                          <div className="bg-muted/40 border-t border-border px-8 py-3.5 flex items-center justify-between">
                            <span className="text-[11px] text-muted-foreground font-medium font-manrope">
                              Looking for custom software architecture or AI
                              automation? Let&apos;s engineer together.
                            </span>
                            <Link
                              href="/contact"
                              className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark transition-colors flex items-center gap-1 font-space"
                              onClick={() => setIsServicesDropdownOpen(false)}
                            >
                              Book a Consultation
                              <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-brand-blue relative text-foreground/75 hover:text-foreground dark:text-muted-foreground dark:hover:text-white flex items-center h-full font-manrope",
                    isActive && "text-foreground dark:text-white font-semibold",
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-blue"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Actions Flex wrapper */}
          <div className="flex items-center gap-3">
            <div id="google_translate_element" className="scale-90" />

            <div className="hidden md:flex items-center gap-4 h-16">
              <ThemeToggle />
              <Link href="/contact">
                <Button className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs px-5 h-9 rounded-lg font-semibold font-space flex items-center gap-1.5 shadow-[0_4px_14px_rgba(8,120,249,0.3)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  <Calendar className="h-3.5 w-3.5" />
                  Book a Consultation &rarr;
                </Button>
              </Link>
            </div>

            <div className="flex md:hidden items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  "p-2 rounded-lg border transition-colors",
                  isScrolled
                    ? "border-border hover:bg-black/5 text-foreground"
                    : "border-border hover:bg-muted text-foreground dark:text-white dark:border-white/10",
                )}
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        calendlyUrl={calendlyUrl}
      />
    </>
  );
}

export default Navbar;
