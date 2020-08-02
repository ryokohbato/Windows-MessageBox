const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/script/main.js",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ]
  }
};
