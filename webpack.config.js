/* global __dirname*/
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

module.exports = (env={}) => {
  let MB_ACCESS_TOKEN = fs.readFileSync('api-keys/mapbox.txt', 'utf8').trim();
  MB_ACCESS_TOKEN = `'${MB_ACCESS_TOKEN}'`;
  return {
    entry: './src/js/main.js',
    output: {
      filename: 'js/bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist')
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
        {
          test:/\.vue$/,
          use: ['vue-loader']
        }
        // {
        //   test: /\.(hbs|handlebars)$/,
        //   use: [
        //     'handlebars-loader'
        //   ]
        // }
      ]
    },
    plugins: [
      new webpack.DefinePlugin(Object.assign({ // defaults
        ENV: '"debugging"',
        MB_ACCESS_TOKEN
      }, env)),
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Commute Cost Calculator',
        template: '!!handlebars-loader!./src/ml/index.hbs',
        mb_src: env.mb_src || 'https://api.mapbox.com/mapbox-gl-js/v0.40.1',
        sections:[
          {
            name:'origins',
            addTitle: 'Add places you might commute from, such as potential apartments',
            deleteTitle: 'delete places you might commute from'
          },
          {
            name:'destinations',
            addTitle: 'add destinations',
            deleteTitle: 'delete destinations'
          },
          {
            name: 'commutes',
            addTitle: 'add a trip between any two selected points',
            deleteTitle: 'delete any selected trips'
          }
        ]
      }),
    ],
  };
};
