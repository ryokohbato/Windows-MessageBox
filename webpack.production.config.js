const path = require("path");
const devConfig = require('./webpack.development.config');

module.exports = {
  ...devConfig,

  mode: "production",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "docs")
  },
  devtool: false,
};
