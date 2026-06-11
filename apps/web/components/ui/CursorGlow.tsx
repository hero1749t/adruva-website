'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values to store raw client coords
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations to prevent frame-rate lag (uses GPU layer)
  const springConfig = { stiffness: 90, damping: 25, mass: 0.15 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of orb width (350px / 2 = 175px) to keep cursor centered
      mouseX.set(e.clientX - 175);
      mouseY.set(e.clientY - 175);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Attach listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted) return null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      className={`pointer-events-none fixed top-0 left-0 z-0 h-[350px] w-[350px] rounded-full bg-gradient-to-r from-brand-orange/8 to-brand-blue/8 blur-[90px] transition-opacity duration-500 hidden md:block ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } dark:from-brand-orange/10 dark:to-brand-blue/10`}
    />
  );
}

export default CursorGlow;
