/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        primary: {
          50: '#F3EBFF',
          100: '#E5D4FF',
          200: '#C9A9FF',
          300: '#AD7DFF',
          400: '#9152FF',
          500: '#6D28D9', // Main purple
          600: '#5B21B6',
          700: '#4A1A94',
          800: '#391372',
          900: '#280C50',
        },
        secondary: {
          50: '#E0FBFF',
          100: '#C2F7FF',
          200: '#84EEFF',
          300: '#47E4FF',
          400: '#22D3EE', // Main cyan
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
        neutral: {
          50: '#f8f8f8',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 15s ease infinite',
        'highlight': 'highlight 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        highlight: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgba(109, 40, 217, 0.1)' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px 2px rgba(109, 40, 217, 0.3)',
        'glow-cyan': '0 0 15px 2px rgba(34, 211, 238, 0.3)',
        'inner-glow': 'inset 0 0 15px 2px rgba(109, 40, 217, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};