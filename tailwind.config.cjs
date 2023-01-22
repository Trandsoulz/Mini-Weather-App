/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rgbaWhite: "rgba(255, 255, 255, 0.2)",
      },
      backgroundImage: {
        imgBg:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('./assets/sunset.jpg')",
      },
    },
  },
  plugins: [],
};
