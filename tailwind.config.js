/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4a6fa5',    // Azul profesional
        secondary: '#84c5d0',  // Teal calmante
        textPrimary: '#2d4356', // Texto principal oscuro
        textSecondary: '#6b7c93', // Texto secundario
        background: '#fafbfc', // Fondo neutro
      },
    },
  },
  plugins: [],
}
