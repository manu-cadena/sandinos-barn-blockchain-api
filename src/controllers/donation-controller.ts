import { Request, Response, NextFunction } from 'express';
import Donation from '../models/Donation';
import BlockchainService from '../services/BlockchainService';
import AppError from '../utilities/AppError';
import logger from '../utilities/logger';

const blockchainService = BlockchainService.getInstance();

export const addDonation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { donor, amount, currency, purpose } = req.body;
    const blockchain = blockchainService.getBlockchain();

    // Validation
    if (!donor || !amount || !purpose) {
      throw new AppError('Donor, amount, and purpose are required', 400);
    }

    if (typeof amount !== 'number' || amount <= 0) {
      throw new AppError('Amount must be a positive number', 400);
    }

    // Create complex object
    const donation = new Donation({
      donor,
      amount,
      currency,
      purpose,
    });

    logger.info('Recording donation', {
      donor,
      amount,
      currency,
      purpose,
      donationId: donation.id,
    });

    if (!donation.isValid()) {
      throw new AppError('Invalid donation data', 400);
    }

    // Use the SAME blockchain instance!
    await blockchain.addBlock({
      data: [donation],
    });

    logger.info('Donation recorded in blockchain', {
      donationId: donation.id,
      blockHash: blockchain.chain[blockchain.chain.length - 1].hash,
    });

    res.status(201).json({
      success: true,
      message: 'Donation recorded in blockchain',
      data: {
        donation: donation.toJSON(),
        blockHash: blockchain.chain[blockchain.chain.length - 1].hash,
      },
    });
  } catch (error) {
    logger.error('Failed to record donation', {
      error: (error as Error).message,
    });
    next(error);
  }
};

export const getDonations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blockchain = blockchainService.getBlockchain();
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

    res.status(200).json({
      success: true,
      count: allDonations.length,
      data: allDonations.map((d) => d.toJSON()),
    });
  } catch (error) {
    next(error);
  }
};
