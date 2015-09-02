var webpack = require('webpack')
var path = require('path')

var pathToReact = path.resolve('node_modules/react/dist/react-with-addons.min.js')
var pathToRouter = path.resolve('node_modules/react-router/umd/ReactRouter.min.js')

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    __DEV__: JSON.stringify(process.env.DEBUG)
  })
]

if (process.env.COMPRESS) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  )
}

module.exports = {

  output: {
    path: 'build',
    filename: 'bundle.js'
  },

  externals: {},

  module: {
    preLoaders: [
      { test: /\.(js|jsx)$/, loaders: ['jscs'], exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.(js|jsx)$/, loaders: ['react-hot', 'babel?stage=0'], exclude: /node_modules/ },
      { test: /node_modules.*\.css$/, loaders: ['style', 'css'], exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style', 'css', 'postcss']},
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.(jpg|gif)$/, loader: 'url-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ],
    noParse: [
      /* Regex */
      pathToReact,

      // pathToRouter
    ]
  },

  resolve: {
    root: [path.resolve('node_modules'), path.resolve('src/lib'), path.resolve('src')],
    extensions: [
      '', '.js', '.jsx',
      '.css',
      '.woff', '.woff2', '.ttf', '.eot', '.svg'
    ],
    alias: {
      react: 'react/addons',
      'react/addons': pathToReact,
      'react-router': pathToRouter
    }
  },

  plugins: plugins,

  devtool: process.env.COMPRESS ? null : 'inline-source-map',

  postcss: function() {
    return {
      defaults: [

        // Needed for importing
        require('postcss-import')({
          onImport: function(files) {
            files.forEach(this.addDependency)
          }.bind(this)
        }),
        require('postcss-nested'),
        require('postcss-custom-properties')(),
        require('cssnano')(),
        require('rucksack-css')(),
        require('autoprefixer-core')({browsers: ['> 5%', 'IE 9']})
      ]
    }
  }
}
