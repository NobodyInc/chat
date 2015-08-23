//import webpack from 'webpack';
var webpack = require('webpack');

module.exports = {
  entry:[
    "webpack-dev-server/client?http://0.0.0.0:8080",
    "webpack/hot/only-dev-server",
    "./src/index.js"
    ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel-loader"]},
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
