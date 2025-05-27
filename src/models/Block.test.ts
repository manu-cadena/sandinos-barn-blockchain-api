import { describe, it, expect, beforeEach } from 'vitest';
import Block from './Block';

describe('Block', () => {
  describe('Block constructor', () => {
    it('should create a block with all required properties', () => {
      // Test data
      const blockData = {
        timestamp: 2000,
        hash: 'test-hash',
        lastHash: 'prev-hash',
        data: ['test', 'data'],
        nonce: 1,
        difficulty: 3,
      };

      const block = new Block(blockData);

      // Assertions
      expect(block.timestamp).toBe(2000);
      expect(block.hash).toBe('test-hash');
      expect(block.lastHash).toBe('prev-hash');
      expect(block.data).toEqual(['test', 'data']);
      expect(block.nonce).toBe(1);
      expect(block.difficulty).toBe(3);
    });
  });
});

describe('Genesis Block', () => {
  it('should create a genesis block', () => {
    const genesisBlock = Block.genesis();

    expect(genesisBlock).toBeInstanceOf(Block);
    expect(genesisBlock.timestamp).toBeDefined();
    expect(genesisBlock.hash).toBe('#1');
    expect(genesisBlock.lastHash).toBe('#######');
    expect(genesisBlock.data).toEqual([]);
    expect(genesisBlock.nonce).toBe(0);
    expect(genesisBlock.difficulty).toBeDefined();
  });
});
