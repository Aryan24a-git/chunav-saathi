/**
 * Input validation utilities for Chunav Saathi API.
 * Centralizes all validation logic for maintainability.
 */

const { MAX_MESSAGE_LENGTH } = require('./constants');

/**
 * Valid quiz topics accepted by the application.
 * @constant {string[]}
 */
const VALID_TOPICS = [
  'lok-sabha', 'rajya-sabha', 'evm', 'mcc',
  'voter-rights', 'election-commission', 
  'timeline', 'panchayat', 'ECI', 'EVM/VVPAT', 'Forms', 'NOTA', 'Constituencies', 'History', 'Rights'
];

/**
 * Validates and sanitizes a chat message.
 * @param {string} message - Raw user input
 * @returns {{ valid: boolean, message?: string, error?: string }}
 * @example
 * validateChatMessage('Hello') // => { valid: true, message: 'Hello' }
 */
const validateChatMessage = (message) => {
  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'Message is required' };
  }
  const trimmed = message.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Message cannot be empty' };
  }
  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `Message exceeds ${MAX_MESSAGE_LENGTH} character limit` };
  }
  // Strip HTML tags to prevent injection
  const sanitized = trimmed.replace(/<[^>]*>/g, '');
  return { valid: true, message: sanitized };
};

/**
 * Validates a quiz topic against the allowed list.
 * @param {string} topic - Topic identifier to validate
 * @returns {{ valid: boolean, error?: string }}
 * @example
 * validateQuizTopic('ECI') // => { valid: true }
 */
const validateQuizTopic = (topic) => {
  if (!topic || typeof topic !== 'string') {
    return { valid: false, error: 'Topic is required' };
  }
  if (!VALID_TOPICS.map(t => t.toLowerCase()).includes(topic.toLowerCase())) {
    return { 
      valid: false, 
      error: `Invalid topic. Must be one of: ${VALID_TOPICS.join(', ')}`
    };
  }
  return { valid: true };
};

module.exports = { validateChatMessage, validateQuizTopic, VALID_TOPICS };
