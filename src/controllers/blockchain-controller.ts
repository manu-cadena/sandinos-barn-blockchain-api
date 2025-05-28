import { Request, Response } from 'express';
import Blockchain from '../models/Blockchain';

// Create a single blockchain instance
const blockchain = new Blockchain();

export const listAllBlocks = (req: Request, res: Response): void => {
  console.log(`📊 GET /api/blocks - Chain length: ${blockchain.chain.length}`);
  res.status(200).json({
    success: true,
    data: blockchain,
  });
};

export const addBlock = (req: Request, res: Response): void => {
  const { data } = req.body;

  console.log(`⛏️  Mining new block with data:`, data);

  blockchain.addBlock({ data });

  console.log(
    `🎉 New block hash: ${blockchain.chain[blockchain.chain.length - 1].hash}`
  );

  res.status(201).json({
    success: true,
    message: 'Block added successfully',
    data: blockchain.chain,
  });
};
