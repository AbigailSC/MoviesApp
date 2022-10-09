/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      transitionProperty: {
        left: "left",
      },
    },
  },
  variants: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [],
}
