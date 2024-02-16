import { fontFamily } from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        'primary-invert': 'var(--text-primary-invert)'
      },
      backgroundColor: {
        primary: 'var(--background-primary)',
        secondary: 'var(--background-secondary)',
        tertiary: 'var(--background-tertiary)'
      },
      fontFamily: {
        'space-grotesk': ['var(--font-space-grotesk)', ...fontFamily.sans]
      },
      colors: {
        accent: 'var(--accent)',
        'accent-secondary': 'var(--accent-secondary)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
