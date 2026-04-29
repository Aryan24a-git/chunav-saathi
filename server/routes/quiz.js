const express = require('express');
const router = express.Router();
const mockQuiz = require('../data/mockQuiz');

const VALID_TOPICS = ["lok-sabha", "rajya-sabha", "evm", "mcc", "voter-rights", "election-commission", "timeline", "panchayat"];

router.post('/quiz/generate', async (req, res) => {
  const { topic } = req.body;

  try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Map frontend topic names to backend categories
      const categoryMap = {
        'ECI': 'Basics',
        'MCC': 'Stages & Laws',
        'EVM/VVPAT': 'EVM & Tech',
        'Forms': 'Voter ID',
        'NOTA': 'Basics',
        'Constituencies': 'Basics',
        'History': 'Basics',
        'Rights': 'Basics'
      };

      const category = categoryMap[topic] || 'Basics';
      const questions = mockQuiz[category] || mockQuiz['Basics'];

      return res.json({
        quiz: questions,
        topic: category,
        generatedAt: new Date().toISOString()
      });
  } catch (error) {
      console.error("Quiz Error:", error);
      res.status(500).json({ error: "Failed to generate quiz" });
  }
});

module.exports = router;
