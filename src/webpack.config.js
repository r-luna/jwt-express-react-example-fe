const path = require('path');

module.exports = {
  output: {
    chunkFilename: '[name].chunk.js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
  ],
};
