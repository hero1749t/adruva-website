# Adruva Solution Website — Animations Spec

> All Framer Motion animations. Read before adding any animation.

---

## 1. Animation Philosophy

- **Level:** Medium — scroll reveals + hover effects + counter animations
- **Library:** Framer Motion only (no CSS keyframes for complex animations)
- **Rule:** Animations should enhance, never distract
- **Performance:** Use `will-change: transform` sparingly, lazy-import Framer Motion

---

## 2. Scroll Reveal Animations

### Standard Fade Up (Most Used)

```tsx
// Used on: section titles, cards, content blocks
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

// Usage with viewport trigger:
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-50px' }}
>
```

### Stagger Children (Cards Grid)

```tsx
// Used on: services grid, work grid, testimonials, team grid
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

// Usage:
<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {items.map(item => (
    <motion.div key={item.id} variants={staggerItem}>
      {/* card content */}
    </motion.div>
  ))}
</motion.div>
```

### Fade In (Simple)

```tsx
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};
```

---

## 3. Hero Animations

### Animated Typing Effect

```tsx
// Hero headline — cycling words
const words = ['Scale.', 'Grow.', 'Win.', 'Succeed.']

// Use: framer-motion AnimatePresence + key cycling
// Words fade in/out every 2.5 seconds
// Only the last word of the headline changes

<AnimatePresence mode="wait">
  <motion.span
    key={currentWord}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4 }}
    className="text-orange"
  >
    {currentWord}
  </motion.span>
</AnimatePresence>
```

### Floating Particles Background

```tsx
// Subtle floating dots/circles in hero background
// Small orange/blue circles, low opacity (0.15-0.3)
// Gentle floating animation (up-down, 3-6 second loops)
// Max 8-12 particles — don't overdo it
// CSS animation ok for this (simple translate)

// Implementation: absolute positioned divs with CSS animation
// or use a lightweight particle library
```

### Hero Content Entrance

```tsx
// Hero badge → h1 → subtext → CTAs — cascade in
const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

// Badge: custom={0}
// H1: custom={1}
// Subtext: custom={2}
// CTAs: custom={3}
```

---

## 4. Counter Animations (Stats Strip)

```tsx
// Animated number counting on scroll into view
import { useMotionValue, useSpring, useInView } from "framer-motion";

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(target);
  }, [isInView]);

  useEffect(() => {
    springValue.on("change", (v) => setDisplay(Math.round(v)));
  }, []);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
```

---

## 5. Marquee Animation (Client Logos)

```tsx
// Infinite scroll marquee — pure CSS animation
// No JS needed, smooth 60fps

.marquee-track {
  display: flex;
  gap: 40px;
  width: max-content;
  animation: marquee 25s linear infinite;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

// Duplicate items to create seamless loop
// Pause on hover: animation-play-state: paused
```

---

## 6. Hover Animations

### Card Hover

```tsx
<motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
```

### Button Hover

```tsx
<motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
```

### Link Arrow

```tsx
// Arrow icon moves right on hover
<motion.span whileHover={{ x: 4 }} className="inline-block">
  →
</motion.span>
```

### Service Card Icon

```tsx
// Icon scales up slightly on card hover
<motion.div
  className="service-icon"
  whileHover={{ scale: 1.1, rotate: 5 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
```

---

## 7. Navbar Animations

### Scroll Behavior

```tsx
// Transparent → solid background on scroll
const { scrollY } = useScroll();
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  return scrollY.on("change", (y) => setIsScrolled(y > 10));
}, []);

// Apply class: isScrolled ? 'bg-black/90 backdrop-blur-xl border-b' : 'bg-transparent'
// Transition: CSS transition: background 0.3s, border-color 0.3s
```

### Mega Menu

```tsx
const megaMenuVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
};
```

### Mobile Menu Overlay

```tsx
const mobileMenuVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: { opacity: 1, x: 0, transition: { type: "tween", duration: 0.3 } },
  exit: { opacity: 0, x: "100%", transition: { duration: 0.2 } },
};
```

---

## 8. Page Transitions

```tsx
// Wrap page content in:
<motion.main
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
>
  {children}
</motion.main>
```

---

## 9. Loading Skeleton

```tsx
// Use Shadcn Skeleton component
// Pulse animation built-in

// Blog grid skeleton:
<div className="grid grid-cols-3 gap-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="space-y-3">
      <Skeleton className="h-48 w-full rounded-card" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ))}
</div>
```

---

## 10. WhatsApp Button Animation

```tsx
// Pulse ring animation — draws attention
// CSS animation (not Framer Motion — performance)

.wa-float {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 50;
  animation: wa-pulse 3s ease-in-out infinite;
}

@keyframes wa-pulse {
  0%, 100% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.35); }
  50% { box-shadow: 0 4px 32px rgba(37, 211, 102, 0.65); }
}
```

---

## 11. Growth System Steps Animation

```tsx
// 5-step grid — each step reveals with slight delay
// Active step highlights on hover with orange border

const stepVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};
```

---

## 12. Performance Rules

1. **Always use `once: true`** in `viewport` prop — don't re-animate on scroll up
2. **Never animate layout properties** (width, height, top, left) — only transform + opacity
3. **Lazy import Framer Motion** for below-fold sections
4. **Disable animations on `prefers-reduced-motion`:**

```tsx
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const variants = prefersReducedMotion ? {} : fadeInUp;
```
