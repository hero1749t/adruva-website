/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          navy: '#0B1F3A',
          dark: '#081120',
          orange: '#FF6B00',
          'orange-hover': '#E55F00',
          blue: '#0052FF',
          'blue-bright': '#0066FF',
          ice: '#D6E8F3',
          teal: '#018A88',
          gray: '#8A94A6',
          black: '#070707',
          surface: '#F9F9F9',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: '12px',
        btn: '8px',
        badge: '100px',
      },
      fontFamily: {
        sora: ['var(--font-sora)', 'sans-serif'],
        heading: ['var(--font-sora)', 'sans-serif'],
        poppins: ['var(--font-sora)', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'sans-serif'],
        body: ['var(--font-manrope)', 'sans-serif'],
        inter: ['var(--font-manrope)', 'sans-serif'],
        space: ['var(--font-space-grotesk)', 'sans-serif'],
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
