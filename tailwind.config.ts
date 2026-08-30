import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F7F3EC',
          200: '#EFE8DC',
          300: '#E3D7C5',
          400: '#D5C4AC',
        },
        espresso: {
          900: '#1B1412',
          800: '#2A201D',
          700: '#3D302B',
          600: '#56443E',
          500: '#735B53',
        },
        terracotta: {
          500: '#C86D51',
          600: '#B25B40',
          700: '#954932',
        },
        sage: {
          500: '#2C4A3E',
          600: '#223C32',
          700: '#192D25',
        },
        amber: {
          500: '#D49A4B',
          600: '#B98236',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(31, 24, 21, 0.05)',
        'warm-md': '0 8px 24px -4px rgba(31, 24, 21, 0.08)',
        'warm-lg': '0 16px 32px -8px rgba(31, 24, 21, 0.12)',
        'glow': '0 0 20px rgba(200, 109, 81, 0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'subtle-pulse': 'subtlePulse 3s infinite ease-in-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
