require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const rateLimiter = require('./middleware/rateLimiter');
const chatRoutes = require('./routes/chat');
const quizRoutes = require('./routes/quiz');
const ttsRoutes = require('./routes/tts');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Apply rate limiter to /api routes
app.use('/api', rateLimiter);

// Mount routes
app.use('/api', chatRoutes);
app.use('/api', quizRoutes);
app.use('/api', ttsRoutes);

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

app.listen(PORT, () => {
  console.log(`Chunav Saathi running on port ${PORT}`);
});
