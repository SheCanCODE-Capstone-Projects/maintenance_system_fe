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
        primary: "#FF6600",   // Orange (brand)
        secondary: "#006644", // Dark green
        accent: "#FFD580",    // Light accent
        bg: "#F9FAFB",        // Background
        text: "#1F2937",      // Default text
        muted: "#6B7280",     // Muted text
        success: "#22C55E",
        warning: "#FACC15",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};
