"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    text: "Adruva's automation workflow changed how we run our kitchen. The WhatsApp ordering OS automatically pushes tickets to our staff and records client details in our database without a single manual click.",
    author: "Dinesh Singh",
    role: "Owner, Lura Cafe",
    initials: "DS",
    gradient: "from-blue-600 to-indigo-900",
  },
  {
    text: "Building our platform with Adruva was transparent and seamless. They designed a beautiful site and customized a booking system that is extremely easy for our yoga retreat students to check in and register.",
    author: "Stephanie",
    role: "Founder, Dehradun Yoga Shala",
    initials: "S",
    gradient: "from-orange-500 to-red-800",
  },
  {
    text: "We saw a massive increase in high-budget event inquiries within 30 days of launching our Meta and Google search campaigns. Their team is extremely direct, honest, and focuses strictly on ROI metrics.",
    author: "Vivek Negi",
    role: "Director, Event Management",
    initials: "VN",
    gradient: "from-emerald-500 to-green-900",
  },
];

export function TestimonialsSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-transparent transition-colors duration-300 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-orange/5 dark:bg-brand-orange/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/5 dark:bg-brand-blue/5 rounded-full blur-[120px]" />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 mb-4">
            <span className="text-xs font-semibold text-brand-orange tracking-wider uppercase">
              Client Love
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-poppins mb-6 transition-colors">
            Loved by leading businesses
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 font-inter transition-colors">
            Don&apos;t just take our word for it. Here&apos;s what our partners
            have to say about scaling their growth with Adruva.
          </p>
        </div>

        {/* 3-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={cn(
                "relative p-8 rounded-3xl border bg-white dark:bg-[#0A0A0A] transition-all duration-300 flex flex-col justify-between group",
                "border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-2xl hover:shadow-2xl hover:shadow-brand-orange/10 dark:hover:shadow-brand-orange/5 hover:-translate-y-2",
                "hover:border-brand-orange/50 dark:hover:border-brand-orange/30",
              )}
            >
              <div>
                {/* Large quote mark */}
                <span className="text-6xl font-extrabold text-brand-orange/20 dark:text-brand-orange/20 select-none block leading-none mb-4 font-poppins absolute top-6 right-8 transition-colors group-hover:text-brand-orange/40">
                  &rdquo;
                </span>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-base text-slate-700 dark:text-gray-300 leading-relaxed mb-8 font-inter relative z-10 transition-colors">
                  {t.text}
                </p>
              </div>

              {/* Author section */}
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100 dark:border-white/10 transition-colors">
                {/* Gradient Avatar */}
                <div
                  className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 select-none font-poppins bg-gradient-to-br shadow-inner",
                    t.gradient,
                  )}
                >
                  {t.initials}
                </div>

                <div className="flex flex-col gap-1 overflow-hidden">
                  <h4 className="text-base font-semibold text-slate-900 dark:text-white font-poppins truncate transition-colors">
                    {t.author}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-gray-400 font-inter truncate transition-colors">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default TestimonialsSection;
