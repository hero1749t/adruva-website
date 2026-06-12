'use client';

import React from 'react';

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
  // Duplicate list to achieve a seamless infinite wrap loop
  const marqueeItems = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="w-full bg-background-secondary/30 py-8 overflow-hidden border-y border-border transition-colors duration-300">
      
      {/* Label */}
      <div className="max-w-6xl mx-auto px-4 text-center mb-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block font-inter">
          TRUSTED BY BUSINESSES ACROSS INDIA
        </span>
      </div>

      {/* Marquee Container */}
      <div 
        className="relative w-full overflow-hidden flex py-2"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div className="flex items-center shrink-0 w-max animate-marquee">
          {marqueeItems.map((client, idx) => (
            <React.Fragment key={idx}>
              <span className="text-sm font-medium text-muted-foreground/60 hover:text-foreground transition-colors duration-200 cursor-pointer font-inter whitespace-nowrap">
                {client}
              </span>
              <span className="text-brand-orange opacity-60 mx-6 select-none">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoMarquee;
