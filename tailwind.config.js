const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.fuchsia,
        danger: colors.red,
        warning: colors.orange,
        success: colors.green,
      },
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
