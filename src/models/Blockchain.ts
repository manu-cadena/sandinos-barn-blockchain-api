import Block from './Block';
import { createHash } from '../utilities/hash';

class Blockchain {
  public chain: Block[];

  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }: { data: any[] }): void {
    const addedBlock = Block.mineBlock({
      previousBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(addedBlock);
  }

  replaceChain(chain: Block[]): void {
    // Rule 1: New chain must be longer
    if (chain.length <= this.chain.length) {
      console.log('Incoming chain must be longer');
      return;
    }

    // Rule 2: New chain must be valid
    if (!Blockchain.isValid(chain)) {
      console.log('Incoming chain must be valid');
      return;
    }

    // If both rule pass, replace chain
    console.log('Replacing chain with new chain');
    this.chain = chain;
  }

  static isValid(chain: Block[]): boolean {
    // Check if first block is genesis
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    // Validate each block against the previous one
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, data, hash, lastHash, nonce, difficulty } = chain[i];
      const prevHash = chain[i - 1].hash;

      // Check if lastHash links corretly to previous block
      if (lastHash !== prevHash) return false;

      // Verify the hash is valid (recompute and compare)
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
