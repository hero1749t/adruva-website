# Adruva Solution Website — Design System

> Colors, fonts, spacing, components. Read before building any UI.

---

## 1. Brand Colors

```css
/* CSS Variables — globals.css */

/* Light Mode (default) */
:root {
  --bg: #FFFFFF;
  --bg-secondary: #F8FAFC;
  --bg-tertiary: #F1F5F9;
  --card-bg: #FFFFFF;
  --border: rgba(11, 31, 58, 0.1);
  --border-strong: rgba(11, 31, 58, 0.2);
  --text-primary: #0A0A0A;
  --text-secondary: #475569;
  --text-muted: #8A94A6;
}

/* Dark Mode */
.dark {
  --bg: #0A0A0A;
  --bg-secondary: #0B1F3A;
  --bg-tertiary: #0f2a4a;
  --card-bg: #0B1F3A;
  --border: rgba(255, 107, 0, 0.15);
  --border-strong: rgba(255, 107, 0, 0.25);
  --text-primary: #FFFFFF;
  --text-secondary: #CBD5E1;
  --text-muted: #8A94A6;
}

/* Brand colors — same in both modes */
:root {
  --orange: #FF6B00;
  --orange-hover: #E55F00;
  --orange-dim: rgba(255, 107, 0, 0.1);
  --orange-dim-strong: rgba(255, 107, 0, 0.2);
  --navy: #0B1F3A;
  --blue: #2D8CFF;
  --blue-dim: rgba(45, 140, 255, 0.1);
  --green: #10B981;
  --red: #EF4444;
}
```

### Tailwind Config
```typescript
// tailwind.config.ts
colors: {
  brand: {
    navy: '#0B1F3A',
    orange: '#FF6B00',
    'orange-hover': '#E55F00',
    blue: '#2D8CFF',
    gray: '#8A94A6',
    black: '#0A0A0A',
  }
}
```

---

## 2. Typography

### Font Stack
```typescript
// Headings: Poppins (800, 700, 600)
// Body: Inter (400, 500)
// Marketing subtext: Space Grotesk (600, 400)
// Code: JetBrains Mono (400)
```

### Type Scale
```css
--text-xs: 12px;    /* Badges, labels, meta info */
--text-sm: 14px;    /* Body text, descriptions */
--text-base: 16px;  /* Default body */
--text-lg: 20px;    /* Section subtitles */
--text-xl: 24px;    /* Small headings */
--text-2xl: 32px;   /* Section titles */
--text-3xl: 48px;   /* Page titles */
--text-4xl: 64px+;  /* Hero headlines (clamp) */
```

### Usage Rules
```
Hero H1: Poppins 800, clamp(38px, 5.5vw, 68px), letter-spacing: -2px
Section Title: Poppins 700, 32px, letter-spacing: -0.5px
Card Title: Poppins 600, 16px
Body text: Inter 400, 15px, line-height: 1.7
Small text: Inter 400, 13px
Labels/tags: Inter 500, 11px, letter-spacing: 0.1em, UPPERCASE
Hero subtext: Space Grotesk 400, 18px
```

---

## 3. Spacing System (8px base grid)

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 16px;
--space-4: 24px;
--space-5: 32px;
--space-6: 48px;
--space-7: 64px;
--space-8: 80px;    /* Section padding */
--space-9: 96px;
--space-10: 120px;  /* Large section padding */
```

### Section Padding Rule
```css
/* Standard section: 80px top/bottom */
.section { padding: 80px 40px; max-width: 1100px; margin: 0 auto; }

/* On mobile: 48px top/bottom */
@media (max-width: 640px) {
  .section { padding: 48px 20px; }
}
```

---

## 4. Border Radius

```css
--radius-sm: 4px;    /* Small elements */
--radius-btn: 8px;   /* Buttons, inputs */
--radius-card: 12px; /* Cards */
--radius-lg: 16px;   /* Large cards */
--radius-xl: 20px;   /* CTA boxes */
--radius-full: 100px; /* Badges, pills */
```

---

## 5. Shadows

```css
/* Light mode */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow: 0 4px 6px rgba(0,0,0,0.07);
--shadow-lg: 0 10px 24px rgba(0,0,0,0.1);
--shadow-orange: 0 4px 20px rgba(255,107,0,0.2);

/* Dark mode — use border instead of shadow */
```

---

## 6. Component Specs (Shadcn/ui Customizations)

### Button
```
Primary: bg-orange, text-white, rounded-btn, px-6 py-3, font-semibold
Primary hover: opacity-90, translateY(-1px)
Ghost: bg-transparent, border-gray/30, text-gray
Ghost hover: text-white, border-gray/60
```

### Card
```
Light: bg-white, border border-navy/10, rounded-card, shadow-sm
Dark: bg-navy, border border-orange/15, rounded-card
Hover: border-color → orange/25, translateY(-4px)
```

### Badge / Tag
```
Orange: bg-orange/10, text-orange, rounded-full, text-xs, font-medium
Blue: bg-blue/10, text-blue
Green: bg-green/10, text-green
Gray: bg-gray/10, text-gray
```

### Input / Form Fields
```
bg-bg-tertiary, border border-navy/10, rounded-btn
focus: border-orange/50, outline-none
placeholder: text-muted
```

### Section Tag (Above Title)
```
Font: Inter 600, 11px, letter-spacing: 0.12em, UPPERCASE
Color: orange
Margin-bottom: 10px
```

---

## 7. Animation Tokens (Framer Motion)

```typescript
// Scroll reveal (most common)
export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
}

// Stagger children
export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

// Card hover
export const cardHover = {
  whileHover: { y: -4, transition: { duration: 0.2 } }
}

// Counter animation
export const useCounter = (target: number, duration: number) => {
  // Use framer-motion useMotionValue + useTransform
}

// Page transition
export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3 }
}
```

---

## 8. Breakpoints (Mobile-First)

```css
/* Tailwind defaults — use these */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* XL desktop */

/* Max content width: 1100px */
/* Horizontal padding: 40px desktop, 20px mobile */
```

---

## 9. Navbar Specs

```
Height: 64px
Background: transparent on top → bg-black/90 + blur(20px) on scroll
Border bottom: 0.5px solid var(--border) (only when scrolled)
Logo: left (Poppins 800, logo icon + "Adruva Solution")
Links: center (Inter 400, 14px, text-muted → text-white on hover)
CTA button: right ("Book a Free Call", primary button style)
Dark/Light toggle: left of CTA
Position: sticky top-0, z-100

Mobile (<768px):
- Hamburger icon (right side)
- Click → full screen overlay
- Overlay: bg-black, all links vertical center, 24px font
- Close button top-right
```

---

## 10. Footer Specs

```
4 Columns:
Col 1 (2fr): Logo + tagline + newsletter form
Col 2 (1fr): Services links
Col 3 (1fr): Company links
Col 4 (1.5fr): Contact info + social icons

Newsletter form:
- Input (email) + "Subscribe" button (orange)
- On submit: POST /api/v1/newsletter/subscribe

Social buttons:
- 32x32px, border rounded-btn
- Icons: LinkedIn, Instagram, Twitter/X, YouTube, WhatsApp
- Hover: border-orange, color-orange

Bottom bar:
- Border-top
- Left: "© 2026 Adruva Solution. All rights reserved."
- Right: "Made with ♥ in Dehradun"
```
