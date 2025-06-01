import Blockchain from '../models/Blockchain';

class BlockchainService {
  private static instance: BlockchainService;
  private blockchain: Blockchain;
  private initialized: boolean = false;

  private constructor() {
    this.blockchain = new Blockchain();
  }

  // Singleton pattern - only one instance ever exists
  public static getInstance(): BlockchainService {
    if (!BlockchainService.instance) {
      BlockchainService.instance = new BlockchainService();
    }
    return BlockchainService.instance;
  }

  public async initialize(): Promise<void> {
    if (!this.initialized) {
      if (process.env.NODE_ENV === 'test' || process.env.VITEST) {
        console.log('🧪 Test mode: Skipping file persistence');
        this.initialized = true;
        return;
      }
      await this.blockchain.initialize();
      this.initialized = true;
    }
  }

  public getBlockchain(): Blockchain {
    return this.blockchain;
  }

  public resetForTesting(): void {
    if (process.env.NODE_ENV === 'test' || process.env.VITEST) {
      this.blockchain = new Blockchain();
      this.initialized = false;
    }
  }
}

export default BlockchainService;
