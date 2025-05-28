import { describe, it, expect, beforeEach } from 'vitest';
import Blockchain from './Blockchain';
import Block from './Block';

describe('Blockchain', () => {
  let blockchain: Blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  describe('Blockchain constructor', () => {
    it('should start with a genesis block', () => {
      expect(blockchain.chain).toHaveLength(1);
      expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('should have chain as an array', () => {
      expect(Array.isArray(blockchain.chain)).toBe(true);
    });
  });

  describe('addBlock', () => {
    it('should add a new block to the chain', () => {
      const data = ['transaction1', 'transaction2'];

      blockchain.addBlock({ data });

      expect(blockchain.chain).toHaveLength(2);
      expect(blockchain.chain[1].data).toEqual(data);
      expect(blockchain.chain[1].lastHash).toBe(blockchain.chain[0].hash);
    });

    describe('Chain validation', () => {
      beforeEach(() => {
        blockchain.addBlock({ data: ['block1'] });
        blockchain.addBlock({ data: ['block2'] });
        blockchain.addBlock({ data: ['block3'] });
      });

      describe('isValid() static method', () => {
        it('should return true for a valid chain', () => {
          expect(Blockchain.isValid(blockchain.chain)).toBe(true);
        });

        it('should return false when genesis block is invalid', () => {
          blockchain.chain[0] = new Block({
            timestamp: 999,
            hash: 'fake-hash',
            lastHash: 'fake-last-hash',
            data: ['fake'],
            nonce: 1,
            difficulty: 1,
          });
          expect(Blockchain.isValid(blockchain.chain)).toBe(false);
        });
        it('should return false when a block has invalid lastHash', () => {
          blockchain.chain[1].lastHash = 'broken-link';
          expect(Blockchain.isValid(blockchain.chain)).toBe(false);
        });
      });
    });

    describe('replaceChain()', () => {
      let newChain: Blockchain;
      let originalChain: Block[];

      beforeEach(() => {
        newChain = new Blockchain();
        originalChain = blockchain.chain;
      });

      describe('when new chain is not longer', () => {
        it('should not replace the chain', () => {
          blockchain.replaceChain(newChain.chain);
          expect(blockchain.chain).toEqual(originalChain);
        });
      });

      describe('when new chain is longer and valid', () => {
        beforeEach(() => {
          newChain.addBlock({ data: ['new-block-1'] });
          newChain.addBlock({ data: ['new-block-2'] });
        });

        it('should replace the chain', () => {
          blockchain.replaceChain(newChain.chain);
          expect(blockchain.chain).toEqual(newChain.chain);
        });
      });
    });
  });
});
