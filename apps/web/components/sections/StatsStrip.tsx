'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/container';

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  prefersReducedMotion: boolean;
}

function StatItem({ target, suffix, label, prefersReducedMotion }: StatItemProps) {
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? target : 0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    if (isInView) {
      const controls = animate(0, target, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(value) {
          setDisplayValue(Math.round(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, target, prefersReducedMotion]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center">
      <span className="text-3xl md:text-4xl font-extrabold text-brand-orange tabular-nums font-poppins">
        {displayValue}
        {suffix}
      </span>
      <span className="text-xs md:text-sm text-muted-foreground mt-1.5 font-medium tracking-tight font-inter">
        {label}
      </span>
    </div>
  );
}

export function StatsStrip() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  const stats = [
    { target: 15, suffix: '+', label: 'Projects Delivered' },
    { target: 10, suffix: '+', label: 'Happy Clients' },
    { target: 100, suffix: '%', label: 'On-Time Delivery' },
    { target: 4, suffix: '+', label: 'Industries Served' },
  ];

  return (
    <section className="w-full bg-background border-y border-border/40 py-2 transition-colors duration-300">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/30">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={cn(
                "w-full",
                // Handle mobile borders
                idx % 2 === 0 ? "border-r md:border-r-0 border-border/30" : ""
              )}
            >
              <StatItem
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default StatsStrip;
