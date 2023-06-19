/** @type {import('tailwindcss').Config} */
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
      keyframes: {
        rumble: {
          "0%": {
            transform: "translate(0, 0) rotate(0)",
          },
          "20%": {
            transform: "translate(-12px, -12px) rotate(-10deg)",
          },
          "40%": {
            transform: "translate(12px, 12px) rotate(10deg)",
          },
          "60%": {
            transform: "translate(-12px, -12px) rotate(-10deg)",
          },
          "80%": {
            transform: "translate(12px, 12px) rotate(10deg)",
          },
          "100%": {
            transform: "translate(10, 10) rotate(10)",
          },
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
