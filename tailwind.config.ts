import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: 'minmax(18rem, 20rem) 1fr',
        profile: 'max-content 1fr min-content',
        form: 'minmax(7.5, 17.5rem) minmax(25rem, 1fr) minmax(0, 15rem)',
      },

      borderWidth: {
        6: '6px',
      },

      colors: {
        violet: {
          25: '#fcfaff',
        },
        teles: '#8257e6',
      },

      maxWidth: {
        app: '700px',
      },

      keyframes: {
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },

      animation: {
        slideDownAndFade: 'slideDownAndFade 1s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
export default config
