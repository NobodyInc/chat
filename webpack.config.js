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
      //Replace with boostrap-loader
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /\.(woff|woff2)$/, loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml" }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
