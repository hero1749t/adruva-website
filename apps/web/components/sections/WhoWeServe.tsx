'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Calendar, Utensils, Sparkles, 
  Activity, Building2, GraduationCap, Laptop 
} from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { SectionTag } from '@/components/ui/section-tag';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sectors = [
  {
    title: 'Hospitality & Food',
    Icon: Utensils,
    color: 'from-orange-500/10 to-red-500/10 border-orange-500/20 text-orange-500 dark:bg-orange-500/5',
    description: 'Automated table booking, smart digital menu order-taking, and instant WhatsApp customer alerts.',
    niches: ['Cafes & Bakeries', 'Fine Dining Restaurants', 'Cloud Kitchens', 'Catering Services'],
  },
  {
    title: 'Wellness & Fitness',
    Icon: Sparkles,
    color: 'from-pink-500/10 to-purple-500/10 border-pink-500/20 text-pink-500 dark:bg-pink-500/5',
    description: 'Booking reservation pipelines, calendar integrations, and automated WhatsApp appointment reminders.',
    niches: ['Salons & Spas', 'Yoga Shalas & Retreats', 'Gyms & Personal Training', 'Aesthetic Clinics'],
  },
  {
    title: 'Healthcare Practices',
    Icon: Activity,
    color: 'from-teal-500/10 to-emerald-500/10 border-teal-500/20 text-teal-500 dark:bg-teal-500/5',
    description: 'HIPAA-compliant data workflows, doctor schedule bookings, and inquiry qualification forms.',
    niches: ['Dental Clinics', 'Physiotherapy', 'Diagnostic Labs', 'Private Practices'],
  },
  {
    title: 'Professional Services',
    Icon: Building2,
    color: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-500 dark:bg-blue-500/5',
    description: 'Real-estate listing hubs, design agency portfolios, travel booking boards, and CRM pipelines.',
    niches: ['Real Estate Brokerages', 'Interior Designers', 'Travel Agencies', 'Photography Studios'],
  },
  {
    title: 'Education & Coaching',
    Icon: GraduationCap,
    color: 'from-yellow-500/10 to-amber-500/10 border-yellow-500/20 text-yellow-500 dark:bg-yellow-500/5',
    description: 'Student enrollment forms, course catalog listings, and parent inquiry qualification CRM leads.',
    niches: ['Private Schools', 'Coaching Institutes', 'Skill Academies', 'Online Bootcamps'],
  },
  {
    title: 'Startups & Local Retail',
    Icon: Laptop,
    color: 'from-cyan-500/10 to-sky-500/10 border-cyan-500/20 text-cyan-500 dark:bg-cyan-500/5',
    description: 'Custom SaaS apps, digital storefronts, custom ERPs, and automated supplier workflows.',
    niches: ['SaaS & Tech Startups', 'E-commerce Brands', 'Boutique Retailers', 'Event Managers'],
  },
];

export function WhoWeServe() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact';

  const fadeInUp = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <Section className="bg-[#f8fafc] dark:bg-[#0A0A0A] border-t border-border/40 dark:border-white/5 py-20">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <SectionTag className="justify-center">Who We Serve</SectionTag>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
            If you have customers, we can help you grow.
          </h2>
          <div className="h-1 w-12 bg-brand-orange rounded-full mt-4" />
          <p className="text-sm text-muted-foreground mt-6 leading-relaxed max-w-md font-inter">
            We work with service-based businesses, local operations, and startups to build modern web frameworks, qualify leads, and automate client pipelines.
          </p>
        </div>

        {/* Sector Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto my-10"
        >
          {sectors.map((sector) => {
            const Icon = sector.Icon;
            return (
              <motion.div
                key={sector.title}
                variants={cardVariants}
                whileHover={prefersReducedMotion ? {} : { y: -6 }}
                className={cn(
                  'p-6 rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300 flex flex-col justify-between group hover:border-brand-orange/30 dark:hover:border-brand-orange/30'
                )}
              >
                <div>
                  {/* Icon Wrapper */}
                  <div className={cn(
                    'h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br border shrink-0 mb-5 transition-transform duration-300 group-hover:scale-110',
                    sector.color
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-brand-navy dark:text-white font-poppins mb-2.5">
                    {sector.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed font-inter mb-6">
                    {sector.description}
                  </p>
                </div>

                {/* Sub-tags list */}
                <div>
                  <div className="w-full h-[1px] bg-slate-100 dark:bg-white/5 my-4" />
                  <div className="flex flex-wrap gap-1.5">
                    {sector.niches.map((n) => (
                      <span
                        key={n}
                        className="px-2.5 py-1 text-[10px] font-semibold tracking-wide rounded-full border border-slate-200/50 dark:border-white/5 bg-[#f8fafc] dark:bg-[#0b1f3a]/20 text-muted-foreground hover:text-brand-orange hover:border-brand-orange/30 transition-colors select-none font-inter"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Box */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-16 p-8 rounded-2xl border border-brand-orange/20 bg-brand-orange/5 dark:bg-brand-orange/[0.03] max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h3 className="text-base font-bold text-brand-navy dark:text-white font-poppins">
              Not sure if we serve your specific niche?
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed font-inter max-w-xl">
              Book a free 30-minute discovery call — we will audit your current tech, identify key bottlenecks, and tell you honestly if we aren&apos;t a good fit.
            </p>
          </div>

          <a
            href={calendlyUrl}
            target={calendlyUrl.startsWith('http') ? '_blank' : undefined}
            rel={calendlyUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="w-full md:w-auto shrink-0"
          >
            <Button
              className="w-full md:w-auto bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold px-6 h-11 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="h-4 w-4" />
              Book a Free Call
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}

export default WhoWeServe;
