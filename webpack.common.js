const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/app.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
    alias: {
      "@styles": path.resolve(__dirname, "src/styles"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: "babel-loader",
        exclude: [path.resolve(__dirname, "./node_modules")],
      },
      {
        test: /\.jsx?$/,
        use: ["source-map-loader"],
        enforce: "pre",
        exclude: [path.resolve(__dirname, "./node_modules")],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|pdf|ico|eot|woff|woff2|otf|ttf|mp4)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/images/favicon.png",
    }),
    new webpack.EnvironmentPlugin([]),
  ],
};
