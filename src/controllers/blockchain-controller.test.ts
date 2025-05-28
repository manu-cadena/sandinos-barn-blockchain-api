import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Request, Response } from 'express';
import { listAllBlocks, addBlock } from './blockchain-controller';

describe('Blockchain Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: any;
  let jsonMock: any;

  beforeEach(() => {
    // Mock Express request and response objects
    req = {};
    jsonMock = vi.fn();
    statusMock = vi.fn(() => ({ json: jsonMock }));
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  describe('listAllBlocks', () => {
    it('should return blockchain with success status', () => {
      listAllBlocks(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: expect.any(Object),
      });
    });
  });

  describe('addBlock', () => {
    it('should add a block and return success response', () => {
      req.body = { data: ['transaction1', 'transaction2'] };

      addBlock(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'Block added successfully',
        data: expect.any(Array),
      });
    });
  });
});
