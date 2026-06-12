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
    <Section className="py-10 md:py-14 bg-transparent border-t border-border/40 dark:border-white/5">
      <Container>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col items-center justify-center max-w-lg mx-auto"
        >
          {/* Trust Badge Container */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 rounded-2xl border border-slate-200/60 dark:border-white/5 bg-white dark:bg-[#0b1f3a]/20 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)] w-full">
            {/* Google Logo Mark */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 shrink-0 shadow-sm">
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.91h6.69c-.29 1.5-.1 1.03-1.14 2.51v2.08h1.83c1.07-.98 1.83-2.43 1.83-4.17c0-.28-.02-.56-.05-.83z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.86-3c-1.08.72-2.45 1.16-4.1 1.16c-3.15 0-5.81-2.13-6.76-5.01H1.31v3.1C3.29 21.29 7.37 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.24 14.24a7.14 7.14 0 0 1 0-4.48V6.66H1.31a11.96 11.96 0 0 0 0 10.68l3.93-3.1z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.22 0 12 0C7.37 0 3.29 2.71 1.31 6.66l3.93 3.1c.95-2.88 3.61-5.01 6.76-5.01z"
                />
              </svg>
            </div>

            {/* Ratings & Stars */}
            <div className="flex-grow text-center sm:text-left space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-base font-extrabold text-brand-navy dark:text-white font-poppins">
                  Google Business Rating
                </span>
                <div className="flex items-center justify-center sm:justify-start gap-0.5 text-[#FFB800]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>

              {/* Rating count info */}
              <p className="text-xs text-muted-foreground font-inter">
                <span className="font-bold text-brand-navy dark:text-white">4.9 / 5.0</span> based on 120+ verified client submissions.
              </p>

              {/* Link */}
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-brand-orange hover:text-brand-orange-hover transition-colors font-inter inline-flex items-center gap-1 pt-1 group"
              >
                View Google Business Profile
                <span className="transform group-hover:translate-x-0.5 transition-transform duration-200">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

export default ReviewsBadge;
