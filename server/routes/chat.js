const express = require('express');
const router = express.Router();
const axios = require('axios');

// RapidAPI Configuration from environment variables
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;
const RAPIDAPI_PATH = process.env.RAPIDAPI_PATH || '/';
const RAPIDAPI_URL = `https://${RAPIDAPI_HOST}${RAPIDAPI_PATH}`;

/**
 * POST /api/chat
 * Handles conversational AI responses via RapidAPI
 */
const { englishKnowledgeBase, hindiKnowledgeBase, INTENT_DATA } = require('../data/knowledgeBase');

// In-memory session store for guided steps (Credit-saving layer)
const activeGuidedSessions = {}; 

router.post('/chat', async (req, res) => {
  try {
    const { message, lang = 'en' } = req.body;
    const isHi = lang === 'hi';
    const userIp = req.ip || 'default'; // Simple session tracking by IP
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const lowerMsg = message.toLowerCase().trim();

    // 0. Handle Basic Greetings (Credit-Saving)
    if (["hello", "hi", "hey", "namaste", "नमस्ते", "हे"].some(g => lowerMsg === g)) {
      const greeting = INTENT_DATA.greeting[lang] || INTENT_DATA.greeting.en;
      return res.json({ reply: greeting.join('\n') });
    }

    if (activeGuidedSessions[userIp]) {
      const session = activeGuidedSessions[userIp];
      
      if (["next", "अगला", "आगे", "next step", "बताएं"].some(kw => lowerMsg.includes(kw))) {
        session.currentIdx++;
        if (session.currentIdx < session.steps.length) {
          const isLast = session.currentIdx === session.steps.length - 1;
          const msg = session.steps[session.currentIdx];
          const suggestions = isLast 
            ? [isHi ? "मार्गदर्शन रोकें" : "Stop Guidance"] 
            : [isHi ? "अगला चरण" : "Next Step", isHi ? "पिछला चरण" : "Previous Step", isHi ? "मार्गदर्शन रोकें" : "Stop Guidance"];
          
          return res.json({ 
            reply: msg + (isLast ? (isHi ? "\n\n✅ यह अंतिम चरण था।" : "\n\n✅ This was the final step.") : ""),
            progress: { current: session.currentIdx + 1, total: session.steps.length },
            suggestions: suggestions
          });
        } else {
          delete activeGuidedSessions[userIp];
          return res.json({ reply: isHi ? "आप अंत तक पहुँच गए हैं। मैं आपकी और कैसे सहायता कर सकता हूँ?" : "You've reached the end. How else can I help?" });
        }
      }

      if (["previous", "पीछे", "पिछला", "back"].some(kw => lowerMsg.includes(kw))) {
        if (session.currentIdx > 0) {
          session.currentIdx--;
          const progress = Math.round(((session.currentIdx + 1) / session.steps.length) * 100);
          return res.json({ 
            reply: session.steps[session.currentIdx],
            progress: { current: session.currentIdx + 1, total: session.steps.length },
            suggestions: [isHi ? "अगला चरण" : "Next Step", isHi ? "पिछला चरण" : "Previous Step", isHi ? "मार्गदर्शन रोकें" : "Stop Guidance"]
          });
        }
      }

      if (["stop", "रुकें", "बंद करें", "exit", "quit"].some(kw => lowerMsg.includes(kw))) {
        delete activeGuidedSessions[userIp];
        return res.json({ reply: isHi ? "मार्गदर्शन सत्र समाप्त। मुझसे कुछ भी और पूछें!" : "Guided session ended. Ask me anything else!" });
      }
    }

    // 2. Advanced Local Knowledge Search (Credit-Saving Layer)
    const findLocalMatch = (kb) => {
      let bestMatch = null;
      let maxScore = 0;

      for (const item of kb) {
        let score = 0;
        const qLower = item.q.toLowerCase();
        
        // Exact match or contains the exact question (highest priority)
        if (lowerMsg === qLower || lowerMsg.includes(qLower) || qLower.includes(lowerMsg)) {
          score += 10;
        }

        // Keyword matching
        if (item.keywords) {
          item.keywords.forEach(kw => {
            if (lowerMsg.includes(kw.toLowerCase())) score += 2;
          });
        }

        if (score > maxScore) {
          maxScore = score;
          bestMatch = item;
        }
      }

      // Threshold: Score of 2 means at least one keyword matched, 10 means question matched
      return maxScore >= 2 ? bestMatch : null;
    };

    // Prioritize searching the knowledge base of the user's current language
    
    let match = isHi ? findLocalMatch(hindiKnowledgeBase) : findLocalMatch(englishKnowledgeBase);
    
    // If no match in primary language, try the other one as fallback
    if (!match) {
      match = isHi ? findLocalMatch(englishKnowledgeBase) : findLocalMatch(hindiKnowledgeBase);
    }

    if (match) {
      console.log(`Local match found for: "${message}"`);
      
      if (match.steps && match.steps.length > 0) {
        activeGuidedSessions[userIp] = {
          steps: match.steps,
          currentIdx: 0
        };
        return res.json({ 
          reply: match.a + "\n\n**[GUIDED MODE]**\n" + match.steps[0],
          progress: { current: 1, total: match.steps.length },
          suggestions: [isHi ? "अगला चरण" : "Next Step", isHi ? "मार्गदर्शन रोकें" : "Stop Guidance"]
        });
      }

      return res.json({ reply: match.a });
    }

    // 3. Fallback: Local Intent Filter (Prevent junk/off-topic AI calls)
    const electionKeywords = [
      'vote', 'election', 'eci', 'voter', 'evm', 'vvpat', 'mcc', 'nomination', 'constituency', 
      'lok sabha', 'rajya sabha', 'booth', 'polling', 'commission', 'id card', 'form 6', 'form 7', 'form 8',
      'candidate', 'party', 'election law', 'rights', 'ballot', 'registration', 'manifesto',
      'वोट', 'चुनाव', 'मतदाता', 'ईवीएम', 'आचार संहिता', 'पंजीकरण', 'फॉर्म', 'बूथ', 'अधिकार'
    ];
    
    const isRelated = electionKeywords.some(kw => lowerMsg.includes(kw));
    const isMath = /[\+\-\*\/]/.test(message) && /[0-9]/.test(message);
    
    if (!isRelated && (isMath || message.length < 3)) {
      const fallbackMsg = isHi 
        ? "नमस्ते! मैं 'चुनाव साथी' हूँ, जो केवल भारतीय चुनाव शिक्षा में विशेषज्ञता रखता हूँ। मैं केवल मतदाता पहचान पत्र, ईवीएम, या चुनाव आयोग के नियमों जैसे चुनाव संबंधी प्रश्नों में ही आपकी सहायता कर सकता हूँ। आज मैं आपकी मतदान यात्रा में कैसे मदद कर सकता हूँ?"
        : "Namaste! I am Chunav Saathi, specialized ONLY in Indian Election education. I can only assist you with election-related queries like Voter IDs, EVMs, or ECI rules. How can I help you with your voting journey today?";
      
      return res.json({ reply: fallbackMsg });
    }

    if (!RAPIDAPI_KEY) {
      return res.status(500).json({ error: 'RapidAPI Key not configured on server. Please add RAPIDAPI_KEY to .env' });
    }

    // 3. Last Resort: Call AI API
    const systemPrompt = `You are "Chunav Saathi", a dedicated Indian Election Education Assistant. 
    Your STRICT mission is to educate users about the Indian electoral process.
    IMPORTANT: You must respond in ${isHi ? "HINDI" : "ENGLISH"} because the user has selected that language.
    Keep answers factual, neutral, and easy to understand for common citizens.
    Focus on: Voter Registration, EVMs, VVPAT, Model Code of Conduct, and Voting Rights.
    RULES:
    1. ONLY answer questions related to Indian elections (ECI, Voter ID, Registration, EVMs, VVPAT, Model Code of Conduct, Lok Sabha, Rajya Sabha, Voter Rights, etc.).
    2. If a user asks something UNRELATED (e.g., math, coding, general news, recipes), politely refuse and say: "I am Chunav Saathi, specialized in Indian Election education. I can only assist you with election-related queries. Would you like to know how to register to vote?"
    3. Be neutral, non-partisan, and factual. Do NOT predict election results or support any political party.
    4. Keep responses concise (under 120 words).
    5. Always guide the user at the end of your response.`;
    
    const prompt = `${systemPrompt}\n\nUser: ${message}`;

    const options = {
      method: 'POST',
      url: `https://${process.env.RAPIDAPI_HOST}${process.env.RAPIDAPI_PATH}`,
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': process.env.RAPIDAPI_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY
      },
      data: {
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        web_access: false
      }
    };

    console.log("Sending request to RapidAPI (chatgpt-42)...");
    const response = await axios.request(options);
    console.log("RapidAPI Response received:", JSON.stringify(response.data).substring(0, 500));

    // Handle different possible response structures
    const reply = response.data.result || 
                  (response.data.choices && response.data.choices[0]?.message?.content) || 
                  response.data.response ||
                  "I apologize, but I am unable to process your request at the moment.";

    res.json({ reply: reply });
  } catch (error) {
    console.error("RapidAPI Chat Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: "Failed to get AI response", 
      details: error.response ? error.response.data : error.message 
    });
  }
});

module.exports = router;
