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
          blue: '#0878F9',
          'blue-dark': '#0757C9',
          'blue-bright': '#1685FF',
          navy: '#07090D',
          dark: '#07090D',
          'card-dark': '#111720',
          'border-dark': '#202936',
          'surface-light': '#F6F8FC',
          'card-light': '#F5F7FA',
          'border-light': '#E6EAF0',
          'text-muted': '#667085',
          'text-muted-dark': '#9AA4B2',
          orange: '#0878F9',
          teal: '#018A88',
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
        space: ['var(--font-space)', 'sans-serif'],
        'space-grotesk': ['var(--font-space)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
