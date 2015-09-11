var webpack = require('webpack');
var path = require('path');

var config = {
  debug: false,
  cache: true,
  entry: {
    'commons': ['./app/commons', 'webpack/hot/dev-server', 'webpack-hot-middleware/client?reload=true'],
    'app': './app/index'
  },
  output: {
    path: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    modules: false,
    source: false,
    chunks: false,
    chunkModules: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel-loader'],
      include: path.join(__dirname, '../../app')
    },
    {
      test: /\.json$/,
      loader: "json"
    },
    // {
    //   test: /\main.scss$/,
    //   loader: 'style!css!sass'
    //   // loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
    // },
    {
      test: /\.scss$/,
      loader: "style!css",
      include: path.join(__dirname, '../../app/components')
    },
    {
      test: /\.css$/,
      loader: "css"
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: "file"
    }
    // {
    //   test: /\.jsx$/,
    //   loader: 'eslint-loader',
    //   include: path.join(__dirname, '../app')
    // }
    ]
  }
};

module.exports = config;
