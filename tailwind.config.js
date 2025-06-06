/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend-Regular", "sans-serif"],
        "lexend-medium": ["Lexend-Medium", "sans-serif"],
        "lexend-bold": ["Lexend-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}
