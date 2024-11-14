const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: "http://localhost:8080",
    secure: false,
    "changeOrigin": true,
    "logLevel": "debug",
    headers: {host: 'http://192.168.1.126/'},
    pathRewrite: {"^/api": "/api"}
  },
  {
    context: [
      // "/api",
    ],
    target: "http://172.31.98.209:8082",
    secure: false,
    "changeOrigin": true,
    "logLevel": "debug",
    headers: {host: 'localhost'},
    pathRewrite: {"^/api": "/api"}
  }
];
module.exports = PROXY_CONFIG;
