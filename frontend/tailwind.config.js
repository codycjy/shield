/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
        brand: {
          green: '#10B981',
          red: '#EF4444',
          blue: '#3B82F6',
        },
      },
    },
  },
  plugins: [],
}
