const path = require('path');
const yaml = require('yamljs');

module.exports = {
  entry: './src/index.js',
  output: {
    // filename: 'main.js',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
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