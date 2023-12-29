const path = require('path');
const yaml = require('yamljs');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: './src/index.js',
  mode: 'development',
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'Output Management',
      title: 'Development',
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  output: {
    // filename: 'main.js',
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // to remove unused files from dist folder
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/i, //reglaur expression for searching all css files and enable css-loader for them so that they can be imported in the js
        use: ['style-loader', 'css-loader'],
      },
      {
        //for images assests
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        //for fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        //for csv and tsv data files
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        //for xml data files
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      {
        //custom yaml parser
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
    ],
  },
};