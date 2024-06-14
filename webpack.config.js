const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "app"),
  entry: {
    "main": "./main.js",
    "login/login-page": "./login/login-page.js",
    "register/register-page": "./register/register-page.js",
    "home/home-page": "./home/home-page.js",
    "home/data/data-page": "./home/data/data-page.js",
    "home/model/model-page": "./home/model/model-page.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: "login/index.html",
      template: "./login/index.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: "register/index.html",
      template: "./register/index.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: "home/index.html",
      template: "./home/index.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: "home/data/index.html",
      template: "./home/data/index.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: "home/model/index.html",
      template: "./home/model/index.html",
      inject: false,
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  // Dev server
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
};
