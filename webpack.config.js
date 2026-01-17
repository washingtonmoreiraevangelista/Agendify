const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")


module.exports = {
  target: "web",
  mode: "development",

  // Arquivo de entrada
  entry: path.resolve(__dirname, "src", "main.js"),
  // Saida build
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },

  //servidor que pega as alterações
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 3000,
    open: true,
    liveReload: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      filename: "index.html",

      // favicon: path.resolve("src", "assets", ""),
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "page", "scheduling.html"),
      filename: "scheduling.html",

    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets"),
          to: path.resolve(__dirname, "dist", "src", "assets")
        }
      ]
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
}