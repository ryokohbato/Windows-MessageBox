const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/script/main.ts",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist")
  },
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
