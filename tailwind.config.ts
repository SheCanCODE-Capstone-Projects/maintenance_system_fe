/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // scan all files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // primary font
      },
      colors: {
        primary: "#FF6600",
        secondary: "#006644",
        accent: "#FFD580",
        bg: "#F9FAFB",
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
    },
  },
  plugins: [],
};
