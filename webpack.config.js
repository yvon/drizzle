const path = require('path');

process.env.BABEL_ENV = 'production';

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: 'drizzle.js',
    library: 'drizzle',
    libraryTarget: 'umd',
    /* Solves ReferenceError: window is not defined issue with nextjs.
     * Since webpack 4?
     *
     * Inspired by https://github.com/trufflesuite/drizzle/issues/104
     * Related issue: https://github.com/webpack/webpack/issues/6784
     */
    globalObject: 'typeof window !== \'undefined\' ? window : this',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.(js)$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'babel-loader',
      options: {
        presets: ['env'],
        plugins: [
          require('babel-plugin-transform-runtime'),
          require('babel-plugin-transform-es2015-arrow-functions'),
          require('babel-plugin-transform-object-rest-spread'),
          require('babel-plugin-syntax-async-functions')
        ]
      }
    }]
  },
  externals: {
    'eth-block-tracker': 'eth-block-tracker-es5',
    'redux': 'redux',
    'redux-saga': 'redux-saga',
    'web3': 'web3',
    'is-plain-object': 'is-plain-object',
    'deepmerge': 'deepmerge'
  }
};
