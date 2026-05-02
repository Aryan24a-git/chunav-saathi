/**
 * Google Service: Generative AI (Gemini 3 Flash Preview)
 * SDK: @google/generative-ai
 * Endpoint: generativelanguage.googleapis.com
 * Purpose: Natural language understanding for 
 * election-related queries
 */

/**
 * chat.js
 * Handles the AI chat endpoint for Chunav Saathi.
 * Uses a hybrid approach: local knowledge router first,
 * falls back to Gemini AI for complex queries.
 */
const express = require('express');
const router = express.Router();
const { chatModel } = require('../services/gemini');
const { englishKnowledgeBase, hindiKnowledgeBase } = require('../data/knowledgeBase');

// Safely get API Key (removing any accidental double quotes and hidden chars)
const API_KEY = (process.env.GEMINI_API_KEY || '').replace(/"/g, '').replace(/[\x00-\x1F\x7F-\x9F]/g, '').trim();
// We define a fallback test to check if the api key exists
const model = API_KEY ? chatModel : null;

const { SYSTEM_PROMPT } = require('../prompts/systemPrompt');

// In-memory session store for guided steps (Credit-saving layer)
const activeGuidedSessions = {};

/**
 * Handles AI chat requests using the hybrid router
 * @route POST /api/chat
 * @param {Object} req.body
 * @param {string} req.body.message - User's message (max 500 chars)
 * @param {Array} req.body.history - Previous conversation turns
 * @param {string} req.body.lang - Language code ('en' or 'hi')
 * @returns {Object} { reply: string, progress?: Object, suggestions?: Array, timestamp: string }
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, history, lang } = req.body;
    const userIp = req.ip;
    const isHi = lang === 'hi';

    // Validation
    if (!message || message.trim().length === 0 || message.length > 500) {
      return res.status(400).json({ error: "Message is required and must be under 500 characters." });
    }

    const lowerMsg = message.toLowerCase().trim();

    // 1. Check for Active Guided Session (Highest Priority)
    if (activeGuidedSessions[userIp]) {
      const session = activeGuidedSessions[userIp];
      
      if (lowerMsg === 'next step' || lowerMsg === 'अगला चरण' || lowerMsg === 'next') {
        session.currentIdx++;
        if (session.currentIdx < session.steps.length) {
          return res.json({
            reply: session.steps[session.currentIdx],
            progress: { current: session.currentIdx + 1, total: session.steps.length },
            suggestions: [isHi ? "अगला चरण" : "Next Step", isHi ? "मार्गदर्शन रोकें" : "Stop Guidance"]
          });
        } else {
          delete activeGuidedSessions[userIp];
          return res.json({ 
            reply: isHi ? "मार्गदर्शन पूरा हुआ! क्या आप कुछ और जानना चाहते हैं?" : "Guidance complete! Would you like to know anything else?",
            suggestions: [isHi ? "वोटर आईडी कैसे बनाएं?" : "How to make Voter ID?", isHi ? "अगला चुनाव कब है?" : "When is the next election?"]
          });
        }
      }

      if (lowerMsg === 'previous step' || lowerMsg === 'पिछला चरण' || lowerMsg === 'back' || lowerMsg === 'previous') {
        if (session.currentIdx > 0) {
          session.currentIdx--;
          return res.json({
            reply: session.steps[session.currentIdx],
            progress: { current: session.currentIdx + 1, total: session.steps.length },
            suggestions: [isHi ? "अगला चरण" : "Next Step", isHi ? "मार्गदर्शन रोकें" : "Stop Guidance"]
          });
        }
      }

      if (lowerMsg === 'stop guidance' || lowerMsg === 'मार्गदर्शन रोकें' || lowerMsg === 'stop') {
        delete activeGuidedSessions[userIp];
        return res.json({ 
          reply: isHi ? "ठीक है, मैंने मार्गदर्शन रोक दिया है। मैं आपकी और क्या सहायता कर सकता हूँ?" : "Understood, I have stopped the guidance. How else can I assist you?",
          suggestions: [isHi ? "मुख्य मेनू" : "Main Menu"]
        });
      }
    }

    // 2. Check Local Knowledge Base
    /**
     * Finds a match for the user's message in the local knowledge base.
     * @param {Array} kb - The knowledge base array (English or Hindi)
     * @returns {Object|null} The best matching knowledge base item or null
     */
    const findLocalMatch = (kb) => {
      let bestMatch = null;
      let maxScore = 0;
      for (const item of kb) {
        let score = 0;
        if (lowerMsg.includes(item.q.toLowerCase())) score += 10;
        item.keywords.forEach(kw => { if (lowerMsg.includes(kw.toLowerCase())) score += 2; });
        if (score > maxScore) {
          maxScore = score;
          bestMatch = item;
        }
      }
      return maxScore >= 2 ? bestMatch : null;
    };

    let match = isHi ? findLocalMatch(hindiKnowledgeBase) : findLocalMatch(englishKnowledgeBase);
    if (!match) match = isHi ? findLocalMatch(englishKnowledgeBase) : findLocalMatch(hindiKnowledgeBase);

    if (match) {
      if (match.steps && match.steps.length > 0) {
        activeGuidedSessions[userIp] = { steps: match.steps, currentIdx: 0 };
        return res.json({ 
          reply: match.a + "\n\n**[GUIDED MODE]**\n" + match.steps[0],
          progress: { current: 1, total: match.steps.length },
          suggestions: [isHi ? "अगला चरण" : "Next Step", isHi ? "मार्गदर्शन रोकें" : "Stop Guidance"],
          timestamp: new Date().toISOString()
        });
      }
      return res.json({ reply: match.a, timestamp: new Date().toISOString() });
    }

    // 3. Last Resort: Google Gemini AI
    if (!model) {
      return res.json({ 
        reply: isHi ? "⚠️ AI सेवा अभी उपलब्ध नहीं है।" : "⚠️ AI service is unavailable.",
        source: 'error'
      });
    }

    const chat = model.startChat({
      history: history || [],
    });

    // Prepend system prompt if it's a new chat or every time for consistency
    const finalPrompt = `${SYSTEM_PROMPT}\n\nUser Question: ${message}`;
    const result = await chat.sendMessage(finalPrompt);
    const response = await result.response;
    const reply = response.text();

    res.json({ 
      reply, 
      timestamp: new Date().toISOString() 
    });

  } catch (error) {
    console.error("AI API ERROR DETAILS:", error.message);
    const isHi = req.body.lang === 'hi';

    // Handle quota/rate-limit errors gracefully
    if (error.message && (error.message.includes('429') || error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED'))) {
      return res.status(429).json({
        reply: isHi 
          ? "⚠️ API कोटा समाप्त हो गया है। कृपया बाद में पुनः प्रयास करें।" 
          : "⚠️ API quota exceeded. Please try again later.",
        error: error.message
      });
    }

    res.status(500).json({ 
      reply: isHi ? "⚠️ समस्या हुई। कृपया पुनः प्रयास करें।" : "⚠️ Something went wrong. Please try again.",
      error: error.message 
    });
  }
});

module.exports = router;
