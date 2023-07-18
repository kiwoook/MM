const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app : any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target : "http://localhost:8000",
      changeOrigin : true,
      credential : true,
      secure: false,
    }),
  );
};