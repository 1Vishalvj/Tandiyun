/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#183C32',
          dark: '#102A23',
          light: '#235245',
        },
        deepGreen: {
          DEFAULT: '#243D32',
          dark: '#1B2F26',
        },
        mist: {
          DEFAULT: '#D8E1D4',
          light: '#EBF0E9',
          dark: '#BCCAB6',
        },
        ivory: {
          DEFAULT: '#EDE5D5',
          light: '#F8F5EE',
          dark: '#DDD0B9',
        },
        earth: {
          DEFAULT: '#A66F43',
          light: '#BD875C',
          dark: '#8C5A32',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        hindi: ['var(--font-noto-serif-devanagari)', 'Noto Serif Devanagari', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cinematic': '0 20px 50px rgba(16, 42, 35, 0.45)',
        'glow': '0 0 25px rgba(216, 225, 212, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out forwards',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
