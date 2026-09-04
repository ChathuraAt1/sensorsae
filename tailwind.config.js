/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#06080d',
          surface: '#0b0f19',
          card: '#10172a',
          border: '#1e293b',
        },
        cobalt: {
          DEFAULT: '#3b82f6',
          glow: '#60a5fa',
          deep: '#1e3a8a',
          surface: 'rgba(11, 15, 25, 0.75)',
          dark: '#172554',
          alert: '#93c5fd',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-rapid': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite alternate',
        'telemetry-flow': 'telemetryFlow 20s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 15px rgba(59, 130, 246, 0.2), inset 0 0 10px rgba(59, 130, 246, 0.1)' },
          '100%': { boxShadow: '0 0 30px rgba(96, 165, 250, 0.4), inset 0 0 20px rgba(96, 165, 250, 0.2)' },
        },
        telemetryFlow: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(59, 130, 246, 0.25)',
        'glow-md': '0 0 25px rgba(59, 130, 246, 0.35)',
        'glow-lg': '0 0 45px rgba(59, 130, 246, 0.45)',
        'glow-alert': '0 0 30px rgba(147, 197, 253, 0.6)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
