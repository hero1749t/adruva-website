'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { SectionTag } from '@/components/ui/section-tag';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    text: 'Adruvas automation workflow changed how we run our kitchen. The WhatsApp ordering OS automatically pushes tickets to our staff and records client details in our database without a single manual click.',
    author: 'Dinesh Singh',
    role: 'Owner, Lura Cafe',
    initials: 'DS',
    avatarBg: 'bg-brand-orange/20 text-brand-orange',
  },
  {
    text: 'Building our platform with Adruva was transparent and seamless. They designed a beautiful site and customized a booking system that is extremely easy for our yoga retreat students to check in and register.',
    author: 'Stephanie',
    role: 'Founder, Dehradun Yoga Shala',
    initials: 'S',
    avatarBg: 'bg-brand-blue/20 text-brand-blue',
  },
  {
    text: 'We saw a massive increase in high-budget event inquiries within 30 days of launching our Meta and Google search campaigns. Their team is extremely direct, honest, and focuses strictly on ROI metrics.',
    author: 'Vivek Negi',
    role: 'Director, Event Management',
    initials: 'VN',
    avatarBg: 'bg-[#10B981]/20 text-[#10B981]',
  },
];

export function TestimonialsSection() {
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
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <Section dark={true} className="relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none select-none z-0" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <SectionTag className="justify-center">Client Love</SectionTag>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-poppins">
            What our clients say
          </h2>
          <div className="h-1 w-12 bg-brand-orange rounded-full mt-4" />
        </div>

        {/* 3-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              className={cn(
                'p-6 md:p-8 rounded-2xl border border-white/10 bg-[#0d172e] transition-all duration-300 flex flex-col justify-between',
                'hover:border-brand-orange/40 hover:shadow-[0_12px_30px_-10px_rgba(255,107,0,0.15)] group'
              )}
            >
              <div>
                {/* Large double quotes */}
                <span className="text-5xl font-serif text-brand-orange/45 select-none block -mt-2 -ml-1">
                  “
                </span>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed italic -mt-2 mb-6 font-inter">
                  {t.text}
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-auto">
                {/* Initials Avatar */}
                <div className={cn(
                  'h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none font-space-grotesk',
                  t.avatarBg
                )}>
                  {t.initials}
                </div>

                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white font-poppins truncate">
                    {t.author}
                  </h4>
                  <p className="text-[10px] text-white/50 font-medium font-inter truncate mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

export default TestimonialsSection;
