import { GENESIS_BLOCK, MINE_RATE } from '../config/constants';
import { createHash } from '../utilities/hash';

interface BlockProperties {
  timestamp: number;
  hash: string;
  lastHash: string;
  data: any[] | readonly any[];
  nonce: number;
  difficulty: number;
}

interface MineBlockParams {
  previousBlock: Block;
  data: any[];
}

interface AdjustDifficultyParams {
  block: Block;
  timestamp: number;
}

class Block {
  public timestamp: number;
  public hash: string;
  public lastHash: string;
  public data: any[] | readonly any[];
  public nonce: number;
  public difficulty: number;

  constructor(properties: BlockProperties) {
    this.timestamp = properties.timestamp;
    this.hash = properties.hash;
    this.lastHash = properties.lastHash;
    this.data = properties.data;
    this.nonce = properties.nonce;
    this.difficulty = properties.difficulty;
  }

  static genesis(): Block {
    return new Block(GENESIS_BLOCK);
  }

  static mineBlock({ previousBlock, data }: MineBlockParams): Block {
    let timestamp: number;
    let hash: string;
    const lastHash = previousBlock.hash;
    let difficulty = previousBlock.difficulty;
    let nonce = 0;

    // Proof of Work loop - keep incrementing nonce until a valid hash is found
    do {
      nonce++;
      timestamp = Date.now();

      // Adjust difficulty based on mining time
      difficulty = Block.adjustDifficultyLevel({
        block: previousBlock,
        timestamp,
      });

      // Create hash with currrent values
      hash = createHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new Block({ timestamp, hash, lastHash, data, nonce, difficulty });
  }

  static adjustDifficultyLevel({
    block,
    timestamp,
  }: AdjustDifficultyParams): number {
    const { difficulty } = block;

    // Safety check - never go below 1
    if (difficulty < 1) return 1;

    // If mining took too long, make it easier (reduce difficulty)
    if (timestamp - block.timestamp > MINE_RATE) {
      return difficulty - 1;
    }
    // If mining was too fast, make it harder (increase difficulty)
    return difficulty + 1;
  }
}

export default Block;
