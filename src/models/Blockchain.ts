import Block from './Block';
import { createHash } from '../utilities/hash';
import logger from '../utilities/logger';
import {
  saveBlockchainToFile,
  loadBlockchainFromFile,
} from '../utilities/fileUtils';

class Blockchain {
  public chain: Block[];

  constructor() {
    this.chain = [Block.genesis()];
  }

  // Load blockchain from file (called at startup)
  async initialize(): Promise<void> {
    try {
      const savedChain = await loadBlockchainFromFile();

      if (savedChain && savedChain.length > 0) {
        // Validate the loaded chain before using it
        if (Blockchain.isValid(savedChain)) {
          this.chain = savedChain;

          logger.info('Blockchain loaded from file', {
            blockCount: savedChain.length,
          });
        } else {
          logger.warn('Saved blockchain invalid, starting fresh');
          await this.saveToFile(); // Save the fresh genesis chain
        }
      } else {
        logger.info('Starting with fresh blockchain');
        await this.saveToFile(); // Save initial genesis block
      }
    } catch (error) {
      logger.error('Error initializing blockchain', {
        error: (error as Error).message,
      });
      // Continue with genesis block if loading fails
    }
  }

  async addBlock({ data }: { data: any[] }): Promise<void> {
    const addedBlock = Block.mineBlock({
      previousBlock: this.chain[this.chain.length - 1],
      data,
    });

    this.chain.push(addedBlock);

    // Save to file after adding block
    if (process.env.NODE_ENV !== 'test' && !process.env.VITEST) {
      try {
        await this.saveToFile();
        logger.info('Block added and blockchain saved', {
          blockHash: addedBlock.hash,
          chainLength: this.chain.length,
        });
      } catch (error) {
        logger.error('Failed to save blockchain after mining', {
          error: (error as Error).message,
        });
      }
    }
  }

  async replaceChain(chain: Block[]): Promise<void> {
    if (chain.length <= this.chain.length) {
      logger.info('Chain replacement rejected - incoming chain not longer');
      return;
    }

    if (!Blockchain.isValid(chain)) {
      logger.warn('Chain replacement rejected - incoming chain invalid');
      return;
    }

    logger.info('Replacing blockchain with new chain', {
      oldLength: this.chain.length,
      newLength: chain.length,
    });
    this.chain = chain;

    // Save the new chain to file
    if (process.env.NODE_ENV !== 'test' && !process.env.VITEST) {
      try {
        await this.saveToFile();
        logger.info('New blockchain saved after replacement');
      } catch (error) {
        logger.error('Failed to save new blockchain', {
          error: (error as Error).message,
        });
      }
    }
  }

  private async saveToFile(): Promise<void> {
    await saveBlockchainToFile(this.chain);
  }

  static isValid(chain: Block[]): boolean {
    // ... keep your existing validation logic
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, data, hash, lastHash, nonce, difficulty } = chain[i];
      const prevHash = chain[i - 1].hash;

      if (lastHash !== prevHash) return false;

      const validHash = createHash(
        timestamp,
        lastHash,
        data,
        nonce,
        difficulty
      );
      if (hash !== validHash) return false;
    }

    return true;
  }
}

export default Blockchain;
