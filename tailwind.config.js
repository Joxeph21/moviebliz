/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Inter, san-serif",
      bebas: "Bebas Neue, san-serif",
    },
    extend: {
      colors: {
        brandGreen: "#3EE22E",
      },
    },
  },
  plugins: [],
};
