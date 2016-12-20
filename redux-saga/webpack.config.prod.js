const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',

  entry: [
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
  },

  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.prod.html'
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                'transform-runtime'
              ],
              presets: [
                'latest',
                'react',
                'stage-0'
              ]
            }
          }
        ]
      },
    ]
  }

  // module: {
  //   loaders: [
  //     {
  //       test: /\.js$/,
  //       exclude: /(node_modules)/,
  //       loader: 'babel-loader',
  //       query: {
  //         presets: [
  //           'latest',
  //           'react',
  //           'stage-0'
  //         ]
  //       }
  //     }
  //   ]
  // }
}
