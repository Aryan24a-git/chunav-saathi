const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60000,
  max: 20,
  message: "Too many requests, please wait a minute",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
