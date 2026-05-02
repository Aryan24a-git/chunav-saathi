const AppError = require('../server/utils/AppError');
const { validateChatMessage, validateQuizTopic, VALID_TOPICS } = require('../server/utils/validators');
const logger = require('../server/utils/logger');

describe('Utils', () => {
  describe('AppError', () => {
    it('should create an AppError with message and statusCode', () => {
      const err = new AppError('Test error', 404);
      expect(err.message).toBe('Test error');
      expect(err.statusCode).toBe(404);
      expect(err.isOperational).toBe(true);
    });

    it('should set the error code if provided', () => {
      const err = new AppError('Server error', 500, 'ERR_CODE');
      expect(err.code).toBe('ERR_CODE');
    });
  });

  describe('validators', () => {
    it('validateChatMessage should invalidate empty messages', () => {
      expect(validateChatMessage('')).toEqual({ valid: false, error: 'Message is required' });
      expect(validateChatMessage('   ')).toEqual({ valid: false, error: 'Message cannot be empty' });
      expect(validateChatMessage(null)).toEqual({ valid: false, error: 'Message is required' });
    });

    it('validateChatMessage should invalidate long messages', () => {
      const longMsg = 'a'.repeat(501);
      expect(validateChatMessage(longMsg).valid).toBe(false);
    });

    it('validateChatMessage should sanitize HTML', () => {
      expect(validateChatMessage('<script>alert("xss")</script>hello')).toEqual({ valid: true, message: 'alert("xss")hello' });
    });

    it('validateQuizTopic should validate correct topics', () => {
      expect(validateQuizTopic('ECI').valid).toBe(true);
      expect(validateQuizTopic('eci').valid).toBe(true); // case insensitive
    });

    it('validateQuizTopic should invalidate wrong topics', () => {
      expect(validateQuizTopic('Math').valid).toBe(false);
      expect(validateQuizTopic(null).valid).toBe(false);
    });
  });

  describe('logger', () => {
    it('should have info and error methods', () => {
      expect(typeof logger.info).toBe('function');
      expect(typeof logger.error).toBe('function');
      // Mock console to avoid spam
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      logger.info('Test info', { some: 'data' });
      logger.error('Test error', new Error('test'));
      
      consoleSpy.mockRestore();
      errorSpy.mockRestore();
    });
  });
});
