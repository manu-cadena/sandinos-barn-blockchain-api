import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Request, Response } from 'express';
import {
  listAllBlocks,
  addBlock,
  getBlockByHash,
} from './blockchain-controller';

describe('Blockchain Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let nextMock: any;
  let statusMock: any;
  let jsonMock: any;

  beforeEach(() => {
    req = {};
    nextMock = vi.fn();
    jsonMock = vi.fn();
    statusMock = vi.fn(() => ({ json: jsonMock }));
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  describe('listAllBlocks', () => {
    it('should return blockchain with success status', async () => {
      await listAllBlocks(req as Request, res as Response, nextMock);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: expect.any(Object),
      });
    });
  });

  describe('addBlock', () => {
    it('should add block and return success response', async () => {
      req.body = { data: ['transaction1', 'transaction2'] };

      // Make sure to await the async function!
      await addBlock(req as Request, res as Response, nextMock);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'Block added successfully',
        data: expect.any(Array),
      });
    });

    it('should handle missing data error', async () => {
      req.body = {}; // No data

      await addBlock(req as Request, res as Response, nextMock);

      // Should call next with an error (not res.status)
      expect(nextMock).toHaveBeenCalledWith(expect.any(Error));
      expect(statusMock).not.toHaveBeenCalled();
    });

    it('should handle invalid data type error', async () => {
      req.body = { data: 'not an array' };

      await addBlock(req as Request, res as Response, nextMock);

      expect(nextMock).toHaveBeenCalledWith(expect.any(Error));
      expect(statusMock).not.toHaveBeenCalled();
    });
  });

  describe('getBlockByHash', () => {
    it('should be a function', () => {
      expect(typeof getBlockByHash).toBe('function');
    });

    it('should handle missing hash error', async () => {
      req.params = { hash: '' };

      await getBlockByHash(req as Request, res as Response, nextMock);

      expect(nextMock).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
