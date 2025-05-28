import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import blockchainRoutes from './blockchain-routes';

const app = express();
app.use(express.json());
app.use('/api/blocks', blockchainRoutes);

describe('Blockchain Routes', () => {
  describe('GET /api/blocks', () => {
    it('should return blockchain data', async () => {
      const response = await request(app).get('/api/blocks').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('POST /api/blocks/mine', () => {
    it('should add a new block', async () => {
      const blockData = { data: ['test transaction'] };

      const response = await request(app)
        .post('/api/blocks/mine')
        .send(blockData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Block added successfully');
    });
  });
});
