const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Webpack = require('webpack')
// const Uglifyjs = require('uglifyjs-webpack-plugin')
module.exports={
  // mode:'development',
  entry:'./src/index.js',
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
      use:['style-loader','css-loader']
      // loader:['style-loader','css-loader']
      // use:[
      //   {loader:'style-loader'},
      //   {loader:'css-loader'}
      // ]
    },{
      test:/\.(jpg|png|gif)$/,
      use:[
        {
          loader:'url-loader',
          options:{
            limit:50000, //50kb 小于50kb base64 大于 路径(hash)
            outputPath:'images'
          }
        }
      ]
    }]
  },
  plugins:[
    // new Uglifyjs(), //压缩 弃用
    new Webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']), //删除某些东西
    new HtmlWebpackPlugin({
      minify:{
        collapseWhitespace:true //也看空白折叠，压缩
      },
      hash:true,//消除缓冲
      template:'./src/index.html',
      title:'learn2',
      // filename:'bundle.html'
    })
  ]
}

//uglifyjs-webpack-plugin 打包插件，现在直接 --production
//img : url-loader file-loader
//css : style-loader css-loader

