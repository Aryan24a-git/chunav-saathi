jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn().mockReturnValue({
          startChat: jest.fn().mockReturnValue({
            sendMessage: jest.fn().mockResolvedValue({
              response: {
                text: jest.fn().mockReturnValue('Mocked AI response for unrecognized input')
              }
            })
          })
        })
      };
    })
  };
});

// Set a dummy key so the API_KEY guard in chat.js passes and the mock is used
process.env.GEMINI_API_KEY = 'test-key';

const request = require('supertest');
const app = require('../server/index');

describe('Router Logic (Local vs AI)', () => {
  it('should match greeting keywords via local knowledge base', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ message: 'namaste' });
    
    expect(response.status).toBe(200);
    expect(response.body.reply).toBeDefined();
    expect(response.body.reply).not.toBe('Mocked AI response for unrecognized input');
  });

  it('should fall through to AI handler for unrecognized input', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ message: 'What is the color of the sky?' });
    
    expect(response.status).toBe(200);
    expect(response.body.reply).toBe('Mocked AI response for unrecognized input');
  });
});
