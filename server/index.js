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
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, mobile apps, same-origin)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
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

// Health check endpoint — required for load balancers and deployment verification
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'chunav-saathi',
    timestamp: new Date().toISOString()
  });
});

// Catch-all route to serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.message);
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!', details: err.message });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Chunav Saathi running on port ${PORT}`);
  });
}

module.exports = app;
