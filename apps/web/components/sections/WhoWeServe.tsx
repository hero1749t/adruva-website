'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { SectionTag } from '@/components/ui/section-tag';
import { Button } from '@/components/ui/button';

const industries = [
  'Restaurants',
  'Salons & Spas',
  'Clinics & Hospitals',
  'Real Estate',
  'Yoga Retreats',
  'Gyms & Fitness',
  'Schools & Institutes',
  'Medical Practices',
  'Travel Agencies',
  'Retail Businesses',
  'Interior Design',
  'Auto Services',
  'Photography Studios',
  'Bakeries & Cafes',
  'IT & Tech Startups',
  'Coaching Centres',
  'Event Management',
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
        staggerChildren: 0.04,
      },
    },
  };

  const tagVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Section className="bg-[#f3f6fc] dark:bg-[#0b1328]/45">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <SectionTag className="justify-center">Who We Serve</SectionTag>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
            If you have customers, we can help you grow.
          </h2>
          <div className="h-1 w-12 bg-brand-orange rounded-full mt-4" />
          <p className="text-xs md:text-sm text-muted-foreground mt-6 leading-relaxed max-w-md font-inter">
            We work with local, service-based, and startup businesses to build modern web frameworks, automate manual workflows, and scale their customer outreach.
          </p>
        </div>

        {/* Tag Cloud */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto my-10"
        >
          {industries.map((tag) => (
            <motion.span
              key={tag}
              variants={tagVariants}
              whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
              className="px-4 py-2 text-xs md:text-sm font-semibold rounded-full border border-slate-200/80 dark:border-white/5 bg-card text-muted-foreground hover:text-brand-orange hover:border-brand-orange/40 hover:bg-brand-orange/5 cursor-default transition-all duration-200 select-none font-inter shadow-sm"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Bottom CTA Box */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-14 p-6 md:p-8 rounded-2xl border border-brand-orange/25 bg-brand-orange/5 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h3 className="text-sm md:text-base font-bold text-brand-navy dark:text-white font-poppins">
              Not sure if we serve your niche?
            </h3>
            <p className="text-[11px] md:text-xs text-muted-foreground mt-1.5 leading-relaxed font-inter">
              Book a free 30-minute discovery call — if we aren&apos;t a good fit, we&apos;ll tell you honestly.
            </p>
          </div>

          <a
            href={calendlyUrl}
            target={calendlyUrl.startsWith('http') ? '_blank' : undefined}
            rel={calendlyUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="w-full md:w-auto shrink-0"
          >
            <Button
              className="w-full md:w-auto bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold px-5 h-10 rounded-lg flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.02] active:scale-[0.98]"
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
