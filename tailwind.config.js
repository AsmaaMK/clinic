/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1200px",
      xxl: "1400px",
    },
    extend: {
      colors: {
        dark: "#2c2e31",
        white: "#fff",
        green: {
          100: "#e4f1f0",
          DEFAULT: "#5bc198",
        },
        brown: {
          100: "#c0b099",
          DEFAULT: "#a79274",
        },
      },
    },
  },
  plugins: [],
};
