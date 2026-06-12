'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/container';

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [start, target, duration]);

  return count;
}

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  prefersReducedMotion: boolean;
}

function StatItem({ target, suffix, label, prefersReducedMotion }: StatItemProps) {
  const [start, setStart] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(target, 2000, start && !prefersReducedMotion);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setStart(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-6 text-center gap-1"
    >
      <span className="text-4xl md:text-5xl font-extrabold text-foreground font-poppins tracking-tight tabular-nums">
        {prefersReducedMotion ? target : count}
        <span className="text-brand-orange">{suffix}</span>
      </span>
      <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider font-inter">
        {label}
      </span>
    </div>
  );
}

export function StatsStrip() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const stats = [
    { target: 15, suffix: '+', label: 'Projects Delivered' },
    { target: 10, suffix: '+', label: 'Happy Clients' },
    { target: 100, suffix: '%', label: 'On-Time Delivery' },
    { target: 4, suffix: '+', label: 'Industries Served' },
  ];

  return (
    <section className="w-full border-y border-border bg-background-secondary/50 dark:bg-brand-navy/30 py-10 transition-colors duration-300">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 w-full">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={cn(
                "w-full",
                idx === 0 && "border-r border-b md:border-0 border-border",
                idx === 1 && "border-b md:border-y-0 md:border-r-0 md:border-l border-border",
                idx === 2 && "border-r md:border-y-0 md:border-r-0 md:border-l border-border",
                idx === 3 && "border-0 md:border-l border-border"
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
