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
      borderRadius: {
        sm: '4px'
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        'primary-invert': 'var(--text-primary-invert)',
        'secondary-invert': 'var(--text-secondary-invert)',
        destructive: 'var(--text-destructive)'
      },
      backgroundColor: {
        primary: 'var(--background-primary)',
        secondary: 'var(--background-secondary)',
        tertiary: 'var(--background-tertiary)',
        destructive: 'var(--background-destructive)',
        success: 'var(--background-success)'
      },
      borderColor: {
        primary: 'var(--border-primary)',
        secondary: 'var(--border-secondary)',
        destructive: 'var(--border-destructive)'
      },
      fontFamily: {
        'space-grotesk': ['var(--font-space-grotesk)', ...fontFamily.sans],
        'jetbrains-mono': ['var(--font-jetbrains-mono)', ...fontFamily.mono]
      },
      colors: {
        accent: 'var(--accent)',
        'accent-variant': 'var(--accent-variant)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
