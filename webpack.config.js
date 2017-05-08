var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var entries = getEntry('page/**/*.js', [__dirname+'/layout/layout']);
var config = {
  entry: entries,
  output: {
    'path':path.join(__dirname,'public'),
    'publicPath':'/',
    'filename':'script/[name]_[hash].js'
  },
  module: {
    loaders: [
    {test: /\.js$/, loader: 'babel-loader'},
     {test: /\.(css|less)$/, loader: ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader!less-loader'})},
     {test: /\.ejs$/, loader: 'html-loader?interpolate'},
     {test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/i,loader: "url-loader?limit=8192&name=images/[name]_[hash].[ext]"},
    ]
  },
  resolve:{
    alias:{editormd:__dirname+'/node_modules/editor.md/editormd.min.js'}
  },
  plugins: [
    new ExtractTextPlugin("style/[name]_[hash].css"),
    new webpack.ProvidePlugin({ //加载jq
      $: 'jquery',
      'jQuery':'jquery',
      'baidu':__dirname+'/node_modules/baidutemplate/baiduTemplate.js'
    })
  ]
}
var htmlfile = glob.sync('page/**/*.ejs'),conf={};
htmlfile.forEach(function(item,index,arr){
  var extname = path.extname(item);
  var basename = path.basename(item,extname);
  var conf = {
    filename:'../views/'+item.replace(/^page\//,''),
    template:'./'+item,
    chunks:[basename]
  }
  config.plugins.push(new HtmlWebpackPlugin(conf))
})


module.exports = config;

function getEntry(globPath,common){
  var files = glob.sync(globPath),entries={};
  files.forEach(function(item,index,arr){
    const c = [...common]
    var extname = path.extname(item);
    var basename = path.basename(item,extname);
    c.push('./'+item);
    entries[basename] = c;
  })
  return entries;
}
