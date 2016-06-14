// This config is extented from webpack.config.js. We use it for development with webpack-dev-server and autoreload/refresh

var webpackShared = require("./webpack.shared");
var webpack = require('webpack');
var WebpackConfig = require('webpack-config');
var path = require("path");

var mainConfig = new WebpackConfig().extend("webpack.config");

// To work with webpack-dev-server
webpackShared.removeObjectProperties(mainConfig.resolve.alias, ['react']);

var devConfigExtension = {
  entry: {
      app: [
        // We are using next two entries for hot-reload
        'webpack-dev-server/client?http://localhost:8000',
        'webpack/hot/only-dev-server',
      ].concat(mainConfig.entry.app)
  },

  output: {
    filename: '[name].js',
    publicPath: "http://localhost:8000/assets/"
  },

  resolve: {
    alias: mainConfig.resolve.alias
  },

  // more options here: http://webpack.github.io/docs/configuration.html#devtool
  //devtool: 'eval-source-map',

  //development: true,
  // Set to true to enable redux dev panel.
  //devPanel: true,
  devtool: "source-map",
  //debug: true,
  watch: true,

  module: {
    loaders: [
      { test: /\.tsx?$/, loaders: ['react-hot', 'babel?presets[]=es2015-loose', 'ts-loader?configFileName=tsconfig.webpack.json'], include: path.resolve(__dirname, "App") },
      { test: /\.css$/, exclude: /\.import\.css$/,  loader: "style!css", include: path.resolve(__dirname, "App") },
      { test: /\.import\.css$/,  loader: "style!css", include: path.resolve(__dirname, "App") },
      { test: /\.less$/, exclude: /\.module\.less$/, loader: "style!css!less", include: path.resolve(__dirname, "App") },
      { test: /\.module\.less$/, loader: "style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less", include: path.resolve(__dirname, "App") },
      { test: /\.(jpg|png|jpg|png|woff|woff2|eot|ttf|svg|gif)$/, loader: "file-loader?name=[name].[ext]" }
    ]
  },

   plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    // Used for hot-reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

mainConfig.module.loaders = [];
mainConfig.resolve.alias = {};
mainConfig.plugins = [];

module.exports = mainConfig.merge(devConfigExtension);