import { Router } from 'express';
import { listAllBlocks, addBlock } from '../controllers/blockchain-controller';

const router = Router();

// GET /api/blocks - List all blocks in the blockchain
router.get('/', listAllBlocks);

// POST /api/blocks/mine - Mine and add a new block
router.post('/mine', addBlock);

export default router;
