"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Sparkle,
  Target,
  Eye,
  Rocket,
  Code2,
  LineChart,
  Users,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { CTASection } from "@/components/sections/CTASection";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    initials: "D.K.",
    name: "D.K.",
    role: "Founder & Full Stack Developer",
    gradient: "from-blue-600 to-blue-900",
    photoUrl: "/team/dk.jpg",
  },
  {
    initials: "L.K.",
    name: "L.K.",
    role: "Project Manager",
    gradient: "from-orange-500 to-red-700",
    photoUrl: "/team/lk.jpg",
  },
  {
    initials: "N.K.",
    name: "N.K.",
    role: "Marketing Lead",
    gradient: "from-green-500 to-emerald-800",
    photoUrl: "/team/nk.jpg",
  },
  {
    initials: "S.K.",
    name: "S.K.",
    role: "UI/UX Designer",
    gradient: "from-purple-500 to-violet-800",
    photoUrl: "/team/sk.jpg",
  },
];

const timeline = [
  {
    step: "01",
    title: "The Beginning",
    desc: "Adruva was founded in Rishikesh with a vision to bridge the gap between local businesses and premium engineering.",
  },
  {
    step: "02",
    title: "Scaling Up",
    desc: "Expanded our team and started delivering end-to-end digital solutions, combining SEO, Marketing, and Web Apps.",
  },
  {
    step: "03",
    title: "Automation Focus",
    desc: "Pioneered custom WhatsApp automation workflows and high-conversion landing pages for regional service industries.",
  },
  {
    step: "04",
    title: "Global Reach",
    desc: "Working with international clients, building enterprise-level SaaS products and scaling high-budget Meta/Google ad campaigns.",
  },
];

const philosophy = [
  {
    icon: Code2,
    title: "Enterprise-Grade Engineering",
    desc: "We don't do quick fixes. We build scalable, secure, and robust architectures using modern frameworks that stand the test of time.",
  },
  {
    icon: LineChart,
    title: "Data-Driven Decisions",
    desc: "Every design tweak and marketing campaign is backed by hard ROI metrics. If it doesn't make you money or save you time, we don't do it.",
  },
  {
    icon: Users,
    title: "Transparent Partnership",
    desc: "No hidden fees, no confusing tech-jargon. You get direct access to our live development dashboards and regular progress sprints.",
  },
];

