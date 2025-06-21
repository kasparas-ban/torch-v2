const nativewind = require("nativewind/preset")

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [nativewind],
  theme: {
    extend: {
      fontFamily: {
        "lexend-regular": ["Lexend-Regular", "sans-serif"],
        "lexend-medium": ["Lexend-Medium", "sans-serif"],
        "lexend-semibold": ["Lexend-SemiBold", "sans-serif"],
        "lexend-bold": ["Lexend-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}
