"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layers,
  Bolt,
  Coins,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  Sparkle,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/CTASection";
import { SectionTag } from "@/components/ui/section-tag";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

const teamMembers = [
  {
    initials: "D.K.",
    name: "D.K.",
    role: "Full Stack Developer",
    gradient: "from-blue-600 to-blue-900",
    photoUrl: null as string | null,
  },
  {
    initials: "L.K.",
    name: "L.K.",
    role: "Project Manager",
    gradient: "from-orange-500 to-red-700",
    photoUrl: null as string | null,
  },
  {
    initials: "N.K.",
    name: "N.K.",
    role: "Marketing Lead",
    gradient: "from-green-500 to-emerald-800",
    photoUrl: null as string | null,
  },
  {
    initials: "S.K.",
    name: "S.K.",
    role: "UI/UX Designer",
    gradient: "from-purple-500 to-violet-800",
    photoUrl: null as string | null,
  },
  {
    initials: "A.K.",
    name: "A.K.",
    role: "AI Specialist",
    gradient: "from-cyan-500 to-blue-700",
    photoUrl: null as string | null,
  },
  {
    initials: "R.K.",
    name: "R.K.",
    role: "SEO Expert",
    gradient: "from-yellow-500 to-orange-600",
    photoUrl: null as string | null,
  },
];

function mapDbTeamToMember(dbMember: any) {
  const initials = dbMember.name
    ? dbMember.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AT";

  const gradients = [
    "from-blue-600 to-blue-900",
    "from-orange-500 to-red-700",
    "from-green-500 to-emerald-800",
    "from-purple-500 to-violet-800",
    "from-cyan-500 to-blue-700",
    "from-yellow-500 to-orange-600",
  ];
  const charSum = dbMember.name
    .split("")
    .reduce((sum: number, char: string) => sum + char.charCodeAt(0), 0);
  const gradient = gradients[charSum % gradients.length];

  return {
    initials,
    name: dbMember.name,
    role: dbMember.designation,
    photoUrl: dbMember.photoUrl || null,
    gradient,
  };
}

const whyChooseUs = [
  {
    icon: Layers,
    title: "End-to-end service",
    desc: "One partner for your entire digital cycle — from wireframe designs to complex AI integrations.",
  },
  {
    icon: Bolt,
    title: "Fast delivery + transparent communication",
    desc: "No corners cut. We work in rapid sprints with live dashboards so you see real daily updates.",
  },
  {
    icon: Coins,
    title: "Affordable pricing without compromising quality",
    desc: "Enterprise-grade system structures scaled to fit local business development budgets.",
  },
  {
    icon: UserCheck,
    title: "Dedicated project manager for every project",
    desc: "A single point of contact coordinating all code deliverables, timelines, and launch scopes.",
  },
  {
    icon: ShieldCheck,
    title: "Secure client portal — professional management",
    desc: "Collaborate and access files, milestones, invoices, and reports securely.",
  },
];

interface AboutPageClientProps {
  initialTeam?: any[];
}

