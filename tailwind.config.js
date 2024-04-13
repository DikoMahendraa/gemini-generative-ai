/** @type {import('tailwindcss').Config} */
import daisy from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
