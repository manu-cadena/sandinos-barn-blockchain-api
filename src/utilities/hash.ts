import crypto from 'crypto';

export const createHash = (...args: any[]): string => {
  const hash = crypto.createHash('sha256');
  hash.update(args.sort().join(' '));
  return hash.digest('hex');
};
