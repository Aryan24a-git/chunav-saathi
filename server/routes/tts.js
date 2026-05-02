/**
 * tts.js
 * Express router for Text-to-Speech (TTS) functionality.
 * Integrates with Google Cloud TTS API for generating audio from text.
 */

const express = require('express');
const router = express.Router();
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');
const { MAX_MESSAGE_LENGTH } = require('../utils/constants');

/**
 * GET /api/tts
 * Synthesizes text into speech audio using Google Cloud TTS.
 * Automatically detects Hindi characters to select the appropriate voice.
 * 
 * @name GetTTS
 * @route {GET} /api/tts
 * @queryparam {string} text - The text content to synthesize into speech.
 * @returns {object} JSON object containing base64 encoded audioContent.
 * @throws {AppError} 400 - If text is missing or exceeds the character limit.
 * @throws {AppError} 500 - If the Google TTS API fails.
 */
router.get('/', async (req, res, next) => {
  try {
    const { text } = req.query;

    if (!text || text.length > MAX_MESSAGE_LENGTH) {
      throw new AppError(`Text is required and must be under ${MAX_MESSAGE_LENGTH} characters.`, 400);
    }

    const hasHindi = /[\u0900-\u097F]/.test(text);
    const languageCode = hasHindi ? "hi-IN" : "en-IN";
    const voiceName = hasHindi ? "hi-IN-Neural2-A" : "en-IN-Neural2-A"; // Defaulting to Neural2 for Hindi too if available, or just keeping logic simple

    logger.info('Calling Google Cloud TTS API', { languageCode, voiceName });

    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode, name: voiceName },
        audioConfig: { audioEncoding: "MP3" }
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new AppError(`Google TTS API Error: ${data.error.message}`, 500);
    }

    logger.info('Successfully generated TTS audio');
    res.json({ audioContent: data.audioContent });
  } catch (error) {
    logger.error("TTS Route Error:", error);
    next(error);
  }
});

module.exports = router;
