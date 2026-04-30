const express = require('express');
const router = express.Router();
const axios = require('axios');

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;
const RAPIDAPI_PATH = process.env.RAPIDAPI_PATH || '/';
const RAPIDAPI_URL = `https://${RAPIDAPI_HOST}${RAPIDAPI_PATH}`;

const { QUIZ_DATA, HINDI_QUIZ_DATA } = require('../data/mockQuiz');

router.post('/generate', async (req, res) => {
  const { topic, lang } = req.body;
  
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    // Select the correct dataset based on language
    const currentKB = (lang === 'hi') ? HINDI_QUIZ_DATA : QUIZ_DATA;
    
    // Check if topic exists in mock data, otherwise fallback
    const quizData = currentKB[topic] || currentKB["ECI"];
    
    if (!quizData || quizData.length === 0) {
      return res.status(404).json({ error: "Quiz topic not found" });
    }

    // Shuffle and pick 5 questions (if more exist)
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    // Send back to frontend
    res.json({ quiz: selected });
  } catch (error) {
    console.error("Mock Quiz Error:", error.message);
    res.status(500).json({ error: "Failed to generate quiz", details: error.message });
  }
});

module.exports = router;
