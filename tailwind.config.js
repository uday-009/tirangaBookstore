/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF671F",
        secondary: "#046A38",
        favorite: "#06038D",
        lightGray: "#fafbfc",
        lightFont: "#94969f",
        dim: "#3e4152"
      },
      fontFamily: {
        secondary: ['Montserrat', 'sans-serif'],
        magilio: ['Magilio', 'sans-serif']

      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
 
}