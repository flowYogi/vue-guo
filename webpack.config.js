var path = require('path')
var webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const vuxLoader = require('vux-loader')
const host = '127.0.0.1' //set to your localhost
const port = 9000
const nodeEnv = process.env.NODE_ENV || 'development';
const devAddress = `http://${host}:${port}`
const rootPath = __dirname
const devMod = [
  `webpack-dev-server/client?${devAddress}`,
  'webpack/hot/only-dev-server'
]
// module.exports= {
const webpackConfig = {
  devtool: 'cheap-eval-source-map',
  context: `${rootPath}/src`,
  entry: {
    main:'main.js',
    vendor: [
      // ...devMod,
      //'babel-polyfill',
      'vue',
    ],
    utils: 'utils/index'
  },
  output: {
    path: `${rootPath}/dist`,
    publicPath: '/dist',
    filename: '[name].js',
    chunkFilename: 'chunk/[name].[chunkhash:6].js'
  },
  module: {
    rules: [

      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css!less!postcss'})
      },
      // {
      //     test: /\.js$/,
      //     exclude: [
      //         path.resolve(__dirname, "www/ssr/src/less"),
      //         /node_modules/
      //     ],
      //     loader: 'babel-loader',
      //     options: {
      //         presets: ['es2015', 'stage-0'],
      //         plugins: [
      //             "transform-decorators-legacy",
      //             "transform-class-properties"
      //         ]
      //     }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: [
          path.resolve(__dirname, "www/ssr/src/less")
        ]
      },

      // Load images
      {test: /\.jpg/, loader: "url-loader?limit=10000&mimetype=image/jpg"},
      {test: /\.gif/, loader: "url-loader?limit=10000&mimetype=image/gif"},
      {test: /\.png/, loader: "url-loader?limit=10000&mimetype=image/png"},
      {test: /\.svg/, loader: "url-loader?limit=10000&mimetype=image/svg"},

      // Load fonts
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},

    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({//主要作用是把那些共同要引用的库都给提取到公共的部分，这样我们在拿文件的时候就不会再次绑定了，而是到manifest里头看，然后取那
      names: ['utils','vendor','manifest'],//['vendor','utils','manifest']?? wait for test..
      // name: 'vendor',
      // minChunks: Infinity,
      // // children: true,
      // //async: true,
      // filename: '[name].bundle.js'
    }),
    //  new webpack.HotModuleReplacementPlugin(),
    //new webpack.LoaderOptionsPlugin({
    //  minimize: true,
    //  debug: false
    //}),
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    warnings: false
    //  },
    //  output: {
    //    comments: false
    //  },
    //  sourceMap: false
    //}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(nodeEnv)}
    }),
    new CleanWebpackPlugin(['dist'], {
      root: rootPath,
      verbose: true,
      dry: false,
      //exclude: ['shared.js']
    })

  ],
  resolve: {
    modules: [
      `${path.resolve(rootPath)}/src`,
      './node_modules'
    ],
    extensions: [ '.less','.vue', '.js', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',//todo vux-loader
      'activities': `${rootPath}/src/activities`,
      'components': `${rootPath}/src/components`,
      'less':`${rootPath}/src/less`,
      'utils':`${rootPath}/src/utils`,
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: rootPath,
    noInfo: true,
    host,
    port
  },
  // performance: {
  //   hints: false
  // },

}
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    {
      name: 'vux-ui'
    },
    {
      name: 'duplicate-style'
    }
  ]
})


