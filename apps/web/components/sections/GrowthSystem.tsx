'use client';

import React, { useState, useEffect } from 'react';
import { Target, MousePointerClick, Layers, Cpu, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { SectionTag } from '@/components/ui/section-tag';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    icon: Target,
    title: 'Attract',
    description: 'Targeted Google Ads, Meta Ads & data-driven SEO strategies.',
  },
  {
    number: '02',
    icon: MousePointerClick,
    title: 'Convert',
    description: 'High-performance websites and landing pages built to convert.',
  },
  {
    number: '03',
    icon: Layers,
    title: 'Manage',
    description: 'Custom CRM integrations to manage and organize inbound leads.',
  },
  {
    number: '04',
    icon: Cpu,
    title: 'Automate',
    description: 'AI-driven automated email/WhatsApp follow-ups and bookings.',
  },
  {
    number: '05',
    icon: TrendingUp,
    title: 'Scale',
    description: 'Continuous optimization and campaigns built for compounding growth.',
  },
];

export function GrowthSystem() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <Section dark={true} className="relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none select-none z-0" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <SectionTag className="justify-center">Our Methodology</SectionTag>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-poppins">
            The Adruva Growth System
          </h2>
          <div className="h-1 w-12 bg-brand-orange rounded-full mt-4" />
        </div>

        {/* 5-Column Grid with unified borders */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-5 rounded-2xl border border-white/10 bg-[#0A0A0A]/40 backdrop-blur-md overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/10 shadow-2xl relative"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className={cn(
                  'relative p-6 transition-all duration-300 flex flex-col items-start min-h-[220px]',
                  'hover:bg-brand-orange/5 group'
                )}
              >
                {/* Step Number Badge */}
                <div className="absolute top-4 right-4 text-xs font-bold text-brand-orange select-none font-space-grotesk">
                  {step.number}
                </div>

                {/* Icon in Orange Rounded Box */}
                <div className="p-2.5 rounded-xl bg-brand-orange/10 text-brand-orange mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="h-5.5 w-5.5" />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-2 font-poppins">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-white/60 leading-relaxed font-inter">
                  {step.description}
                </p>

                {/* Arrow Connector (Desktop only, except for the last step) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20 items-center justify-center bg-[#0A0A0A] border border-white/10 rounded-full p-1 text-brand-orange">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}

export default GrowthSystem;
