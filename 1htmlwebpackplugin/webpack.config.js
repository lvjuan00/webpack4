const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
  // mode:'development',
  entry:{
    a:'./src/index.js'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].bundle.js'
  },
  plugins:[
    new HtmlWebpackPlugin({
      chuncks:['a'], //多页面打包的入口文件
      minify:{
        collapseWhitespace:true //也看空白折叠，压缩
      },
      hash:true,//消除缓冲
      template:'./src/index.html',
      title:'learn1!!',
      filename:'bundle.html' //区分页面名字
    })
  ]
}
//https://www.npmjs.com/package/html-webpack-plugin