const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurifyCssPlugin = require('purifycss-webpack')
const glob = require('glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports={
  // mode:'development',
  entry:{
    entry:'./src/index.js',
    jquery11:'jquery'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js'
  },
  devServer:{
    contentBase: path.resolve(__dirname,'dist'),
    host:'localhost',
    port:'8091',
    open:true, //自动打开页面
    hot:true //热更新 (会报错，需要用插件HotModuleReplacementPlugin))
  },
  module:{
    rules:[{
      test:/\.css$/,
      use:[
        {
          loader:MiniCssExtractPlugin.loader,
          options:{
            publicPath:'../'//解决图片路径问题
          }
        },
        'css-loader',
        'postcss-loader'
      ]
      // use:['style-loader','css-loader','postcss-loader']
    },{
      test:/\.(jpg|png|gif)$/,
      use:[
        {
          loader:'url-loader',
          options:{
            limit:50000, //50kb 小于50kb base64 大于 路径(hash)
            outputPath:'images'//图片打包路径
          }
        }
      ]
    },{
      test:/\.less$/,
      use:['style-loader','css-loader','less-loader']
    },{
      test:/\.(sass|scss)$/,
      use:[
        {
          loader:MiniCssExtractPlugin.loader,
          options:{
            publicPath:'../'
          }
        },
        'css-loader','sass-loader']
    },
    {
      test: /\.m?(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
      }]
    }
  ]
  },
  // devtool:'source-map',
  optimization:{
    splitChunks:{
      cacheGroups:{
        aaa:{
          chunks:'initial',
          name:'jquery11', //入口名字
          enforce: true
        }
      }
    }
  },
  plugins:[
    // new Uglifyjs(), //压缩 弃用
    new Webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']), //删除某些东西
    new HtmlWebpackPlugin({
      minify:{
        collapseWhitespace:true //也看空白折叠，压缩
      },
      hash:true,//消除缓存
      template:path.resolve(__dirname,'src/index.html'),
      title:'learn5',
      // filename:'bundle.html'
    }),
    new MiniCssExtractPlugin({ //分离css
      filename:'css/index.[name].css'
    }),
    new PurifyCssPlugin({ //消除冗余css
      // paths:glob.sync(path.resolve(__dirname,'src/*.html')), //glob同步扫描html,通过link标签一点点查找css冗余代码，不打包
      paths:glob.sync(path.join(__dirname,'src/*.html'))
    }),
    new CopyWebpackPlugin([{ //静态资源输出，不需要打包的文档配置
      from:path.resolve(__dirname,'src/assets'),
      to:'./public'
    }]),
    new Webpack.ProvidePlugin({ //引用第三方库，没有用到就不打包
      $:'jquery'
    })
  ]
}

//https://webpack.js.org/plugins/split-chunks-plugin/
//*https://www.npmjs.com/package/babel-loader  npm*/
//*https://babeljs.io/docs/en/babel-preset-react/ babel官网*/