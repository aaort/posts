const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@dummy-module': path.resolve(__dirname, 'src/modules/dummy-module'),
    },
  },
};
