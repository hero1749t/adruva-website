'use client';

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <section className="w-full py-12 bg-transparent transition-colors duration-300">
      <Container>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col items-center justify-center max-w-[400px] mx-auto text-center p-8 sm:p-10 rounded-[20px] bg-card border border-border shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        >
          {/* Stars Row */}
          <div className="flex items-center justify-center gap-1 text-[#FBBF24] mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-current" />
            ))}
          </div>

          {/* Rating Text */}
          <span className="text-3xl font-bold text-foreground font-poppins">
            4.9 out of 5
          </span>

          {/* Sub Text & Google Branding */}
          <div className="flex items-center justify-center gap-1.5 mt-2 text-sm text-muted-foreground font-inter">
            <span>Based on verified</span>
            
            {/* Google mini-svg */}
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
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
            <span className="font-semibold text-foreground">Reviews</span>
          </div>

          {/* Action Link */}
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand-orange hover:underline mt-4 font-inter"
          >
            View on Google →
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

export default ReviewsBadge;
