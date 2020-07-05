const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./components/**/*.tsx"],
  plugins: [require("@tailwindcss/ui")],
};
