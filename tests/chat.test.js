jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn().mockReturnValue({
          startChat: jest.fn().mockReturnValue({
            sendMessage: jest.fn().mockResolvedValue({
              response: {
                text: jest.fn().mockReturnValue('Mocked reply')
              }
            })
          })
        })
      };
    })
  };
});

// Set dummy API key for tests to ensure routes don't hit fallback
process.env.GEMINI_API_KEY = 'test-key';

const request = require('supertest');
const app = require('../server/index');
const { chatModel } = require('../server/services/gemini');

describe('Chat API', () => {
  it('should return 200 with a reply field for a valid message', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ message: 'What is EVM?' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('reply');
  });

  it('should return 400 for an empty message', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ message: '' });
    
    expect(response.status).toBe(400);
  });

  it('should return 400 for a message over 500 characters', async () => {
    const longMessage = 'a'.repeat(501);
    const response = await request(app)
      .post('/api/chat')
      .send({ message: longMessage });
    
    expect(response.status).toBe(400);
  });

  describe('Active Guided Sessions', () => {
    it('should start a guided session when matching a step-by-step topic', async () => {
      const response = await request(app)
        .post('/api/chat')
        .send({ message: 'How to apply for a new voter ID online?', lang: 'en' });
      
      expect(response.status).toBe(200);
      expect(response.body.reply).toContain('[GUIDED MODE]');
      expect(response.body.progress).toBeDefined();
      expect(response.body.progress.current).toBe(1);
    });

    it('should navigate to the next step', async () => {
      // First message to initialize
      await request(app)
        .post('/api/chat')
        .send({ message: 'How to apply for a new voter ID online?', lang: 'en' });
        
      const response = await request(app)
        .post('/api/chat')
        .send({ message: 'next step', lang: 'en' });

      expect(response.status).toBe(200);
      expect(response.body.progress.current).toBe(2);
    });

    it('should navigate to the previous step', async () => {
      // First message to initialize and move to step 2
      await request(app).post('/api/chat').send({ message: 'How to apply for a new voter ID online?', lang: 'en' });
      await request(app).post('/api/chat').send({ message: 'next step', lang: 'en' });

      const response = await request(app)
        .post('/api/chat')
        .send({ message: 'previous step', lang: 'en' });

      expect(response.status).toBe(200);
      expect(response.body.progress.current).toBe(1);
    });

    it('should stop guidance', async () => {
      // First message to initialize
      await request(app).post('/api/chat').send({ message: 'How to apply for a new voter ID online?', lang: 'en' });
      
      const response = await request(app)
        .post('/api/chat')
        .send({ message: 'stop guidance', lang: 'en' });

      expect(response.status).toBe(200);
      expect(response.body.reply).toContain('stopped the guidance');
    });

    it('should handle guidance complete', async () => {
      await request(app).post('/api/chat').send({ message: 'How to apply for a new voter ID online?', lang: 'en' });
      // Total 7 steps. Loop next step 6 times.
      for (let i = 0; i < 6; i++) {
        await request(app).post('/api/chat').send({ message: 'next step', lang: 'en' });
      }
      const response = await request(app).post('/api/chat').send({ message: 'next step', lang: 'en' });
      expect(response.status).toBe(200);
      expect(response.body.reply).toContain('Guidance complete');
    });
  });

  describe('Error Handling', () => {
    it('should return 429 for API quota error', async () => {
      // Since chatModel.startChat is already a jest.fn() from the global mock, 
      // we can use mockImplementationOnce directly.
      chatModel.startChat.mockImplementationOnce(() => ({
        sendMessage: jest.fn().mockRejectedValue(new Error('429 Quota exceeded'))
      }));

      const response = await request(app)
        .post('/api/chat')
        .send({ message: 'Random question not in KB', lang: 'en' });
        
      expect(response.status).toBe(429);
      expect(response.body.error).toContain('429');
    });

    it('should return 500 for generic API error', async () => {
      chatModel.startChat.mockImplementationOnce(() => ({
        sendMessage: jest.fn().mockRejectedValue(new Error('Generic failure'))
      }));

      const response = await request(app)
        .post('/api/chat')
        .send({ message: 'Random question not in KB', lang: 'en' });
        
      expect(response.status).toBe(500);
      expect(response.body.error).toContain('Generic failure');
    });
  });
});
