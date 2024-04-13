/** @type {import('tailwindcss').Config} */
import daisy from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "dark-primary": "#1c2229",
    },
    container: {
      padding: "1rem",
      center: true,
      screens: {
        innerWidth: "768px",
      },
    },
    extend: {},
  },
  plugins: [daisy],
};
