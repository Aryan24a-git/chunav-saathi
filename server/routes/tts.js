const express = require('express');
const router = express.Router();

router.get('/tts', async (req, res) => {
  try {
    const { text } = req.query;

    if (!text || text.length > 500) {
      return res.status(400).json({ error: "Text required and must be under 500 characters." });
    }

    const hasHindi = /[\u0900-\u097F]/.test(text);
    const languageCode = hasHindi ? "hi-IN" : "en-IN";
    const voiceName = hasHindi ? "hi-IN-Neural2-A" : "en-IN-Neural2-A"; // Defaulting to Neural2 for Hindi too if available, or just keeping logic simple

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
      throw new Error(data.error.message);
    }

    res.json({ audioContent: data.audioContent });
  } catch (error) {
    console.error("TTS Error:", error);
    res.status(500).json({ error: "Something went wrong with TTS" });
  }
});

module.exports = router;
