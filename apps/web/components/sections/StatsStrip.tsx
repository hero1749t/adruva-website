'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/container';

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  prefersReducedMotion: boolean;
}

function StatItem({ target, suffix, label, prefersReducedMotion }: StatItemProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    const element = ref.current;
    if (!element) return;

    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !started) {
          started = true;
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / 2000, 1);
            // easeOutQuad
            const easeProgress = progress * (2 - progress);
            setDisplayValue(Math.floor(easeProgress * target));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setDisplayValue(target);
            }
          };
          window.requestAnimationFrame(step);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [target, prefersReducedMotion]);

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
    <section className="w-full bg-background border-y border-slate-200/80 dark:border-white/5 py-2 transition-colors duration-300">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 dark:divide-white/5">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={cn(
                "w-full",
                // Handle mobile borders
                idx % 2 === 0 ? "border-r md:border-r-0 border-slate-200/80 dark:border-white/5" : ""
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
