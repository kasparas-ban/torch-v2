const { defineConfig } = require("eslint/config")
const expoConfig = require("eslint-config-expo/flat")
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended")

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  // {
  //   overrides: [
  //     {
  //       files: ["*.js", "*.ts", "*.tsx"],
  //       parser: "@typescript-eslint/parser",
  //     },
  //   ],
  // },
  {
    ignores: ["dist/*"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react/jsx-key": "off",
    },
  },
])
