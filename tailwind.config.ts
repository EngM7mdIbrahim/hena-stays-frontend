import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

import { mantine_tw_preset } from './tailwind.mantine.preset'

const config: Config = {
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'], // Enables class-based dark mode
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [mantine_tw_preset],
  theme: {
    extend: {
      colors: {
        // main colors
        'primary': 'rgba(var(--color-primary))',
        'secondary': 'rgba(var(--color-secondary))',
        'default-font': 'rgba(var(--color-default-font))',
        'neutral-border': 'rgba(var(--color-neutral-border))',
        'default-background': 'rgba(var(--color-default-background))',
        'default-text': 'rgba(var(--color-default-text))',
        // brand colors
        'brand': {
          50: 'rgba(var(--color-brand50))',
          100: 'rgba(var(--color-brand100))',
          200: 'rgba(var(--color-brand200))',
          300: 'rgba(var(--color-brand300))',
          400: 'rgba(var(--color-brand400))',
          500: 'rgba(var(--color-brand500))',
          600: 'rgba(var(--color-brand600))',
          700: 'rgba(var(--color-brand700))',
          800: 'rgba(var(--color-brand800))',
          900: 'rgba(var(--color-brand900))'
        },

        // neutral colors
        'neutral': {
          50: 'rgba(var(--color-neutral50))',
          100: 'rgba(var(--color-neutral100))',
          200: 'rgba(var(--color-neutral200))',
          300: 'rgba(var(--color-neutral-300))',
          400: 'rgba(var(--color-neutral400))',
          500: 'rgba(var(--color-neutral500))',
          600: 'rgba(var(--color-neutral600))',
          700: 'rgba(var(--color-neutral700))',
          800: 'rgba(var(--color-neutral800))',
          900: 'rgba(var(--color-neutral900))'
        },

        // error colors
        'error': {
          50: 'rgba(var(--color-error50))',
          100: 'rgba(var(--color-error100))',
          200: 'rgba(var(--color-error200))',
          300: 'rgba(var(--color-error300))',
          400: 'rgba(var(--color-error400))',
          500: 'rgba(var(--color-error500))',
          600: 'rgba(var(--color-error600))',
          700: 'rgba(var(--color-error700))',
          800: 'rgba(var(--color-error800))',
          900: 'rgba(var(--color-error900))'
        },

        // warning colors
        'warning': {
          50: 'rgba(var(--color-warning50))',
          100: 'rgba(var(--color-warning100))',
          200: 'rgba(var(--color-warning200))',
          300: 'rgba(var(--color-warning300))',
          400: 'rgba(var(--color-warning400))',
          500: 'rgba(var(--color-warning500))',
          600: 'rgba(var(--color-warning600))',
          700: 'rgba(var(--color-warning700))',
          800: 'rgba(var(--color-warning800))',
          900: 'rgba(var(--color-warning900))'
        },

        // success colors
        'success': {
          50: 'rgba(var(--color-success50))',
          100: 'rgba(var(--color-success100))',
          200: 'rgba(var(--color-success200))',
          300: 'rgba(var(--color-success300))',
          400: 'rgba(var(--color-success400))',
          500: 'rgba(var(--color-success500))',
          600: 'rgba(var(--color-success600))',
          700: 'rgba(var(--color-success700))',
          800: 'rgba(var(--color-success800))',
          900: 'rgba(var(--color-success900))'
        }
      },
      backgroundImage: {
        'primary-gradient':
          'linear-gradient(180deg, rgba(var(--color-primary)) 0%, rgba(144, 97, 43, 1) 100%)',
        'secondary-gradient':
          'linear-gradient(180deg, rgba(var(--color-secondary)) 0%, rgba(10, 63, 173, 1) 100%)'
      },
      fontFamily: {
        manrope: ['Manrope', ...fontFamily.sans],
        rubik: ['Rubik', ...fontFamily.sans],
        lexend: ['Lexend', ...fontFamily.sans]
      }
    }
  },
  plugins: [typography]
}

export default config
