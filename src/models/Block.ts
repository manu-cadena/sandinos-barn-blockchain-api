import { GENESIS_BLOCK } from '../config/constants';

interface BlockProperties {
  timestamp: number;
  hash: string;
  lastHash: string;
  data: any[] | readonly any[];
  nonce: number;
  difficulty: number;
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
}

export default Block;
