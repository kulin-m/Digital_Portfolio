/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#060913",
        darkCard: "rgba(13, 20, 38, 0.45)",
        cyanGlow: "#00f2fe",
        violetGlow: "#7f00ff",
        blueGlow: "#4facfe",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        cyanShadow: "0 0 20px rgba(0, 242, 254, 0.25)",
        violetShadow: "0 0 20px rgba(127, 0, 255, 0.25)",
      },
    },
  },
  plugins: [],
}
