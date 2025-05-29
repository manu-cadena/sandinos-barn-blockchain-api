export const MINE_RATE = 1000;
export const INITIAL_DIFFICULTY = 3;

export const GENESIS_BLOCK = {
  timestamp: 1,
  data: [],
  hash: '0000000000000000000000000000000000000000000000000000000000000000',
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  lastHash: '#######',
} as const;