export function AboutPageClient({ initialTeam }: AboutPageClientProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { data: settingsData } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      apiFetch<{ success: boolean; data: Record<string, string> }>("/settings"),
  });
  const settings = settingsData?.data || {};
  const calendlyUrl = "/contact";

  const list =
    initialTeam && initialTeam.length > 0
      ? initialTeam.map(mapDbTeamToMember)
      : teamMembers;

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  const fadeInUp = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  return (
    <div className="w-full bg-background text-foreground transition-colors duration-300">
      {/* a) Hero Section */}
      <Section className="pt-12 pb-16 md:pt-16 md:pb-24 relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/5 via-transparent to-transparent pointer-events-none select-none z-0" />

        <Container className="relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-semibold text-brand-orange mb-5 font-space-grotesk">
              <Sparkle className="h-3 w-3 fill-brand-orange text-brand-orange animate-pulse" />
              ABOUT US
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-navy dark:text-white mb-6 font-poppins">
              About Adruva Solution
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl font-bold text-brand-orange tracking-tight font-space-grotesk">
              &ldquo;We are your business and productivity partner&rdquo;
            </p>
          </div>
        </Container>
      </Section>

      {/* b) Company Story Section */}
      <Section className="border-t border-border/20 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-24">
              <SectionTag>OUR STORY</SectionTag>
              <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white mb-6 font-poppins">
                Why We Started
              </h2>
              <div className="h-1 w-12 bg-brand-orange rounded-full" />
            </div>

            <div className="lg:col-span-7">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="space-y-6 text-sm text-muted-foreground leading-relaxed font-inter"
              >
                <motion.p variants={fadeInUp}>
                  In Dehradun and across regional business hubs, we noticed a
                  persistent and frustrating gap: local businesses were
                  struggling to find quality technical development partners.
                  Many business owners had brilliant ideas but were constantly
                  held back by unreliable code or poor configurations.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  Most digital agencies fell into two frustrating extremes —
                  they were either prohibitively expensive for startups and
                  local businesses, or they worked painfully slow, yielding
                  low-quality code that failed to translate into real business
                  inquiries or conversions.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  We founded **Adruva Solution** to directly resolve this
                  imbalance. Our goal was simple: provide transparent
                  communication, fast sprints, and premium, enterprise-grade
                  engineering at pricing models built for growing businesses.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  Today, we have grown into a full-stack engineering,
                  automation, and digital marketing team. We have built POS
                  systems, automated WhatsApp lead qualifiers, optimized
                  high-ROI Google Ads campaigns, and continues to empower
                  businesses with honest technical counsel.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* c) Mission + Vision + Values */}
      <Section className="bg-muted/10 border-y border-border/20 py-16 md:py-24">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Mission Card */}
            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-2xl border border-border/40 bg-card shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-4 font-space-grotesk">
                  OUR MISSION
                </span>
                <p className="text-sm font-semibold text-brand-navy dark:text-white leading-relaxed font-inter">
                  &ldquo;To empower businesses with cutting-edge
                  technology&rdquo;
                </p>
              </div>
              <div className="border-t border-border/20 pt-4 mt-6 text-xs text-muted-foreground font-inter">
                Building custom web systems to streamline regional operations.
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-2xl border border-border/40 bg-card shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-4 font-space-grotesk">
                  OUR VISION
                </span>
                <p className="text-sm font-semibold text-brand-navy dark:text-white leading-relaxed font-inter">
                  &ldquo;To make enterprise-grade tech accessible to every
                  business&rdquo;
                </p>
              </div>
              <div className="border-t border-border/20 pt-4 mt-6 text-xs text-muted-foreground font-inter">
                Eliminating complex seat pricing and subscription locks.
              </div>
            </motion.div>

            {/* Values Card */}
            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-2xl border border-border/40 bg-card shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-4 font-space-grotesk">
                  OUR CORE VALUES
                </span>
                <ul className="space-y-2 text-xs font-semibold text-brand-navy/90 dark:text-white/95 font-inter">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                    Transparency (no hidden charges, honest scopes)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                    Quality (enterprise systems, no shortcuts)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                    Speed (agile sprints, reliable deliveries)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                    Partnership (we grow when our clients grow)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                    Innovation (utilizing next-gen frameworks)
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* d) Why Choose Adruva */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionTag className="justify-center">WHY CHOOSE US</SectionTag>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
              5 reasons clients trust Adruva
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-4 mx-auto" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={cn(
                    "p-6 rounded-2xl border border-border/40 bg-card transition-all duration-300 shadow-sm",
                    index === 4 && "md:col-span-2 lg:col-span-1",
                  )}
                >
                  <div className="inline-flex p-2.5 rounded-xl bg-brand-orange/10 text-brand-orange mb-5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-2 font-poppins">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-inter">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* e) Team Section */}
      <Section className="bg-muted/10 border-y border-border/20 py-16 md:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionTag className="justify-center">OUR TEAM</SectionTag>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
              Meet the people behind Adruva
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-4 mx-auto" />
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {list.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                className={cn(
                  "flex flex-col items-center text-center p-6 rounded-2xl border border-border/40 bg-card transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-lg hover:border-brand-orange/30",
                )}
              >
                {/* Photo or Initials circle avatar */}
                <div className="h-16 w-16 rounded-full overflow-hidden mb-4 relative shadow-md">
                  {member.photoUrl ? (
                    <NextImage
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className={cn(
                        "h-full w-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg shadow-inner select-none font-space-grotesk",
                        member.gradient,
                      )}
                    >
                      {member.initials}
                    </div>
                  )}
                </div>

                <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-1 font-poppins">
                  {member.name}
                </h3>
                <span className="text-xs font-semibold text-brand-orange font-space-grotesk uppercase tracking-wider">
                  {member.role}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* f) Hiring Banner */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-2xl mx-auto mt-16 p-6 rounded-2xl border border-brand-orange/20 bg-brand-orange/5 text-center relative overflow-hidden backdrop-blur-sm"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full filter blur-xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-1 font-poppins">
              We&apos;re growing! Join our team 🚀
            </h3>
            <p className="text-xs text-muted-foreground mb-4 font-inter">
              Help us empower regional businesses with transparent technology.
            </p>
            <Link href="/careers">
              <Button
                variant="link"
                className="text-xs font-bold text-brand-orange hover:text-brand-orange-hover p-0 h-auto flex items-center gap-1 mx-auto font-inter"
              >
                Check out our open positions
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </Section>

      {/* g) Final CTA */}
      <CTASection
        title="Interested in working with us?"
        subtitle="Book a free 30-minute discovery call. We'll map out a clear technology roadmap for your business scaling."
        primaryCTA={{
          text: "Book a Free Call",
          href: calendlyUrl,
        }}
        secondaryCTA={{
          text: "See Our Services",
          href: "/services",
        }}
      />
    </div>
  );
}
export default AboutPageClient;
