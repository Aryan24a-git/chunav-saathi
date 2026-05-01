const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { englishKnowledgeBase, hindiKnowledgeBase } = require('../data/knowledgeBase');

// Google AI Studio Configuration
// Safely get API Key (removing any accidental double quotes)
const API_KEY = (process.env.GEMINI_API_KEY || '').replace(/"/g, '');
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-flash-latest'
});

const SYSTEM_PROMPT = `You are Chunav Saathi, an expert ONLY 
on Indian elections. Answer questions about ECI, voter 
registration, EVM, MCC, Lok Sabha, Rajya Sabha, election 
timeline, and voter rights. Keep answers under 120 words. 
Be friendly and simple. If asked anything unrelated to 
Indian elections say: I only help with Indian election 
questions! Always respond in the same language the user 
writes in.`;

// In-memory session store for guided steps (Credit-saving layer)
const activeGuidedSessions = {};

/**
 * POST /api/chat
 * Handles conversational AI responses via Google AI Studio Gemini API
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, history, lang } = req.body;
    const userIp = req.ip;
    const isHi = lang === 'hi';

    // Validation
    if (!message || message.length > 500) {
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
    const chat = model.startChat({
      history: history || [],
    });

    // Prepend system prompt if it's a new chat or every time for consistency in stable v1
    const finalPrompt = `${SYSTEM_PROMPT}\n\nUser Question: ${message}`;
    const result = await chat.sendMessage(finalPrompt);
    const response = await result.response;
    const reply = response.text();

    res.json({ 
      reply, 
      timestamp: new Date().toISOString() 
    });

  } catch (error) {
    console.error("AI API ERROR DETAILS:", error);
    res.status(500).json({ error: "Failed to get AI response", details: error.message });
  }
});

module.exports = router;
