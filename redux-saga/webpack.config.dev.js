const path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {
  devtool: 'source-map',

  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  resolve: {
    root: [
      path.resolve('./src')
    ],
    modulesDirectories: [
      'node_modules'
    ]
  },

  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__DEV__': true
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          plugins: [
            'transform-runtime'
          ],
          presets: [
            'latest',
            'react',
            'stage-0'
          ]
        }
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel',
      //   include: path.join(__dirname, 'src'),
      //   query: {
      //     stage: 0,
      //     plugins: [
      //       'react-transform'
      //     ],
      //     extra: {
      //       'react-transform': {
      //         transforms: [
      //           {
      //             transform: 'react-transform-hmr',
      //             imports: ['react'],
      //             locals: ['module']
      //           },
      //           {
      //             'transform': 'react-transform-catch-errors',
      //             'imports': ['react', 'redbox-react']
      //           }
      //         ]
      //       }
      //     }
      //   }
      // }
    ]
  }
}
