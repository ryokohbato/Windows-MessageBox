const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/script/main.ts",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist")
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
