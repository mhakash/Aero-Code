module.exports = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // delay before rebuilding
    };
    return config;
  },
};
