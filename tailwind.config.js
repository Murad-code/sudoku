/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["montserrat", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue: {
          400: "#2dc7ff",
          500: "#009ed4",
          600: "#0077aa",
        },
        green: {
          400: "#06d6a0",
          500: "#00ab78",
          600: "#008153",
        },
        red: {
          400: "#ff6d6d",
          500: "#b23939",
        },
      },
      // colors: {
      //   yellow: "fff59a",
      //   blue: "2dc7ff",
      //   red: "ff6d6d",
      //   green: "88dfab",
      // },
    },
  },
  plugins: [],
};
