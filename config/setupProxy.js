const {createProxyMiddleware} = require('http-proxy-middleware');
 
module.exports = function(app) {
  // app.use('/api', createProxyMiddleware({ 
  //   target: 'http://www.ibugthree.com/oldcar/',//后台服务器地址
  //   changeOrigin: true,
  //   pathRewrite: {
  //   '^/api': '',
  //   },}))
    app.use(createProxyMiddleware('/api/auth', {
      target: 'http://10.100.11.17:9210/',//后台服务器地址
      changeOrigin: true,
      pathRewrite: {
        // '^/api/auth': ''
      }
    }))
};
