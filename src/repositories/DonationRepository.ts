import BlockchainRepository from './BlockchainRepository';
import Donation from '../models/Donation';

export default class DonationRepository {
  private blockchainRepo = new BlockchainRepository();

  async addDonation(donation: Donation) {
    const updatedChain = await this.blockchainRepo.addBlock([donation]);
    const blockHash = updatedChain[updatedChain.length - 1].hash;
    return { donation, blockHash };
  }

  async getAllDonations() {
    const blockchain = await this.blockchainRepo.getAllBlocks();
    const allDonations: Donation[] = [];

    blockchain.chain.forEach((block) => {
      if (block.data && Array.isArray(block.data)) {
        block.data.forEach((item) => {
          if (item && typeof item === 'object' && item.donor && item.amount) {
            allDonations.push(Donation.fromJSON(item));
          }
        });
      }
    });

    return allDonations;
  }
}
