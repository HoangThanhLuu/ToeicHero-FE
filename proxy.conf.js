const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: "http://localhost:8080",
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
    target: "https://toeicute-38c2b32a7c77.herokuapp.com/",
    secure: false,
    "changeOrigin": true,
    "logLevel": "debug",
    headers: {host: 'toeicute-38c2b32a7c77.herokuapp.com'},
    pathRewrite: {"^/api": "/api"}
  },
];
module.exports = PROXY_CONFIG;
