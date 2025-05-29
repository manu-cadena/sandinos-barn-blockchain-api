import Block from './Block';
import { createHash } from '../utilities/hash';
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
          console.log(`📂 Loaded ${savedChain.length} blocks from file`);
        } else {
          console.log('⚠️  Saved blockchain is invalid, starting fresh');
          await this.saveToFile(); // Save the fresh genesis chain
        }
      } else {
        console.log('📄 Starting with fresh blockchain');
        await this.saveToFile(); // Save initial genesis block
      }
    } catch (error) {
      console.error('❌ Error initializing blockchain:', error);
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
    try {
      await this.saveToFile();
      console.log('💾 Blockchain saved after mining new block');
    } catch (error) {
      console.error('❌ Failed to save blockchain after mining:', error);
      // Block was added to memory, but not saved - could be handled differently
    }
  }

  async replaceChain(chain: Block[]): Promise<void> {
    if (chain.length <= this.chain.length) {
      console.log('Incoming chain must be longer');
      return;
    }

    if (!Blockchain.isValid(chain)) {
      console.log('Incoming chain must be valid');
      return;
    }

    console.log('Replacing chain with new chain');
    this.chain = chain;

    // Save the new chain to file
    try {
      await this.saveToFile();
      console.log('💾 New blockchain saved after replacement');
    } catch (error) {
      console.error('❌ Failed to save new blockchain:', error);
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
