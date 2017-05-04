var webpack = require("webpack");
module.exports = {
 entry: {
 "main": [
 "webpack-dev-server/client?http://localhost:8881/",
 "webpack/hot/only-dev-server",
 "./main.js"
 ] },
 output: {
 path: __dirname,
 filename: "bundle.js",
 publicPath: "http://localhost:8881/",
 chunkFilename: "[id].chunk.js",
 sourceMapFilename: "[name].map"
 },
 module: {
 loaders: [
 {
 test: /\.jsx$|\.es6$|\.js$/,
 loader: "babel-loader",
 query:
 {
 presets:["es2015", "react"]
 },
 exclude: /node_module/},
 { test: /\.scss$|\.css$/, loader: "style-loader!style!css!sass" }
 ]
 },
 plugins:
 [
 new webpack.NoErrorsPlugin()
 ],
 devtool: "eval-source-map"
};