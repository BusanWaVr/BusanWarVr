const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/user", {
      target: "http://18.217.191.122:8080",
      changeOrigin: true,
    }),
    createProxyMiddleware("/users", {
      target: "https://jsonplaceholder.typicode.com",
      changeOrigin: true,
    })
  );
};
