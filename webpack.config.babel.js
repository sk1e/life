import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';


module.exports = {
  entry: ['babel-polyfill', './pages/index.jsx'],

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel',
        include: [
          path.join(__dirname, 'web_modules'),
          path.join(__dirname, 'pages'),
        ],
        query: { presets: ['latest', 'react'] },
      },
      { test: /\.pug$/, loader: 'pug' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(css|styl)/, loader: ExtractTextPlugin.extract('css!stylus') },
      { test: /\.(svg|png|ttf|eot|woff|woff2)(\?v=.+)?$/, loader: 'file?name=[path][name].[ext]' },
    ],
  },


  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new HtmlWebpackPlugin({ template: './pages/index.pug', filename: 'index.html', chunks: ['main'] }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'font-awesome.css': 'font-awesome/css/font-awesome.min.css',
    },
  },
};


