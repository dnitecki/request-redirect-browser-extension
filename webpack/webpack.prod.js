const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  mode: "production",
  plugins: [
    // Define new env variables
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("production"),
    }),
    new CompressionPlugin(),
  ],
};
