'use client';

import React, { useState, useEffect } from 'react';

const clients = [
  'Lura Cafe',
  'Dehradun Yoga Shala',
  'Adruva Resto',
  'Charm Engine',
  'TT Retreats',
  'Avni Joshi Setup',
  'Menu Mitra',
  'Skillinabox',
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
    <section className="w-full bg-[#F8FAFC] dark:bg-[#0A0A0A] py-10 overflow-hidden border-y border-border/40 transition-colors duration-300">
      
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
            animation: marquee-scroll 30s linear infinite;
          }
          .marquee-track-container:hover {
            animation-play-state: paused;
          }
        `}} />
      )}

      <div className="max-w-[1100px] mx-auto px-5 md:px-10 mb-6 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">
          Trusted by businesses across India
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex py-2">
        {/* Left/Right fading edge masks for premium look */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#F8FAFC] dark:from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#F8FAFC] dark:from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

        {prefersReducedMotion ? (
          /* Static wrap list if user prefers reduced motion */
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 px-5 max-w-4xl mx-auto">
            {clients.map((name, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {idx > 0 && <span className="text-brand-orange text-lg select-none">•</span>}
                <span className="text-sm md:text-base font-extrabold tracking-tight text-brand-navy/60 dark:text-white/60 font-space-grotesk">
                  {name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Infinite moving track */
          <div className="marquee-track-container">
            {marqueeItems.map((name, idx) => (
              <div key={idx} className="flex items-center gap-6 md:gap-10 mx-3 md:mx-5 select-none shrink-0">
                <span className="text-sm md:text-lg font-extrabold tracking-tight text-brand-navy/60 dark:text-white/60 font-space-grotesk transition-colors hover:text-brand-orange dark:hover:text-brand-orange">
                  {name}
                </span>
                <span className="text-brand-orange text-lg select-none">•</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default LogoMarquee;
