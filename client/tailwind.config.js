/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        purple: '0 10px 15px -3px rgba(128, 90, 213, 0.75)', // Example purple shadow
      },
    },
  },
  plugins: [],
}