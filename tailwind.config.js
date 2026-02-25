/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0F1014', // Charcoal black background
          800: '#181A20', // Slightly lighter for cards
          700: '#252830',
          600: '#343844',
          500: '#C4D600', // Lime Green CTA
          accent: '#DDF000' // Brighter Lime
        },
        surface: '#FFFFFF'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
