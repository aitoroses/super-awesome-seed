var express = require('express');
var request = require('request');
var path = require('path');

var webpack = require("webpack");
var WebpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");

// -------- Entry point -------------------
config.entry = [
  './lib/main.js',
  'webpack/hot/dev-server',
  'webpack-dev-server/client?http://localhost:8081'
]

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoErrorsPlugin());

config.output.path = "/";

// -------- proxy -------------------
var app = express();

// Webpack Hot Updates
app.use(/^.*update\.(json|js)$/, function(req, res) {
  var url = "http://localhost:8081/lib" + req.baseUrl
  request(url)
  .pipe(res);
});

// Font assets
app.use(/^.*\.(woff|woff2|ttf|eot|svg)$/, function(req, res) {
  var url = "http://localhost:8081/lib" + req.baseUrl
  request(url)
  .pipe(res);
});

// Server proxying
app.use('/*', function(req, res) {
  var url = "http://localhost:8081" + req.baseUrl
  request(url)
  .pipe(res);
});

// ------ webpack-dev-server --------
var server = new WebpackDevServer(webpack(config), {
    contentBase: __dirname,
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: "/lib/",

    stats: { colors: true }
});

// ------ run the two servers -------
server.listen(8081, "localhost", function() {});
app.listen(8080, function() {
  console.log("Server is listening on port 8080")
});
