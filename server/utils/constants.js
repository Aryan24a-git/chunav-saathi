/**
 * Application-wide constants for Chunav Saathi.
 * Centralizing magic numbers improves maintainability.
 */

/** Maximum allowed message length in characters */
const MAX_MESSAGE_LENGTH = 500;

/** Maximum tokens for Gemini AI response */
const MAX_OUTPUT_TOKENS = 300;

/** Temperature for AI responses (0=precise, 1=creative) */
const AI_TEMPERATURE = 0.7;

/** Rate limit window in milliseconds (1 minute) */
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

/** Maximum requests per window per IP */
const RATE_LIMIT_MAX_REQUESTS = 20;

/** Supported languages */
const SUPPORTED_LANGUAGES = ['en', 'hi'];

/** Quiz configuration */
const QUIZ_CONFIG = {
  questionsPerQuiz: 5,
  timerSeconds: 20,
  minOptions: 4
};

module.exports = {
  MAX_MESSAGE_LENGTH,
  MAX_OUTPUT_TOKENS,
  AI_TEMPERATURE,
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS,
  SUPPORTED_LANGUAGES,
  QUIZ_CONFIG
};
