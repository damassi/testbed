const path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = function(config) {

  config.set({

    browsers: [
      'Chrome',
      'jsdom'
    ],

    frameworks: [
      'mocha'
    ],

    reporters: [
      'spec',
      'beep'
    ],

    files: [
      { pattern: 'karma.webpack.tests.js', watched: true }
    ],

    preprocessors: {
      'karma.webpack.tests.js': [
        'webpack',
        'sourcemap'
      ]
    },

    webpack: {
      devtool: 'inline-source-map',

      resolve: {
        modules: [
          path.join(__dirname, 'src'),
          'node_modules'
        ],
        alias: {
          sinon: 'sinon/pkg/sinon'
        }
      },

      // resolve: {
      //   extensions: ['', '.js', '.jsx'],
      //   root: [
      //     path.resolve('./src')
      //   ],
      //   modulesDirectories: [
      //     'node_modules'
      //   ],
      //
      //   // FIXME: Enzyme Lib issues: See https://github.com/airbnb/enzyme/issues/47
      //   alias: {
      //     sinon: 'sinon/pkg/sinon'
      //   }
      // },

      // FIXME: Enzyme
      externals: {
        jsdom: 'window',
        cheerio: 'window',
        'react/lib/ExecutionEnvironment': true
      },

      plugins: [
        new WebpackNotifierPlugin(),
        new webpack.DefinePlugin({
          '__DEV__': false
        })
      ],

      module: {
        noParse: [
          /node_modules\/sinon\//
        ],
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
      //
      //   // FIXME: Enzyme
      //   noParse: [
      //     /node_modules\/sinon\//
      //   ],
      //   loaders: [
      //     {
      //       test: /\.js$/,
      //       loader: 'babel-loader',
      //       exclude: /node_modules/,
      //       loader: 'babel-loader',
      //       query: {
      //         presets: ['latest', 'stage-0', 'react']
      //       }
      //     }
      //   ]
      // }
    },

    webpackServer: {
      noInfo: true
    }
  })
}
