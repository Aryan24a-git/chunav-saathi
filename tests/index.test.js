const request = require('supertest');
const app = require('../server/index');

describe('Server Root & Infrastructure', () => {
  it('should return 200 for health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('should serve index.html for unknown routes', async () => {
    const response = await request(app).get('/some-random-route');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<!DOCTYPE html>');
  });

  it('should return 403 for disallowed CORS origin', async () => {
    const response = await request(app)
      .get('/health')
      .set('Origin', 'http://malicious-site.com');
    
    expect(response.status).toBe(403);
    expect(response.body.code).toBe('CORS_ERROR');
  });

  it('should allow allowed CORS origin', async () => {
    const response = await request(app)
      .get('/health')
      .set('Origin', 'http://localhost:3000');
    
    expect(response.status).toBe(200);
  });
});
