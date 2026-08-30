"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  ArrowRight,
  Utensils,
  Scissors,
  Hospital,
  Building2,
  Compass,
  Dumbbell,
  GraduationCap,
  Pill,
  Plane,
  ShoppingBag,
  Home,
  Car,
  Camera,
  Coffee,
  Laptop,
  BookOpen,
  PartyPopper,
  LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

interface IndustryItem {
  name: string;
  icon: LucideIcon;
}

const industries: IndustryItem[] = [
  { name: "Restaurants", icon: Utensils },
  { name: "Salons & Spas", icon: Scissors },
  { name: "Clinics & Hospitals", icon: Hospital },
  { name: "Real Estate", icon: Building2 },
  { name: "Yoga Retreats", icon: Compass },
  { name: "Gyms & Fitness", icon: Dumbbell },
  { name: "Schools & Institutes", icon: GraduationCap },
  { name: "Medical Practices", icon: Pill },

  { name: "Travel Agencies", icon: Plane },
  { name: "Retail Businesses", icon: ShoppingBag },
  { name: "Interior Design", icon: Home },
  { name: "Auto Services", icon: Car },
  { name: "Photography Studios", icon: Camera },
  { name: "Bakeries & Cafes", icon: Coffee },
  { name: "IT & Tech Startups", icon: Laptop },
  { name: "Coaching Centres", icon: BookOpen },
  { name: "Event Management", icon: PartyPopper },
];

export function WhoWeServe() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  const calendlyUrl = "/contact";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 1, scale: 1 }
      : { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full bg-background-secondary/40 py-20 transition-colors duration-300">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left mb-10 mx-auto lg:mx-0 max-w-[600px] lg:max-w-none">
          <span className="section-tag mb-3">WHO WE SERVE</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground max-w-[600px] font-poppins">
            If you have customers, we can help you grow.
          </h2>
          <p className="text-sm text-muted-foreground max-w-[500px] mt-4 font-inter">
            We work with any local or service-based business looking to scale
            operations and digital outreach.
          </p>
        </div>

        {/* Industry Tags Cloud */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap justify-center lg:justify-start gap-2.5 my-10"
        >
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.name}
                variants={itemVariants}
                className="flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2.5 text-sm font-medium text-foreground hover:border-brand-orange hover:text-brand-orange hover:bg-accent transition-all duration-150 cursor-pointer font-inter select-none group"
              >
                <Icon className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-brand-orange transition-colors shrink-0" />
                <span>{ind.name}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Box */}
        <div className="w-full bg-card border border-border rounded-[16px] p-7 md:p-8 flex flex-col md:flex-row justify-between items-center md:items-center text-center md:text-left gap-6 mt-8 shadow-sm">
          <div className="flex flex-col gap-1.5 items-center md:items-start">
            <h4 className="text-base font-bold text-foreground font-poppins">
              Not sure if we serve your niche?
            </h4>
            <p className="text-sm text-muted-foreground font-inter">
              Book a free 30-minute call to discuss your business requirements
              and custom workflows.
            </p>
          </div>

          <a
            href={calendlyUrl}
            target={calendlyUrl.startsWith("http") ? "_blank" : undefined}
            rel={
              calendlyUrl.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="w-full md:w-auto shrink-0"
          >
            <Button className="w-full md:w-auto bg-brand-orange hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-full flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(255,107,0,0.25)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              <Calendar className="h-4 w-4" />
              Book a Free Call
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </Container>
    </section>
  );
}

export default WhoWeServe;
