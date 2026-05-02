jest.mock('../server/services/gemini', () => ({
  chatModel: {
    startChat: jest.fn().mockReturnValue({
      sendMessage: jest.fn().mockResolvedValue({
        response: { text: () => 'Mocked AI response' }
      })
    })
  },
  quizModel: {
    generateContent: jest.fn().mockRejectedValue(
      new Error('403 Forbidden - no API key in test env')
    )
  }
}));

const request = require('supertest');
const app = require('../server/index');

describe('Quiz API', () => {
  it('should return 200 with questions array and static source (fallback)', async () => {
    const response = await request(app)
      .post('/api/quiz/generate')
      .send({ topic: 'ECI' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('quiz');
    expect(Array.isArray(response.body.quiz)).toBe(true);
    expect(response.body.source).toBe('static');
    expect(response.body.quiz.length).toBeGreaterThan(0);
  });

  it('should return 400 for a missing topic', async () => {
    const response = await request(app)
      .post('/api/quiz/generate')
      .send({}); // Missing topic
    
    expect(response.status).toBe(400);
  });

  it('should return 400 for an unrecognized topic like cricket', async () => {
    const response = await request(app)
      .post('/api/quiz/generate')
      .send({ topic: 'cricket' });
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
