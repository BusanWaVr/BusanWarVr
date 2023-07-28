const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/user", {
      target: "http://52.79.93.203/",
      changeOrigin: true,
    }),
    createProxyMiddleware("/users", {
      target: "https://jsonplaceholder.typicode.com",
      changeOrigin: true,
    })
  );
};
