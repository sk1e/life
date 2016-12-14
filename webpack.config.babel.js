import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
  entry: ['babel-polyfill', './index.js'],

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel',
        include: [path.resolve(__dirname, 'web_modules')],
        query: { presets: ['babel-preset-latest', 'react'] },
      },
      { test: /\.pug$/, loader: 'pug' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(css|styl)/, loader: ExtractTextPlugin.extract('css!stylus') },
      { test: /\.(svg|png|ttf|eot|woff|woff2)(\?v=.+)?$/, loader: 'file?name=[path][name].[ext]' },
    ],
  },


  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new HtmlWebpackPlugin({ template: 'index.pug', filename: 'index.html', chunks: ['main'] }),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'font-awesome': 'font-awesome/css/font-awesome.min.css',
    },
  },
};
