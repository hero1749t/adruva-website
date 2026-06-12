'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  Award, 
  Rocket, 
  Users, 
  GraduationCap, 
  Heart,
  ArrowRight,
  Briefcase,
  Clock,
  Search,
  CheckCircle2,
  Calendar,
  Sparkle
} from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionTag } from '@/components/ui/section-tag';
import { mockJobs, JOB_TYPES, LOCATIONS, DEFAULT_PROCESS_STEPS, ProcessStep } from '@/lib/careers-data';
import { cn } from '@/lib/utils';

const cultureCards = [
  {
    icon: Home,
    title: 'Work from Anywhere',
    desc: 'Hybrid model with flexible schedules. Choose to work from home or collaborate at our Dehradun office.',
    color: 'text-orange-500 bg-orange-500/10'
  },
  {
    icon: BookOpen,
    title: 'Learning & Growth',
    desc: 'Dedicated learning budgets, technical courses, and direct guidance to master new modern stacks.',
    color: 'text-blue-500 bg-blue-500/10'
  },
  {
    icon: Award,
    title: 'Real Ownership',
    desc: 'You own client modules and lead system deliveries, not just simple tickets in a queue.',
    color: 'text-purple-500 bg-purple-500/10'
  },
  {
    icon: Rocket,
    title: 'Startup Speed',
    desc: 'Ship clean code daily, validate logic, and accelerate your career progression at startup pace.',
    color: 'text-red-500 bg-red-500/10'
  },
  {
    icon: Users,
    title: 'Direct Mentorship',
    desc: 'Learn advanced backend architecture and high-converting marketing directly from senior leads.',
    color: 'text-green-500 bg-green-500/10'
  },
  {
    icon: GraduationCap,
    title: 'Certificate & LOR',
    desc: 'For internships: receive formal certificates and highly detailed Letters of Recommendation.',
    color: 'text-yellow-500 bg-yellow-500/10'
  },
  {
    icon: Heart,
    title: 'Friendly Culture',
    desc: 'High-performing, small collaborative team. Zero corporate politics or unnecessary layers.',
    color: 'text-pink-500 bg-pink-500/10'
  }
];

const fullTimePerks = [
  'Competitive monthly salary with scheduled performance hikes',
  'Flexible hybrid work schedules (3 days office, 2 days remote)',
  'Dedicated study allowance and technical certification coverage',
  'Fast-tracked career promotion routes and team building trips',
  'Modern ergonomic workspace at our Dehradun office hub',
  'Active guidance and direct feedback on high-scale systems'
];

const internPerks = [
  'Market-competitive monthly stipend with performance updates',
  'Flexible working periods with consideration for academic schedules',
  'Formal Internship Certificate on completion of tasks',
  'Detailed Letter of Recommendation signed by our founders',
  'Direct daily pair-programming and mentorship sessions',
  'Potential Pre-Placement Offer (PPO) for full-time conversion'
];

