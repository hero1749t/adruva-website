'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    text: 'Adruvas automation workflow changed how we run our kitchen. The WhatsApp ordering OS automatically pushes tickets to our staff and records client details in our database without a single manual click.',
    author: 'Dinesh Singh',
    role: 'Owner, Lura Cafe',
    initials: 'DS',
    gradient: 'from-blue-600 to-indigo-900',
  },
  {
    text: 'Building our platform with Adruva was transparent and seamless. They designed a beautiful site and customized a booking system that is extremely easy for our yoga retreat students to check in and register.',
    author: 'Stephanie',
    role: 'Founder, Dehradun Yoga Shala',
    initials: 'S',
    gradient: 'from-orange-500 to-red-800',
  },
  {
    text: 'We saw a massive increase in high-budget event inquiries within 30 days of launching our Meta and Google search campaigns. Their team is extremely direct, honest, and focuses strictly on ROI metrics.',
    author: 'Vivek Negi',
    role: 'Director, Event Management',
    initials: 'VN',
    gradient: 'from-emerald-500 to-green-900',
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
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="w-full bg-[#0A0A0A] text-white py-20 relative overflow-hidden transition-colors duration-300">
      
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none select-none z-0" />

      <Container className="relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag mb-3">Client Love</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-poppins">
            What our clients say
          </h2>
        </div>

        {/* 3-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={cn(
                'p-7 rounded-[16px] border border-white/[0.08] bg-white/[0.04] transition-all duration-200 flex flex-col justify-between group',
                'hover:border-brand-orange/[0.3]'
              )}
            >
              <div>
                {/* Large quote mark */}
                <span className="text-5xl font-extrabold text-brand-orange select-none block leading-none mb-4 font-poppins">
                  &ldquo;
                </span>
                
                {/* Quote Text */}
                <p className="text-sm md:text-base text-gray-300 leading-[1.75] mb-6 font-inter">
                  {t.text}
                </p>
              </div>

              {/* Author section */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/[0.05]">
                
                {/* Gradient Avatar */}
                <div className={cn(
                  'h-11 w-11 rounded-full flex items-center justify-center font-semibold text-sm text-white shrink-0 select-none font-poppins bg-gradient-to-br',
                  t.gradient
                )}>
                  {t.initials}
                </div>

                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <h4 className="text-sm font-semibold text-white font-poppins truncate">
                    {t.author}
                  </h4>
                  <p className="text-xs text-gray-500 font-inter truncate">
                    {t.role}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default TestimonialsSection;
