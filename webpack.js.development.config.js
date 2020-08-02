const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/script/main.js",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist")
  },
  devtool: "inline-source-map",
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
