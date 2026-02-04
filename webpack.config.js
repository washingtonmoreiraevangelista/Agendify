const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  target: "web",
  mode: "development",

  entry: {
    main: path.resolve(__dirname, "src", "main.js"),
    admin: path.resolve(__dirname, "src", "admin.js"),
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    liveReload: true,
    historyApiFallback: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),

    // SITE
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      filename: "index.html",
      chunks: ["main"],
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "page", "scheduling.html"),
      filename: "scheduling.html",
      chunks: ["main"],
    }),

    // ADMIN
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "page", "admin.html"),
      filename: "admin.html",
      chunks: ["admin"],
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets"),
          to: "assets",
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
}
