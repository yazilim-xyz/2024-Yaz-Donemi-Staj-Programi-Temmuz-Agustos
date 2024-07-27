/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
     "./src/pages/index.css"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00171F',      // Birincil Renk
        secondary: '#003459',    // İkincil Renk
        tertiary: '#007EA7',     // Üçüncül Renk
        quaternary: '#00A8E8',   // Dördüncül Renk
        quinary: '#FFFFFF',      // Beşincil Renk
        bordo: '#8A1C1C',      },
    },
  },
  plugins: [],
}
