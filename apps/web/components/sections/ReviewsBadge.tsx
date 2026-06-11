'use client';

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';

export function ReviewsBadge() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  const fadeInUp = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <Section className="py-8 md:py-12 bg-background border-t border-slate-200/80 dark:border-white/5">
      <Container>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col items-center text-center justify-center space-y-3 max-w-md mx-auto"
        >
          {/* Star Icons */}
          <div className="flex items-center gap-1 text-[#FFB800]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>

          {/* Rating */}
          <h3 className="text-lg font-bold text-brand-navy dark:text-white font-poppins">
            4.9 out of 5
          </h3>

          {/* Label */}
          <p className="text-xs text-muted-foreground font-inter">
            Based on verified client feedback on Google Reviews.
          </p>

          {/* Link */}
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-brand-orange hover:text-brand-orange-hover transition-colors font-inter inline-flex items-center gap-1 pt-1 hover:underline"
          >
            View Google Business Profile
            <span>→</span>
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}

export default ReviewsBadge;
