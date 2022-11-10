/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.jsx', './src/components/*.jsx', './src/main.jsx'],
  theme: {
    extend: {
      colors: {
        'main-color': '#ff8000'
      },
      fontFamily: {
        'Montserrat': ['Montserrat', 'sans-serif'],
        'FastHand': ['Fasthand', 'cursive']
      }
    },
  },
  plugins: [],
}