export function CareersPageClient() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedLoc, setSelectedLoc] = useState<string>('all');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const activeJobs = mockJobs.filter(job => job.status === 'active');

  const filteredJobs = activeJobs.filter((job) => {
    const typeMatch = selectedType === 'all' || job.type === selectedType;
    const deptMatch = selectedDept === 'all' || job.department === selectedDept;
    const locMatch = selectedLoc === 'all' || job.location_type === selectedLoc;
    return typeMatch && deptMatch && locMatch;
  });

  const uniqueDepartments = Array.from(new Set(activeJobs.map(job => job.department)));

  const handleResetFilters = () => {
    setSelectedType('all');
    setSelectedDept('all');
    setSelectedLoc('all');
  };

  const fadeInUp = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
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

  const scrollToPositions = () => {
    const element = document.getElementById('open-positions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-background text-foreground transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <Section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-border/10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/5 via-transparent to-transparent pointer-events-none z-0" />
        <Container className="relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-semibold text-brand-orange mb-5 font-space-grotesk">
              <Sparkle className="h-3.5 w-3.5 fill-brand-orange text-brand-orange animate-pulse" />
              JOIN OUR TEAM
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-navy dark:text-white mb-6 font-poppins">
              Where Your Career Meets <span className="text-brand-orange">Real Impact</span>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-8 font-inter">
              Build production software, handle advanced API automations, and expand your technical boundaries. Work directly with senior leads at a rapid startup pace.
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center mb-10 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5 bg-muted/40 px-3 py-1.5 rounded-lg border border-border/30">
                <Briefcase className="h-3.5 w-3.5 text-brand-orange" />
                {activeJobs.length} Open Positions
              </span>
              <span className="flex items-center gap-1.5 bg-muted/40 px-3 py-1.5 rounded-lg border border-border/30">
                <Home className="h-3.5 w-3.5 text-brand-orange" />
                Hybrid / Remote Friendly
              </span>
              <span className="flex items-center gap-1.5 bg-muted/40 px-3 py-1.5 rounded-lg border border-border/30">
                <Rocket className="h-3.5 w-3.5 text-brand-orange" />
                Zero Corporate Politics
              </span>
            </div>
            <Button 
              onClick={scrollToPositions}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold rounded-lg px-6 h-11 flex items-center gap-1.5 shadow-[0_4px_14px_rgba(255,107,0,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              View Open Positions
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* 2. Life at Adruva (Culture) */}
      <Section className="py-16 md:py-24 border-b border-border/10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionTag className="justify-center">OUR CULTURE</SectionTag>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
              Why people love working here
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-4 mx-auto" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {cultureCards.map((card, index) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={cn(
                    'p-6 rounded-2xl border border-border/30 bg-card/50 transition-all duration-300 shadow-sm',
                    'hover:border-brand-orange/30 hover:bg-card hover:shadow-[0_8px_30px_rgba(255,107,0,0.04)]',
                    index === 6 && 'md:col-span-2 lg:col-span-1'
                  )}
                >
                  <div className={cn('inline-flex p-3 rounded-xl mb-5 text-sm font-semibold', card.color)}>
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-2 font-poppins">
                    {card.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-inter">
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* 3. Benefits & Perks */}
      <Section className="py-16 md:py-24 bg-muted/10 border-b border-border/10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionTag className="justify-center">WHAT YOU GET</SectionTag>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
              Benefits that actually matter
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-4 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Full Time Perks */}
            <div className="p-8 rounded-2xl border border-border/40 bg-card shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="p-1.5 rounded-lg bg-brand-orange/10 text-brand-orange">
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-bold text-brand-navy dark:text-white font-poppins">
                    Full-Time Roles
                  </h3>
                </div>
                <ul className="space-y-4">
                  {fullTimePerks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground leading-relaxed font-inter">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-border/20 pt-6 mt-8 text-xs text-muted-foreground font-inter">
                Structured contract milestones, hardware assistance, and yearly performance adjustments.
              </div>
            </div>

            {/* Internship Perks */}
            <div className="p-8 rounded-2xl border border-border/40 bg-card shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="p-1.5 rounded-lg bg-brand-orange/10 text-brand-orange">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-bold text-brand-navy dark:text-white font-poppins">
                    Internship Roles
                  </h3>
                </div>
                <ul className="space-y-4">
                  {internPerks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground leading-relaxed font-inter">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-border/20 pt-6 mt-8 text-xs text-muted-foreground font-inter">
                Mentoring reviews, code audits, formal LOR certificate validation, and full-time conversion evaluation.
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Hiring Process */}
      <Section className="py-16 md:py-24 border-b border-border/10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionTag className="justify-center">HOW WE HIRE</SectionTag>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
              Our default hiring process
            </h2>
            <p className="text-xs text-muted-foreground mt-2 max-w-lg mx-auto font-inter">
              We aim to review profiles and respond to candidates within 7 business days.
            </p>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-4 mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto relative pl-6 md:pl-0">
            {/* Center line for timeline on desktop */}
            <div className="absolute top-0 bottom-0 left-3.5 md:left-1/2 w-0.5 bg-border/40 pointer-events-none" />

            <div className="space-y-12">
              {DEFAULT_PROCESS_STEPS.map((step: ProcessStep, idx: number) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className={cn("relative flex flex-col md:flex-row items-start md:items-center", isEven ? "md:justify-start" : "md:justify-end")}>
                    {/* Circle badge */}
                    <div className="absolute left-[-11px] md:left-1/2 md:-translate-x-1/2 h-8 w-8 rounded-full bg-background border-2 border-brand-orange flex items-center justify-center text-xs font-bold text-brand-orange font-space-grotesk z-10">
                      {step.step}
                    </div>

                    <div className={cn("w-full md:w-[45%] pl-8 md:pl-0", isEven ? "md:text-right md:pr-10" : "md:text-left md:pl-10")}>
                      <div className="p-5 rounded-2xl border border-border/30 bg-card/40 hover:bg-card transition-colors duration-300">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-1 font-space-grotesk">
                          {step.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed font-inter">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Job Listings Section */}
      <Section id="open-positions" className="py-16 md:py-24 bg-muted/5 scroll-mt-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionTag className="justify-center">OPEN POSITIONS</SectionTag>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
              Find your role at Adruva
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-4 mx-auto" />
          </div>

          {/* Filter Bar */}
          <div className="mb-12 p-6 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Job Type Selector */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="job-type-select" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-space-grotesk">
                Job Type
              </label>
              <select
                id="job-type-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-background border border-border/50 text-xs px-3 h-10 rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-brand-orange transition-all cursor-pointer"
              >
                {JOB_TYPES.map((t: typeof JOB_TYPES[number]) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Department Selector */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="dept-select" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-space-grotesk">
                Department
              </label>
              <select
                id="dept-select"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full bg-background border border-border/50 text-xs px-3 h-10 rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-brand-orange transition-all cursor-pointer"
              >
                <option value="all">All Departments</option>
                {uniqueDepartments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Selector */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="loc-select" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-space-grotesk">
                Location
              </label>
              <select
                id="loc-select"
                value={selectedLoc}
                onChange={(e) => setSelectedLoc(e.target.value)}
                className="w-full bg-background border border-border/50 text-xs px-3 h-10 rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-brand-orange transition-all cursor-pointer"
              >
                {LOCATIONS.map((l: typeof LOCATIONS[number]) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Listings Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-6 rounded-2xl border border-border/30 bg-card hover:border-brand-orange/30 hover:shadow-[0_8px_30px_rgba(255,107,0,0.03)] flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    {/* Header: Title + Badges */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-base font-bold text-brand-navy dark:text-white font-poppins leading-snug">
                          {job.title}
                        </h3>
                        <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1 block font-space-grotesk">
                          {job.department}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        <Badge variant="outline" className="bg-brand-orange/5 border-brand-orange/20 text-brand-orange text-[9px] px-2 py-0.5 rounded-full capitalize font-semibold">
                          {job.type.replace('_', ' ')}
                        </Badge>
                        <Badge variant="secondary" className="bg-muted text-muted-foreground text-[9px] px-2 py-0.5 rounded-full capitalize font-semibold border-none">
                          {job.location_type}
                        </Badge>
                      </div>
                    </div>

                    {/* Quick Info Row */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/10 mb-4 text-[10px] text-muted-foreground font-medium font-space-grotesk">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-brand-orange" />
                        {job.experience_level} Experience
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-brand-orange" />
                        {job.openings_count} Opening{job.openings_count > 1 ? 's' : ''}
                      </span>
                      <span className="flex items-center gap-1 justify-end text-right">
                        <Calendar className="h-3 w-3 text-brand-orange" />
                        By {new Date(job.application_deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    {/* Description preview */}
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-inter line-clamp-3">
                      {job.description}
                    </p>
                  </div>

                  {/* Footer: Salary + Apply Button */}
                  <div className="flex items-center justify-between border-t border-border/10 pt-4 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold font-space-grotesk">
                        Stipend / Salary
                      </span>
                      <span className="text-xs font-extrabold text-brand-navy dark:text-white font-poppins">
                        {job.salary_label}
                      </span>
                    </div>
                    <Link href={`/careers/${job.slug}`}>
                      <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white text-xs h-9 rounded-lg px-4 font-semibold flex items-center gap-1 transition-all duration-300">
                        View & Apply
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 border border-dashed border-border/50 rounded-2xl bg-card/40 max-w-md mx-auto">
              <Search className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-2 font-poppins">
                No matching open positions
              </h3>
              <p className="text-xs text-muted-foreground mb-6 font-inter">
                We couldn&apos;t find any roles matching your current filters. Try resetting the options.
              </p>
              <Button onClick={handleResetFilters} variant="outline" className="text-xs h-9 font-semibold rounded-lg px-4">
                Reset Filters
              </Button>
            </div>
          )}
        </Container>
      </Section>
      
    </div>
  );
}
export default CareersPageClient;
