/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
          500: '#2f5e91', // main brand color
          600: '#244a72',
          700: '#1d3b5b',
          800: '#162b43',
          900: '#0f1d2e'
        },
        accent: {
          50: '#f9fafb',
          100: '#f9fafb',
          200: '#f3f4f6',
          300: '#e5e7eb',
          400: '#d1d5db',
          500: '#9ca3af',
          600: '#6b7280',
          700: '#4b5563',
          800: '#374151',
          900: '#111827'
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Roboto', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#374151',
            fontFamily: 'Roboto, system-ui, sans-serif',
            lineHeight: '1.7',
            h1: {
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '800',
              color: '#2f5e91',
            },
            h2: {
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '700',
              color: '#2f5e91',
            },
            h3: {
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '600',
              color: '#2f5e91',
            },
            code: {
              fontFamily: 'Fira Code, monospace',
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}