const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-template');

module.exports = env => ({
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    devtool: 'source-map',
    devServer: {
      contentBase: './dist',
      hot: true
    },
    module: {
     rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Commute Cost Calculator',
        template: '!!handlebars!src/ml/index.hbs'
        mb_src: env.mb_src || 'https://api.mapbox.com/mapbox-gl-js/v0.40.1/',
      }),
    ],
    path: path.resolve(__dirname, 'dist')
  }
});
