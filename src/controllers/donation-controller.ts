import { Request, Response, NextFunction } from 'express';
import Donation from '../models/Donation';
import DonationRepository from '../repositories/DonationRepository'; // 🆕
import AppError from '../utilities/AppError';
import logger from '../utilities/logger';

const donationRepo = new DonationRepository();

export const addDonation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { donor, amount, currency, purposes } = req.body;

    // Validation
    if (!donor || !amount || !purposes) {
      throw new AppError('Donor, amount, and purposes are required', 400);
    }

    if (!Array.isArray(purposes) || purposes.length === 0) {
      throw new AppError('Purposes must be a non-empty array', 400);
    }

    if (typeof amount !== 'number' || amount <= 0) {
      throw new AppError('Amount must be a positive number', 400);
    }

    // Create complex object
    const donation = new Donation({
      donor,
      amount,
      currency,
      purposes,
    });

    if (!donation.isValid()) {
      throw new AppError('Invalid donation data', 400);
    }

    logger.info('Recording donation', {
      donor,
      amount,
      currency,
      donationId: donation.id,
    });

    const result = await donationRepo.addDonation(donation);

    logger.info('Donation recorded in blockchain', {
      donationId: donation.id,
      blockHash: result.blockHash,
    });

    res.status(201).json({
      success: true,
      message: 'Donation recorded in blockchain',
      data: {
        donation: donation.toJSON(),
        blockHash: result.blockHash,
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
    const allDonations = await donationRepo.getAllDonations(); // 🆕 Changed this line

    res.status(200).json({
      success: true,
      count: allDonations.length,
      data: allDonations.map((d) => d.toJSON()),
    });
  } catch (error) {
    next(error);
  }
};
