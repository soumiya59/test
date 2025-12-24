const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Only proxy API requests, not static files like images
  // In Docker, proxy to backend service, otherwise use localhost
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://backend:8000';
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
      secure: false,
      logLevel: 'info',
      onProxyReq: (proxyReq, req, res) => {
        console.log(`[PROXY] ${req.method} ${req.url} -> ${backendUrl}${req.url}`);
      },
      onError: (err, req, res) => {
        console.error(`[PROXY ERROR] ${req.url}:`, err.message);
      }
    })
  );
};