function mapDbTeamToMember(dbMember: Record<string, any>) {
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

interface AboutPageClientProps {
  initialTeam?: Record<string, any>[];
}

export function AboutPageClient({ initialTeam }: AboutPageClientProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
    },
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-background text-foreground transition-colors duration-300">
      {/* 1. Hero Section */}
      <Section className="pt-20 pb-16 md:pt-28 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-orange/10 dark:bg-brand-orange/20 blur-[120px]" />
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[100px]" />
        </div>

        <Container className="relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold tracking-wider text-brand-orange mb-6 font-space-grotesk shadow-sm">
              <Sparkle className="h-4 w-4 fill-brand-orange text-brand-orange animate-pulse" />
              OUR STORY & VISION
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 font-poppins leading-[1.1]">
              Engineering growth for <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">
                modern businesses
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 font-inter max-w-2xl leading-relaxed mb-10">
              We are an elite team of developers, designers, and strategists
              transforming complex business challenges into elegant digital
              solutions.
            </p>
          </div>
        </Container>
      </Section>

      {/* 3. Refined 'Our Story' (Split Layout) */}
      <Section className="py-20 md:py-32 relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Text */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 font-poppins">
                  Why We Started
                </h2>
                <div className="h-1.5 w-16 bg-brand-orange rounded-full" />
              </div>
              <div className="space-y-6 text-base md:text-lg text-slate-600 dark:text-gray-300 leading-relaxed font-inter">
                <motion.p variants={fadeInUp}>
                  In Rishikesh and across regional business hubs, we noticed a
                  persistent and frustrating gap: local businesses were
                  struggling to find quality technical development partners.
                  Many business owners had brilliant ideas but were constantly
                  held back by unreliable code or poor configurations.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  Most digital agencies fell into two frustrating extremes —
                  they were either prohibitively expensive for startups, or they
                  worked painfully slow, yielding low-quality code that failed
                  to translate into real business inquiries or conversions.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  We founded{" "}
                  <strong className="text-slate-900 dark:text-white">
                    Adruva Solution
                  </strong>{" "}
                  to directly resolve this imbalance. Our goal was simple:
                  provide transparent communication, fast sprints, and premium,
                  enterprise-grade engineering at pricing models built for
                  growing businesses.
                </motion.p>
              </div>
            </motion.div>

            {/* Right: Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-brand-navy p-8 flex flex-col justify-between">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Sparkle className="w-8 h-8 text-brand-orange" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2 font-poppins">
                    Built differently.
                  </h3>
                  <p className="text-slate-300 font-inter">
                    We don&apos;t just write code. We architect scalable
                    business solutions.
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* 4. Our Journey (Timeline) */}
      <Section className="py-20 md:py-32 bg-white dark:bg-[#0A0A0A] border-y border-slate-200 dark:border-white/10 relative">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins mb-6">
              Our Journey So Far
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 font-inter">
              From a small local initiative to a trusted digital partner for
              global brands.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-orange/50 via-brand-orange/20 to-transparent -translate-x-1/2 rounded-full" />

            <div className="space-y-12 md:space-y-0">
              {timeline.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 w-8 h-8 bg-brand-orange rounded-full border-4 border-white dark:border-[#0A0A0A] -translate-x-1/2 items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.4)] z-10" />
                  {/* Mobile Dot */}
                  <div className="md:hidden flex items-center mb-4 self-start">
                    <div className="w-4 h-4 bg-brand-orange rounded-full mr-4 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                    <span className="text-xl font-bold text-brand-orange font-space-grotesk">
                      {item.step}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-1/2 ${idx % 2 === 0 ? "md:pl-16" : "md:pr-16"}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="p-8 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-brand-orange/30 dark:hover:border-brand-orange/30 transition-colors shadow-sm"
                    >
                      <span className="hidden md:block text-5xl font-black text-brand-orange/10 dark:text-brand-orange/10 absolute top-4 right-8 select-none">
                        {item.step}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-poppins relative z-10">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-gray-400 font-inter leading-relaxed relative z-10">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Mission, Vision & Core Values (Bento Grid) */}
      <Section className="py-20 md:py-32 relative overflow-hidden">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-poppins">
              What Drives Us
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Mission (Span 2) */}
            <motion.div
              variants={fadeInUp}
              className="md:col-span-2 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0A0A] shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-brand-orange/40 transition-colors relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[80px] group-hover:bg-brand-orange/10 transition-colors duration-500" />
              <Target className="w-10 h-10 text-brand-orange mb-6" />
              <h3 className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2 font-space-grotesk">
                Our Mission
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-snug font-poppins mb-4">
                To empower businesses with cutting-edge technology & automation.
              </p>
              <p className="text-slate-600 dark:text-gray-400 font-inter max-w-xl">
                We build custom web systems to streamline regional operations,
                removing manual bottlenecks so founders can focus on growth.
              </p>
            </motion.div>

            {/* Vision (Span 1) */}
            <motion.div
              variants={fadeInUp}
              className="p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0A0A] shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-blue-500/40 transition-colors relative overflow-hidden group"
            >
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px] group-hover:bg-blue-500/10 transition-colors duration-500" />
              <Eye className="w-10 h-10 text-blue-500 mb-6" />
              <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2 font-space-grotesk">
                Our Vision
              </h3>
              <p className="text-xl font-bold text-slate-900 dark:text-white leading-snug font-poppins mb-4">
                To make enterprise-grade tech accessible.
              </p>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-inter">
                Eliminating complex seat pricing and subscription locks for
                ambitious brands.
              </p>
            </motion.div>

            {/* Core Values (Span 3 horizontally) */}
            <motion.div
              variants={fadeInUp}
              className="md:col-span-3 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-r dark:from-[#0A0A0A] dark:to-[#111] shadow-xl shadow-slate-200/50 dark:shadow-none"
            >
              <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start md:items-center">
                <div className="md:w-1/3">
                  <Rocket className="w-10 h-10 text-brand-orange mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-poppins">
                    Core Values
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400 font-inter mt-2">
                    The principles that guide every line of code we write.
                  </p>
                </div>
                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {[
                    {
                      title: "Transparency",
                      desc: "No hidden charges, honest scopes.",
                    },
                    {
                      title: "Quality",
                      desc: "Enterprise systems, no shortcuts.",
                    },
                    {
                      title: "Speed",
                      desc: "Agile sprints, reliable deliveries.",
                    },
                    {
                      title: "Partnership",
                      desc: "We grow when our clients grow.",
                    },
                  ].map((val, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02]"
                    >
                      <span className="h-2 w-2 mt-1.5 rounded-full bg-brand-orange shrink-0" />
                      <div>
                        <strong className="block text-sm text-slate-900 dark:text-white font-poppins">
                          {val.title}
                        </strong>
                        <span className="text-xs text-slate-600 dark:text-gray-400 font-inter">
                          {val.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* 6. The Adruva Philosophy */}
      <Section className="py-20 md:py-32 bg-slate-100 dark:bg-[#050A15] border-y border-slate-200 dark:border-white/5">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins mb-6">
              Our Philosophy
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 font-inter">
              We don&apos;t just act as vendors; we act as your technical
              co-founders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophy.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#0A1428] border border-slate-200 dark:border-brand-orange/20 shadow-lg flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-poppins">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400 font-inter leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 7. Team Section */}
      <Section className="py-20 md:py-32 bg-white dark:bg-background relative">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <span className="text-xs font-semibold text-blue-500 tracking-wider uppercase">
                The Experts
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-poppins">
              Meet the people behind Adruva
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {list.map((member, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group relative rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0A0A0A] overflow-hidden hover:border-brand-orange/30 dark:hover:border-brand-orange/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="aspect-square w-full p-6 flex items-center justify-center relative">
                  <div
                    className={cn(
                      "w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-inner relative z-10 overflow-hidden bg-gradient-to-br",
                      member.gradient,
                    )}
                  >
                    {member.photoUrl ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      member.initials
                    )}
                  </div>
                  {/* Decorative glowing ring */}
                  <div className="absolute inset-0 m-auto w-32 h-32 rounded-full border border-slate-200 dark:border-white/5 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
                </div>
                <div className="p-5 text-center border-t border-slate-200 dark:border-white/5 bg-white dark:bg-transparent">
                  <h4 className="text-sm md:text-base font-bold text-slate-900 dark:text-white font-poppins mb-1">
                    {member.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-gray-400 font-inter">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* 8. CTA */}
      <CTASection
        primaryCTA={{
          text: "Start Your Project",
          href: "/contact",
        }}
        secondaryCTA={{
          text: "View Our Services",
          href: "/services",
        }}
      />
    </div>
  );
}

export default AboutPageClient;
