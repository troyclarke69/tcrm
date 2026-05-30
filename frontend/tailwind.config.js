/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f7f6",
          100: "#d9e6e1",
          200: "#b3cdc4",
          300: "#84ad9f",
          400: "#5e8f7e",
          500: "#456f62",
          600: "#35594f",
          700: "#2a4640",
          800: "#223833",
          900: "#172623"
        }
      },
      boxShadow: {
        soft: "0 18px 40px rgba(23, 38, 35, 0.08)"
      }
    }
  },
  plugins: []
};
