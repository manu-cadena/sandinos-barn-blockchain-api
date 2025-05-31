import * as fs from 'fs/promises';
import * as path from 'path';
import Block from '../models/Block';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const BLOCKCHAIN_FILE = path.join(DATA_DIR, 'blockchain.json');
const ERROR_LOG_FILE = path.join(DATA_DIR, 'error.log');

// Ensure data directory exists
export const initializeDataDirectory = async (): Promise<void> => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    throw new Error(`Failed to create data directory: ${error}`);
  }
};

// Save blockchain to file
export const saveBlockchainToFile = async (chain: Block[]): Promise<void> => {
  try {
    const data = JSON.stringify(chain, null, 2);
    await fs.writeFile(BLOCKCHAIN_FILE, data, 'utf8');
  } catch (error) {
    throw error;
  }
};

// Load blockchain from file
export const loadBlockchainFromFile = async (): Promise<Block[] | null> => {
  try {
    const data = await fs.readFile(BLOCKCHAIN_FILE, 'utf8');
    const chainData = JSON.parse(data);

    // Convert plain objects back to Block instances
    const chain = chainData.map((blockData: any) => new Block(blockData));

    return chain;
  } catch (error) {
    if ((error as any).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
};

// Append error to log file
export const logErrorToFile = async (error: any, req?: any): Promise<void> => {
  try {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      message: error.message,
      stack: error.stack,
      url: req?.originalUrl,
      method: req?.method,
      statusCode: error.statusCode,
    };

    const logLine = JSON.stringify(logEntry) + '\n';
    await fs.appendFile(ERROR_LOG_FILE, logLine, 'utf8');
  } catch (logError) {
    console.error('❌ Failed to write to error log:', logError);
  }
};
