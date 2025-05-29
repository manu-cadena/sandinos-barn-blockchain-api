import { Request, Response, NextFunction } from 'express';
import BlockchainService from '../services/BlockchainService';
import AppError from '../utilities/AppError';
import logger from '../utilities/logger';

const blockchainService = BlockchainService.getInstance();

export const initializeBlockchain = async (): Promise<void> => {
  await blockchainService.initialize();
};

export const listAllBlocks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blockchain = blockchainService.getBlockchain();

    if (blockchain.chain.length === 0) {
      throw new AppError('Blockchain is empty', 404);
    }

    res.status(200).json({
      success: true,
      data: blockchain,
    });
  } catch (error) {
    next(error);
  }
};

export const addBlock = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { data } = req.body;
    const blockchain = blockchainService.getBlockchain();

    // Validation
    if (!data) {
      throw new AppError('Data is required to create a block', 400);
    }
    if (!Array.isArray(data)) {
      throw new AppError('Data must be an array', 400);
    }
    if (data.length === 0) {
      throw new AppError('Data array cannot be empty', 400);
    }

    logger.info('Mining new block', { dataLength: data.length });

    await blockchain.addBlock({ data });

    logger.info('Block mined successfully', {
      chainLength: blockchain.chain.length,
      blockHash: blockchain.chain[blockchain.chain.length - 1].hash,
    });

    res.status(201).json({
      success: true,
      message: 'Block added successfully',
      data: blockchain.chain,
    });
  } catch (error) {
    logger.error('Failed to add block', { error: (error as Error).message });
    next(error);
  }
};

export const getBlockByHash = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { hash } = req.params;
    const blockchain = blockchainService.getBlockchain();

    if (!hash || hash.trim() === '') {
      throw new AppError('Block hash is required', 400);
    }

    const block = blockchain.chain.find((block) => block.hash === hash);

    if (!block) {
      throw new AppError(`Block with hash '${hash}' not found`, 404);
    }

    res.status(200).json({
      success: true,
      data: block,
    });
  } catch (error) {
    next(error);
  }
};
