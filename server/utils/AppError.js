/**
 * Custom application error class.
 * Extends native Error with HTTP status code support.
 * 
 * @class AppError
 * @extends Error
 * @example
 * throw new AppError('Message too long', 400, 'VALIDATION_ERROR')
 */
class AppError extends Error {
  /**
   * Create an AppError
   * @param {string} message - Human readable error message
   * @param {number} statusCode - HTTP status code
   * @param {string} code - Application specific error code
   */
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
