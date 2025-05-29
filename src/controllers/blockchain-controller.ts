import { Request, Response, NextFunction } from 'express';
import Blockchain from '../models/Blockchain';
import AppError from '../utilities/AppError';

const blockchain = new Blockchain();

export const listAllBlocks = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    console.log(
      `📊 GET /api/blocks - Chain length: ${blockchain.chain.length}`
    );

    // Simulate potential error (you can remove this later)
    if (blockchain.chain.length === 0) {
      throw new AppError('Blockchain is empty', 404);
    }

    res.status(200).json({
      success: true,
      data: blockchain,
    });
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

export const addBlock = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { data } = req.body;

    // Validation - throw AppError for bad input
    if (!data) {
      throw new AppError('Data is required to create a block', 400);
    }

    if (!Array.isArray(data)) {
      throw new AppError('Data must be an array', 400);
    }

    if (data.length === 0) {
      throw new AppError('Data array cannot be empty', 400);
    }

    console.log(`⛏️  Mining new block with data:`, data);
    console.log(`📊 Chain length before mining: ${blockchain.chain.length}`);

    blockchain.addBlock({ data });

    console.log(`📊 Chain length after mining: ${blockchain.chain.length}`);
    console.log(
      `🎉 New block hash: ${blockchain.chain[blockchain.chain.length - 1].hash}`
    );

    res.status(201).json({
      success: true,
      message: 'Block added successfully',
      data: blockchain.chain,
    });
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

// Get single block by hash
export const getBlockByHash = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { hash } = req.params;

    // DEBUG: Let's see what we're actually receiving
    console.log('🔍 Received hash parameter:', hash);
    console.log('🔍 Hash length:', hash?.length);
    console.log('🔍 Available hashes in blockchain:');
    blockchain.chain.forEach((block, index) => {
      console.log(`   Block ${index}: ${block.hash}`);
    });

    // Validation
    if (!hash || hash.trim() === '') {
      throw new AppError('Block hash is required', 400);
    }

    // Find block by hash
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
