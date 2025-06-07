import BlockchainService from '../services/BlockchainService';

export default class BlockchainRepository {
  private blockchainService = BlockchainService.getInstance();

  async getAllBlocks() {
    const blockchain = this.blockchainService.getBlockchain();
    return blockchain;
  }

  async getBlockByHash(hash: string) {
    const blockchain = this.blockchainService.getBlockchain();
    return blockchain.chain.find((block) => block.hash === hash);
  }

  async addBlock(data: any[]) {
    const blockchain = this.blockchainService.getBlockchain();
    await blockchain.addBlock({ data });
    return blockchain.chain;
  }
}
