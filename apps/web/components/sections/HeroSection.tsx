"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Container } from "@/components/layout/container";

/* ─── Rotating headline words ─── */
const ROTATING_WORDS = ["Converts.", "Grows.", "Wins."];

/* ─── Floating project mockup cards ─── */
const MOCKUP_CARDS = [
  {
    id: "web",
    label: "Web Platform",
    sublabel: "Adruva Resto System",
    src: "/work/adruva-resto.jpg",
    color: "#FF6B00",
    delay: 0,
    floatDuration: 7,
  },
  {
    id: "seo",
    label: "SEO & Growth",
    sublabel: "Vintage Tours & Travels",
    src: "/work/vintage-tours.jpg",
    color: "#2D8CFF",
    delay: 0.12,
    floatDuration: 9,
  },
  {
    id: "app",
    label: "Mobile App",
    sublabel: "Bali Yoga School",
    src: "/work/bali-yoga.jpg",
    color: "#FF6B00",
    delay: 0.22,
    floatDuration: 8,
  },
];

/* ─── Glass stat cards data ─── */
const STATS = [
  { value: "50+", label: "Clients Served" },
  { value: "3x", label: "Avg. Revenue Growth" },
  { value: "98%", label: "Client Retention" },
  { value: "5yr", label: "In Business" },
];

