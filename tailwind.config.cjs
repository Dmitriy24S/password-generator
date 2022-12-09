/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-neon-100': '#a4ffaf',
        'green-neon-200': '#80ff8f',
        dark: '#14131b',
        'gray-dark': '#18171f',
        'gray-medium': '#24232c',
        gray: '#817d92',
        'white-off': '#e6e5ea'
      }
    }
  },
  plugins: []
}
