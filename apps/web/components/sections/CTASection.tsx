"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export function CTASection({
  title = "Ready to grow your business digitally?",
  subtitle = "Book a free 30-minute discovery call. No commitment, no sales pitch — just honest advice and a clear growth roadmap.",
  primaryCTA,
  secondaryCTA,
}: CTAProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  const calendlyUrl = "/contact";

  const defaultPrimaryCTA = primaryCTA || {
    text: "Book a Free Call",
    href: calendlyUrl,
  };

  const defaultSecondaryCTA = secondaryCTA || {
    text: "See Our Services",
    href: "/services",
  };

  const fadeInUp = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <Section className="bg-background py-16 md:py-24">
      <Container>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={cn(
            "relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1f3a] to-[#071324] border border-brand-orange/15 text-white text-center p-8 md:p-16 max-w-4xl mx-auto shadow-2xl",
            "dark:from-[#0d172e] dark:to-[#050914]",
          )}
        >
          {/* Brand Orange Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.12)_0%,transparent_65%)] pointer-events-none select-none z-0" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            {/* Title (Poppins) */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4 font-poppins text-white">
              {title}
            </h2>

            {/* Subtitle (Inter) */}
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-8 max-w-lg font-inter">
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-xs sm:max-w-none items-center justify-center">
              <a
                href={defaultPrimaryCTA.href}
                target={
                  defaultPrimaryCTA.href.startsWith("http")
                    ? "_blank"
                    : undefined
                }
                rel={
                  defaultPrimaryCTA.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.02] active:scale-[0.98] h-11 px-5 rounded-lg text-xs"
                >
                  <Calendar className="h-4 w-4" />
                  {defaultPrimaryCTA.text}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </a>

              <Link
                href={defaultSecondaryCTA.href}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto text-white border border-white/15 hover:bg-white/5 hover:text-white font-semibold h-11 px-5 rounded-lg text-xs"
                >
                  {defaultSecondaryCTA.text}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

export default CTASection;
