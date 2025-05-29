import { Router } from 'express';
import {
  listAllBlocks,
  addBlock,
  getBlockByHash,
} from '../controllers/blockchain-controller';

const router = Router();

// GET /api/blocks - List all blocks
router.get('/', listAllBlocks);

// GET /api/blocks/:hash - Get single block by hash
router.get('/hash/:hash', getBlockByHash);

// POST /api/blocks/mine - Mine and add a new block
router.post('/mine', addBlock);

export default router;
