/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#181918",
        secondary: "#242526",
      },
      textColor: {
        redContrast: "#eb8989",
        greenContrast: "#1ABC55",
        primary: "#e4e6eb",
        secondary: "#bob3b8",
      },
      borderColor: {
        primary: "#2b2b2b",
      },
    },
  },
  plugins: [],
};
