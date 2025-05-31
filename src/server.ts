import express from 'express';
import dotenv from 'dotenv';
import blockchainRoutes from './routes/blockchain-routes';
import donationRoutes from './routes/donation-routes';
import errorHandler from './middleware/errorHandler';
import logger from './utilities/logger';
import { initializeBlockchain } from './controllers/blockchain-controller';
import { initializeDataDirectory } from './utilities/fileUtils';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/blocks', blockchainRoutes);
app.use('/api/donations', donationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'Sandinos Barn Blockchain API is running!',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await initializeDataDirectory();
    await initializeBlockchain();

    logger.info('Server starting', { port: PORT });

    app.listen(PORT, () => {
      logger.info('Sandinos Barn Blockchain API started successfully', {
        port: PORT,
        environment: process.env.NODE_ENV || 'development',
      });
      console.log(`🚀 Sandinos Barn Blockchain API running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`⛓️  Blockchain API: http://localhost:${PORT}/api/blocks`);
      console.log(`💝 Donations API: http://localhost:${PORT}/api/donations`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
