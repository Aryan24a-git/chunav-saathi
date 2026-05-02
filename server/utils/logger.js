/**
 * Structured logging utility for Chunav Saathi.
 * Provides consistent log format across the application.
 * Replaces scattered console.log calls in route handlers.
 */

/**
 * Log levels supported by the logger.
 * @enum {string}
 */
const LOG_LEVELS = { INFO: 'INFO', WARN: 'WARN', ERROR: 'ERROR' };

/**
 * Creates a structured log entry.
 * @param {string} level - Log level from LOG_LEVELS
 * @param {string} message - Human readable message
 * @param {Object} [meta={}] - Additional metadata
 */
const log = (level, message, meta = {}) => {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    service: 'chunav-saathi',
    message,
    ...meta
  };
  if (level === LOG_LEVELS.ERROR) {
    console.error(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
};

const logger = {
  /**
   * Logs an informational message.
   * @param {string} message - Human readable message
   * @param {Object} [meta] - Additional metadata
   */
  info: (message, meta) => log(LOG_LEVELS.INFO, message, meta),
  /**
   * Logs a warning message.
   * @param {string} message - Human readable message
   * @param {Object} [meta] - Additional metadata
   */
  warn: (message, meta) => log(LOG_LEVELS.WARN, message, meta),
  /**
   * Logs an error message.
   * @param {string} message - Human readable message
   * @param {Object} [meta] - Additional metadata
   */
  error: (message, meta) => log(LOG_LEVELS.ERROR, message, meta)
};

module.exports = logger;
