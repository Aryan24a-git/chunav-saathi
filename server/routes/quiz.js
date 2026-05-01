const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Safely get API Key (removing any accidental double quotes)
const API_KEY = (process.env.GEMINI_API_KEY || '').replace(/"/g, '');
const genAI = new GoogleGenerativeAI(API_KEY);
const quizModel = genAI.getGenerativeModel({ 
  model: 'gemini-flash-latest' 
});

router.post('/generate', async (req, res) => {
  const { topic } = req.body;
  
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  const prompt = `Generate 5 multiple choice questions about ${topic} 
  in Indian elections. Return ONLY valid JSON array, 
  no markdown, no backticks. Format:
  [{"question":"...","options":["A","B","C","D"],
  "correctIndex":0,"explanation":"..."}]`;

  try {
    let result = await quizModel.generateContent(prompt);
    let text = result.response.text();
    
    // Clean up text in case of accidental markdown
    text = text.replace(/```json|```/g, "").trim();

    try {
      const questions = JSON.parse(text);
      return res.json({ 
        quiz: questions, 
        topic, 
        generatedAt: new Date().toISOString() 
      });
    } catch (parseError) {
      console.warn("JSON Parse fail, retrying once...");
      // Simple retry
      result = await quizModel.generateContent(prompt);
      text = result.response.text().replace(/```json|```/g, "").trim();
      const questions = JSON.parse(text);
      return res.json({ 
        quiz: questions, 
        topic, 
        generatedAt: new Date().toISOString() 
      });
    }
  } catch (error) {
    console.error("Quiz Generation Error:", error.message);
    res.status(500).json({ error: "Failed to generate quiz", details: error.message });
  }
});

module.exports = router;
