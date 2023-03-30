const defaultTheme = require('tailwindcss/defaultTheme');


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['roboto', ...defaultTheme.fontFamily.sans]
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      }
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#45B1E8',
          secondary: '#E8456B',
          accent: '#3AE8C4',
          "--btn-text-case": "none",
        },
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=black]'],
          primary: '#45B1E8',
          secondary: '#E8456B',
          accent: '#3AE8C4',
          "--btn-text-case": "none",
          '--rounded-box': '0.2rem',
          '--rounded-btn': '0.2rem'
        }
      }
    ]
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/line-clamp')
  ],
}
