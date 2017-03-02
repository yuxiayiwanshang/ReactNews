var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
module.exports = {
  context: __dirname+'/app',
  entry: "./js/root.js", //入口
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        }
      },
      //添加css的loader，使用 css的独立配置方法 style!css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]
      { test: /\.css$/,
        loader: 'style-loader!css-loader' },
        {
           test: /\.scss$/,
           loader:'style!css!sass'
        }
    ]
  },
  output: {
    path: __dirname + "/app/",  //打包后文件地址
    publicPath:"/app/",   //命令行模式下,一定要配置output.publicPath来指定编译后的包(bundle)的访问位置.
    filename: "bundle.js"  //打包后文件
  },
  devServer:{
      hot:true,
      inline:true, //server --实时编译后的文件都保存到了内存当中 解决办法为开多一个控制台，用webpack --watch实时监控文件变动随时编译就行了。
  },
  plugins: debug ? [] : [
   new webpack.optimize.DedupePlugin(),
   new webpack.optimize.OccurenceOrderPlugin(),
   new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
 ]
};
