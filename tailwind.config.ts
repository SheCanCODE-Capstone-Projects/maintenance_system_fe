/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        primary: "#FF6224",
        secondary: "#0D3330",
        accent: "#1B7A52",
        bg: "#F4F6F5",
        text: "#1F2937",
        muted: "#6B7280",
        success: "#22C55E",
        warning: "#FACC15",
        error: "#EF4444",
        "deep-teal": "#062A27",
        "bright-orange": "#FF5A1F",
        "light-gray": "#F8F9FA",
        mint: "#A7F3D0",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
