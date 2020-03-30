const merge = require('webpack-merge');

const { resolvePath } = require('./resolvePath');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: resolvePath('dist'),
    port: 3000,
    host: 'localhost',
    publicPath: 'http://localhost:3000',
    quiet: true,
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
  },
});
