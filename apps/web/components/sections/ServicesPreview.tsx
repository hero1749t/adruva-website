'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, Smartphone, Megaphone, Cpu, Search, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: Code2,
    name: 'Web Development',
    description: 'High-performance websites built with Next.js, React & modern headless frameworks.',
    price: 'Starting ₹15,000',
    slug: 'web-development',
  },
  {
    icon: Smartphone,
    name: 'Mobile App Development',
    description: 'Native & cross-platform iOS & Android mobile apps built with React Native.',
    price: 'Starting ₹30,000',
    slug: 'mobile-app-development',
  },
  {
    icon: Megaphone,
    name: 'Google & Meta Ads',
    description: 'High-ROI campaigns targeting the right keywords and audiences to drive inquiries.',
    price: 'Custom Quote',
    slug: 'google-ads',
  },
  {
    icon: Cpu,
    name: 'AI Automation',
    description: 'Streamline operations, lead capture & bookings with custom AI workflows & integrations.',
    price: 'Custom Quote',
    slug: 'ai-automation',
  },
  {
    icon: Search,
    name: 'SEO Services',
    description: 'On-page, technical & content strategies to rank on Page 1 and capture search intent.',
    price: 'Custom Quote',
    slug: 'seo',
  },
  {
    icon: Share2,
    name: 'Social Media Management',
    description: 'End-to-end creative management, reels editing & strategic content for socials.',
    price: 'Custom Quote',
    slug: 'social-media-management',
  },
];

export function ServicesPreview() {
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
    <section className="w-full py-20 bg-transparent transition-colors duration-300">
      <Container>
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col items-start">
            <span className="section-tag mb-3">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-poppins">
              Full-spectrum digital services
            </h2>
          </div>
          
          <Link 
            href="/services" 
            className="group flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-brand-orange border-b border-border hover:border-brand-orange pb-0.5 transition-all duration-200 self-start"
          >
            View all services
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* 3x2 Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                variants={itemVariants}
                className={cn(
                  'flex flex-col items-start p-6 rounded-[14px] bg-card border border-border transition-all duration-250 min-h-[260px] group',
                  'hover:border-brand-orange/45 hover:shadow-[0_16px_32px_rgba(0,0,0,0.08),0_4_8_rgba(255,107,0,0.08)] hover:-translate-y-1'
                )}
              >
                {/* Icon square container (44x44px) */}
                <div className="h-11 w-11 rounded-[12px] bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4 transition-all duration-200 group-hover:bg-brand-orange/18">
                  <Icon className="h-5.5 w-5.5" />
                </div>

                {/* Service Name */}
                <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-[1.65] mb-4 font-inter">
                  {service.description}
                </p>

                {/* Footer details: Price Badge + Learn More */}
                <div className="flex flex-col gap-3 w-full mt-auto pt-4 border-t border-border/40">
                  <div className="inline-block self-start bg-brand-orange/[0.08] border border-brand-orange/[0.2] rounded-full px-3 py-0.5 text-xs font-semibold text-brand-orange font-space-grotesk">
                    {service.price}
                  </div>
                  
                  <Link 
                    href={`/services/${service.slug}`}
                    className="text-sm font-medium text-brand-orange hover:text-brand-orange-hover transition-colors flex items-center gap-1 font-inter self-start"
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

export default ServicesPreview;
