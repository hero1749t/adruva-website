'use client';

import React, { useState, useEffect } from 'react';
import { 
  Coffee, Sparkles, Utensils, Zap, 
  Mountain, Compass, BookOpen, Box 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const clients = [
  { name: 'Lura Cafe', Icon: Coffee, style: 'text-amber-800 dark:text-amber-500 font-serif font-semibold tracking-wider' },
  { name: 'Dehradun Yoga Shala', Icon: Sparkles, style: 'text-teal-600 dark:text-teal-400 font-sans font-light tracking-wide' },
  { name: 'Adruva Resto', Icon: Utensils, style: 'text-rose-600 dark:text-rose-400 font-sans font-extrabold tracking-tight uppercase' },
  { name: 'Charm Engine', Icon: Zap, style: 'text-blue-600 dark:text-blue-400 font-sans font-black italic tracking-wide uppercase' },
  { name: 'TT Retreats', Icon: Mountain, style: 'text-slate-600 dark:text-slate-400 font-serif italic tracking-wide' },
  { name: 'Avni Joshi Setup', Icon: Compass, style: 'text-pink-600 dark:text-pink-400 font-sans font-semibold tracking-tight' },
  { name: 'Menu Mitra', Icon: BookOpen, style: 'text-emerald-600 dark:text-emerald-400 font-mono font-bold' },
  { name: 'Skillinabox', Icon: Box, style: 'text-purple-600 dark:text-purple-400 font-sans font-semibold uppercase tracking-widest text-[11px]' },
];

export function LogoMarquee() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  // Duplicate list to achieve a seamless infinite wrap loop
  const marqueeItems = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="w-full bg-[#f8fafc] dark:bg-[#0A0A0A] py-12 overflow-hidden border-y border-border/40 dark:border-white/5 transition-colors duration-300">
      
      {/* Styles for CSS Marquee */}
      {!prefersReducedMotion && (
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee-scroll {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }
          .marquee-track-container {
            display: flex;
            width: max-content;
            animation: marquee-scroll 35s linear infinite;
          }
          .marquee-track-container:hover {
            animation-play-state: paused;
          }
        `}} />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-orange block font-inter">
          Trusted by businesses across India
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex py-4">
        {/* Left/Right fading edge masks for premium look */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#f8fafc] dark:from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#f8fafc] dark:from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

        {prefersReducedMotion ? (
          /* Static wrap list if user prefers reduced motion */
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 px-5 max-w-4xl mx-auto">
            {clients.map((client, idx) => {
              const Icon = client.Icon;
              return (
                <div 
                  key={idx} 
                  className="flex items-center gap-2.5 py-2 px-4 rounded-xl border border-slate-200/50 dark:border-white/5 bg-white dark:bg-[#0b1f3a]/30 shadow-sm shrink-0"
                >
                  <Icon className="h-4 w-4 text-brand-orange" />
                  <span className={cn('text-sm md:text-base', client.style)}>
                    {client.name}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          /* Infinite moving track */
          <div className="marquee-track-container">
            {marqueeItems.map((client, idx) => {
              const Icon = client.Icon;
              return (
                <div 
                  key={idx} 
                  className="flex items-center gap-2.5 mx-4 md:mx-6 select-none shrink-0 py-2.5 px-4.5 rounded-xl border border-slate-200/50 dark:border-white/5 bg-white dark:bg-[#0b1f3a]/30 shadow-sm hover:border-brand-orange/30 dark:hover:border-brand-orange/30 hover:scale-[1.02] transition-all duration-300"
                >
                  <Icon className="h-4 w-4 text-brand-orange shrink-0" />
                  <span className={cn('text-sm md:text-base font-medium whitespace-nowrap', client.style)}>
                    {client.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default LogoMarquee;
