import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        vinho: {
          DEFAULT: '#520027',
          dark: '#3f001c',
          light: '#ffd9e2',
        },
        muted: '#5e5e5e',
        border: '#e2e2e2',
        dark: '#0f0005',
        whatsapp: '#25D366',
      },
      fontFamily: {
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
