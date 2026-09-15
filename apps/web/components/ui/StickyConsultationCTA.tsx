"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, MessageSquare } from "lucide-react";

export function StickyConsultationCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal sticky button when user scrolls down 400px (past hero fold)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop Floating Bottom-Right Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-40 hidden md:block"
          >
            <Link
              href="/contact"
              className="group flex items-center gap-2.5 px-5 py-3 rounded-full bg-brand-blue hover:bg-brand-blue-dark text-white font-space text-xs font-bold tracking-wide shadow-[0_8px_30px_rgba(8,120,249,0.35)] hover:shadow-[0_12px_40px_rgba(8,120,249,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Book a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Mobile Bottom Sticky Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 dark:bg-[#07090D]/95 backdrop-blur-lg border-t border-slate-200 dark:border-white/10 md:hidden flex items-center justify-between gap-3 shadow-2xl"
          >
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400">
                Ready to engineer?
              </span>
              <span className="text-xs font-bold font-sora text-slate-900 dark:text-white">
                Book 30-min Call
              </span>
            </div>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand-blue hover:bg-brand-blue-dark text-white font-space text-xs font-bold shadow-md active:scale-95 transition-transform"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default StickyConsultationCTA;
