const express = require('express');
const router = express.Router();
const aiChatbot = require('../logic/chatbot');

router.post('/chat', async (req, res) => {
  try {
    const { message, lang = 'en' } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    console.log(`[CHAT] Incoming: "${message}"`);

    // Use the central AI brain (chatbot.js)
    const aiResponse = aiChatbot.handleMessage(message, lang);

    // Standardize the response format for the frontend
    res.json({
      reply: aiResponse.text,
      suggestions: aiResponse.suggestions || (aiResponse.showNext ? ["Next Step", "Exit Process"] : []),
      progress: aiResponse.progress,
      matchType: aiResponse.type,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error("Chat Router Error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

module.exports = router;
