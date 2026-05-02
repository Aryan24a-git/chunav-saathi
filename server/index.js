if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const path = require('path');

const rateLimiter = require('./middleware/rateLimiter');
const chatRoutes = require('./routes/chat');
const quizRoutes = require('./routes/quiz');
const ttsRoutes = require('./routes/tts');
const logger = require('./utils/logger');
const AppError = require('./utils/AppError');

const app = express();
const PORT = process.env.PORT || 8080;

// Trust Cloud Run proxy for rate-limiting
app.set('trust proxy', 1);

// Allowed origins: production Cloud Run URL + local dev
const ALLOWED_ORIGINS = [
  'https://chunav-saathi-692586675932.us-central1.run.app',
  'http://localhost:8080',
  'http://localhost:3000'
];

app.use(cors({
  /**
   * Validates the origin of incoming requests.
   * 
   * @param {string} origin - The origin of the request
   * @param {Function} callback - Callback function
   * @returns {void}
   * @throws {AppError} If origin is not allowed
   */
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, mobile apps, same-origin)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new AppError(`CORS policy: origin ${origin} not allowed`, 403, 'CORS_ERROR'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Apply rate limiter to /api routes
app.use('/api', rateLimiter);

// Mount routes
app.use('/api', chatRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/tts', ttsRoutes);

/**
 * @route GET /health
 * @desc Health check endpoint — required for load balancers and deployment verification
 * @access Public
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {void} Returns a JSON object with status ok
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'chunav-saathi',
    timestamp: new Date().toISOString()
  });
});

/**
 * @route GET /*
 * @desc Catch-all route to serve the frontend index.html
 * @access Public
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {void} Sends the index.html file
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

/**
 * Global error handling middleware
 * Catches all unhandled errors from route handlers
 */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  logger.error(`[${new Date().toISOString()}] Error:`, {
    statusCode,
    message,
    path: req.path,
    method: req.method
  });
  
  res.status(statusCode).json({
    error: true,
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : message,
    code: err.code || 'INTERNAL_ERROR',
    timestamp: new Date().toISOString()
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Chunav Saathi running on port ${PORT}`);
  });
}

module.exports = app;
