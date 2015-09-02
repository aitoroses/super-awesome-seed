var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
  config.set({

    browserNoActivityTimeout: 30000,

    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],

    singleRun: process.env.CONTINUOUS_INTEGRATION === 'true',

    frameworks: [ 'mocha', 'sinon-chai' ],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'mocha' ],

    webpack: {
      devtool: '#inline-source-map',
      module: {
        loaders: [
          { test: /\.(js|jsx)$/, loader: 'babel-loader?stage=0', exclude: /node_modules/ }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ],
      resolve: {
          root: [path.resolve("node_modules")],
          extensions: ['', '.js', '.jsx',],
      }
    },

    webpackServer: {
      noInfo: true
    }

  });
};
