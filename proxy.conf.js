const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: "https://toeichero-be-latest.onrender.com",
    secure: false,
    "changeOrigin": true,
    "logLevel": "debug",
    headers: {host: 'localhost'},
    pathRewrite: {"^/api": "/api"}
  },
  {
    context: [
       // "/api",
    ],
    target: "http://192.168.1.26:8080",
    secure: false,
    "changeOrigin": true,
    "logLevel": "debug",
    headers: {host: 'localhost'},
    pathRewrite: {"^/api": "/api"}
  }
];
module.exports = PROXY_CONFIG;
