const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: "https://toeicute-38c2b32a7c77.herokuapp.com/",
    "changeOrigin": true,
    "logLevel": "debug",
    headers: {host: 'toeicute-38c2b32a7c77.herokuapp.com'},
    pathRewrite: {"^/api": "/api"}
  }
];
module.exports = PROXY_CONFIG;
