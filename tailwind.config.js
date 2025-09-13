/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f8fa',
          100: '#e6edf5',
          200: '#c5d6e6',
          300: '#94b6d1',
          400: '#5c8cb5',
          500: '#2f5e91',
          600: '#244a72',
          700: '#1d3b5b',
          800: '#162b43',
          900: '#0f1d2e',
        },
        accent: {
          50: '#fafafa',
          100: '#f9fafb',
          200: '#f3f4f6',
          500: '#9ca3af',
          700: '#4b5563',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
};