const PROXY_CONFIG = [
  {
    context: [
      "/api"
    ],
    target: "https://toeicute",
    secure: false,
    "changeOrigin": true,
    "logLevel": "debug",
    headers: {host: 'toeicute.com'},
    cookieDomainRewrite: {
      ".toeicute.com": "localhost"
    }
  }
  ,
  {
    context: [
      "/api",
    ],
    target: "http://localhost:8080",
    secure: false,
    "changeOrigin": true,
    "logLevel": "debug",
    headers: {host: 'localhost'}
  }
];
module.exports = PROXY_CONFIG;
