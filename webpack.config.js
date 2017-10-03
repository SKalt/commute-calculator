/* global __dirname*/
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  return {
    entry: './src/js/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
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
        },
        // {
        //   test: /\.(hbs|handlebars)$/,
        //   use: [
        //     'handlebars-loader'
        //   ]
        // }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Commute Cost Calculator',
        template: '!!handlebars-loader!./src/ml/index.hbs',
        mb_src: env.mb_src || 'https://api.mapbox.com/mapbox-gl-js/v0.40.1/',
      }),
    ],
  };
};
