/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter','ui-sans-serif','system-ui'] },
      colors: {
        brand: { 500:'#a855f7', 600:'#9333ea', 700:'#7e22ce' },
        aura: { 500:'#22d3ee', 600:'#06b6d4' }
      },
      boxShadow: {
        glow: '0 10px 40px rgba(168,85,247,.35)',
        soft: '0 10px 30px rgba(0,0,0,.10)',
      }
    }
  },
  plugins: [],
}
