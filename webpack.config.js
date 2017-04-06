//require our dependencies
var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  //the entry point we created earlier. Note that './' means
  //your current directory. You don't have to specify the extension  now,
  //because you will specify extensions later in the `resolve` section
  entry: './app/src/index',

  output: {
    //where you want your compiled bundle to be stored
    path: path.resolve('./app/build/'),
    //naming convention webpack should use for your files
    filename: '[name].js', //[name]-[hash].js',
  },

  devtool: 'source-map',

  plugins: [
    //tells webpack where to store data about your bundles.
    new BundleTracker({filename: './webpack-stats.json'}),
    new StatsPlugin('manifest.json', {
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true,
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015', 'react'],
          plugins: [
            'transform-class-properties',
            'transform-async-to-generator',
            'transform-object-rest-spread',
          ],
        },
      },
      {test: /\.(jpe?g|png|gif|svg|ico)$/, loader: 'url?limit=10000'},
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'}, // creates style nodes from JS strings
          {loader: 'css-loader'}, // translates CSS into CommonJS
          {loader: 'sass-loader'}, // compiles Sass to CSS
        ],
      },
    ]
  },

  resolve: {
    // root: __dirname,
  }
};


