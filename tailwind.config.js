
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["src/**/*.jsx", "./index.html"],
  theme: {
    extend: {},
    colors: {
      primary:{
        light:"rgb(245,148,148)",
          default:"rgb(255,81,81)",
        dark:"rgb(248,47,47)",
      },
      gray:colors.gray,
      white:colors.white,
      black:colors.black,
      green:colors.green,
      red:colors.red,
      cyan:colors.cyan,
      blue:colors.blue,
      lime:colors.lime,
      amber:colors.amber,
    },
  },
  plugins: [],
}