/* ─── Animated counter hook ─── */
function useCountUp(target: number, duration = 1200, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

/* ─── Single stat card ─── */
function StatCard({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: "-50px" });
  const numericMatch = value.match(/(\d+)/);
  const numericPart = numericMatch ? parseInt(numericMatch[1] ?? "0") : 0;
  const suffix = value.replace(/\d+/, "");
  const counted = useCountUp(numericPart, 1200, isVisible);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center px-5 py-4 rounded-2xl
        bg-white/[0.04] border border-white/10 backdrop-blur-sm
        hover:bg-white/[0.07] hover:border-white/20
        transition-all duration-300 min-w-[110px]"
    >
      <span className="text-2xl font-black text-white tabular-nums font-poppins">
        {numericPart > 0 ? counted : ""}
        {suffix}
      </span>
      <span className="text-[11px] font-medium text-white/40 mt-0.5 text-center leading-tight">
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Floating mockup card ─── */
function MockupCard({
  card,
  index,
}: {
  card: (typeof MOCKUP_CARDS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: "-60px" });
  const floatY = index === 1 ? 8 : -6;
  const rotate = index === 0 ? "-1.5deg" : index === 1 ? "1.5deg" : "-1deg";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: card.delay + 0.35,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        animate={{ y: [0, floatY, 0] }}
        transition={{
          duration: card.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
        whileHover={{ scale: 1.03, rotate: "0deg" }}
        style={{ rotate }}
        className="relative rounded-2xl overflow-hidden border border-white/10
          shadow-[0_20px_60px_rgba(0,0,0,0.5)] cursor-pointer
          transition-all duration-500 group"
      >
        {/* Hover glow border */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
            transition-opacity duration-500 pointer-events-none z-10"
          style={{
            boxShadow: `inset 0 0 0 1px ${card.color}55, 0 0 30px ${card.color}22`,
          }}
        />

        {/* Project image */}
        <div className="relative w-full h-36 bg-[#111827]">
          <Image
            src={card.src}
            alt={card.sublabel}
            fill
            className="object-cover"
            sizes="320px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Card label footer */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-[#0D1117] border-t border-white/[0.06]">
          <div>
            <p className="text-[11px] font-bold text-white/90 leading-none">
              {card.label}
            </p>
            <p className="text-[10px] text-white/40 mt-0.5">{card.sublabel}</p>
          </div>
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: card.color }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN HERO COMPONENT
══════════════════════════════════════════════ */
export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };
  const item = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#070B14]"
    >
      {/* Keyframes */}
      <style>{`
        @keyframes spotlight-breathe {
          0%, 100% { opacity: 0.18; }
          50%       { opacity: 0.30; }
        }
        @keyframes blob-drift-a {
          0%   { transform: translate(0, 0)     scale(1);    }
          50%  { transform: translate(40px,-30px) scale(1.12); }
          100% { transform: translate(0, 0)     scale(1);    }
        }
        @keyframes blob-drift-b {
          0%   { transform: translate(0, 0)      scale(1.08); }
          50%  { transform: translate(-35px,25px) scale(0.92); }
          100% { transform: translate(0, 0)      scale(1.08); }
        }
        @keyframes dot-grid-pulse {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 0.55; }
        }
        .hero-blob-a    { animation: blob-drift-a      22s ease-in-out infinite; }
        .hero-blob-b    { animation: blob-drift-b      28s ease-in-out infinite; }
        .hero-spotlight { animation: spotlight-breathe  6s ease-in-out infinite; }
        .hero-dotgrid   { animation: dot-grid-pulse     9s ease-in-out infinite; }
      `}</style>

      {/* Dot grid */}
      <div
        className="absolute inset-0 hero-dotgrid pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 85% 70% at 50% 45%, #000 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 70% at 50% 45%, #000 50%, transparent 100%)",
        }}
      />

      {/* Orange glow blob — top-right */}
      <div
        className="absolute top-[-8%] right-[-4%] w-[520px] h-[520px] rounded-full pointer-events-none z-0 hero-blob-a"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,0,0.20) 0%, rgba(255,107,0,0.04) 55%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Blue glow blob — bottom-left */}
      <div
        className="absolute bottom-[-5%] left-[-4%] w-[440px] h-[440px] rounded-full pointer-events-none z-0 hero-blob-b"
        style={{
          background:
            "radial-gradient(circle, rgba(45,140,255,0.14) 0%, rgba(45,140,255,0.03) 55%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />

      {/* Spotlight cone — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none z-0 hero-spotlight"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(255,255,255,0.09) 0%, transparent 70%)",
        }}
      />

      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%,
            rgba(255,107,0,0.055), rgba(45,140,255,0.04), transparent 60%)`,
        }}
      />

      {/* ──────────── Main grid ──────────── */}
      <Container className="relative z-10 w-full py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          {/* ════ LEFT COLUMN ════ */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 xl:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={item}>
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                border border-[#FF6B00]/30 bg-[#FF6B00]/[0.08] text-[#FF6B00] text-xs
                font-semibold mb-5 shadow-[0_0_16px_rgba(255,107,0,0.12)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]" />
                </span>
                Now accepting new projects
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-[2.6rem] sm:text-5xl md:text-[3.4rem] xl:text-[3.8rem]
                font-black tracking-tight text-white leading-[1.08] font-poppins mb-4"
            >
              The Digital System
              <br />
              Your Business{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF9A3C] to-[#FFB347] bg-clip-text text-transparent">
                  {prefersReducedMotion ? (
                    ROTATING_WORDS[0]
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={ROTATING_WORDS[wordIndex]}
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="inline-block"
                      >
                        {ROTATING_WORDS[wordIndex]}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </span>
                {/* Animated underline */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #FF6B00, #FFB347, transparent)",
                  }}
                  initial={{ scaleX: 0, originX: "0%" }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
                />
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={item}
              className="text-white/50 text-base sm:text-lg font-medium
                max-w-[480px] leading-relaxed mb-7 font-inter"
            >
              From conversion-optimized websites to AI-powered automation — we
              build digital infrastructure that attracts customers, streamlines
              operations, and scales revenue.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto
                items-center justify-center lg:justify-start mb-8"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                    px-7 h-12 rounded-full bg-[#FF6B00] text-white font-bold text-sm
                    shadow-[0_4px_24px_rgba(255,107,0,0.4)]
                    hover:shadow-[0_6px_32px_rgba(255,107,0,0.6)]
                    hover:bg-[#e85e00] transition-all duration-200 font-poppins"
                >
                  Get a Free Strategy Call
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>

              <Link href="/work" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                    px-7 h-12 rounded-full border border-white/15 text-white/70 font-semibold
                    text-sm hover:border-white/30 hover:text-white hover:bg-white/[0.04]
                    transition-all duration-200 font-inter"
                >
                  View Our Work
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust avatars */}
            <motion.div
              variants={item}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              <div className="flex -space-x-3">
                {["dk", "lk", "nk", "sk"].map((a, i) => (
                  <div
                    key={a}
                    className="relative w-9 h-9 rounded-full border-2 border-[#070B14]
                      overflow-hidden ring-1 ring-white/10"
                    style={{ zIndex: 10 - i }}
                  >
                    <Image
                      src={`/team/${a}.jpg`}
                      alt="Client"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div
                  className="relative w-9 h-9 rounded-full border-2 border-[#070B14]
                    bg-[#FF6B00]/20 flex items-center justify-center text-[10px]
                    font-black text-[#FF6B00] ring-1 ring-white/10"
                  style={{ zIndex: 0 }}
                >
                  50+
                </div>
              </div>
              <p className="text-sm text-white/40 font-inter">
                Trusted by{" "}
                <span className="text-white/80 font-semibold">
                  50+ businesses
                </span>{" "}
                across India
              </p>
            </motion.div>
          </motion.div>

          {/* ════ RIGHT COLUMN: Floating mockup cards ════ */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-5 flex-col gap-3 relative">
            {/* Background glow behind cards */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,107,0,0.06) 0%, transparent 70%)",
              }}
            />

            {MOCKUP_CARDS.map((card, i) => (
              <div
                key={card.id}
                className={
                  i === 1 ? "ml-10 xl:ml-14" : i === 2 ? "ml-5 xl:ml-8" : ""
                }
              >
                <MockupCard card={card} index={i} />
              </div>
            ))}

            {/* "Live client projects" label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="flex items-center gap-1.5 mt-1 justify-end pr-1"
            >
              <Zap className="w-3 h-3 text-[#FF6B00]" />
              <span className="text-[11px] text-white/30 font-medium font-inter">
                Live client projects
              </span>
            </motion.div>
          </div>
        </div>

        {/* ════ BOTTOM: Glass stat cards ════ */}
        <div className="mt-14 lg:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
