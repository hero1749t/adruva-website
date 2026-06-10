module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B1F3A',
          orange: '#FF6B00',
          'orange-hover': '#E55F00',
          blue: '#2D8CFF',
          gray: '#8A94A6',
          black: '#0A0A0A',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        space: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
        badge: '100px',
      },
    },
  },
  plugins: [],
};
