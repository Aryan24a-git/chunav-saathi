const request = require('supertest');
const app = require('../server/index');

// Mock fetch globally
global.fetch = jest.fn();

describe('TTS Route', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should return 400 if no text is provided', async () => {
    const response = await request(app).get('/api/tts');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
  });

  it('should return 400 if text is too long', async () => {
    const longText = 'a'.repeat(501);
    const response = await request(app).get(`/api/tts?text=${longText}`);
    expect(response.status).toBe(400);
  });

  it('should return audio content on success', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ audioContent: 'mockBase64Audio' })
    });

    const response = await request(app).get('/api/tts?text=hello');
    expect(response.status).toBe(200);
    expect(response.body.audioContent).toBe('mockBase64Audio');
  });

  it('should return 500 if google api fails', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ error: { message: 'Invalid API key' } })
    });

    const response = await request(app).get('/api/tts?text=hello');
    expect(response.status).toBe(500);
  });
});
