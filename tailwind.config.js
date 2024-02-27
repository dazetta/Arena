/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat'],
        'sans': ['sans-serif']
      }
    },
    colors: {
      "primary": "#22A5F0",
      "secondary": "#3A506B",
      "white": "#fff",
      "gray": "#808080",
      "gray-10": "#e1e1e1",
      "overlay": "rgba(0,0,0,0.5)",
      "black": "#000"
    }
  },
  plugins: [],
};
