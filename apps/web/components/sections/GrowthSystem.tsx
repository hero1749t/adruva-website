'use client';

import React, { useState, useEffect } from 'react';
import { Target, MousePointerClick, Layers, Cpu, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/container';
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
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="w-full bg-[#0A0A0A] text-white py-20 relative overflow-hidden transition-colors duration-300">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none select-none z-0" />

      <Container className="relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag mb-3">Our Methodology</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-poppins">
            The Adruva Growth System
          </h2>
          <p className="text-gray-400 mt-4 text-sm font-inter">
            A proven methodology we apply to every client.
          </p>
        </div>

        {/* 5-Step responsive layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-5 gap-6 relative"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className={cn(
                  'relative p-6 rounded-[12px] bg-white/[0.03] border border-white/[0.08] transition-all duration-300 flex flex-col items-start min-h-[240px]',
                  'hover:bg-brand-orange/[0.06] hover:border-brand-orange/[0.3] group',
                  // Responsive spans: 3 items in 1st row (span 2 each), 2 items in 2nd row (span 3 each)
                  'col-span-1 sm:col-span-2 lg:col-span-1',
                  idx === 3 ? 'sm:col-span-3 lg:col-span-1' : '',
                  idx === 4 ? 'sm:col-span-3 lg:col-span-1' : ''
                )}
              >
                {/* Step Number */}
                <div className="text-brand-orange/50 font-bold text-xs tracking-widest font-poppins mb-3">
                  {step.number}
                </div>

                {/* Icon square container (40x40px) */}
                <div className="h-10 w-10 rounded-[10px] bg-brand-orange/[0.12] text-brand-orange flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-semibold text-white mb-2 font-poppins">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-[1.65] font-inter">
                  {step.description}
                </p>

                {/* Arrow Connector (Desktop only, except for the last step) */}
                {idx < steps.length - 1 && (
                  <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-gray-600 text-lg font-bold z-20 pointer-events-none">
                    →
                  </span>
                )}
              </motion.div>
            );
          })}
        </motion.div>

      </Container>
    </section>
  );
}

export default GrowthSystem;
