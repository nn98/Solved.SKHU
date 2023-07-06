const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://solved.ac',
      // target: 'http://localhost:3000',
      // pathRewrite: {
      //     '^/api': '',
      // },
      changeOrigin: true,
    }),
  );
};