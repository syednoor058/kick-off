/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bodyFont: ["Poppins", "sans-serif"],
      },
      colors: {
        primaryColor: "#ffffff",
        secondaryColor: "#000000",
        accentColor: "#333333",
        secondaryAccentColor: "#232323",
      },
    },
  },
  plugins: [],
}