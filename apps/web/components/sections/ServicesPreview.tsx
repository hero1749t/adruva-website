'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, Smartphone, Megaphone, Cpu, Search, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { SectionTag } from '@/components/ui/section-tag';
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
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <Section className="bg-transparent">
      <Container>
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col items-start">
            <SectionTag>What We Do</SectionTag>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
              Full-spectrum digital services
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-4" />
          </div>
          
          <Link 
            href="/services" 
            className="group flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-hover transition-colors font-inter"
          >
            View all services
            <motion.span 
              animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </Link>
        </div>

        {/* 3x2 Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : { y: -6 }}
                className={cn(
                  'flex flex-col justify-between p-6 rounded-2xl premium-service-card premium-shadow min-h-[220px] group'
                )}
              >
                <div>
                  {/* Icon */}
                  <div className="inline-flex p-2.5 rounded-xl bg-brand-orange/10 text-brand-orange mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="h-5.5 w-5.5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-brand-navy dark:text-white mb-2 font-poppins">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 font-inter">
                    {service.description}
                  </p>
                </div>

                {/* Footer details */}
                <div className="flex items-center justify-between border-t border-border/20 pt-4 mt-auto">
                  <span className="bg-brand-orange/10 text-brand-orange text-xs font-semibold px-2 py-0.5 rounded-full font-space-grotesk">
                    {service.price}
                  </span>
                  
                  <Link 
                    href={`/services/${service.slug}`}
                    className="text-xs font-bold text-brand-navy hover:text-brand-orange dark:text-white/80 dark:hover:text-brand-orange transition-colors flex items-center gap-1 font-inter"
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}

export default ServicesPreview;
