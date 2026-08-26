"use client";

import React, { useEffect, useRef } from "react";

export function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Check if device has hover capability (desktop/mouse)
    const hasHover = window.matchMedia("(any-hover: hover)").matches;

    const handleResize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      mouseRef.current = { x: -1000, y: -1000 };
    };

    if (hasHover) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    // Grid configuration
    const dotSpacing = 36;
    const maxDistance = 160; // radius of influence

    // Determine current theme (dark or light)
    const isDark = () => document.documentElement.classList.contains("dark");

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const dark = isDark();
      const dotColor = dark
        ? "rgba(255, 255, 255, 0.04)"
        : "rgba(0, 0, 0, 0.05)";
      const orangeGlow = dark ? "rgba(255, 107, 0, " : "rgba(255, 107, 0, ";
      const blueGlow = dark ? "rgba(45, 140, 255, " : "rgba(45, 140, 255, ";

      // Loop through grid coordinates
      const startX = (width % dotSpacing) / 2;
      const startY = (height % dotSpacing) / 2;

      for (let x = startX; x < width; x += dotSpacing) {
        for (let y = startY; y < height; y += dotSpacing) {
          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let drawX = x;
          let drawY = y;
          let color = dotColor;
          let size = 1.0;

          if (isHoveredRef.current && distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance; // 0 to 1

            // Pull dot towards cursor (magnetic effect)
            drawX = x + dx * force * 0.12;
            drawY = y + dy * force * 0.12;

            // Larger size for hovered dots
            size = 1.0 + force * 1.5;

            // Blend colors based on X coordinate (orange on left, blue on right)
            const ratio = x / width;
            if (ratio < 0.5) {
              color = `${orangeGlow}${0.08 + force * 0.5})`;
            } else {
              color = `${blueGlow}${0.08 + force * 0.5})`;
            }
          }

          // Draw the dot
          ctx.beginPath();
          ctx.arc(drawX, drawY, size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (hasHover) {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
      style={{ mixBlendMode: "normal" }}
    />
  );
}

export default DynamicBackground;
