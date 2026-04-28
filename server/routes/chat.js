const express = require('express');
const router = express.Router();
const mockData = require('../data/mockData');

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.length > 500) {
      return res.status(400).json({ error: "Invalid message. Must be under 500 characters." });
    }

    // A very basic keyword search against our mock FAQs
    const lowerMessage = message.toLowerCase();
    let reply = mockData.assistant.out_of_scope_response; // Default

    // Check if it's a greeting
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
       reply = `Hello! I am ${mockData.assistant.name}, an ${mockData.assistant.role}. How can I help you?`;
    } else {
       // Search FAQs
       for (const faq of mockData.faqs) {
         // Create a simple keyword list from the question
         const keywords = faq.q.toLowerCase().split(' ').filter(w => w.length > 3);
         const matchCount = keywords.filter(kw => lowerMessage.includes(kw)).length;
         
         // If a decent number of keywords match, return the answer
         if (matchCount >= 2 || lowerMessage.includes("form 6") || lowerMessage.includes("nota")) {
            // slightly hacky hardcoded checks to ensure demo works
            if(lowerMessage.includes("form 6") && faq.q.includes("Form 6")) { reply = faq.a; break; }
            if(lowerMessage.includes("form 7") && faq.q.includes("Form 7")) { reply = faq.a; break; }
            if(lowerMessage.includes("form 8") && faq.q.includes("Form 8")) { reply = faq.a; break; }
            if(lowerMessage.includes("nota") && faq.q.includes("NOTA")) { reply = faq.a; break; }
            
            if(matchCount >= 2) {
               reply = faq.a;
               break;
            }
         }
       }
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    res.json({
      reply: `[MOCK DATA] ${reply}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
