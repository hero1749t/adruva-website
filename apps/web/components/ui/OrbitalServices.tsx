"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  Megaphone,
  Bot,
  Globe,
  LineChart,
  Users,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";

interface ServiceNode {
  id: string;
  label: string;
  icon: LucideIcon;
  angleOffset: number;
  radius: number;
}

const concentricServices: ServiceNode[] = [
  {
    id: "marketing",
    label: "Digital Marketing",
    icon: Megaphone,
    angleOffset: 0,
    radius: 130,
  },
  {
    id: "analytics",
    label: "Growth Analytics",
    icon: LineChart,
    angleOffset: 180,
    radius: 130,
  },
  { id: "ai", label: "AI Automation", icon: Bot, angleOffset: 90, radius: 175 },
  {
    id: "lead",
    label: "Lead Generation",
    icon: Users,
    angleOffset: 270,
    radius: 175,
  },
  {
    id: "web",
    label: "Web Development",
    icon: Globe,
    angleOffset: 0,
    radius: 220,
  },
];

interface OrbitingNodeProps {
  service: ServiceNode;
  angle: any; // MotionValue<number>
  isDragging: boolean;
}

function OrbitingNode({ service, angle, isDragging }: OrbitingNodeProps) {
  // Perfect circular orbits (rx = ry = radius)
  const r = service.radius;

  const nodeAngle = useTransform(
    angle,
    (val: number) => (val + service.angleOffset) % 360,
  );
  const x = useTransform(
    nodeAngle,
    (val) => Math.cos((val * Math.PI) / 180) * r,
  );
  const y = useTransform(
    nodeAngle,
    (val) => Math.sin((val * Math.PI) / 180) * r,
  );

  return (
    <motion.div
      style={{ x, y, zIndex: 30 }}
      className="absolute flex flex-col items-center gap-1.5 pointer-events-auto"
    >
      {/* Node Button - Large, Visible, High Contrast */}
      <div className="w-11 h-11 md:w-13 md:h-13 rounded-full bg-zinc-950 border-2 border-white/20 shadow-[0_5px_12px_rgba(0,0,0,0.6)] flex items-center justify-center relative hover:border-brand-orange hover:shadow-[0_0_15px_rgba(255,107,0,0.35)] transition-all duration-300">
        <service.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />

        {/* Glowing Orange Active Indicator Dot */}
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-brand-orange rounded-full shadow-[0_0_6px_rgba(255,107,0,0.9)] border border-black" />
      </div>

      {/* Description Label - Visible and High-Quality */}
      <span className="text-[9px] md:text-[10px] font-bold text-white tracking-wide bg-zinc-950 border border-white/10 px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
        {service.label}
      </span>
    </motion.div>
  );
}

export function OrbitalServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const rX = useMotionValue(0);
  const rY = useMotionValue(0);

  const startPointer = useRef({ x: 0, y: 0 });
  const startRotation = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Hover Tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || !containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    rY.set(x * 12);
    rX.set(-y * 12);
  };

  const handleMouseLeave = () => {
    if (isDragging) return;
    animate(rX, 0, { type: "spring", stiffness: 100, damping: 20 });
    animate(rY, 0, { type: "spring", stiffness: 100, damping: 20 });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startPointer.current = { x: e.clientX, y: e.clientY };
    startRotation.current = { x: rY.get(), y: rX.get() };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPointer.current.x;
    const deltaY = e.clientY - startPointer.current.y;
    // Map drag coordinates to rotation
    rY.set(startRotation.current.x + deltaX * 0.6);
    rX.set(startRotation.current.y - deltaY * 0.6);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) {
      // safe fallback
    }
    // Return smoothly to level
    animate(rX, 0, { type: "spring", stiffness: 60, damping: 15 });
    animate(rY, 0, { type: "spring", stiffness: 60, damping: 15 });
  };

  // Continuous animation angle
  const orbitAngle = useMotionValue(0);

  useAnimationFrame((time) => {
    if (isDragging || isReducedMotion) return;
    orbitAngle.set((time / 110) % 360);
  });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[500px] flex items-center justify-center isolate group perspective-1000 select-none"
    >
      {/* Background Ambience Glow */}
      <div className="absolute inset-0 flex items-center justify-center -z-20 pointer-events-none">
        <div className="w-[300px] h-[300px] bg-brand-orange/5 rounded-full blur-[90px]" />
        <div className="absolute w-[200px] h-[200px] bg-brand-blue/5 rounded-full blur-[70px] translate-x-12 -translate-y-12" />
      </div>

      {/* 3D Scene Wrapper - Tilts and rotates with mouse/touch drag */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
      >
        {/* Concentric Circular Orbit Paths */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          {[130, 175, 220].map((radius) => (
            <div
              key={`orbit-path-${radius}`}
              className="absolute rounded-full border border-white/5"
              style={{
                width: radius * 2,
                height: radius * 2,
                boxShadow: "inset 0 0 10px rgba(255,255,255,0.01)",
              }}
            />
          ))}
        </div>

        {/* Orbiting Services - Clean concentric projected nodes */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {concentricServices.map((service) => (
            <OrbitingNode
              key={service.id}
              service={service}
              angle={orbitAngle}
              isDragging={isDragging}
            />
          ))}
        </div>

        {/* Central Logo & Tech-Pedestal */}
        <div
          className="relative z-10 flex flex-col items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Floating Logo - Centered perfectly to align with circular orbits */}
          <motion.div
            animate={!isDragging && !isReducedMotion ? { y: [0, -6, 0] } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-36 h-36 md:w-40 md:h-40 flex items-center justify-center"
            style={{ transform: "translateZ(60px)", zIndex: 10 }}
          >
            <div className="relative w-full h-full drop-shadow-[0_15px_25px_rgba(45,140,255,0.35)]">
              <Image
                src="/logo-symbol-light.png"
                alt="Adruva Solution Central Tech Hub Logo"
                fill
                className="object-contain pointer-events-none"
                priority
              />
            </div>
          </motion.div>

          {/* Solid Pedestal Base - Aligned perfectly under logo */}
          <div
            className="absolute top-[65%] flex flex-col items-center justify-center"
            style={{
              transform: "translateZ(-30px)",
              transformStyle: "preserve-3d",
              zIndex: 9,
            }}
          >
            {/* Subtle blue base glow */}
            <div className="w-24 h-6 bg-brand-blue/20 rounded-full blur-xl mb-4 pointer-events-none" />

            {/* Top platform */}
            <div className="w-40 h-10 bg-gradient-to-b from-zinc-800 to-zinc-950 rounded-[100%] border border-white/10 shadow-[0_0_20px_rgba(255,107,0,0.1)_inset] relative flex items-center justify-center">
              <div className="w-28 h-5 rounded-[100%] border border-brand-orange/20" />
            </div>

            {/* Lower thickness */}
            <div className="w-40 h-6 -mt-5 bg-gradient-to-b from-zinc-950 to-black rounded-[100%] rounded-t-none border-x border-b border-white/5 shadow-[0_10px_20px_rgba(0,0,0,0.8)]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
