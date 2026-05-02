/**
 * rateLimiter.js
 * Configures the rate limiting middleware for API endpoints.
 * Protects the server from abuse and excessive AI API consumption.
 */
const rateLimit = require('express-rate-limit');

/**
 * Express rate limiter middleware instance.
 * Limits requests to 50 per minute per IP.
 * @type {Function}
 */
const limiter = rateLimit({
  windowMs: 60000,
  max: 50,
  message: { error: "Too many requests, please wait a minute" },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
