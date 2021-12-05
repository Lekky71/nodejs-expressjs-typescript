const path = require('path');
const nodeExternals = require('webpack-node-externals');

const { NODE_ENV = 'production' } = process.env;

module.exports = {
  mode: NODE_ENV,
  entry: './src/bin/www/index.ts',
  target: 'node',
  watch: NODE_ENV === 'development',
  output: {
    path: path.resolve(__dirname, 'dist', 'bin', 'www'),
    filename: 'index.js',
    globalObject: 'this'
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ],
  },
  devtool: 'source-map',
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  externals: [
    nodeExternals()
  ]
};
