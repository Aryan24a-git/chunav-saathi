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

const request = require('supertest');
const app = require('../server/index');

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
});
