const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  plugins: [
    // Define new env variables
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("production"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
        },
      ],
    }),
  ],
};
