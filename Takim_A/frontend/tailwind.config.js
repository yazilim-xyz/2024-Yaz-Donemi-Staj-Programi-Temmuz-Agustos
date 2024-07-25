/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00171F',      // Birincil Renk
        secondary: '#003459',    // İkincil Renk
        tertiary: '#007EA7',     // Üçüncül Renk
        quaternary: '#00A8E8',   // Dördüncül Renk
        quinary: '#FFFFFF',      // Beşincil Renk
        bordo: '#8A1C1C',      
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
      },
        
    },
  },
  variants: {},
  plugins: [],
}
