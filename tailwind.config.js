/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#1e293b', // Custom dark shade if needed
          950: '#020617', // Deepest dark for background
        }
      }
    },
  },
  plugins: [],
}